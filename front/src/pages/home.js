import React, { useState } from "react";
import NaverApiMap from "../apis/NaverAPIMap";
import SearchResultList from "../template/SearchResultList";
import SearchBar from "../template/SearchBar";
import "../css/Home.css";
import { Router } from "react-router";

function Home() {
  // offcanvase 옵션 배경 스크롤 허용 클릭 허용
  const options1 = {
    scroll: true,
    backdrop: false,
  };

  let [toggle, setToggle] = useState(false);

  const callback = () => {
    setToggle((toggle = !toggle));
  };

  return (
    <div className="outline">
      <NaverApiMap></NaverApiMap>
      <SearchResultList options={options1} tog={{ toggle, setToggle }} />
      <div className="searchBarContainer">
        <SearchBar callback={callback}></SearchBar>
      </div>
      <div className="container"></div>
    </div>
  );
}

export default Home;
