import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../components/Menu";
import AddDiary from "../screens/AddDiary";
import AddDiaryMobile from "../screens/AddDiaryMobile";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import NoResult from "../components/NoResult";

// context
import { AuthContext } from "../context/AuthContext";
import ForgetPassword from "../screens/ForgetPassword";

// utils
import { useMediaQuery } from "../utils/mediaQueries";

export default function Router() {
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  localStorage.getItem("access_token")
    ? setisAuthenticated(true)
    : setisAuthenticated(false);

  // media query
  let isMobileView = useMediaQuery("(max-width: 600px)");
  return (
    <BrowserRouter>
      <Menu />
      {isAuthenticated ? (
        <Routes>
          <Route
            exact
            path="/modify"
            element={isMobileView ? <AddDiaryMobile /> : <AddDiary />}
          />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NoResult />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/forget-password" element={<ForgetPassword />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
