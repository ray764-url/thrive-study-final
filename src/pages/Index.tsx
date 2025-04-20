
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import StreakCounter from "@/components/features/StreakCounter";
import PomodoroTimer from "@/components/features/PomodoroTimer";
import TaskPlanner from "@/components/features/TaskPlanner";
import ProgressDashboard from "@/components/features/ProgressDashboard";
import FlashcardSystem from "@/components/features/FlashcardSystem";
import ChatbotUI from "@/components/features/ChatbotUI";
import MotivationBoard from "@/components/features/MotivationBoard";

const Index = () => {
  return (
    <Layout>
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Thrive Study Space</h1>
          <p className="text-muted-foreground">Your personal study companion to help you achieve your academic goals.</p>
        </div>

        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top row - Quick access widgets */}
          <div className="col-span-1">
            <StreakCounter />
          </div>
          <div className="col-span-1">
            <PomodoroTimer />
          </div>
          <div className="col-span-1">
            <ProgressDashboard />
          </div>

          {/* Middle row - Tasks and flashcards */}
          <div className="col-span-1 lg:col-span-2">
            <TaskPlanner />
          </div>
          <div className="col-span-1">
            <FlashcardSystem />
          </div>

          {/* Bottom row - Chatbot and motivation board */}
          <div className="col-span-1 lg:col-span-2">
            <ChatbotUI />
          </div>
          <div className="col-span-1">
            <MotivationBoard />
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Index;
