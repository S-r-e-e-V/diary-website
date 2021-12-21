import React, { useState, useContext } from "react";
import "./Login.css";

import { useNavigate } from "react-router";

// context
import { AuthContext } from "../../context/AuthContext";

// api calls
import { postData } from "../../api";

// components
import RingLoading from "../../components/RingLoading";
import { ValidatePassword, ValidateUserName } from "../../utils/validation";

export default function Login() {
  const navigate = useNavigate();
  const { setisAuthenticated } = useContext(AuthContext);

  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });
  const [error, seterror] = useState({ username: "", password: "" });
  const [loading, setloading] = useState(false);

  // submit
  const handleSubmit = async () => {
    let error = validation();
    console.log(error);
    if (error.username === "" && error.password === "") {
      setloading(true);
      let payload = {
        username: credentials.username,
        password: credentials.password,
      };
      const response = await postData(`/login`, payload, false);
      if (response) {
        console.log(response);
        localStorage.setItem("access_token", response.token);
        setisAuthenticated(true);
      }
      setloading(false);
    }
  };

  // validation
  const validation = () => {
    let error = {};
    error.password = ValidatePassword(credentials.password);
    error.username = ValidateUserName(credentials.username);
    seterror({
      password: error.password,
      username: error.username,
    });
    return error;
  };
  return (
    <div className="login">
      <RingLoading loading={loading} />
      <form className="login-container">
        <div className="input-container">
          <input
            className={`input ${error.username ? "input-error" : ""}`}
            placeholder="username"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                username: e.target.value.trim(),
              })
            }
          />
          <span className="error">{error.username}</span>
        </div>
        <div className="input-container">
          <input
            className={`input ${error.password ? "input-error" : ""}`}
            placeholder="password"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                password: e.target.value.trim(),
              })
            }
          />
          <span className="error">{error.password}</span>
        </div>
        <span
          className="forgot-password-text"
          onClick={() => navigate("/forget-password")}
        >
          Forget password?
        </span>
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
