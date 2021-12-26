import React, { useContext } from "react";
import "./ThemeController.css";

// context
import { AppContext } from "../../context/AppContext";

export default function ThemeController() {
  const { theme } = useContext(AppContext);

  if (theme === "mysterious-night") {
    return (
      <div className="mysterious-night-theme">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
    );
  } else return <div className="default-theme"></div>;
}
