
import { useState } from "react";
import { Calendar, ListTodo, Check, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskCreateForm from "./TaskCreateForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Task = {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
};

// In a real app, these would come from an API or localStorage
const getDummyTasks = (): Task[] => [
  { id: 1, title: "Complete Math Assignment", dueDate: "2025-04-22", completed: false, priority: "high" },
  { id: 2, title: "Review Biology Notes", dueDate: "2025-04-21", completed: false, priority: "medium" },
  { id: 3, title: "Prepare History Presentation", dueDate: "2025-04-24", completed: false, priority: "high" },
  { id: 4, title: "Programming Project", dueDate: "2025-04-23", completed: true, priority: "medium" },
];

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const TaskPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>(getDummyTasks());
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "completed">("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (newTask: Omit<Task, "id" | "completed">) => {
    const task: Task = {
      ...newTask,
      id: tasks.length + 1,
      completed: false,
    };
    setTasks([...tasks, task]);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterTasks = () => {
    const today = new Date().toISOString().split("T")[0];
    
    switch (filter) {
      case "today":
        return tasks.filter((task) => task.dueDate === today && !task.completed);
      case "upcoming":
        return tasks.filter((task) => task.dueDate > today && !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks.filter((task) => !task.completed);
    }
  };

  const filteredTasks = filterTasks();

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-primary/20 to-accent/20 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <ListTodo className="h-5 w-5 text-primary" />
          <span>Tasks</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <TaskCreateForm onSubmit={handleCreateTask} />
        
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <Badge 
            variant={filter === "all" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter("all")}
          >
            All
          </Badge>
          <Badge 
            variant={filter === "today" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter("today")}
          >
            Today
          </Badge>
          <Badge 
            variant={filter === "upcoming" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </Badge>
          <Badge 
            variant={filter === "completed" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Badge>
        </div>

        <div className="space-y-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div 
                key={task.id}
                className={`p-3 rounded-md border ${
                  task.completed ? "bg-secondary/30 border-secondary" : "bg-card border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded border ${
                        task.completed
                          ? "bg-primary border-primary text-white"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {task.completed && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <div>
                      <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {task.dueDate}
                        </span>
                        <Badge variant="secondary" className={`text-xs ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Dialog open={editingTask?.id === task.id} onOpenChange={(open) => !open && setEditingTask(null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTask(task)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit task</span>
                      </Button>
                    </DialogTrigger>
                    {editingTask?.id === task.id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Task</DialogTitle>
                        </DialogHeader>
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (editingTask) handleEditTask(editingTask);
                          }} 
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">Task Title</Label>
                            <Input
                              id="edit-title"
                              value={editingTask.title}
                              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                              placeholder="Enter task title"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-dueDate">Due Date</Label>
                            <Input
                              id="edit-dueDate"
                              type="date"
                              value={editingTask.dueDate}
                              onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Priority</Label>
                            <RadioGroup
                              value={editingTask.priority}
                              onValueChange={(value: "low" | "medium" | "high") =>
                                setEditingTask({ ...editingTask, priority: value })
                              }
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="low" id="edit-low" />
                                <Label htmlFor="edit-low">Low</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="medium" id="edit-medium" />
                                <Label htmlFor="edit-medium">Medium</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="high" id="edit-high" />
                                <Label htmlFor="edit-high">High</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <Button type="submit" className="w-full">
                            Save Changes
                          </Button>
                        </form>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No tasks found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskPlanner;
