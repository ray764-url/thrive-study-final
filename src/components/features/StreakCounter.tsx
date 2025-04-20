
import { useState, useEffect } from "react";
import { Award, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Confetti from "@/components/ui/confetti";

// In a real app, this would come from an API or localStorage
const getInitialStreakData = () => {
  return {
    currentStreak: 5,
    longestStreak: 12,
    daysThisWeek: 3,
    milestoneTarget: 7,
    lastStudyDate: new Date().toISOString(),
  };
};

const StreakCounter = () => {
  const [streakData, setStreakData] = useState(getInitialStreakData());
  const [showConfetti, setShowConfetti] = useState(false);

  // Milestone progress percentage
  const milestoneProgress = Math.min(
    Math.round((streakData.currentStreak / streakData.milestoneTarget) * 100),
    100
  );

  // Confetti animation when reaching a milestone
  useEffect(() => {
    if (streakData.currentStreak > 0 && streakData.currentStreak % streakData.milestoneTarget === 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [streakData.currentStreak, streakData.milestoneTarget]);

  // Day streak indicators
  const renderStreakDots = () => {
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    return (
      <div className="flex justify-between mt-4">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < streakData.daysThisWeek
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              {day}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/30 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-primary" />
          <span>Study Streak</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Confetti active={showConfetti} />

        <div className="text-center mb-3">
          <h3 className="text-4xl font-bold text-primary">{streakData.currentStreak}</h3>
          <p className="text-sm text-muted-foreground">days in a row</p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Milestone Progress</span>
              <span>
                {streakData.currentStreak} / {streakData.milestoneTarget} days
              </span>
            </div>
            <Progress value={milestoneProgress} className="h-2" />
          </div>

          {renderStreakDots()}

          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Longest: {streakData.longestStreak} days</span>
            </div>
            <div>
              <button className="text-primary hover:underline text-sm">View History</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
