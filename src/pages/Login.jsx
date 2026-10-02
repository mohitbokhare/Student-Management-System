import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend login
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">SM</div>

        <h1>StudentHub</h1>
        <p className="login-subtitle">Student Management System</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Student Management System
        </p>
      </div>
    </div>
  );
}

export default Login;