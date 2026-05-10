import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import MyContributions from "./MyContributions";
import Profile from "./Profile";
import WithdrawHistory from "./WithdrawHistory";
import TransactionHistory from "./TransactionHistory";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(false);

  // 🔐 NOT LOGGED IN
  if (!token) {
    return showSignup ? (
      <Signup goLogin={() => setShowSignup(false)} />
    ) : (
      <Login setToken={setToken} goSignup={() => setShowSignup(true)} />
    );
  }

  // ✅ LOGGED IN → USE ROUTER
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard setToken={setToken} />} />
        <Route
          path="/my-contributions"
          element={<MyContributions setToken={setToken} />}
        />
        
      <Route
  path="/profile"
  element={<Profile setToken={setToken} />}
/>
      <Route
  path="/withdraw-history"
  element={
    <WithdrawHistory setToken={setToken} />
  }
/>
<Route
  path="/transactions"
  element={
    <TransactionHistory
      setToken={setToken}
    />
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;