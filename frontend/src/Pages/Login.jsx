import React, { useState } from "react";

const Login = (props) => {
  const { onLogin } = props;
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (!username || !email || !password || !confirmPassword) {
        setError("Please enter username, email, password and confirm password.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      setError("");
      // You can handle signup logic here, e.g., pass username, email, password to a handler
      if (onLogin) onLogin({ username, email, password });
    } else {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
      setError("");
      if (onLogin) onLogin({ email, password });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5", // optional light background
      }}
    >
      <div
        className="wrapper container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          border: "1px solid #ccc",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff", // white background for the box
        }}
      >
        <h2 style={{ marginBottom: "2rem" }}>
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "300px",
          }}
          onSubmit={handleSubmit}
        >
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              className="search-input"
              value={username}
              onChange={handleUsernameChange}
              required
              style={{ padding: "0.75rem", fontSize: "1rem" }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="search-input"
            value={email}
            onChange={handleEmailChange}
            required
            style={{ padding: "0.75rem", fontSize: "1rem" }}
          />
          <input
            type="password"
            placeholder="Password"
            className="search-input"
            value={password}
            onChange={handlePasswordChange}
            required
            style={{ padding: "0.75rem", fontSize: "1rem" }}
          />
          {isSignup && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="search-input"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              style={{ padding: "0.75rem", fontSize: "1rem" }}
            />
          )}
          <button
            className="search-btn"
            style={{ padding: "0.75rem", fontSize: "1rem" }}
            type="submit"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
          {error && (
            <span style={{ color: "red", marginTop: "0.5rem" }}>{error}</span>
          )}
        </form>
        <div style={{ marginTop: "1rem" }}>
          {isSignup ? (
            <span>
              Already have an account?{" "}
              <button
                className="search-btn"
                style={{ padding: "0.25rem 1rem", fontSize: "0.9rem" }}
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                className="search-btn"
                style={{ padding: "0.25rem 1rem", fontSize: "0.9rem" }}
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
