import { useState } from "react";

const Login = ({ setIsAdmin }) => {
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    password == "admin123";
    if (password === "admin123") {
      setIsAdmin(true);
    } else {
      alert("Invalid password!");
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
