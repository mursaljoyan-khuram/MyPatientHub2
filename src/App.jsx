import { useState } from "react";

import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import FindDoctor from "./Components/FindDoctor/FindDoctor";
import FindClinic from "./Components/FindClinic/FindClinic";

function App() {
  const [page, setPage] = useState("login");

  if (page === "login") {
    return <Login goTo={setPage} />;
  }

  if (page === "dashboard") {
    return <Dashboard goTo={setPage} />;
  }

  if (page === "find-doctor") {
    return <FindDoctor goTo={setPage} />;
  }

  if (page === "find-clinic") {
    return <FindClinic goTo={setPage} />;
  }

  return <Login goTo={setPage} />;
}

export default App;