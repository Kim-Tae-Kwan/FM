import React, { useState } from "react";
import NaverApiMap from "../apis/NaverAPIMap";
import SearchResultList from "../template/SearchResultList";
import SearchBar from "../template/SearchBar";
import "../css/Home.css";
import SearchDetail from "../template/SearchDetail";

function Home() {
  // offcanvase 옵션 배경 스크롤 허용 클릭 허용
  const options1 = {
    scroll: true,
    backdrop: false,
  };

  let [searchResultToggle, setsearchResultToggle] = useState(false);
  let [detailTog, setDetailTog] = useState(false);
  let [clickMarkerBN,setClickMarkerBN] = useState("");

  const searchResultTogFun = () => {
    setsearchResultToggle((searchResultToggle = !searchResultToggle));
  };

  const detailTogFun = (e) => {
    setDetailTog((detailTog = true));
    setClickMarkerBN(e);
    // console.log('detailTog?',detailTog);
  }
  test.indexDetailTog=detailTogFun;

  return (
    <div className="outline">
      <NaverApiMap detailTogFun={detailTogFun}></NaverApiMap>
      <SearchDetail options={options1} detailTogFun={{detailTog, setDetailTog, clickMarkerBN}}></SearchDetail>
      <SearchResultList options={options1} resultTog={{ searchResultToggle, setsearchResultToggle }} />
      <div className="searchBarContainer">
        <SearchBar searchResultTogFun={searchResultTogFun}></SearchBar>
      </div>
      <div className="container"></div>
    </div>
  );
}

export default Home;
