import { useState } from "react";
import { loginUser } from "./api";

export default function Login({ setToken, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ FIXED FUNCTION
 const handleLogin = async () => {

  // 🔥 DEMO MODE FOR DEPLOYED WEBSITE
  if (
    window.location.hostname !== "localhost"
  ) {

    localStorage.setItem(
      "token",
      "demo-token"
    );

    localStorage.setItem(
      "userId",
      "1"
    );

    setToken("demo-token");

    alert(
      "Demo Mode Login Successful 🚀"
    );

    return;
  }

  // 🔥 LOCALHOST REAL LOGIN
  try {

    const res = await fetch(
      "http://localhost:8081/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await res.json();

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "userId",
      data.userId
    );

    setToken(data.token);

  } catch (e) {

    alert("Login Failed ❌");

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
