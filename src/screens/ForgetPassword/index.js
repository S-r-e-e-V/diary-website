import React, { useState, useContext } from "react";
import "./ForgetPassword.css";

import { useNavigate } from "react-router";

// context
import { AuthContext } from "../../context/AuthContext";

// api calls
import { putData } from "../../api";

// components
import RingLoading from "../../components/RingLoading";
import { ValidatePassword, ValidateUserName } from "../../utils/validation";

export default function ForgetPassword() {
  const navigate = useNavigate();
  //   const { setisAuthenticated } = useContext(AuthContext);

  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [error, seterror] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    let error = validation();
    console.log(error);
    if (
      error.username === "" &&
      error.password === "" &&
      error.confirm_password === ""
    ) {
      setloading(true);
      let payload = {
        username: credentials.username,
        password: credentials.confirm_password,
      };
      const response = await putData(`/change-password`, payload, false);
      if (response) {
        navigate("/");
      }
      setloading(false);
    }
  };

  // validation
  const validation = () => {
    let error = {};
    error.username = ValidateUserName(credentials.username);
    error.password = ValidatePassword(credentials.password);
    error.confirm_password = ValidatePassword(credentials.confirm_password);
    if (
      !error.password &&
      credentials.password !== credentials.confirm_password
    )
      error.confirm_password = "please enter same password";
    seterror({
      username: error.username,
      password: error.password,
      confirm_password: error.confirm_password ?? "",
    });
    return error;
  };
  return (
    <div className="signup">
      <RingLoading loading={loading} />
      <form className="signup-container">
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

        <div className="input-container">
          <input
            className={`input ${error.confirm_password ? "input-error" : ""}`}
            placeholder="confirm password"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                confirm_password: e.target.value.trim(),
              })
            }
          />
          <span className="error">{error.confirm_password}</span>
        </div>
        <button onClick={() => handleSubmit()} type="button">
          Update new password
        </button>
      </form>
    </div>
  );
}
