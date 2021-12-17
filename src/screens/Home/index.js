import React, { useState, useEffect } from "react";
import "./Home.css";

// api calls
import { postData } from "../../api";

// components
import Header from "../../components/Header";
import Card from "../../components/Card";
import RingLoading from "../../components/RingLoading";

// utils
import getHighlightedText from "../../utils/HighlightedText";
import moment from "moment";
import Alert from "../../utils/Alert";

export default function Home() {
  const [diary, setdiary] = useState(null);
  const [loading, setloading] = useState(false);
  // const [text, settext] = useState(
  //   array.map((item) => {
  //     return item.text;
  //   })
  // );

  // date range
  var today = new Date();
  var startDate = new Date(today.setMonth(today.getMonth() - 3));
  const [date, setdate] = useState({
    startDate: startDate,
    endDate: new Date(),
  });
  console.log(date);
  // get diary 📔
  const postDiary = async () => {
    setloading(true);
    let payload = {
      startTime: date.startDate,
      endTime: date.endDate,
      offSet: 0,
      limit: 10,
    };
    const response = await postData(`/diary/list`, payload);
    setloading(false);
    if (response) setdiary(response);
  };
  useEffect(() => {
    postDiary();
  }, [date]);

  // const onSearch = (searchTerm) => {
  //   settext(
  //     array.map((item) => {
  //       return getHighlightedText(item.text, searchTerm);
  //     })
  //   );
  // };
  return (
    <div className="home">
      <RingLoading loading={loading} />
      <Header
        page="home"
        setDate={date}
        selectedDate={(date) => setdate(date)}
      />
      <div className="cards">
        {diary?.list?.map((item, index) => (
          <div key={index}>
            {/* <Card date={item.date} text={text[index]} /> */}
            <Card
              id={item._id}
              date={moment(item.date).format("YYYY-MM-DD")}
              text={item.content}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
