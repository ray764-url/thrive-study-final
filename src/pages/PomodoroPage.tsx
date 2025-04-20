
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import PomodoroTimer from "@/components/features/PomodoroTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const PomodoroPage = () => {
  return (
    <Layout>
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pomodoro Timer</h1>
          <p className="text-muted-foreground">Focus and break sessions to maximize your productivity.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <PomodoroTimer />
          </div>
          
          <div className="col-span-1">
            <Card>
              <CardHeader className="bg-gradient-to-r from-secondary/30 to-primary/20 pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Pomodoro Technique</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">What is the Pomodoro Technique?</h3>
                    <p className="text-sm text-muted-foreground">
                      The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">How to use it:</h3>
                    <ol className="text-sm text-muted-foreground list-decimal pl-4 space-y-1">
                      <li>Choose a task you want to accomplish</li>
                      <li>Set the timer for 25 minutes and work until it rings</li>
                      <li>Take a short 5-minute break</li>
                      <li>After 4 pomodoros, take a longer 15-30 minute break</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Benefits:</h3>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Improves focus and concentration</li>
                      <li>Reduces mental fatigue</li>
                      <li>Increases productivity and accountability</li>
                      <li>Creates a sense of urgency</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default PomodoroPage;
