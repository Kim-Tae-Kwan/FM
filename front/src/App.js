import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import BusinessList from "./pages/BusinessList";
import PrivateRoute from "./lib/PrivateRoute";
import axios from "axios";
import ApiDocument from "./pages/ApiDocument";

function App() {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route // 관리자 메인페이지
          path="/mypage"
          element={<PrivateRoute component={<Mypage />} />}
        />
        <Route // 관리자 메인페이지
          path="/businessList"
          element={<PrivateRoute component={<BusinessList />} />}
        />
        <Route // API 문서 페이지
          path="/apiDocs"
          element={<PrivateRoute component={<ApiDocument />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
