import React from "react";
import "./Card.css";

import { useNavigate } from "react-router";

export default function Card({ id, date, text }) {
  const navigate = useNavigate();
  return (
    <div
      className="card"
      onClick={() => id && navigate(`/modify?type=edit&id=${id}`)}
    >
      <span className="date">{date}</span>
      <span className="text" dangerouslySetInnerHTML={{ __html: text }}></span>
    </div>
  );
}
