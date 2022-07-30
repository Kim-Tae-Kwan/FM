    import React, { useEffect, createContext, useContext } from "react";
    import "bootstrap/dist/css/bootstrap.css";
    import { instance } from "../template/AxiosConfig/AxiosInterceptor";

    const { naver } = window;
    
    function NaverAPIMap({detailTogFun}) {
        let FMIndexMap;
        let cLat, cLng;

        //클릭마커리스트
        // let markerList = [];

        //현위치 버튼 디자인
        var BtngoCurrentLocHtml = `<a href="#" class="btn_mylct"><button class="btn btn-outline-secondary btnCurLoc"><img src="./img/currentLocBtnImg3.png"></img></button></span></a>`;

        //카테고리존 area
        var BtnAreaHtml = `
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
                        <button type="button" class="btn"><img src="./img/restImg.png"/> 장소검색</button>
                        <button type="button" class="btn"><img src="./img/cafeImg.png"/> 카페</button>
                        <div class="btn dropdown dropdown-toggle" type="button">
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

        //카테고리존에서 버튼 잡아야함

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

        //작성
        let defaultArroundMarkerList = [];
        let movedArroundMarkerList = [];
        let movedArroundPlacesMarkerList=[];
        let movedCenterMarker = new naver.maps.Marker;
        let movedCenterCircle=new naver.maps.Circle;

        useEffect(() => {
            //위치권한 허용
            if (navigator.geolocation) {
                //현재위치 받아오기
                navigator.geolocation.getCurrentPosition((position) => {
                    cLat = position.coords.latitude;
                    cLng = position.coords.longitude;

                    // 현재위치 기반 거리 200m 내의 모든 장소 파싱
                    instance({
                        method: "get",
                        url:
                            `/franchisee?latitude=`+ cLat +
                            `&longitude=` + cLng +`&radius=200`,
                    }).then(function (res) {
                        for (var idx = 0; idx < res.data.length; idx++) {
                            defaultArroundMarkerList.push(res.data[idx]);
                        }
                        console.log("주변장소 파싱성공");
                        
                        //디폴트 마커 출력 기능
                        for (
                            var idx = 0;
                            idx < defaultArroundMarkerList.length;
                            idx++
                            ) {
                                defaultArroundMarkerList[idx] = new naver.maps.Marker({
                                    position: new naver.maps.LatLng(
                                        defaultArroundMarkerList[idx].y,
                                        defaultArroundMarkerList[idx].x
                                        ),
                                        map: FMIndexMap,
                                        icon: {
                                            content: [
                                                '<div class="naverApiMap-mappingMarker">',
                                                '<div class="naverApiMap-mappingMarker--imageZone">',
                                                '<img src="./img/cafeImg.png">',
                                                "</div>",
                                                '<div class="naverApiMap-mappingMarker--mainZone">',
                                                '<div class="naverApiMap-mappingMarker--titleZone">',
                                                "<span>",
                                                defaultArroundMarkerList[idx].name,
                                                "</span>",
                                                "</div>",
                                                '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                                                "<span>",
                                                defaultArroundMarkerList[idx].tel,
                                                "</span>",
                                                "</div>",
                                                "</div>",
                                                "</div>",
                                            ].join(""),
                                            anchor: new naver.maps.Point(25, 60),
                                        },
                                        title: defaultArroundMarkerList[idx].businessNumber
                            });
                            
                            //디폴트 마커(기본 200미터 내의 장소 마커) 클릭 이벤트
                            naver.maps.Event.addListener(defaultArroundMarkerList[idx], "click", function(e){
                                // console.log('디폴트 마커 클릭됨');
                                detailTogFun(e.overlay.title);
                            })
                        }
                        test.markers.push(defaultArroundMarkerList);
                        test.doCluster();
                        // console.log('docluster 선언여부 확인',test.doCluster);
                    });

                    //지도 센터 설정 및 축적도 수준 설정
                    FMIndexMap = new naver.maps.Map("FMIndexMapDom", {
                        center: new naver.maps.LatLng(cLat, cLng),
                        zoom : 18
                    });
                    test.map=FMIndexMap;

                    //현재위치 마커 출력
                    let currentMarker = new naver.maps.Marker({
                        position: new naver.maps.LatLng(cLat, cLng),
                        map: FMIndexMap,
                        icon: {
                            url: "./img/marker2.png",
                            size: new naver.maps.Size(40, 44),
                            origin: new naver.maps.Point(0, 0),
                            anchor: new naver.maps.Point(25, 26),
                        },
                    });

                    //지도 컨트롤러 설정
                    naver.maps.Event.once(FMIndexMap, "init", function () {
                        //현위치 버튼
                        var BtngoCurrentLoc = new naver.maps.CustomControl(
                            BtngoCurrentLocHtml,
                            {
                                position: naver.maps.Position.BOTTOM_RIGHT,
                            }
                        );

                        //카테고리 검색 버튼존
                        var BtnArea = new naver.maps.CustomControl(BtnAreaHtml, {
                            position: naver.maps.Position.TOP_LEFT,
                        });

                        //거리검색 설정 버튼
                        var BtnSetSearchOpt = new naver.maps.CustomControl(
                            BtnSetSearchOption,
                            {
                                position: naver.maps.Position.BOTTOM_RIGHT,
                            }
                        );

                        BtnSetSearchOpt.setMap(FMIndexMap);
                        BtngoCurrentLoc.setMap(FMIndexMap);
                        BtnArea.setMap(FMIndexMap);

                        //현위치 버튼 누를시 현위치 이동 기능
                        naver.maps.Event.addDOMListener(
                            BtngoCurrentLoc.getElement(),
                            "click",
                            function () {
                                FMIndexMap.setCenter(
                                    new naver.maps.LatLng(cLat, cLng)
                                );
                            }
                        );

                        //카테고리 버튼존 장소검색 눌렀을 때 이벤트 리스너
                        naver.maps.Event.addDOMListener(
                            BtnArea.getElement(),
                            "click",
                            function (e) {
                                test.removeCluster();
                                //디폴트 마커 숨기기
                                if(defaultArroundMarkerList.length>0){
                                    for(var i=0; i<defaultArroundMarkerList.length; i++){
                                        defaultArroundMarkerList[i].setVisible(false);
                                    }
                                }
                                //이동으로 인한 새롭게 파싱된 마커 숨기기
                                if(movedArroundPlacesMarkerList.length>0){
                                    for(var idx=0; idx<movedArroundPlacesMarkerList.length; idx++){
                                        movedArroundPlacesMarkerList[idx].setVisible(false);
                                    }
                                }
                                movedCenterMarker.setVisible(false);
                                movedCenterCircle.setVisible(false);

                                //이동 후 장소검색 통신
                                instance({
                                    method: "get",
                                    url:
                                        `/franchisee?latitude=` + FMIndexMap.getCenter()._lat +
                                        `&longitude=` + FMIndexMap.getCenter()._lng + `&radius=200`,
                                }).then(function (res) { 
                                    movedArroundMarkerList=[];
                                    for (var idx = 0; idx < res.data.length; idx++) {
                                        movedArroundMarkerList.push(res.data[idx]);
                                        // 이동 후 파싱장소 콘솔
                                        // console.log(movedArroundMarkerList);
                                    }
                                    defaultArroundMarkerList=[];
                                    console.log("이동 후 주변장소 파싱성공");

                                    //
                                    movedArroundPlacesMarkerList=[];
                                    for (
                                        var idx = 0;
                                        idx < movedArroundMarkerList.length;
                                        idx++
                                    ) {
                                        movedArroundPlacesMarkerList[idx] = new naver.maps.Marker({
                                            position: new naver.maps.LatLng(
                                                movedArroundMarkerList[idx].y,
                                                movedArroundMarkerList[idx].x
                                            ),
                                            map: FMIndexMap,
                                            icon: {
                                                content: [
                                                    '<div class="naverApiMap-mappingMarker">',
                                                    '<div class="naverApiMap-mappingMarker--imageZone">',
                                                    '<img src="./img/cafeImg.png">',
                                                    "</div>",
                                                    '<div class="naverApiMap-mappingMarker--mainZone">',
                                                    '<div class="naverApiMap-mappingMarker--titleZone">',
                                                    "<span>",
                                                    movedArroundMarkerList[idx].name,
                                                    "</span>",
                                                    "</div>",
                                                    '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                                                    "<span>",
                                                    movedArroundMarkerList[idx].tel,
                                                    "</span>",
                                                    "</div>",
                                                    "</div>",
                                                    "</div>",
                                                ].join(""),
                                                anchor: new naver.maps.Point(25, 60),
                                            },
                                            title: movedArroundMarkerList[idx].businessNumber
                                        });

                                        //이동 후 파싱된 마커에 대한 클릭 이벤트
                                        naver.maps.Event.addListener(movedArroundPlacesMarkerList[idx], "click", function(e){
                                            console.log('이동된 마커 클릭됨');
                                            detailTogFun(e.overlay.title);
                                        });
                                    }

                                    test.markers.push(movedArroundPlacesMarkerList);
                                    test.doCluster();
                                    
                                //파싱하는 범위 내에 등록된 장소가 없을 때
                                }).catch(function (error) {
                                    if(error.response.status===404){
                                        console.log('등록된 장소가 없습니다');
                                        movedArroundMarkerList=[];
                                    }
                                });

                                // 이동에 따른 반지름 200 의 원
                                movedCenterCircle=new naver.maps.Circle({
                                    map : FMIndexMap,
                                    center : new naver.maps.LatLng(FMIndexMap.getCenter()._lat, FMIndexMap.getCenter()._lng),
                                    radius : 200,

                                    strokeColor: '#56d8f5',
                                    strokeOpacity: 0.1,
                                    strokeWeight: 2,
                                    fillColor: '#d2f2fa',
                                    fillOpacity: 0.3
                                })

                            }
                        );
                    });

                    // 인포윈도우 클릭 -> 오프캔퍼스 출력
                    // infowindow.addListener(FMIndexMap,'click', (e) => {

                    // });

                    //클릭시 마커 옆에 위경도 출력(개발을 위해서 냅둠)
                    //클릭시 마커 생성
                    // naver.maps.Event.addListener(FMIndexMap, "click", (e) => {
                    //     let clickMarker = new naver.maps.Marker({
                    //         position: e.coord,
                    //         map: FMIndexMap,
                    //         icon: {
                    //             content: [
                    //                 '<div class="naverApiMap-mappingMarker">',
                    //                 '<div class="naverApiMap-mappingMarker--imageZone">',
                    //                 '<img src="./img/cafeImg.png">',
                    //                 "</div>",
                    //                 '<div class="naverApiMap-mappingMarker--mainZone">',
                    //                 '<div class="naverApiMap-mappingMarker--titleZone">',
                    //                 "<span>클릭마커</span>",
                    //                 "</div>",
                    //                 '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                    //                 "<span>010-1234-5678</span>",
                    //                 "</div>",
                    //                 "</div>",
                    //                 "</div>",
                    //             ].join(""),
                    //             anchor: new naver.maps.Point(25, 60),
                    //         },
                    //     });
                    //     console.log("x : " + e.coord.x, "y : " + e.coord.y);

                    //     // 오른쪽 하단의 정보창에 띄울 메세지
                    //     // let coordHtml =
                    //     //     "lat: " +
                    //     //     e.coord._lat +
                    //     //     "<br />" +
                    //     //     "lng: " +
                    //     //     e.coord._lng;

                    //     //클릭마커 출력
                    //     markerList.push(clickMarker);

                    //     // naver.maps.Event.addListener(
                    //     //     FMIndexMap,
                    //     //     "mousedown",
                    //     //     (e) => {
                    //     //         // infowindow.close();
                    //     //         console.log('asdf');
                    //     //     }
                    //     // );
                    // });

                    //마우스 다운 이벤트 - 지도 드래그시 지도에 존재하는 클릭마커 숨기기 //나중을 위해 냅두기
                    naver.maps.Event.addListener(FMIndexMap, "mousedown", (e) => {
                        // console.log('마우스 다운');
                        //클릭마커 리스트 비우기
                        // for (var i = 0, ii = markerList.length; i < ii; i++) {
                        //     markerList[i].setMap(null);
                        // }

                        // markerList = [];
                        
                    });

                    //마우스 업 이벤트 //나중을 위해 냅두기
                    naver.maps.Event.addListener(FMIndexMap, "mouseup", (e) =>{
                        // console.log('마우스 업');

                        // 이동에 따른 센터 마커 생성 코드
                        // movedCenterMarker = new naver.maps.Marker({
                        //     position: new naver.maps.LatLng(FMIndexMap.getCenter()._lat, FMIndexMap.getCenter()._lng),
                        //     map: FMIndexMap,
                        //     icon: {
                        //         url: "./img/marker3.png",
                        //         size: new naver.maps.Size(43, 50),
                        //         origin: new naver.maps.Point(0, 0),
                        //         anchor: new naver.maps.Point(25, 26),
                        //     },
                        // });
                    })
                });
            } else {
                // 위치권한 허용 x
            }
        }, []);
        return (
            <>
            <div id="FMIndexMapDom" className="FMIndexMapDom"></div>
            </>
        );
    }

    export default NaverAPIMap;

