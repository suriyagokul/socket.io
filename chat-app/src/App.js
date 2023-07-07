import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./App.css";

// frontend hosted on netlify
// backend hosted on render

const socket = io.connect("https://chat-app-duuf.onrender.com"); // backend-url

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const userId = nanoid(4);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userId }); // broadcast message to backend.. chat we can use any name
    setMessage("");
  };

  useEffect(() => {
    // listen for any backend emits
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="app flex items-center justify-center h-[100vh] bg-teal-400">
      <main className="flex flex-col items-center justify-center bg-white px-20 rounded-md">
        <h1 className="mb-10 mt-5">My Chatty - MUCHHATINCHU</h1>

        <form onSubmit={sendChat} className="mb-5">
          <input
            type="text"
            name="chat"
            placeholder="send msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-72 py-1 mr-3 px-2 rounded-md border border-slate-600 outline-none"
          />
          <button
            type="submit"
            className="bg-red-500 rounded-md px-3 text-white py-1 hover:bg-red-600"
          >
            Send
          </button>
        </form>
        <div className="mb-5">
          {chat.map((item, index) => {
            return (
              <p
                key={index}
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                User: {item.userId} Message: {item.message}
              </p>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
