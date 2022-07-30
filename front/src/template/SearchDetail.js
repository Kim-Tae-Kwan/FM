import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Tab, Tabs, Card, ListGroup, Row, Col, Table, Accordion } from "react-bootstrap";
import "../css/SearchDetail.css";
import {BsTelephoneFill} from 'react-icons/bs';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {BiTimeFive} from 'react-icons/bi';
import { instance } from "./AxiosConfig/AxiosInterceptor";
import {TbBoxOff} from 'react-icons/tb';

function getMenu(detailTogFun, setDetailMenu, setDefaultMenuShow) {
    console.log(detailTogFun.clickMarkerBN);
    instance({
        method: "get",
        url:
            `/franchisee/` + detailTogFun.clickMarkerBN + `/menus`,
    })
        .then(function (res) {
            setDetailMenu(res.data);
            setDefaultMenuShow(false);
        })
        .catch(function (error) {
            if (error.response.status === 404) {
                console.log("등록된 메뉴가 없습니다");
                setDetailMenu([]);
                setDefaultMenuShow(true);
            }
        });
}

function SearchDetail({ options, detailTogFun }) {
    const searchResultClose = () => {
        detailTogFun.setDetailTog(false);
        setDoMenuFun(false);
    };
    const [doMenuFun, setDoMenuFun] = useState(false);
    const [defaultMenuShow,setDefaultMenuShow] = useState(false);

    const [runningTime,setRunningTime] = useState({
        monday:"정보 없음",
        tuesday:"정보 없음",
        wednesday:"정보 없음",
        thursday:"정보 없음",
        friday:"정보 없음",
        saturday:"정보 없음",
        sunday:"정보 없음"
    })

    const [detailInfo, setDetailInfo] = useState({
        firstImg:'/api/v1/file/a70427302ce343c2bd29054e7dd82cc0-default-image.jpg',
        address: {
            postalCode:"",
            road: "",
        }
    });

    const [detailMenu, setDetailMenu] = useState([
        {
            image: {path: ""}
        }
    ]);

    console.log("토글상태" + detailTogFun.detailTog);

    if (detailTogFun.detailTog === true && doMenuFun === false) {
        setDoMenuFun(true);
        instance({
            method: "get",
            url: `/franchisee/` + detailTogFun.clickMarkerBN,
        }).then(function (res) {
            setDetailInfo(res.data);
            instance({
                method:"get",
                url: `/franchisee/` + detailTogFun.clickMarkerBN + `/schedule`
            }).then(function(res){
                setRunningTime(res.data);
            })
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
                                src={"http://192.168.240.250:8080" +detailInfo.firstImg}
                                width="300px"
                            />
                        </div>
                        <div id="offcanvas-body--titlezone--intro">
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
                                    getMenu(detailTogFun, setDetailMenu,setDefaultMenuShow);
                                    console.log(detailMenu);
                                }
                            }}
                        >
                            <Tab eventKey="info" title="정보">
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col sm='1'>
                                                <HiOutlineLocationMarker style={{color:'#4287f5'}}/>
                                            </Col>
                                            <Col sm='11'>
                                                {detailInfo.address.road}  ({detailInfo.address.postalCode})
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col sm='1'>
                                                <BsTelephoneFill style={{color:'#4287f5'}}/>
                                            </Col>
                                            <Col sm='11'>
                                                {detailInfo.tel}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{borderBottom:'1px solid rgba(0,0,0,.125)'}}>
                                        <Row id="searchDeatil-offcanvasbody--runtimezome">
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>
                                                    <Col sm='1'>
                                                        <BiTimeFive style={{color:'#4287f5'}}/>
                                                    </Col>
                                                    <Col sm='11'>
                                                        영업시간
                                                    </Col>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                <Row>
                                                    <Col sm='1'>월</Col>
                                                    <Col sm='11'>{runningTime.monday}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm='1'>화</Col>
                                                    <Col sm='11'>{runningTime.tuesday}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm='1'>수</Col>
                                                    <Col sm='11'>{runningTime.wednesday}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm='1'>목</Col>
                                                    <Col sm='11'>{runningTime.thursday}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm='1'>금</Col>
                                                    <Col sm='11'>{runningTime.friday}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm='1'>토</Col>
                                                    <Col sm='11'>{runningTime.saturday}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm='1'>일</Col>
                                                    <Col sm='11'>{runningTime.sunday}</Col>
                                                </Row>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Tab>
                            <Tab eventKey="menu" title="메뉴">
                                {defaultMenuShow ? (
                                    <div className="searchDeatil-offcanvasbody--defaultMenuZone">
                                        <h1><TbBoxOff style={{color:'#4187f5'}}/></h1>
                                        <p>가맹점에 등록된 메뉴가 없습니다</p>
                                    </div>
                                ) : (
                                    <div>
                                    {Array.from({ length: detailMenu.length }).map((_, idx) => (
                                        <Row>
                                            <Card
                                                className={"searchDeatil-offcanvasbody--cardzone mb-3"}
                                            >
                                                <Card.Body>
                                                    <Card.Img
                                                        variant="left"
                                                        src={"http://192.168.240.250:8080" +detailMenu[idx].image.path}
                                                        alt="대체이미지"
                                                    />
                                                    <Card.Title>
                                                        {detailMenu[idx].name}
                                                    </Card.Title>
                                                    <Card.Subtitle className="mb-2 priceText">
                                                        {detailMenu[idx].price} 원
                                                    </Card.Subtitle>
                                                    <Card.Text>
                                                        {detailMenu[idx].description}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    ))}
                                    </div>
                                )}
                                
                            </Tab>
                            <Tab eventKey="review" title="리뷰">
                                <Row>
                                    <Card
                                        className={"searchDeatil-offcanvasbody--reviewCardzone mb-2"}
                                    >
                                        <Card.Body>
                                            <Card.Img
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
                                        className={"searchDeatil-offcanvasbody--reviewCardzone mb-2"}
                                    >
                                        <Card.Body>
                                            <Card.Img
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
                                        className={"searchDeatil-offcanvasbody--reviewCardzone mb-2"}
                                    >
                                        <Card.Body>
                                            <Card.Img
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
                                </Row>
                            </Tab>
                        </Tabs>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default SearchDetail;
