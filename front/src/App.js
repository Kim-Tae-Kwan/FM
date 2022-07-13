import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddFranchisee from "./pages/AddFranchisee";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMenu from "./pages/AddMenu";
import Mypage from "./pages/Mypage";
import BusinessList from "./pages/BusinessList";
import axios from "axios";
import PrivateRoute from "./lib/PrivateRoute";
import LoginModal from "./template/LoginModal";

function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/franchisee" element={<AddFranchisee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginModal" element={<LoginModal />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<AddMenu />} />
        <Route // 관리자 메인페이지
          path="/mypage"
          element={<PrivateRoute component={<Mypage />} />}
        />
        {/* <Route path="/mypage" element={<Mypage/>}/> */}
        <Route path="/businessList" element={<BusinessList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
