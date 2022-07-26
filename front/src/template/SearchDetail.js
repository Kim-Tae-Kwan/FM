import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Tab, Tabs, Card, ListGroup } from "react-bootstrap";
import "../css/SearchDetail.css";
import axios from "axios";

function getMenu(detailTogFun, setDetailMenu) {
    console.log(detailTogFun.clickMarkerBN);
    axios({
        method: "get",
        url:
            `http://192.168.240.250:8080/api/v1/franchisee/` +
            detailTogFun.clickMarkerBN +
            `/menus`,
    })
        .then(function (res) {
            setDetailMenu(res.data);
        })
        .catch(function (error) {
            if (error.response.status === 404) {
                console.log("등록된 메뉴가 없습니다");
                setDetailMenu([]);
            }
        });
}

function SearchDetail({ options, detailTogFun }) {
    const searchResultClose = () => {
        detailTogFun.setDetailTog(false);
        setDoMenuFun(false);
    };
    const [doMenuFun, setDoMenuFun] = useState(false);

    const [detailInfo, setDetailInfo] = useState({
        address: {
            road: "",
        },
    });

    const [detailMenu, setDetailMenu] = useState([
        {
            image: {
                path: "",
            },
        },
    ]);

    console.log("토글상태" + detailTogFun.detailTog);

    if (detailTogFun.detailTog === true && doMenuFun === false) {
        setDoMenuFun(true);
        axios({
            method: "get",
            url:
                `http://192.168.240.250:8080/api/v1/franchisee/` +
                detailTogFun.clickMarkerBN,
        }).then(function (res) {
            console.log(res.data.name);
            setDetailInfo(res.data);
            console.log(res.data);
        });
    }

    return (
        <>
            <Offcanvas
                className={"searchDeatil-offcanvas"}
                show={detailTogFun.detailTog}
                onHide={searchResultClose}
                placement={"start"}
                {...options}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{detailInfo.name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                    className={"searchDeatil-offcanvasbody--bodyzone"}
                >
                    <div className="offcanvas-body--titlezone">
                        <div>
                            <img
                                src={
                                    "http://192.168.240.250:8080" +
                                    detailInfo.firstImg
                                }
                                alt="디폴트 이미지"
                                width="300px"
                            />
                        </div>
                        <div>
                            <h3>{detailInfo.name}</h3>
                            <p>{detailInfo.intro}</p>
                        </div>
                    </div>
                    <div className="searchDeatil-offcanvasbody--buttonzone">
                        <Tabs
                            defaultActiveKey="info"
                            className="mb-2 searchDeatil-offcanvasbody--buttontab"
                            onSelect={(option) => {
                                if (option === "menu") {
                                    getMenu(detailTogFun, setDetailMenu);
                                    console.log("asdfa");
                                    console.log(detailMenu);
                                }
                            }}
                        >
                            <Tab eventKey="info" title="정보">
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        주소 이미지 /{detailInfo.address.road}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        전화번호 이미지 / {detailInfo.tel}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        영업 시간 / 영업시간 표입니다
                                    </ListGroup.Item>
                                </ListGroup>
                            </Tab>
                            <Tab eventKey="menu" title="메뉴">
                                {detailMenu.map((ele, idx) => {
                                    return (
                                        <Card
                                            className={
                                                "searchDeatil-offcanvasbody--cardzone mb-3"
                                            }
                                        >
                                            <Card.Body>
                                                <Card.Img
                                                    style={{
                                                        width: "140px",
                                                        float: "left",
                                                        marginRight: "10px",
                                                        borderRadius: "6px",
                                                    }}
                                                    variant="left"
                                                    src={
                                                        "http://192.168.240.250:8080" +
                                                        detailMenu[idx].image
                                                            .path
                                                    }
                                                    alt="대체이미지"
                                                />
                                                <Card.Title>
                                                    {detailMenu[idx].name}
                                                </Card.Title>
                                                <Card.Subtitle className="mb-2 priceText">
                                                    {detailMenu[idx].price} 원
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    {
                                                        detailMenu[idx]
                                                            .description
                                                    }
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </Tab>
                            <Tab eventKey="review" title="리뷰">
                                <Card
                                    className={
                                        "searchDeatil-offcanvasbody--cardzone mb-2"
                                    }
                                >
                                    <Card.Body>
                                        <Card.Img
                                            style={{
                                                width: "80px",
                                                float: "left",
                                            }}
                                            variant="left"
                                            src="https://dummyimage.com/600x400/000/fff&text=icon"
                                        />
                                        <Card.Title>리뷰1</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            별점
                                        </Card.Subtitle>
                                        <Card.Text style={{ clear: "both" }}>
                                            리뷰내용 입력테스트~~
                                        </Card.Text>
                                        <Card.Link href="#">
                                            추가 기능1
                                        </Card.Link>
                                        <Card.Link href="#">
                                            추가 기능2
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                                <Card
                                    className={
                                        "searchDeatil-offcanvasbody--cardzone"
                                    }
                                >
                                    <Card.Body>
                                        <Card.Img
                                            style={{
                                                width: "80px",
                                                float: "left",
                                            }}
                                            variant="left"
                                            src="https://dummyimage.com/600x400/000/fff&text=icon"
                                        />
                                        <Card.Title>리뷰2</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            별점
                                        </Card.Subtitle>
                                        <Card.Text style={{ clear: "both" }}>
                                            리뷰내용 입력테스트~~
                                        </Card.Text>
                                        <Card.Link href="#">
                                            추가 기능1
                                        </Card.Link>
                                        <Card.Link href="#">
                                            추가 기능2
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                                <Card
                                    className={
                                        "searchDeatil-offcanvasbody--cardzone"
                                    }
                                >
                                    <Card.Body>
                                        <Card.Img
                                            style={{
                                                width: "80px",
                                                float: "left",
                                            }}
                                            variant="left"
                                            src="https://dummyimage.com/600x400/000/fff&text=icon"
                                        />
                                        <Card.Title>리뷰3</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            별점
                                        </Card.Subtitle>
                                        <Card.Text style={{ clear: "both" }}>
                                            리뷰내용 입력테스트~~
                                        </Card.Text>
                                        <Card.Link href="#">
                                            추가 기능1
                                        </Card.Link>
                                        <Card.Link href="#">
                                            추가 기능2
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                    {/* 버튼존 시작 */}
                    {/* 버튼존 끝 */}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default SearchDetail;
