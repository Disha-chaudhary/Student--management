import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";

function Login() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Login Function
  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log(response.data);

      alert(response.data.message);

      // Save JWT Token
      localStorage.setItem("token", response.data.token);

      // Clear Inputs
      setEmail("");
      setPassword("");

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Student Management</h1>
        <h3>Login</h3>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <br /><br />

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;