import React from "react";

const Message = ({ messages }) => {
  return (
    <div className="message">
      {messages.length == 0 && <h1>No messages right now!</h1>}
      {messages.length > 0 &&
        messages.map((message, idx) => (
          <div className="message__preview" key={idx}>
            <h1>
              {idx + 1}--
              {message}
            </h1>
          </div>
        ))}
    </div>
  );
};

export default Message;
