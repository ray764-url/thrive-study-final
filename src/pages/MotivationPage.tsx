
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import MotivationBoard from "@/components/features/MotivationBoard";
import MotivationalQuotes from "@/components/features/MotivationalQuotes";
import StreakCounter from "@/components/features/StreakCounter";

const MotivationPage = () => {
  return (
    <Layout>
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Motivation Center</h1>
          <p className="text-muted-foreground">Track your goals, achievements, and study streaks.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 space-y-6">
            <MotivationalQuotes />
            <MotivationBoard />
          </div>
          <div className="col-span-1">
            <StreakCounter />
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default MotivationPage;
