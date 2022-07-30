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
import Button from "react-bootstrap/Button";
import DelFranModals from "./DelFranModals";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Link } from "react-router-dom";
import { instance } from "../template/AxiosConfig/AxiosInterceptor";

export const modalControllerContext = createContext();
//유저 정보 업데이트 함수
function UpdateUserInfo(
    isEdit,
    userInfo,
    setIsEdit,
    userInfoAddress,
    setUserInfo,
    editText
) {
    setIsEdit(!isEdit);
    const phonRegx = /^(010)?([0-9]{4})?([0-9]{4})$/;
    if (isEdit === true) {
        if (
            userInfoAddress &&
            userInfo.phoneNumber.length === 11 &&
            phonRegx.test(userInfo.phoneNumber)
        ) {
            instance({
                method: "put",
                url: `/member/` + localStorage.getItem("userId"),
                data: {
                    address: {
                        detail: userInfoAddress.detail,
                        jibun: userInfoAddress.jibun,
                        postalCode: userInfoAddress.postalCode,
                        road: userInfoAddress.road,
                    },
                    phoneNumber: userInfo.phoneNumber,
                },
            })
                .then(function (res) {
                    setUserInfo(res.data);
                })
                .catch(function (err) {
                    alert(err.reponse.data.message);
                });
        } else {
            alert("전화번호 또는 주소에 올바르지 않은 값이 들어가 있습니다.");
            setUserInfo({ ...userInfo, phoneNumber: editText });
            setIsEdit(true);
        }
    }
}

function MypageForm() {
    //createContext()에 대한 넒길 정보 useState
    const [showAddFrenModal, setAddFrenModalShow] = useState(false);

    //유저 정보 변경 디폴트 셋팅 및 통신 이전의 값 저장.
    const [editText, setEditText] = useState({
        phoneNumber: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    //가맹점 등록 모달 출력
    const showAddFrenModalFunction = () => {
        setAddFrenModalShow(true);
    };

    const [list, setList] = useState([]);
    const [userInfo, setUserInfo] = useState({
        phoneNumber: "",
        address: {
            detail: "",
            jibun: "",
            postalCode: "",
            road: "",
        },
    });
    const [userInfoAddress, setUserInfoAddress] = useState({
        detail: "",
        jibun: "",
        postalCode: "",
        road: "",
    });
    const [createDate, setCreatedate] = useState();
    const [data, setData] = useState({});

    //유저 정보 받아오는 통신
    useEffect(() => {
        instance({
            method: "get",
            url: `/member/` + localStorage.getItem("userId"),
        }).then(function (res) {
            setUserInfo(res.data);
            setUserInfoAddress(res.data.address);
            setEditText(res.data.phoneNumber);
            setCreatedate(res.data.createDate.split(" ")[0]);
        }).catch((err) => {
            console.log("error")
            console.log(err)
        });
    }, []);

    // .then(()=>{
            
    //     instance({
    //         method: "get",
    //         url: `/member/` + localStorage.getItem("userId") + `/franchisee`,
    //     }).then(function (res) {
    //         setList(res.data);
    //         //   console.log("리스트 갱신에 따른 반복실행 확인");
    //     })
    // })


    useEffect(() => {
        instance({
            method: "get",
            url: `/member/` + localStorage.getItem("userId") + `/franchisee`,
        }).then(function (res) {
            setList(res.data);
            //   console.log("리스트 갱신에 따른 반복실행 확인");
        }).catch((err)=>{
            console.log(err)
        })
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
            document.getElementById("postcode--Address").value =
                data.roadAddress;
            document.getElementById("postcode--addressNumber").value =
                data.zonecode;

            if (data.autoJibunAddress === "") {
                setUserInfoAddress({
                    detail: userInfo.address.detail,
                    jibun: data.jibunAddress,
                    postalCode: data.zonecode,
                    road: data.address,
                });
            } else {
                setUserInfoAddress({
                    detail: userInfo.address.detail,
                    jibun: data.autoJibunAddress,
                    postalCode: data.zonecode,
                    road: data.address,
                });
            }
        } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            document.getElementById("postcode--Address").value =
                data.jibunAddress;
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
    let delChk = false;
    const deleteModalClose = () => {
        setDeleteModalshow(false);
    };
    const delchkmsg = (e) => {
        let msg = "회원탈퇴";
        if (msg === e.target.value) {
            delChk = true;
        }
        // console.log(delChk);
        // console.log(e.target.value);
    };
    const deleteMember = () => {
        if (delChk && deleteModalshow) {
            instance({
                method: "delete",
                url: "/member/" + localStorage.getItem("userId"),
            }).then((res) => {
                localStorage.clear();
                window.location.href = "http://localhost:3000/";
            });
        }
    };
    return (
        <modalControllerContext.Provider
            value={{
                showAddFrenModal,
                setAddFrenModalShow,
                setList,
                list,
            }}
        >
            <Header></Header>
            <Container className="Mypage--Container">
                <div className="main-body">
                    <div className="row mb-3 userinfozone">
                        <div className="col-sm-4 userinfozone--headerzone">
                            <div className="card userinfozone--usertitle">
                                <div
                                    className="card-body"
                                    style={{ marginTop: "18%" }}
                                >
                                    <div className="d-flex flex-column align-items-center text-center mb-2">
                                        <img
                                            alt="유저이미지"
                                            src="./img/userMarker.png"
                                            className="rounded-circle"
                                            width="150"
                                        />
                                        <div className="mb-3">
                                            <h4>
                                                {localStorage.getItem(
                                                    "userName"
                                                )}
                                            </h4>
                                        </div>
                                        <div
                                            className="row"
                                            style={{ textAlign: "center" }}
                                        >
                                            <button
                                                className="col-sm-4 btn btn-info"
                                                style={{ color: "white" }}
                                                onClick={() => {
                                                    UpdateUserInfo(
                                                        isEdit,
                                                        userInfo,
                                                        setIsEdit,
                                                        userInfoAddress,
                                                        setUserInfo,
                                                        setUserInfoAddress,
                                                        editText
                                                    );
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
                                                onClick={() => {
                                                    setDeleteModalshow(true);
                                                }}
                                                className="col-sm-4"
                                            >
                                                회원탈퇴
                                            </Button>
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
                                            <h6 className="emailLabel">
                                                이메일
                                            </h6>
                                        </div>
                                        <div className="col-sm-10 text-secondary">
                                            {localStorage.getItem("email")}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <h6 className="phonNumLabel">
                                                전화번호
                                            </h6>
                                        </div>
                                        <div className="col-sm-10 text-secondary">
                                            {isEdit ? (
                                                <input
                                                    name="phoneNum"
                                                    type="Number"
                                                    defaultValue={
                                                        userInfo.phoneNumber
                                                    }
                                                    style={{
                                                        background: "#d2f2fa",
                                                    }}
                                                    onChange={(e) => {
                                                        setEditText(
                                                            ...editText,
                                                            {
                                                                phoneNumber:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        );
                                                        setUserInfo({
                                                            ...userInfo,
                                                            phoneNumber:
                                                                e.target.value,
                                                        });
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    {userInfo.phoneNumber.replace(
                                                        /^(\d{2,3})(\d{3,4})(\d{4})$/,
                                                        `$1-$2-$3`
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    {!isEdit && (
                                        <div className="row">
                                            <div className="col-sm-2">
                                                <h6>주소</h6>
                                            </div>
                                            <div className="col-sm-10 text-secondary fullAddress">
                                                {userInfo.address.road +
                                                    " " +
                                                    userInfo.address.detail}
                                            </div>
                                        </div>
                                    )}
                                    {isEdit && (
                                        <div
                                            className="row"
                                            style={{ height: "200px" }}
                                        >
                                            <Form.Group className="mb-3">
                                                <Form.Label>주소</Form.Label>
                                                <InputGroup
                                                    style={{ width: "300px" }}
                                                >
                                                    <Form.Control
                                                        id="postcode--addressNumber"
                                                        type="text"
                                                        placeholder="우편번호"
                                                        readOnly={true}
                                                        defaultValue={
                                                            userInfoAddress.postalCode
                                                        }
                                                    />
                                                    <Button
                                                        onClick={handleClick}
                                                        style={{
                                                            zIndex: "0",
                                                            background:
                                                                "#d2f2fa",
                                                            color: "#0A0A0AB3",
                                                            border: "1px solid gray",
                                                        }}
                                                    >
                                                        우편번호 검색
                                                    </Button>
                                                </InputGroup>
                                                <Form.Control
                                                    className="mb-3"
                                                    type="text"
                                                    id="postcode--Address"
                                                    readOnly={true}
                                                    defaultValue={
                                                        userInfoAddress.road
                                                    }
                                                    placeholder="주소"
                                                ></Form.Control>
                                                <Form.Control
                                                    className="mb-3"
                                                    type="text"
                                                    name="detail"
                                                    defaultValue={
                                                        userInfoAddress.detail
                                                    }
                                                    onChange={(e) => {
                                                        setUserInfoAddress({
                                                            ...userInfoAddress,
                                                            [e.target.name]:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    placeholder="상세주소"
                                                ></Form.Control>
                                            </Form.Group>
                                        </div>
                                    )}
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <h6>생년월일</h6>
                                        </div>
                                        <div className="col-sm-10 text-secondary">
                                            {createDate}
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
                                {/* <div role='button' className="btn btn">
                                <button
                                    className="btn btnMenu btnAddMenu"
                                    onClick={() => {
                                        MenuModalShow();
                                    }}
                                >
                                    메뉴 추가
                                </button>
                                </div> */}
                            </div>
                            <hr />
                            <div className="row fransimpledatazone--bodyzone">
                                <div
                                    className="fransimpledatazone--franlistzone"
                                    style={{
                                        textAlign: "center"
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
                                        <Col md={5}>전화번호</Col>
                                        <Col md={1}></Col>
                                    </Row>
                                    <ListGroup>
                                        {list.map((ele, idx) => {
                                            return (
                                                <ListGroup.Item key={idx}>
                                                    <Link
                                                        to="/businessList"
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            color: "black",
                                                        }}
                                                    >
                                                        <Row>
                                                            <Col md={3}>
                                                                {list[idx].businessNumber.replace(
                                                                    /(\d{3})(\d{5})(\d{2})/,
                                                                    "$1-$2-$3"
                                                                )}
                                                            </Col>

                                                            <Col md={3}>
                                                                {list[idx].name}
                                                            </Col>
                                                            <Col md={5}>
                                                                {list[idx].tel.substring(
                                                                    0,
                                                                    2
                                                                ) === "02"
                                                                    ? list[idx].tel.replace(
                                                                        /(\d{2})(\d{3,4})(\d{4})/,
                                                                        "$1-$2-$3"
                                                                    )
                                                                    : list[idx].tel.replace(
                                                                        /(\d{3})(\d{3,4})(\d{4})/,
                                                                        "$1-$2-$3"
                                                                    )}
                                                            </Col>
                                                            <Col
                                                                md={1}
                                                                role="button"
                                                                className="delFranbtn btn btn-danger"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // e.stopPropagation();
                                                                    setShow(true);
                                                                    setData(ele);
                                                                }}
                                                            >
                                                                삭제
                                                            </Col>
                                                        </Row>
                                                    </Link>
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
                <Modal show={deleteModalshow} onHide={deleteModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Member</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            회원 탈퇴를 원하시면 '회원탈퇴' 를 입력하여 주십시오
                        </p>
                        <Form.Control
                            type="text"
                            placeholder="회원탈퇴"
                            onChange={delchkmsg}
                        ></Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={deleteMember}>
                            탈퇴
                        </Button>
                        <Button variant="secondary" onClick={deleteModalClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </modalControllerContext.Provider>
    );
}

function Mypage() {
    return (
        <>
            <MypageForm></MypageForm>
            <Footer></Footer>
        </>
    );
}

export default Mypage;
