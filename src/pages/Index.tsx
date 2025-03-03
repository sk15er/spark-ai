import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hfToken, setHfToken] = useState<string>(() => {
    return localStorage.getItem('hf_token') || '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';
  });
  const { toast } = useToast();

  useEffect(() => {
    if (hfToken && !localStorage.getItem('hf_token')) {
      localStorage.setItem('hf_token', hfToken);
      toast({
        title: "Token Saved",
        description: "Your Hugging Face token has been saved automatically",
      });
    }
  }, [hfToken, toast]);

  const saveHfToken = (token: string) => {
    localStorage.setItem('hf_token', token);
    setHfToken(token);
    toast({
      title: "Token Saved",
      description: "Your Hugging Face token has been saved",
    });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    if (!hfToken) {
      toast({
        title: "Token Required",
        description: "Please enter your Hugging Face token first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [
        ...messages,
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: formatPrompt(newMessages),
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            top_p: 0.95,
            return_full_text: false,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: result[0]?.generated_text || "I couldn't generate a response. Please try again."
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      console.error("Error calling Hugging Face API:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get a response from the AI model",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrompt = (messages: Message[]) => {
    return messages.map(msg => {
      if (msg.role === 'user') {
        return `<s>[INST] ${msg.content} [/INST]`;
      } else {
        return msg.content;
      }
    }).join("\n");
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onApiKeyChange={saveHfToken}
        apiKey={hfToken}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} dark:bg-chatgpt-main light:bg-gray-100`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} />
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center dark:text-white light:text-gray-900">What can I help with?</h1>
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <ActionButtons />
            </div>
          ) : (
            <>
              <MessageList messages={messages} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <div className="flex flex-col items-center text-gray-500 py-2 space-y-1">
                <div className="text-xs">
                  Spark-AI can make mistakes. Check important info.
                </div>
                <div className="text-xs font-medium">
                  Spark-AI is made by Shushank and Mayank
                </div>
                <div className="text-xs flex space-x-3">
                  <a href="https://github.com/sk16er" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    github.com/sk16er
                  </a>
                  <a href="mailto:cxmayank9306@gmail.com" className="hover:text-blue-500 transition-colors">
                    cxmayank9306@gmail.com
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
