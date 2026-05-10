import { useNavigate } from "react-router-dom";


export default function Navbar({ setToken }) {
  const navigate = useNavigate(); // ✅ INSIDE component

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#1976d2",
        color: "white"
      }}
    >
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        CrowdFund
      </h3>

      <div>
        <button
          className="btn btn-light me-2"
          onClick={() => navigate("/my-contributions")}
        >
          My Contributions
        </button>

        <button
  className="btn btn-light me-2"
  onClick={() => navigate("/profile")}
>
  Profile
</button>
<button
  className="btn btn-light me-2"
  onClick={() =>
    navigate("/withdraw-history")
  }
>
  Withdraw History
</button>
<button
  className="btn btn-light me-2"
  onClick={() =>
    navigate("/transactions")
  }
>
  Transactions
</button>

<button
  className="btn btn-danger"
  onClick={handleLogout}
>
  Logout
</button>
      </div>
    </nav>
  );
}