import { useState } from "react";
import { Book, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FlashcardCreateForm from "./FlashcardCreateForm";

type Flashcard = {
  id: number;
  question: string;
  answer: string;
  category: string;
};

// In a real app, these would come from an API or localStorage
const getDummyFlashcards = (): Flashcard[] => [
  { 
    id: 1, 
    question: "What is the process by which plants make their own food using sunlight?", 
    answer: "Photosynthesis", 
    category: "Biology" 
  },
  { 
    id: 2, 
    question: "What is Newton's First Law of Motion?", 
    answer: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.", 
    category: "Physics" 
  },
  { 
    id: 3, 
    question: "What is the capital of France?", 
    answer: "Paris", 
    category: "Geography" 
  },
  { 
    id: 4, 
    question: "What is the quadratic formula?", 
    answer: "x = (-b ± √(b² - 4ac)) / 2a", 
    category: "Mathematics" 
  },
];

const FlashcardSystem = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(getDummyFlashcards());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const currentCard = flashcards[currentIndex];
  
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };
  
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleCreateFlashcard = (flashcard: Omit<Flashcard, "id">) => {
    const newFlashcard = {
      ...flashcard,
      id: flashcards.length + 1,
    };
    setFlashcards([...flashcards, newFlashcard]);
    setCurrentIndex(flashcards.length); // Move to the new card
  };

  return (
    <div className="space-y-4">
      <FlashcardCreateForm onSubmit={handleCreateFlashcard} />
      
      <Card className="h-[340px] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-primary/20 to-accent/20 pb-2">
          <CardTitle className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-primary" />
            <span>Flashcards</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-4 flex flex-col">
          {flashcards.length > 0 ? (
            <>
              <div className="flex-grow flex flex-col">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Card {currentIndex + 1} of {flashcards.length}
                  </span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                    {currentCard.category}
                  </span>
                </div>
                
                <div 
                  className="flex-grow flex items-center justify-center cursor-pointer"
                  onClick={toggleAnswer}
                >
                  <div className="text-center p-4 w-full h-full flex items-center justify-center">
                    <div 
                      className={`transform transition-all duration-300 w-full ${
                        showAnswer ? "rotate-y-180" : ""
                      }`}
                    >
                      {!showAnswer ? (
                        <div className="p-4 bg-secondary/30 rounded-lg h-full flex items-center justify-center min-h-[150px]">
                          <p className="font-medium">{currentCard.question}</p>
                        </div>
                      ) : (
                        <div className="p-4 bg-primary/10 rounded-lg h-full flex items-center justify-center min-h-[150px]">
                          <p className="font-medium text-primary">{currentCard.answer}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-center text-muted-foreground mt-3 mb-5">
                  Tap card to {showAnswer ? "hide" : "show"} answer
                </p>
              </div>
              
              <div className="flex justify-between">
                <Button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  variant="outline"
                  size="sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={currentIndex === flashcards.length - 1}
                  variant="outline"
                  size="sm"
                >
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-muted-foreground">No flashcards available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardSystem;
