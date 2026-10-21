import { useState } from "react";

const destinations = [
  { page: "dashboard", label: "Dashboard", words: ["home", "overview"] },
  { page: "appointments", label: "Appointments", words: ["appointment", "booking", "visit"] },
  { page: "find-doctor", label: "Find Doctor", words: ["doctor", "physician", "specialist"] },
  { page: "find-clinic", label: "Find Clinic", words: ["clinic", "hospital", "health centre", "health center"] },
  { page: "find-pharmacy", label: "Find Pharmacy", words: ["pharmacy", "medicine", "medication", "drug"] },
  { page: "marketplace", label: "Marketplace", words: ["market", "product", "food", "cart", "shop"] },
  { page: "dependents", label: "My Dependents", words: ["dependent", "family", "child", "children"] },
  { page: "my-account", label: "My Account", words: ["account", "billing", "invoice", "payment", "card", "transaction"] },
  { page: "settings", label: "Settings", words: ["setting", "password", "security", "profile"] },
  { page: "chat", label: "Chat", words: ["chat", "message"] },
];

export default function TopbarSearch({ goTo }) {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState([]);

  function search(event) {
    event.preventDefault();
    const term = query.trim().toLowerCase();
    if (!term) { setMessage("Enter something to search for."); setMatches([]); return; }
    const found = destinations.filter((item) => item.label.toLowerCase().includes(term) || item.words.some((word) => word.includes(term) || term.includes(word)));
    setMatches(found);
    setMessage(found.length ? `${found.length} matching page${found.length === 1 ? "" : "s"} found.` : `No results found for “${query.trim()}”.`);
    if (found.length === 1) goTo(found[0].page);
  }

  return <div className="topbar-search-wrap"><form className="top-search topbar-search-form" onSubmit={search}><span aria-hidden="true">⌕</span><input aria-label="Search pages" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type here..." /><button type="submit" aria-label="Submit search">Search</button></form>{message && <div className="topbar-search-results" role="status"><span>{message}</span>{matches.length > 1 && matches.map((item) => <button key={item.page} onClick={() => goTo(item.page)}>{item.label}</button>)}</div>}</div>;
}
