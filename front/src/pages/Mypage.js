import React, { useState, useEffect, createContext } from "react";
import {
    Container,
    Row,
    Col,
    ListGroup,
    Form,
    InputGroup,
    Modal,
} from "react-bootstrap";
import Header from "../template/Header";
import Footer from "../template/Footer";
import "../css/Mypage.css";
import AddFranchiseeModal from "../template/AddFranchiseeModal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import DelFranModals from "./DelFranModals";
import { useDaumPostcodePopup } from "react-daum-postcode";

export const modalControllerContext = createContext();
//유저 정보 업데이트 함수
function UpdateUserInfo(
    userId,
    isEdit,
    userInfo,
    setIsEdit,
    userInfoAddress,
    setUserInfo,
    setUserInfoAddress
) {
    setIsEdit(!isEdit);
    if (isEdit === true) {
        axios({
            method: "put",
            url: `http://192.168.240.250:8080/api/v1/member/` + userId,
            headers:{
                Authorization : localStorage.getItem('accessToken')
            },
            data: {
                address: {
                    detail: userInfoAddress.detail,
                    jibun: userInfoAddress.jibun,
                    postalCode: userInfoAddress.postalCode,
                    road: userInfoAddress.road,
                },
                phoneNumber: userInfo.phoneNumber
            },
        }).then(function (res) {
            console.log("유저 정보 변경 성공");
            console.log(userInfo)
            setUserInfo(res.data);
        });
    }
}

function MypageForm() {
    //createContext()에 대한 넒길 정보 useState
    const [showAddFrenModal, setAddFrenModalShow] = useState(false);

    //유저 정보 변경 디폴트 셋팅
    const [editText, setEditText] = useState({
        phoneNum: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    //가맹점 등록 모달 출력
    const showAddFrenModalFunction = () => {
        setAddFrenModalShow(true);
    };

    const [list, setList] = useState([]);
    const [userInfo, setUserInfo] = useState("");
    const [userInfoAddress, setUserInfoAddress] = useState({
        detail: "",
        jibun: "",
        postalCode: "",
        road: "",
    });
    const [readOnly, setReadOnly] = useState(true);
    const [data, setData] = useState({});

    let userId = localStorage.getItem("userId");
    let userName = localStorage.getItem("userName");
    let userEmail = localStorage.getItem("email");

    //유저 정보 받아오는 통신
    useEffect(() => {
        axios({
            method: "get",
            url: `http://192.168.240.250:8080/api/v1/member/` + userId,
        }).then(function (res) {
            setUserInfo(res.data);
            setUserInfoAddress(res.data.address);
        });
    }, []);

    //유저가 가진 가맹점 리스트 받아오는 통신
    useEffect(() => {
        axios({
            method: "get",
            url:
                `http://192.168.240.250:8080/api/v1/member/` +
                userId +
                `/franchisee`,
        }).then(function (res) {
            // console.log(res);
            setList(res.data)
            //   console.log("리스트 갱신에 따른 반복실행 확인");
        });
    }, []);

    //모달 띄우기
    const [show, setShow] = useState(false);

    //주소변경
    let scriptUrl =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
        if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            document.getElementById("postcode--Address").value = data.roadAddress;
            document.getElementById("postcode--addressNumber").value = data.zonecode;
            
            if (data.autoJibunAddress == "") {
                setUserInfoAddress({
                    detail: userInfo.address.detail,
                    jibun: data.jibunAddress,
                    postalCode: data.zonecode,
                    road: data.address,
                });
            }else{
                setUserInfoAddress({
                    detail: userInfo.address.detail,
                    jibun: data.autoJibunAddress,
                    postalCode: data.zonecode,
                    road: data.address,
                });
            }
        } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            document.getElementById("postcode--Address").value = data.jibunAddress;
            setUserInfoAddress({
                detail: userInfo.address.detail,
                jibun: data.jibunAddress,
                postalCode: data.zonecode,
                road: data.address,
            });
        }
    };

    const handleClick = (e) => {
        if (isEdit === false) e.preventDefault();
        else open({ onComplete: handleComplete });
    };
    const [deleteModalshow, setDeleteModalshow] = useState(false);
    const deleteModalClose = () => {
        setDeleteModalshow(false)
    }
    const deleteMember = () => {
        console.log('삭제')
        // axios.delete('http://192.168.240.250:/8080/api/v1/member/'+userId,)
    } 
    return (
        <modalControllerContext.Provider
            value={{
                showAddFrenModal,
                setAddFrenModalShow,
                setList, list
            }}
        >
            <Container className="Mypage--Container">
                <div className="main-body">
                    <div className="row mb-3 userinfozone">
                        <div className="col-sm-4 userinfozone--headerzone">
                            <div className="card userinfozone--usertitle">
                                <div className="card-body" style={{marginTop:'18%'}}>
                                    <div className="d-flex flex-column align-items-center text-center mb-2">
                                        <img
                                            src="./img/userMarker.png"
                                            className="rounded-circle"
                                            width="150"
                                        />
                                        <div className="mb-3">
                                            <h4>{userName}</h4>
                                        </div>
                                        <div className="row" style={{textAlign:"center"}}>
                                            <button
                                                className="col-sm-4 btn btn-info"
                                                style={{color:"white"}}
                                                onClick={() => {
                                                    UpdateUserInfo(
                                                        userId,
                                                        isEdit,
                                                        userInfo,
                                                        setIsEdit,
                                                        userInfoAddress,
                                                        setUserInfo,
                                                        setUserInfoAddress,
                                                        editText
                                                    );
                                                    setReadOnly(!readOnly);
                                                }}
                                            >
                                                정보수정
                                            </button>
                                            <button
                                                className="col-sm-4 btn btn-primary"
                                                onClick={
                                                    showAddFrenModalFunction
                                                }
                                            >
                                                상권등록
                                            </button>
                                            <Button
                                                variant="danger"
                                                onClick={()=>{setDeleteModalshow(true)}}
                                                className="col-sm-4"
                                            >회원탈퇴</Button>
                                            <Modal show={deleteModalshow} onHide={deleteModalClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Delete Member</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>회원 탈퇴를 진행하시겠습니까?</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="danger" onClick={deleteMember}>
                                                        탈퇴
                                                    </Button>
                                                    <Button variant="secondary" onClick={deleteModalClose}>
                                                        취소
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 userinfozone--bodyzone">
                            <div className="card userinfozone--usertitle">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <h6>이메일</h6>
                                        </div>
                                        <div className="col-sm-10 text-secondary">
                                            {userEmail}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <h6>전화번호</h6>
                                        </div>
                                        <div className="col-sm-10 text-secondary">
                                            {isEdit ? (
                                                <input
                                                    name="phoneNum"
                                                    placeholder={userInfo.phoneNumber}
                                                    style={{background:'#d2f2fa'}}
                                                    onChange={(e) =>{
                                                        setUserInfo(
                                                            {...userInfo,
                                                            phoneNumber : e.target.value}
                                                            )
                                                        
                                                    }
                                                }
                                                />
                                            ) : (
                                                <>{userInfo.phoneNumber}</>
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    {!isEdit && <div className="row">
                                        <div className="col-sm-2">
                                            <h6>주소</h6>
                                        </div>
                                        <div className="col-sm-10 text-secondary">
                                            {userInfoAddress.road + ' ' + userInfoAddress.detail}
                                        </div>
                                    </div>}
                                    {isEdit &&
                                    <div className="row" style={{height:"200px"}}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>주소</Form.Label>
                                            <InputGroup style={{ width: "300px" }}>
                                                <Form.Control
                                                    id="postcode--addressNumber"
                                                    type="text"
                                                    placeholder="우편번호"
                                                    readOnly={readOnly}
                                                    defaultValue={
                                                        userInfoAddress.postalCode 
                                                    }
                                                />
                                                <Button
                                                    onClick={handleClick}
                                                    style={{ zIndex: "0" ,background:'#d2f2fa',color:'#0A0A0AB3',border:'1px solid gray'}}
                                                >
                                                    우편번호 검색
                                                </Button>
                                            </InputGroup>
                                            <Form.Control
                                                className="mb-3"
                                                type="text"
                                                id="postcode--Address"
                                                readOnly={readOnly}
                                                defaultValue={userInfoAddress.road}
                                                placeholder="주소"
                                            ></Form.Control>
                                            <Form.Control
                                                className="mb-3"
                                                type="text"
                                                name="detail"
                                                readOnly={readOnly}
                                                defaultValue={userInfoAddress.detail}
                                                onChange={(e) =>{
                                                        setUserInfoAddress({
                                                            ...userInfoAddress,
                                                            [e.target.name]:
                                                                e.target.value,
                                                        })
                                                    }
                                                }
                                                placeholder="상세주소"
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                    }
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <h6>생년월일</h6>
                                        </div>
                                        <div className="col-sm-10 text-secondary">
                                            {/* <DatePickerForm /> */}
                                            {userInfo.createDate}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 fransimpledatazone">
                        <div className="card-body">
                            <div className="row fransimpledatazone--headerzone">
                                <div
                                    className="col-sm-12"
                                    style={{ textAlign: "left" }}
                                >
                                    <h6>가맹점 리스트</h6>
                                </div>
                            </div>
                            <hr />
                            <div className="row fransimpledatazone--bodyzone">
                                <div
                                    className="fransimpledatazone--franlistzone"
                                    style={{
                                        textAlign: "center",
                                        height: "350px",
                                    }}
                                >
                                    <Row
                                        style={{
                                            marginLeft: "10px",
                                            backgroundColor:
                                                "rgb(245, 240, 240)",
                                            marginRight: "0px",
                                        }}
                                    >
                                        <Col md={3}>사업자 번호</Col>
                                        <Col md={3}>가맹점 이름</Col>
                                        <Col md={5}>value</Col>
                                        <Col md={1}></Col>
                                    </Row>
                                    <ListGroup
                                        style={{
                                            height: "320px",
                                            overflowY: "scroll",
                                        }}
                                    >
                                        {list.map((ele, idx) => {
                                            return (
                                                <ListGroup.Item key={idx}>
                                                    <Row>
                                                        <Col md={3}>
                                                            {
                                                                list[idx]
                                                                    .businessNumber
                                                            }
                                                        </Col>
                                                        <Col md={3}>
                                                            {list[idx].name}
                                                        </Col>
                                                        <Col md={5}>
                                                            {list[idx].tel}
                                                        </Col>
                                                        <Col md={1}>
                                                            {
                                                                <button
                                                                    onClick={() => {
                                                                        setShow(
                                                                            true
                                                                        );
                                                                        setData(
                                                                            ele
                                                                        );
                                                                    }}
                                                                >
                                                                    삭제
                                                                </button>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            );
                                        })}
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {show ? (
                    <DelFranModals
                        show={show}
                        setShow={setShow}
                        data={data}
                        list={list}
                        setList={setList}
                    />
                ) : null}
                <AddFranchiseeModal />
            </Container>
        </modalControllerContext.Provider>
    );
}

function Mypage() {
    return (
        <>
            <Header></Header>
            <MypageForm></MypageForm>
            <Footer></Footer>
        </>
    );
}

export default Mypage;
