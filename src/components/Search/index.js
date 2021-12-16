import React from "react";
import "./Search.css";

export default function Search({ placeholder, onSearch }) {
  return (
    <div className="search-bar">
      <input
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
