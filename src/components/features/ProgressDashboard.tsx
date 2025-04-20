
import { BarChart, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// In a real app, this would come from an API or localStorage
const getDummyStats = () => {
  return {
    studyHours: {
      today: 2.5,
      thisWeek: 12,
      lastWeek: 9,
      goal: 20,
    },
    completedTasks: {
      today: 4,
      thisWeek: 15,
      total: 42,
    },
    pomodoros: {
      today: 6,
      thisWeek: 25,
      lastWeek: 22,
    },
    streak: {
      current: 5,
      longest: 12,
    },
  };
};

const ProgressDashboard = () => {
  const stats = getDummyStats();
  
  // Calculate progress percentages
  const weeklyProgress = Math.min(Math.round((stats.studyHours.thisWeek / stats.studyHours.goal) * 100), 100);
  const weeklyComparison = stats.studyHours.thisWeek - stats.studyHours.lastWeek;
  const pomodoroComparison = stats.pomodoros.thisWeek - stats.pomodoros.lastWeek;
  
  const StatCard = ({ title, value, subtext }: { title: string; value: string | number; subtext: string }) => (
    <div className="bg-secondary/30 rounded-lg p-3">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
    </div>
  );

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-secondary/30 to-accent/20 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <BarChart className="h-5 w-5 text-primary" />
          <span>Study Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Weekly Study Goal</h3>
            <span className="text-sm text-muted-foreground">
              {stats.studyHours.thisWeek}/{stats.studyHours.goal} hours
            </span>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
          
          {weeklyComparison > 0 && (
            <p className="text-xs flex items-center mt-2 text-success">
              <ArrowUp className="h-3 w-3 mr-1" />
              {weeklyComparison} more hours than last week
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <StatCard 
            title="Study Time Today" 
            value={`${stats.studyHours.today}h`} 
            subtext="Focus time" 
          />
          <StatCard 
            title="Tasks Completed" 
            value={stats.completedTasks.today} 
            subtext={`${stats.completedTasks.thisWeek} this week`} 
          />
          <StatCard 
            title="Pomodoros" 
            value={stats.pomodoros.today} 
            subtext={`${pomodoroComparison > 0 ? '+' : ''}${pomodoroComparison} vs last week`} 
          />
          <StatCard 
            title="Current Streak" 
            value={stats.streak.current} 
            subtext={`Longest: ${stats.streak.longest} days`} 
          />
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-primary hover:underline text-sm">
            View Detailed Analytics
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressDashboard;
