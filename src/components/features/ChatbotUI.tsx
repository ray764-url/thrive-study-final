
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

// In a real app, this would be handled by a proper backend API
const fakeChatbotResponse = async (message: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    return "Hello! How can I help with your studies today?";
  }
  
  if (message.toLowerCase().includes("help")) {
    return "I can help you with study techniques, answer questions about your coursework, or help you create a study plan. What would you like assistance with?";
  }
  
  if (message.toLowerCase().includes("study")) {
    return "For effective studying, try the Pomodoro technique: 25 minutes of focused study followed by a 5-minute break. This helps maintain concentration and prevents burnout.";
  }
  
  return "I'm here to help with any study-related questions you have. Feel free to ask about specific subjects, study methods, or time management strategies!";
};

type Message = {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const ChatbotUI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! I'm your study assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // In a real app, this would call your actual chatbot API
      const response = await fakeChatbotResponse(userMessage.content);
      
      // Add bot response
      const botMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/20 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>Study Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0 flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2 bg-primary text-white">
                      <span className="text-xs">AI</span>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your studies..."
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="self-end"
            >
              {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotUI;
