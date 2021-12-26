import React, { useContext } from "react";
import "./Theme.css";

// context
import { AppContext } from "../../context/AppContext";
import Header from "../Header";

export default function Theme() {
  const { theme, settheme } = useContext(AppContext);
  const handleTheme = (theme) => {
    localStorage.setItem("diary-theme", theme);
    document.documentElement.className = theme;
    settheme(theme);
  };
  return (
    <div className="themes">
      <Header />
      <div className="themes-container">
        <div className="themes-default" onClick={() => handleTheme("default")}>
          <span>Default</span>
        </div>
        <div
          className="themes-mysterious-night"
          onClick={() => handleTheme("mysterious-night")}
        >
          <div className="stars"></div>
          <div className="twinkling"></div>
          <div className="clouds"></div>
          <span>Mysterious Dark</span>
        </div>
      </div>
    </div>
  );
}
