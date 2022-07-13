import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
// import '../imgs/currentMarker.png';

const { naver } = window;

function NaverAPIMap() {
    let FMIndexMap;
    let cLat, cLng;

    let markerList = [];
    // let menuLayer = ['<div style="position:absolute;z-index:10000;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>'];

    //지도 클릭시 마커 생성에 대한 infowindow 설정
    let contentString = '<h1>장소</h1>';
    let infowindow = new naver.maps.InfoWindow({
        content: contentString
    });

    //현위치 버튼 디자인
    var BtngoCurrentLocHtml = `<a href="#" class="btn_mylct"><button class="btn btn-outline-secondary btnCurLoc"><img src="./img/currentLocBtnImg3.png"></img></button></span></a>`;

    //카테고리존 area
    var BtnAreaHtml = 
    `
    <nav class="navbar navbar-expand-sm">
        <div class="container-fluid">
            <div role="button" class="navbar-toggler shortbtn dropdown btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" width="40px">
            +
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">다른 다양한 장소들1</a></li>
                    <li><a class="dropdown-item" href="#">다른 다양한 장소들2</a></li>
                    <li><a class="dropdown-item" href="#">다른 다양한 장소들3</a></li>
                </ul>
            </div>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="btn-group btnAreaHtml" role="group" aria-label="Button group with nested dropdown dropdown-center">
                    <button type="button" class="btn btn-outline-secondary"><img src="./img/restImg.png"/> 음식점</button>
                    <button type="button" class="btn btn-outline-secondary"><img src="./img/cafeImg.png"/> 카페</button>
                    <div class="btn btn-outline-secondary dropdown dropdown-toggle" type="button">
                    기타등등
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">다른 다양한 장소들1</a></li>
                            <li><a class="dropdown-item" href="#">다른 다양한 장소들2</a></li>
                            <li><a class="dropdown-item" href="#">다른 다양한 장소들3</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;

    //설정 버튼 디자인
    var BtnSetSearchOption = `
    <a href="#" class="btn_mylct">
    <button class="btn btn-outline-secondary btnSetSearchOpt dropdown">
        <img src="./img/settingImg.png"></img>
        <ul class="dropdown-menu dropdown-menu btnSetSearchOpt__menulist" style="margin-left:-340%; margin-top:-130%; padding:0px">
            <li><a class="dropdown-item" href="#">장소갯수 설정</a></li>
            <li><a class="dropdown-item" href="#">거리 설정</a></li>
        </ul>
    </button>
    </a>
    `;

    useEffect(() => {
        //위치권한 허용
        if (navigator.geolocation) {
            //현재위치 받아오기
            navigator.geolocation.getCurrentPosition((position) => {
                cLat = position.coords.latitude;
                cLng = position.coords.longitude;
                FMIndexMap = new naver.maps.Map('FMIndexMapDom', {
                    center: new naver.maps.LatLng(cLat, cLng),
                });
                console.log(__dirname);

                //현재위치 마커 출력
                let currentMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(cLat, cLng),
                    map: FMIndexMap,
                    icon: {
                        url: './img/marker2.png',
                        size: new naver.maps.Size(40, 44),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(25, 26),
                    },
                });

                //지도에 컨트롤러 설정
                naver.maps.Event.once(FMIndexMap, 'init', function () {
                    //현위치 버튼
                    var BtngoCurrentLoc = new naver.maps.CustomControl(BtngoCurrentLocHtml, {
                        position: naver.maps.Position.BOTTOM_RIGHT
                    });

                    //카테고리 검색 버튼존
                    var BtnArea = new naver.maps.CustomControl(BtnAreaHtml, {
                        position: naver.maps.Position.TOP_LEFT
                    });

                    //거리검색 설정 버튼
                    var BtnSetSearchOpt = new naver.maps.CustomControl(BtnSetSearchOption, {
                        position: naver.maps.Position.BOTTOM_RIGHT
                    });


                    BtnSetSearchOpt.setMap(FMIndexMap);
                    BtngoCurrentLoc.setMap(FMIndexMap);
                    BtnArea.setMap(FMIndexMap);

                    //현위치 버튼 누를시 작동
                    naver.maps.Event.addDOMListener(BtngoCurrentLoc.getElement(), 'click', function () {
                        FMIndexMap.setCenter(new naver.maps.LatLng(cLat, cLng));
                    });
                });

                // 인포윈도우 클릭 -> 오프캔퍼스 출력
                // infowindow.addListener(FMIndexMap,'click', (e) => {

                // });

                //클릭시 마커 생성 및 마커 옆에 위경도 출력(개발을 위해서 냅둠)

                naver.maps.Event.addListener(FMIndexMap, 'click', (e) => {
                    currentMarker = new naver.maps.Marker({
                        position: e.coord,
                        map: FMIndexMap,
                    });

                    infowindow.open(FMIndexMap, currentMarker);

                    let coordHtml =
                        'lat: ' + e.coord._lat + '<br />' +
                        'lng: ' + e.coord._lng;

                    markerList.push(currentMarker);

                    naver.maps.Event.addListener(FMIndexMap, 'mousedown', (e) => {
                        infowindow.close();
                    });
                });

                //지도 드래그시 지도에 존재하는 기존의 마커 숨기기
                naver.maps.Event.addListener(FMIndexMap, 'mousedown', (e) => {
                    for (var i = 0, ii = markerList.length; i < ii; i++) {
                        markerList[i].setMap(null);
                    }

                    markerList = [];
                    infowindow.close();
                });
            })
        } else {
            // 위치권한 허용 x
        }
    }, []);

    return (
        <>
            <div id='FMIndexMapDom' className="FMIndexMapDom"></div>
        </>
    )
}

export default NaverAPIMap;