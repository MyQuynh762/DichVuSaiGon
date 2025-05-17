import React, { useEffect, useRef, useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector from Redux
import { RootState } from "../../../redux/reducers"; // Import RootState to get Redux store type

const ChatBox = ({ onClose }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [msgList, setMsgList] = useState([]); // Save messages here
  const user = useSelector((state) => state.user.userInfo); // Get user from Redux store
  const messagesEndRef = useRef(null); // Create ref for last message element

  useEffect(() => {
    // Whenever msgList changes, scroll to the bottom of message list
    scrollToBottom();
  }, [msgList]);

  // Scroll to bottom of the message list
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      // Thêm tin nhắn người dùng vào danh sách trước khi gửi tin nhắn đến API
      const userMessage = {
        content: inputMessage,
        sender: {
          id: user?.userId || "guest",
          username: user?.username || "guest",
          fullName: user?.fullName || "Khách vãng lai",
          avatar: user?.avatar || "https://cdn-icons-png.flaticon.com/512/9703/9703596.png",
          userId: user?.userId || "guest",
        },
        timestamp: new Date().toISOString(),
      };

      setMsgList((prevMsgList) => [...prevMsgList, userMessage]); // Cập nhật tin nhắn người dùng vào danh sách
      setInputMessage("")
      try {
       const aiResponse = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "openai/gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Hãy trả lời bằng tiếng Việt: ${inputMessage}`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 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`, // token từ OpenRouter
            },
          }
        );

        const aiMessage = aiResponse.data.choices[0]?.message?.content || "Không có phản hồi từ AI";

        const botMessage = {
          content: aiMessage,
          sender: {
            id: "AI",
            username: "ChatGPT",
            fullName: "ChatBot AI",
            avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712025.png",
            userId: "AI",
          },
          timestamp: new Date().toISOString(),
        };

        // Thêm tin nhắn của AI vào danh sách sau khi nhận được phản hồi
        setMsgList((prevMsgList) => [...prevMsgList, botMessage]);
      } catch (error) {
        console.error("Error calling ChatGPT API:", error);
      }

      // Xóa nội dung nhập sau khi gửi
      setInputMessage("");
    }
  };


  const parseMarkdownToHTML = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // **Bold**
      .replace(/\*(.*?)\*/g, "<i>$1</i>") // *Italic*
      .replace(/`(.*?)`/g, "<code>$1</code>") // `Code`
      .replace(/^### (.*$)/gm, "<h3>$1</h3>") // ### Heading 3
      .replace(/^## (.*$)/gm, "<h2>$1</h2>") // ## Heading 2
      .replace(/^# (.*$)/gm, "<h1>$1</h1>") // # Heading 1
      .replace(/\n- (.*?)/g, "<li>$1</li>") // - List item
      .replace(/\n/g, "<br>"); // Line break
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
            alt="User Avatar"
            style={styles.avatar}
          />
          <span>Tư vấn khách hàng</span>
        </div>
        <Button style={{ color: "#ffffff" }} type="text" onClick={onClose}>
          X
        </Button>
      </div>
      <div style={styles.messageList}>
        {msgList?.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.messageWrapper,
              justifyContent:
                msg.sender?.userId === user?.userId ? "flex-end" : "flex-start",

            }}
          >
            {msg.sender?.userId !== user?.userId && (
              <img
                src={msg.sender.avatar}
                alt="Avatar"
                style={styles.avatarInMessage}
              />
            )}
            <div
              style={{
                ...styles.message,
                backgroundColor:
                  msg.sender?.userId === user?.userId ? "#f8c2c4" : "#f1f1f1", // Different background color for sender and receiver
              }}
            >
              <div style={styles.messageHeader}>
                <span style={styles.senderName}>
                  {msg.sender.fullName || "Khách vãng lai"} -
                </span>

                <span style={styles.messageTimestamp}>
                  {" "}
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
              <div style={styles.messageText}>
                {msg.sender?.userId === "AI" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdownToHTML(msg.content),
                    }}
                  />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div style={styles.inputContainer}>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Đặt câu hỏi"
          style={styles.input}
          onPressEnter={handleSendMessage} // Send message on Enter
        />
        <Button
          type="primary"
          style={{ color: "#ffffff", backgroundColor: "#FF6F3C" }}
          shape="circle"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "550px",
    height: "500px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
  },
  header: {
    padding: "10px",
    backgroundColor: "#FF6F3C",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    borderRadius: "50%",
    marginRight: "10px",
    width: "40px",
    height: "40px",
  },
  avatarInMessage: {
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    marginRight: "10px",
  },
  messageList: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
  },
  messageWrapper: {
    display: "flex",
    marginBottom: "10px",
    alignItems: "flex-start",
  },
  message: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "60%",
    wordWrap: "break-word",
  },
  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  senderName: {
    color: "#333",
  },
  messageTimestamp: {
    fontSize: "12px",
    color: "#888",
  },
  messageText: {
    fontSize: "14px",
    color: "#333",
  },
  inputContainer: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: "10px",
    borderRadius: "20px",
    height: "40px",
  },
};

export default ChatBox;
