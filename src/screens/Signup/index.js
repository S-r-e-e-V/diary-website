import React, { useState, useContext } from "react";
import "./Signup.css";

import { useNavigate } from "react-router";

// context
import { AuthContext } from "../../context/AuthContext";

// api calls
import { login } from "../../api";

// components
import RingLoading from "../../components/RingLoading";

export default function Signup() {
  const navigate = useNavigate();
  //   const { setisAuthenticated } = useContext(AuthContext);

  const [credentials, setcredentials] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    setloading(true);
    let payload = {
      name: credentials.name,
      phone: credentials.phone,
      username: credentials.username,
      password: credentials.password,
    };
    const response = await login(`/signup`, payload);
    if (response) {
      navigator("/");
    }
    setloading(false);
  };
  return (
    <div className="signup">
      <RingLoading loading={loading} />
      <form className="signup-container">
        <input
          placeholder="name"
          onChange={(e) =>
            setcredentials({ ...credentials, name: e.target.value })
          }
        />
        <input
          placeholder="username"
          onChange={(e) =>
            setcredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          placeholder="phone"
          onChange={(e) =>
            setcredentials({ ...credentials, phone: e.target.value })
          }
        />
        <input
          placeholder="password"
          onChange={(e) =>
            setcredentials({ ...credentials, password: e.target.value })
          }
        />
        <button onClick={() => handleSubmit()} type="button">
          Signup
        </button>
      </form>
    </div>
  );
}
