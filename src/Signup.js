import { useState } from "react";
import { registerUser } from "./api";

export default function Signup({ goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
  if (!name || !email || !password) {
    alert("All fields required");
    return;
  }

  console.log("Sending:", { name, email, password }); // 🔥 DEBUG

  try {
    await registerUser({
      name: name,
      email: email,
      password: password
    });

    alert("Check email to verify");
    goLogin();

  } catch (e) {
    alert("Signup failed");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>

        <input style={styles.input} placeholder="Name"
          onChange={(e) => setName(e.target.value)} />

        <input style={styles.input} placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input style={styles.input} type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button style={styles.button} onClick={handleSignup}>
          Register
        </button>

        <p style={styles.footer}>
          Already have account?{" "}
          <span style={styles.link} onClick={goLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)"
  },
  card: {
    background: "#fff",
    padding: 40,
    borderRadius: 12,
    width: 320,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: { marginBottom: 20 },
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
    background: "#6a11cb",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold"
  },
  footer: { marginTop: 15 },
  link: { color: "#1976d2", cursor: "pointer" }
};