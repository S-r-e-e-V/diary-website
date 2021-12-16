import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../components/Menu";
import AddDiary from "../screens/AddDiary";
import EditDiary from "../screens/EditDiary";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import NoResult from "../components/NoResult";

// context
import { AuthContext } from "../context/AuthContext";

export default function Router() {
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  localStorage.getItem("access_token")
    ? setisAuthenticated(true)
    : setisAuthenticated(false);
  return (
    <BrowserRouter>
      <Menu />
      {isAuthenticated ? (
        <Routes>
          <Route exact path="/modify" element={<AddDiary />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NoResult />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
