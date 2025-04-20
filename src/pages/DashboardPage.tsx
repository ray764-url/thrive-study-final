
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import ProgressDashboard from "@/components/features/ProgressDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const DashboardPage = () => {
  // Dummy data for study sessions, would come from API in real app
  const studySessions = [
    { id: 1, subject: "Mathematics", duration: 75, date: "Apr 19, 2025" },
    { id: 2, subject: "Chemistry", duration: 45, date: "Apr 18, 2025" },
    { id: 3, subject: "History", duration: 60, date: "Apr 18, 2025" },
    { id: 4, subject: "Literature", duration: 30, date: "Apr 17, 2025" },
    { id: 5, subject: "Physics", duration: 90, date: "Apr 16, 2025" },
  ];

  return (
    <Layout>
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Progress Dashboard</h1>
          <p className="text-muted-foreground">Track your study metrics, progress, and achievements.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <ProgressDashboard />
          </div>
          
          <div className="col-span-1">
            <Card>
              <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/20 pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  <span>Recent Study Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {studySessions.map((session) => (
                    <div key={session.id} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{session.subject}</h4>
                        <p className="text-xs text-muted-foreground">{session.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{session.duration} min</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor(session.duration / 60)}h {session.duration % 60}m
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="text-primary hover:underline text-sm">
                    View All Sessions
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default DashboardPage;
