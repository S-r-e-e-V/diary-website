import React, { useState, useContext } from "react";
import "./Signup.css";

import { useNavigate } from "react-router";

// context
import { AuthContext } from "../../context/AuthContext";

// api calls
import { postData } from "../../api";

// components
import RingLoading from "../../components/RingLoading";
import {
  ValidateName,
  ValidatePhoneNo,
  ValidatePassword,
  ValidateUserName,
} from "../../utils/validation";

export default function Signup() {
  const navigate = useNavigate();
  //   const { setisAuthenticated } = useContext(AuthContext);

  const [credentials, setcredentials] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
  });
  const [error, seterror] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    let error = validation();
    console.log(error);
    if (
      error.username === "" &&
      error.password === "" &&
      error.phone === "" &&
      error.name === ""
    ) {
      setloading(true);
      let payload = {
        name: credentials.name,
        phone: credentials.phone,
        username: credentials.username,
        password: credentials.password,
      };
      const response = await postData(`/signup`, payload, false);
      if (response) {
        navigate("/");
      }
      setloading(false);
    }
  };

  // validation
  const validation = () => {
    let error = {};
    error.password = ValidatePassword(credentials.password);
    error.username = ValidateUserName(credentials.username);
    error.phone = ValidatePhoneNo(credentials.phone);
    error.name = ValidateName(credentials.name);
    seterror({
      password: error.password,
      username: error.username,
      phone: error.phone,
      name: error.name,
    });
    return error;
  };
  return (
    <div className="signup">
      <RingLoading loading={loading} />
      <form className="signup-container">
        <div className="input-container">
          <input
            className={`input ${error.name ? "input-error" : ""}`}
            placeholder="name"
            onChange={(e) =>
              setcredentials({ ...credentials, name: e.target.value.trim() })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.name}</span>
        </div>

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
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.username}</span>
        </div>

        <div className="input-container">
          <input
            className={`input ${error.phone ? "input-error" : ""}`}
            placeholder="phone(optional)"
            onChange={(e) =>
              setcredentials({ ...credentials, phone: e.target.value.trim() })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.phone}</span>
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
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.password}</span>
        </div>
        <button onClick={() => handleSubmit()} type="button">
          Signup
        </button>
      </form>
    </div>
  );
}
