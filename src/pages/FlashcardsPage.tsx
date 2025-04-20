
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import FlashcardSystem from "@/components/features/FlashcardSystem";

const FlashcardsPage = () => {
  return (
    <Layout>
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Flashcards</h1>
          <p className="text-muted-foreground">Create and review customized flashcards to reinforce your learning.</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <FlashcardSystem />
        </div>
      </PageContainer>
    </Layout>
  );
};

export default FlashcardsPage;
