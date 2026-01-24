


// import React from "react";
// import { Message } from "./types";
// import moment from "moment";
// import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
// import MessageInput from "./MessageInput";
// import "./chat.scss";

// interface ChatBoxProps {
//   messages: Message[];
//   inputValue: string;
//   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSendMessage: () => void;
//   messagesEndRef: React.RefObject<HTMLDivElement>; // Correctly typing the ref
// }

// const ChatBox: React.FC<ChatBoxProps> = ({ 
//   messages, 
//   inputValue, 
//   handleInputChange, 
//   handleSendMessage, 
//   messagesEndRef 
// }) => {
//   return (
//     <div className="chat-container">
//       <div className="msg-body">
//         {messages.map((message) => (
//           <div 
//             key={message.id} 
//             className={`message-item ${message.sender === "You" ? "sent" : "received"}`}
//           >
//             <p className="message-text">{message.message}</p>
//             <span className="message-time">{moment(message.timeSent).format("hh:mm A")}</span>
//           </div>
//         ))}
//         {/* Attach messagesEndRef here to scroll to bottom */}
//         <div ref={messagesEndRef} />
//       </div>
//       <MessageInput 
//         inputValue={inputValue} 
//         handleInputChange={handleInputChange} 
//         handleSendMessage={handleSendMessage} 
//       />
//     </div>
//   );
// };

// export default ChatBox;




// import React from "react";
// import { Message } from "./types";
// import moment from "moment";
// import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
// import MessageInput from "./MessageInput";
// import "./chat.scss";

// interface ChatBoxProps {
//   messages: Message[];
//   inputValue: string;
//   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSendMessage: () => void;
//   messagesEndRef: React.RefObject<HTMLDivElement>; 
// }

// const ChatBox: React.FC<ChatBoxProps> = ({ 
//   messages, 
//   inputValue, 
//   handleInputChange, 
//   handleSendMessage, 
//   messagesEndRef 
// }) => {
//   return (
//     <div className="chat-container">
//       <div className="msg-body">
//         {messages.map((message) => (
//           <div 
//             key={message.id} 
//             className={`message-item ${message.sender === "You" ? "sent" : "received"}`}
//           >
//             <p className="message-text">{message.message}</p>
//             <span className="message-time">{moment(message.timeSent).format("hh:mm A")}</span>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <MessageInput
//         inputValue={inputValue}
//         handleInputChange={handleInputChange}
//         handleSendMessage={handleSendMessage}
//       />
//     </div>
//   );
// };

// export default ChatBox;



// ChatBox.tsx
import React, { useEffect, useRef } from "react";
import { Message } from "./types";
import moment from "moment";
import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
import MessageInput from "./MessageInput";
import "./chat.scss";

interface ChatBoxProps {
  messages: Message[];
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  inputValue,
  handleInputChange,
  handleSendMessage
}) => {
  const msgBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgBodyRef.current) {
      msgBodyRef.current.scrollTop = msgBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="msg-body" ref={msgBodyRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-item ${message.senderId === "admin" ? "sent" : "received"}`}
          >
            
            <p className="message-text">{message.message}</p>
            <span className="message-time">
              {moment(message.timeSent).format("hh:mm A")}
            </span>
          </div>
        ))}
      </div>

      <MessageInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatBox;
