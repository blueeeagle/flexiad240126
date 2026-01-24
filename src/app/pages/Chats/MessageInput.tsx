import React from "react";
import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
import { Form } from "react-bootstrap";
interface SendBoxProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
}
const MessageInput: React.FC<SendBoxProps> = ({
  inputValue,
  handleInputChange,
  handleSendMessage,
}) => {
  return (
    <div className="parent-container w-100">
      <div className="send-box">
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Form.Control
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            aria-label="message…"
            placeholder="Write message…"
          />
          <button type="submit">
            <i
              className="fa fa-paper-plane"
              style={{ color: "white" }}
              aria-hidden="true"
            ></i>{" "}
            Send
          </button>
        </Form>
      </div>
    </div>
  );
};

export default MessageInput;
