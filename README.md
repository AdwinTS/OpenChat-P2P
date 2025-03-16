# OpenChat - Peer-to-Peer Chat Application

## Overview
ChatBox is a simple peer-to-peer chat application built using React and PeerJS. It allows users to connect using unique Peer IDs and exchange real-time messages in a private chat environment.

## Features
- **Peer-to-Peer Communication:** Uses PeerJS to establish direct connections between users.
- **Unique Peer ID Generation:** Each user receives a unique ID upon joining.
- **Multiple Active Chats:** Users can maintain multiple chat sessions.
- **User-Friendly Interface:** Simple and clean UI for a smooth chatting experience.
- **Real-time Messaging:** Send and receive messages with timestamps.
- **Dynamic Chat Titles:** Updates the document title based on the active chat.

## Installation

1. Clone the repository:
   ```sh
   git clone (https://github.com/sjalex13/OpenChat-P2P.git)
   cd chatbox
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Usage
1. Open the application in your browser.
2. Share your Peer ID with a friend.
3. Enter your friend's Peer ID in the input box and connect.
4. Start chatting in real time!

## Technologies Used
- **React.js** - Frontend framework
- **PeerJS** - WebRTC-based peer-to-peer communication
- **CSS** - Styling and layout

## File Structure
```
/src
  ├── components
  │   ├── ChatBox.js   # Main chat component
  ├── styles
  │   ├── ChatBox.css  # Chat UI styling
  ├── App.js           # Main application entry point
  ├── index.js         # React entry file
```

## Possible Enhancements
- Add user authentication.
- Implement message encryption.
- Store chat history using local storage or a database.

## License
This project is licensed under the MIT License.

---
**Contributors:**
- Your Name (@your-github-handle)

