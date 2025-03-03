
import { useState, useRef } from "react";
import { Check, ChevronLeft, Key, Plus, Trash } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  apiKey?: string;
  onApiKeyChange: (key: string) => void;
}

const Sidebar = ({ isOpen, onToggle, apiKey = "", onApiKeyChange }: SidebarProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [inputKey, setInputKey] = useState(apiKey);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSaveKey = () => {
    setIsSaving(true);
    // Simulate delay to show loading state
    setTimeout(() => {
      onApiKeyChange(inputKey);
      setIsSaving(false);
      setIsSettingsOpen(false);
    }, 500);
  };

  const handleClearKey = () => {
    setInputKey("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={onToggle} 
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-chatgpt-sidebar dark:bg-chatgpt-sidebar light:bg-gray-200 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <div className="p-4">
          <button 
            className="sidebar-item dark:text-white light:text-gray-800"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <Key className="h-4 w-4" />
            <span>Hugging Face Token</span>
          </button>
          
          {isSettingsOpen && (
            <div className="mt-2 p-3 rounded-md bg-chatgpt-main dark:bg-gray-700 light:bg-gray-100 animate-fade-in">
              <label htmlFor="api-key" className="block text-xs font-medium mb-1 dark:text-white light:text-gray-800">
                Enter Hugging Face Token
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  id="api-key"
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="w-full p-2 text-sm rounded bg-gray-700 dark:bg-gray-600 light:bg-gray-200 text-white light:text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="hf_..."
                />
                {inputKey && (
                  <button
                    onClick={handleClearKey}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleSaveKey}
                  disabled={!inputKey || isSaving}
                  className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-1">
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Check className="h-3 w-3" /> Save
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-auto p-4 border-t border-white/20">
          <button
            className="sidebar-item dark:text-white light:text-gray-800"
            onClick={onToggle}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Close sidebar</span>
          </button>
        </div>
      </aside>
      
      {/* Toggle button when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-3 left-3 z-20 p-2 rounded-md bg-chatgpt-sidebar dark:bg-chatgpt-sidebar light:bg-gray-200 hover:bg-chatgpt-hover dark:text-white light:text-gray-800"
        >
          <Plus className="h-4 w-4" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
