import React, { useContext, useState, forwardRef } from "react";
import "./Header.css";

import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// context
import { AppContext } from "../../context/AppContext";

// images
import Images from "../../assets";
import { BsPlusLg } from "react-icons/bs";

// components
import Search from "../Search";

export default function Header({
  page,
  date,
  onSearch,
  edit,
  setDate,
  selectedDate,
  save,
}) {
  const navigate = useNavigate();
  const { isopenMenu, setisopenMenu } = useContext(AppContext);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setendDate] = useState(new Date());

  //  custom datepicker
  const CustomDatepicker = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div className="header">
      <img
        src={isopenMenu ? Images.close_icon : Images.menu_icon}
        className="menu-icon"
        onClick={() => setisopenMenu(!isopenMenu)}
      />
      {page === "add" && (
        <div className="rhs">
          <div className="date">{date}</div>
        </div>
      )}
      {page === "add-mobile" && (
        <div className="rhs">
          <span onClick={save} className="save">
            Save
          </span>
          <div className="date">{date}</div>
        </div>
      )}
      {page === "edit" && (
        <div className="rhs">
          <div className="circle" onClick={edit}>
            <img src={Images.edit_icon} />
          </div>
          {/* <Search placeholder="Search..." onSearch={onSearch} /> */}
        </div>
      )}
      {page === "home" && (
        <div className="rhs">
          <div className="circle" onClick={() => navigate("/modify?type=add")}>
            <img src={Images.plus_icon} />
          </div>
          <DatePicker
            selected={setDate.startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              selectedDate({
                startDate: start,
                endDate: end,
              });
            }}
            startDate={setDate.startDate}
            endDate={setDate.endDate}
            maxDate={new Date()}
            selectsRange
            customInput={<CustomDatepicker />}
          />
          {/* <Search placeholder="Search..." onSearch={onSearch} /> */}
        </div>
      )}
    </div>
  );
}
