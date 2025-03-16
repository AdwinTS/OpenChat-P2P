import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import "../styles/ChatBox.css";

const ChatBox = () => {
  const [peerId, setPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [chats, setChats] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const [connections, setConnections] = useState({});
  const [peer, setPeer] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [error, setError] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [chatNames, setChatNames] = useState({}); 

  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on("open", (id) => setPeerId(id));

    newPeer.on("connection", (connection) => {
      const peerId = connection.peer;
      setConnections((prev) => ({ ...prev, [peerId]: connection }));
      setupConnection(connection, peerId);
    });

    newPeer.on("error", (err) => {
      console.error("PeerJS Error:", err);
      setError("Connection error. Please try again.");
    });

    setPeer(newPeer);
  }, []);

  const setupConnection = (connection, peerId) => {
    connection.on("data", (data) => {
      setChats((prev) => ({
        ...prev,
        [peerId]: [
          ...(prev[peerId] || []),
          { text: data, sender: "them", timestamp: new Date().toLocaleTimeString() },
        ],
      }));
      scrollToBottom();
    });

    connection.on("close", () => {
      setConnections((prev) => {
        const newConnections = { ...prev };
        delete newConnections[peerId];
        return newConnections;
      });
      setError(`Connection with ${peerId} closed.`);
    });
  };

  const connectToPeer = () => {
    if (!peer || !remoteId) {
      setError("Please enter a valid recipient ID.");
      return;
    }

    const connection = peer.connect(remoteId);
    connection.on("open", () => {
      setConnections((prev) => ({
        ...prev,
        [remoteId]: connection, 
      }));
      setActiveChat(remoteId); 
    });

    setupConnection(connection, remoteId);

    if (recipientName.trim()) {
      setChatNames((prev) => ({
        ...prev,
        [remoteId]: recipientName,
      }));
      document.title = `Chatting with ${recipientName}`;
    } else {
      document.title = `Chatting with ${remoteId}`;
    }
  };

  const sendMessage = () => {
    if (activeChat && connections[activeChat] && message.trim()) {
      const time = new Date().toLocaleTimeString();
      connections[activeChat].send(message);

      setChats((prev) => ({
        ...prev,
        [activeChat]: [
          ...(prev[activeChat] || []),
          { text: message, sender: "me", timestamp: time },
        ],
      }));

      setMessage("");
      scrollToBottom();
    } else {
      setError("No active chat selected or message is empty.");
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h2>OpenChat</h2>
        <p><strong>Your ID:</strong> {peerId}</p>

        <input
          type="text"
          placeholder="Enter Peer ID..."
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          className="input-box"
        />

        <input
          type="text"
          placeholder="Enter recipient name..."
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          className="input-box"
        />

        <button onClick={connectToPeer} className="connect-btn">
          Start Chat
        </button>

        {error && <p className="error-message">{error}</p>}

        <h3>Active Chats</h3>
        <ul className="chat-list">
          {Object.keys(chats).map((peerId) => (
            <li key={peerId}
                className={activeChat === peerId ? "active-chat" : ""}
                onClick={() => {
                  setActiveChat(peerId);
                  document.title = `Chatting with ${chatNames[peerId] || peerId}`;
                }}>
              {chatNames[peerId] || peerId}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h3>
            {activeChat
              ? `Chatting with ${chatNames[activeChat] || activeChat}`
              : "Start a Chat"}
          </h3>
        </div>

        <div className="chat-box">
          {(chats[activeChat] || []).map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "me" ? "sent" : "received"}`}>
              <p className="message-text">{msg.text}</p>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {activeChat && (
          <div className="input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-box"
            />
            <button onClick={sendMessage} className="send-btn">Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
