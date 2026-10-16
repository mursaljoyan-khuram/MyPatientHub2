import { useState } from "react";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import FindDoctor from "./Components/FindDoctor/FindDoctor";
import FindClinic from "./Components/FindClinic/FindClinic";
import FindMarketplace from "./Components/FindMarketplace/FindMarketplace";
import FindPharmacy from "./Components/FindPharmacy/FindPharmacy";
import FindDependents from "./Components/FindDependents/FindDependents";
import AccountSettings from "./Components/AccountSettings/AccountSettings";

function App() {
  const [page, setPage] = useState("login");

  if (page === "login") return <Login goTo={setPage} />;
  if (page === "dashboard") return <Dashboard goTo={setPage} />;
  if (page === "find-doctor") return <FindDoctor goTo={setPage} />;
  if (page === "find-clinic") return <FindClinic goTo={setPage} />;
  if (page === "marketplace") return <FindMarketplace goTo={setPage} />;
  if (page === "find-pharmacy") return <FindPharmacy goTo={setPage} />;
  if (page === "dependents") return <FindDependents goTo={setPage} />;
  if (page === "settings") return <AccountSettings goTo={setPage} />;

  return <Login goTo={setPage} />;
}

export default App;
