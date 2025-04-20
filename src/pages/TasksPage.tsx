
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import TaskPlanner from "@/components/features/TaskPlanner";

const TasksPage = () => {
  return (
    <Layout>
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Task Manager</h1>
          <p className="text-muted-foreground">Track and manage all your study tasks and assignments.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <TaskPlanner />
        </div>
      </PageContainer>
    </Layout>
  );
};

export default TasksPage;
