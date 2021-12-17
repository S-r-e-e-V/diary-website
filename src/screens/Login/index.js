import React, { useState, useContext } from "react";
import "./Login.css";

import { useNavigate } from "react-router";

// context
import { AuthContext } from "../../context/AuthContext";

// api calls
import { login } from "../../api";

// components
import RingLoading from "../../components/RingLoading";

export default function Login() {
  const navigate = useNavigate();
  const { setisAuthenticated } = useContext(AuthContext);

  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    setloading(true);
    let payload = {
      username: credentials.username,
      password: credentials.password,
    };
    const response = await login(`/login`, payload);
    if (response) {
      console.log(response);
      localStorage.setItem("access_token", response.token);
      setisAuthenticated(true);
    }
    setloading(false);
  };
  return (
    <div className="login">
      <RingLoading loading={loading} />
      <form className="login-container">
        <input
          placeholder="username"
          onChange={(e) =>
            setcredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          placeholder="password"
          onChange={(e) =>
            setcredentials({ ...credentials, password: e.target.value })
          }
        />
        <span>Forget password?</span>
        <button onClick={() => handleSubmit()} type="button">
          Login
        </button>
      </form>
      <div className="signup-section" onClick={() => navigate("/signup")}>
        Signup
      </div>
    </div>
  );
}
