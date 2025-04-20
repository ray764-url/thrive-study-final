
import { useState } from "react";
import { Award, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Goal = {
  id: number;
  title: string;
  progress: number;
  dueDate: string;
};

type Achievement = {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
};

const MotivationBoard = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "Complete Calculus Course", progress: 65, dueDate: "May 15" },
    { id: 2, title: "Read 5 Chapters", progress: 40, dueDate: "April 25" },
  ]);

  const [newGoal, setNewGoal] = useState({ title: "", dueDate: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  const achievements = [
    { id: 1, title: "3-Day Streak", description: "Studied for 3 days in a row", date: "April 18", icon: "🔥" },
    { id: 2, title: "10 Pomodoros", description: "Completed 10 Pomodoro sessions", date: "April 17", icon: "⏱️" },
    { id: 3, title: "First Flashcard Set", description: "Created your first flashcard set", date: "April 15", icon: "📚" },
  ];

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...goals.map(g => g.id), 0) + 1;
    setGoals([...goals, { ...newGoal, id: newId, progress: 0 }]);
    setNewGoal({ title: "", dueDate: "" });
    setDialogOpen(false);
  };

  const updateGoalProgress = (goalId: number, newProgress: number) => {
    setGoals(goals.map(goal =>
      goal.id === goalId ? { ...goal, progress: Math.min(Math.max(newProgress, 0), 100) } : goal
    ));
  };

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/20 pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Motivation Board</span>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Study Goal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="Enter your goal"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                    placeholder="e.g., May 15"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Add Goal</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Study Goals</h3>
          {goals.map((goal) => (
            <div key={goal.id} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{goal.title}</span>
                <span className="text-muted-foreground text-xs">{goal.dueDate}</span>
              </div>
              <div 
                className="h-2 bg-secondary rounded-full overflow-hidden cursor-pointer"
                onClick={() => {
                  const newProgress = Math.min(goal.progress + 10, 100);
                  updateGoalProgress(goal.id, newProgress);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  const newProgress = Math.max(goal.progress - 10, 0);
                  updateGoalProgress(goal.id, newProgress);
                }}
              >
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-muted-foreground">{goal.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Recent Achievements</h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start p-3 bg-secondary/30 rounded-lg">
                <div className="w-10 h-10 flex-shrink-0 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">{achievement.icon}</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <Badge variant="outline" className="ml-2 text-xs">{achievement.date}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationBoard;
