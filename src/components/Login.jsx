import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  CheckCircle,
  AlertCircle,
  X,
  LogOut,
  Facebook,
  Chrome,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [notification, setNotification] = useState(null);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const validateForm = () => {
    if (isSignup) {
      if (!formData.fullName.trim()) {
        showNotification("error", "Please enter your full name");
        return false;
      }
      if (!formData.email.trim()) {
        showNotification("error", "Please enter your email address");
        return false;
      }
      if (!formData.password.trim()) {
        showNotification("error", "Please enter a password");
        return false;
      }
      if (!formData.confirmPassword.trim()) {
        showNotification("error", "Please confirm your password");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        showNotification("error", "Passwords do not match!");
        return false;
      }
      if (formData.password.length < 6) {
        showNotification(
          "error",
          "Password must be at least 6 characters long"
        );
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showNotification("error", "Please enter a valid email address");
        return false;
      }
      if (users.find((user) => user.email === formData.email)) {
        showNotification("error", "An account with this email already exists");
        return false;
      }
    } else {
      if (!formData.email.trim()) {
        showNotification("error", "Please enter your email address");
        return false;
      }
      if (!formData.password.trim()) {
        showNotification("error", "Please enter your password");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isSignup) {
      const newUser = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
      };

      setUsers([...users, newUser]);
      setLoggedInUser(newUser);

      showNotification("success", `Welcome ${formData.fullName}!`);
      navigate("/dashboard", { state: { userName: newUser.fullName } });
    } else {
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setLoggedInUser(user);
        showNotification("success", `Welcome back, ${user.fullName}!`);
        navigate("/dashboard");
      } else {
        showNotification("error", "Invalid email or password.");
      }
    }

    // reset form
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setNotification(null);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    showNotification("success", "You have been logged out successfully");
    navigate("/");
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <div
          className={`notification ${notification.type} ${
            notification ? "show" : ""
          }`}
        >
          <div className="notification-icon">
            {notification.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
          </div>
          <span>{notification.message}</span>
          <button
            className="notification-close"
            onClick={() => setNotification(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="container">
        {!loggedInUser ? (
          <div className="card">
            {/* Image Panel */}
            <div className={`image-panel ${isSignup ? "signup-mode" : ""}`}>
              <div className="image-content">
                <div className="image-icon">
                  <User size={60} />
                </div>
                <h2 className="image-title">
                  {isSignup ? "Welcome Back!" : "Hello, Friend!"}
                </h2>
                <p className="image-description">
                  {isSignup
                    ? "Enter your personal details and start your journey with us"
                    : "To keep connected with us please login with your personal info"}
                </p>
                <button className="toggle-button" onClick={toggleMode}>
                  {isSignup ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </div>

            {/* Form Panel */}
            <div className={`form-panel ${isSignup ? "signup-mode" : ""}`}>
              <div className="form-content">
                <div className="form-container">
                  <h2 className="form-title">
                    {isSignup ? "Create Account" : "Sign In"}
                  </h2>
                  <p className="form-subtitle">
                    {isSignup
                      ? "Fill in your information to get started"
                      : "Welcome back! Please sign in to your account"}
                  </p>

                  {/* Signup Only */}
                  {isSignup && (
                    <div className="form-group">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  {isSignup && (
                    <div className="form-group">
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  )}

                  {/* Login Only */}
                  {!isSignup && (
                    <div className="remember-forgot">
                      <label className="remember-me">
                        <input type="checkbox" />
                        <span>Remember me</span>
                      </label>
                      <a href="#" className="forgot-link">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <button onClick={handleSubmit} className="submit-button">
                    {isSignup ? "Sign Up" : "Sign In"}
                  </button>

                  <div className="divider">
                    <span>Or continue with</span>
                  </div>

                  <div className="social-buttons">
                    <button className="social-button google">
                      <Chrome size={20} /> Google
                    </button>
                    <button className="social-button facebook">
                      <Facebook size={20} /> Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Dashboard Preview (optional)
          <div className="user-dashboard">
            <h1>Welcome, {loggedInUser.fullName}!</h1>
            <p>Email: {loggedInUser.email}</p>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
