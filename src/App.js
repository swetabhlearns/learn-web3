import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Message from "./Message";
import MetaMask from "./MetaMask";

function App() {
  const [messages, setMessages] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MetaMask messages={messages} setMessages={setMessages} />}
          />
          <Route path="/messages" element={<Message messages={messages} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
