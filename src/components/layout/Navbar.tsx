import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Book, Clock, MessageSquare, Award, BarChart, ListTodo, Grid2x2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { name: "Home", icon: <BarChart className="h-5 w-5 mr-2" />, path: "/" },
    { name: "Dashboard", icon: <Grid2x2 className="h-5 w-5 mr-2" />, path: "/dashboard" },
    { name: "Chatbot", icon: <MessageSquare className="h-5 w-5 mr-2" />, path: "/chatbot" },
    { name: "Pomodoro", icon: <Clock className="h-5 w-5 mr-2" />, path: "/pomodoro" },
    { name: "Flashcards", icon: <Book className="h-5 w-5 mr-2" />, path: "/flashcards" },
    { name: "Tasks", icon: <ListTodo className="h-5 w-5 mr-2" />, path: "/tasks" },
    { name: "Motivation", icon: <Award className="h-5 w-5 mr-2" />, path: "/motivation" },
  ];

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-card" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">Thrive</span>
              <span className="text-accent ml-1 font-bold text-xl">Study</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              onClick={toggleNav}
              variant="ghost"
              size="sm"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isOpen && (
        <div className="md:hidden bg-white dark:bg-card animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
