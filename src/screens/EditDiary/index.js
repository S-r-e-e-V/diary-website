import React, { useState, useEffect } from "react";
import "./EditDiary.css";

import { useParams } from "react-router";

// api calls
import { getData } from "../../api";

// components
import Header from "../../components/Header";
import Card from "../../components/Card";
import RingLoading from "../../components/RingLoading";

// utils
import getHighlightedText from "../../utils/HighlightedText";
import moment from "moment";

export default function EditDiary() {
  const { id } = useParams();

  const [loading, setloading] = useState(false);
  const [diary, setdiary] = useState();
  const [text, settext] = useState();

  // get diary 📔
  const viewDiary = async () => {
    setloading(true);
    const response = await getData(`/diary/${id}`);
    setloading(false);
    console.log(response);
    setdiary(response);
    settext(response?.content);
  };

  useEffect(() => {
    viewDiary();
  }, []);
  const onSearch = (searchTerm) => {
    settext(getHighlightedText(diary?.content, searchTerm));
  };

  return (
    <div className="edit-diary">
      <RingLoading loading={loading} />
      <Header page={"edit"} onSearch={onSearch} />
      <div className="container" dangerouslySetInnerHTML={{ __html: text }}>
        {/* {text} */}
        {/* <Card date={moment(diary?.date).format("YYYY-MM-DD")} text={text} /> */}
      </div>
    </div>
  );
}
