import React, { useContext, useEffect } from "react";
import "./ThemeController.css";

// context
import { AppContext } from "../../context/AppContext";

export default function ThemeController() {
  const { theme } = useContext(AppContext);

  const viewPort = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", viewPort);
    return () => window.removeEventListener("resize", viewPort);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, []);

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
