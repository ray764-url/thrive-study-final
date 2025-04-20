
import { useState, useEffect, useRef } from "react";
import { Play, Square, RefreshCw, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TimerMode = "focus" | "shortBreak" | "longBreak";

// Timer durations in seconds
const TIMER_DURATION = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const PomodoroTimer = () => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION[mode]);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Update timer when mode changes
  useEffect(() => {
    setTimeRemaining(TIMER_DURATION[mode]);
    if (isActive) {
      setIsActive(false);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    }
  }, [mode]);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Timer complete
            setIsActive(false);
            window.clearInterval(intervalRef.current!);
            
            // If focus session completed, increment counter
            if (mode === "focus") {
              setCompletedPomodoros((prev) => prev + 1);
              // Play sound notification (in real app)
              // switchToBreak();
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isActive, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(TIMER_DURATION[mode]);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  // Calculate progress percentage
  const progress = Math.round(
    ((TIMER_DURATION[mode] - timeRemaining) / TIMER_DURATION[mode]) * 100
  );

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-secondary/30 to-primary/20 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Pomodoro Timer</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="focus" value={mode} onValueChange={(v) => setMode(v as TimerMode)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak">Long Break</TabsTrigger>
          </TabsList>

          <TabsContent value={mode} className="mt-0">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-foreground mb-2">{formatTime(timeRemaining)}</div>
              <Progress value={progress} className="h-2 w-full" />
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={toggleTimer}
                variant={isActive ? "destructive" : "default"}
                size="lg"
                className="w-20"
              >
                {isActive ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button onClick={resetTimer} variant="outline" size="lg" className="w-20">
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Completed today: <span className="font-medium text-foreground">{completedPomodoros}</span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
