
const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  if (isAssistant) {
    return (
      <div className="gizmo-shadow-stroke relative flex h-full items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary">
        <img 
          src="/lovable-uploads/431999d6-d033-4e76-af87-e489be68f07f.png" 
          alt="Spark-AI" 
          className="h-6 w-6"
        />
      </div>
    );
  }
  
  return null;
};

export default MessageAvatar;
