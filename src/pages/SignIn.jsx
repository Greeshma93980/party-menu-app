import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SignIn()
{
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => 
  {
    if (isAuthenticated) 
    {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    console.log("Form submitted by user:", email);

    const result = await login(email, password);

    if (result.success) 
    {
      navigate("/");
    } 
    else 
    {
      setErrorMessage(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-box-card">
        
        <div className="login-brand-header">
          <span className="brand-emoji">🍽️</span>
          <h1>Party Menu</h1>
          <p>Sign in to discover and save custom party recipes</p>
        </div>

        {errorMessage && (
          <div className="login-error-alert-box">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form-element">
          <div className="form-input-field-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-input-field-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-action-submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Checking Credentials..." : "Sign In"}
          </button>
        </form>

      </div>
    </div>
  );
}