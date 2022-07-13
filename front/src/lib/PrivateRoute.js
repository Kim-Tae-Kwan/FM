import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component }) {
  return localStorage.getItem("Authorization") ? (
    Component
  ) : (
    <Navigate to="/" {...alert("로그인 먼저 해주십쇼")} />
  );
  //로그인해야만 접근할 수 있는 페이지는 위와 같이 idx값이 있으면 전달된 Component를 보여주고 아니면 알림창을 띄우고 home으로 이동하도록 했다.
}

export default PrivateRoute;
