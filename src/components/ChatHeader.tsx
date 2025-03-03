
import { ChevronDown } from "lucide-react";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ isSidebarOpen = true }: ChatHeaderProps) => {
  return (
    <div className="fixed top-0 z-30 w-full border-b border-white/20 bg-chatgpt-main/95 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${!isSidebarOpen ? 'ml-24' : ''}`}>Spark-AI</span>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="gizmo-shadow-stroke relative flex h-8 w-8 items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary">
          <img 
            src="/lovable-uploads/431999d6-d033-4e76-af87-e489be68f07f.png" 
            alt="Spark-AI" 
            className="h-6 w-6"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
