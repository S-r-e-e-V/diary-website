import React from "react";
import "./RingLoading.css";

export default function RingLoading({ loading = false }) {
  return (
    <div className={`ring-loading ${!loading && "close"}`}>
      <div className="container">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <span>Loading...</span>
      </div>
    </div>
  );
}
