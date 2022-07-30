import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import BusinessList from "./pages/BusinessList";
import PrivateRoute from "./lib/PrivateRoute";
import axios from "axios";
import ApiDocument from "./pages/ApiDocument";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route // 마이페이지
          path="/mypage"
          element={<PrivateRoute component={<Mypage />} />}
        />
        <Route // 가맹점 관리 페이지
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
