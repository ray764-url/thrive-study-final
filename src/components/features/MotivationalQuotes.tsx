
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

const quotes = [
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Study hard what interests you the most.", author: "Richard Feynman" },
  { text: "Your time is limited, don't waste it.", author: "Steve Jobs" }
];

const MotivationalQuotes = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Quote className="h-5 w-5 text-primary" />
          <span>Daily Inspiration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <blockquote className="italic text-lg text-center">
          "{quotes[currentQuoteIndex].text}"
        </blockquote>
        <p className="text-right text-sm text-muted-foreground mt-2">
          - {quotes[currentQuoteIndex].author}
        </p>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuotes;
