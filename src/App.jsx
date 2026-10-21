import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import FindDoctor from "./Components/FindDoctor/FindDoctor";
import FindClinic from "./Components/FindClinic/FindClinic";
import FindMarketplace from "./Components/FindMarketplace/FindMarketplace";
import FindPharmacy from "./Components/FindPharmacy/FindPharmacy";
import FindDependents from "./Components/FindDependents/FindDependents";
import AccountSettings from "./Components/AccountSettings/AccountSettings";
import MyAccount from "./Components/MyAccount/MyAccount";
import Appointments from "./Components/Appointments/Appointments";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const paths = {
  login: "/login", dashboard: "/dashboard", appointments: "/appointments",
  "find-doctor": "/find-doctor", "find-clinic": "/find-clinic",
  marketplace: "/marketplace", "find-pharmacy": "/find-pharmacy",
  dependents: "/dependents", "my-account": "/my-account", settings: "/settings",
  chat: "/chat",
};

function RoutedApp() {
  const navigate = useNavigate();
  const goTo = (page) => navigate(paths[page] || paths.dashboard);
  const pageProps = { goTo };
  return (
    <Routes>
      <Route path="/" element={<Login {...pageProps} />} />
      <Route path="/login" element={<Login {...pageProps} />} />
      <Route path="/dashboard" element={<Dashboard {...pageProps} />} />
      <Route path="/appointments" element={<Appointments {...pageProps} />} />
      <Route path="/find-doctor" element={<FindDoctor {...pageProps} />} />
      <Route path="/find-clinic" element={<FindClinic {...pageProps} />} />
      <Route path="/marketplace" element={<FindMarketplace {...pageProps} />} />
      <Route path="/find-pharmacy" element={<FindPharmacy {...pageProps} />} />
      <Route path="/dependents" element={<FindDependents {...pageProps} />} />
      <Route path="/my-account" element={<MyAccount {...pageProps} />} />
      <Route path="/settings" element={<AccountSettings {...pageProps} />} />
      <Route path="/chat" element={<ChatPage {...pageProps} />} />
      <Route path="*" element={<NotFound goTo={goTo} />} />
    </Routes>
  );
}

function ChatPage({ goTo }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mypatienthub-chat") || "[]"); } catch { return []; }
  });
  function sendMessage(event) {
    event.preventDefault();
    if (!message.trim()) return;
    const next = [...messages, { id: `${Date.now()}`, text: message.trim(), time: new Date().toLocaleString() }];
    setMessages(next); localStorage.setItem("mypatienthub-chat", JSON.stringify(next)); setMessage("");
  }
  return <main className="simple-state-page chat-demo-page"><button className="chat-back-button" onClick={() => goTo("dashboard")}>← Dashboard</button><h1>MyPatientHUB Chat</h1><p>This local demo saves your messages in this browser. It does not send messages to a real doctor or another user.</p><section className="chat-message-list">{messages.length === 0 ? <div className="functional-empty-state">No messages yet. Write a message below to get started.</div> : messages.map((item) => <article key={item.id} className="chat-message"><p>{item.text}</p><small>{item.time}</small></article>)}</section><form className="chat-compose" onSubmit={sendMessage}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message..." aria-label="Write a message" /><button type="submit">Send</button><button type="button" className="chat-clear" onClick={() => { if (window.confirm("Clear all saved demo messages?")) { setMessages([]); localStorage.removeItem("mypatienthub-chat"); } }}>Clear chat</button></form></main>;
}

function NotFound({ goTo }) {
  return <main className="simple-state-page"><h1>Page not found</h1><p>The page you're looking for doesn't exist.</p><button onClick={() => goTo("dashboard")}>Go to dashboard</button></main>;
}

export default RoutedApp;
