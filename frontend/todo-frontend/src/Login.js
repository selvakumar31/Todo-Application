import React, { useState } from "react";
import API, { setAuthToken } from "./Api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("token/", {
        username: username,
        password: password,
      });
      const token = res.data.access;
      localStorage.setItem("token", token);
      setAuthToken(token);
      onLogin();
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
      if (error.response?.data?.detail) {
        setErr(error.response.data.detail);
      } else {
        setErr("Login failed");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
        {err && <p className="login-error">{err}</p>}
      </div>
    </div>
  );
}

export default Login;
