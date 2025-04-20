
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import ChatbotUI from "@/components/features/ChatbotUI";

const ChatbotPage = () => {
  return (
    <Layout>
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Study Assistant</h1>
          <p className="text-muted-foreground">Get help with your studies, ask questions, or brainstorm ideas.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ChatbotUI />
        </div>
      </PageContainer>
    </Layout>
  );
};

export default ChatbotPage;
