const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="src/assets/blue-circle-with-white-user.png"
            alt="Tailwind CSS chat bubble component"
          />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue">Hi ! What's upp?</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:45
      </div>
    </div>
  );
};

export default Message;
