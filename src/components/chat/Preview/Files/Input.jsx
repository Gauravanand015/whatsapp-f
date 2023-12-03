const Input = ({ message, setMessage }) => {
  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg">
      {/* message input */}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="w-full bg-transparent h-12 pl-2 focus:outline-none border-none dark:text-dark_text_1"
      />
    </div>
  );
};

export default Input;
