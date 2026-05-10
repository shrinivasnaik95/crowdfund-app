import { useState } from "react";
import { loginUser } from "./api";

export default function Login({ setToken, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ FIXED FUNCTION
  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields required");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      // 🔥 store JWT + userId
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userId);

      setToken(res.token);

    } catch (e) {
      alert("Login failed: " + (e.message || ""));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💰 CrowdFund</h1>
        <p style={styles.subtitle}>Login to continue</p>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.footer}>
          New user?{" "}
          <span style={styles.link} onClick={goSignup}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1976d2, #42a5f5)"
  },
  card: {
    background: "#fff",
    padding: 40,
    borderRadius: 12,
    width: 320,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: { marginBottom: 5 },
  subtitle: { marginBottom: 20, color: "gray" },
  input: {
    width: "100%",
    padding: 12,
    margin: "10px 0",
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer"
  },
  footer: { marginTop: 15 },
  link: { color: "#1976d2", cursor: "pointer" }
};