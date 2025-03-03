
import { ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ isSidebarOpen = true }: ChatHeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initialize dark mode based on document class
    setIsDarkMode(!document.documentElement.classList.contains('light'));
    
    // Apply initial theme
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="fixed top-0 z-30 w-full border-b border-white/20 bg-chatgpt-main/95 backdrop-blur dark:bg-chatgpt-main/95 light:bg-gray-100/95 transition-colors duration-300">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${!isSidebarOpen ? 'ml-24' : ''} dark:text-white light:text-gray-800`}>Spark-AI</span>
          <ChevronDown className="h-4 w-4 dark:text-white light:text-gray-800" />
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 overflow-hidden"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-300 animate-fade-in" />
            ) : (
              <Moon className="h-5 w-5 text-blue-300 animate-fade-in" />
            )}
          </button>
          <div className="gizmo-shadow-stroke relative flex h-8 w-8 items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary">
            <img 
              src="/lovable-uploads/431999d6-d033-4e76-af87-e489be68f07f.png" 
              alt="Spark-AI" 
              className="h-6 w-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
