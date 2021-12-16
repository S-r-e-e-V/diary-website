import React, { useContext } from "react";
import "./Menu.css";

import { useNavigate } from "react-router";

// context
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContext";

export default function Menu() {
  const navigate = useNavigate();

  const { setisAuthenticated } = useContext(AuthContext);

  const { isopenMenu, setisopenMenu } = useContext(AppContext);
  return (
    <div className={`menu ${!isopenMenu ? "close" : ""}`}>
      <span
        onClick={() => {
          navigate("/");
          setisopenMenu(false);
        }}
      >
        Home
      </span>
      <span
        onClick={() => {
          localStorage.removeItem("access_token");
          setisAuthenticated(false);
          setisopenMenu(false);
        }}
      >
        Logout
      </span>
    </div>
  );
}
