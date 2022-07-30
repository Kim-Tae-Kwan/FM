import "../css/AddFranchisee.css";
import {
    Container,
    Form,
    Row,
    Col,
    Image,
    Button,
    InputGroup,
    Accordion,
} from "react-bootstrap";
import useDaumPostcodePopup from "react-daum-postcode/lib/useDaumPostcodePopup";
import "bootstrap/dist/css/bootstrap.css";
import { useContext, useState } from "react";
import { franchiseeinfoContext } from "../template/AddFranchiseeModal";
import axios from "axios";
import { modalControllerContext } from "../pages/Mypage";
import { instance } from "../template/AxiosConfig/AxiosInterceptor";
import { useEffect } from "react";

function AddFranchisee({ inputElement, story, setStory }) {
    const franchiseeInfo = useContext(franchiseeinfoContext);
    const listRefresh = useContext(modalControllerContext);
    let scriptUrl =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    //  주소선택
    const searchAddress = (data) => {
        axios({
            method: "get",
            url:
                "https://dapi.kakao.com/v2/local/search/address.json?query=" +
                data.address,
            headers: {
                Authorization: "KakaoAK f3cb5e756b2d568b25cb2384c8528614", // REST API 키
            },
        }).then(function (res) {
            franchiseeInfo.setFranchiseeinput({
                ...franchiseeInfo.franchiseeinput,
                x: Number(res.data.documents[0].x),
                y: Number(res.data.documents[0].y),
            });
        });

        if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            document.getElementById("postcode--address").value =
                data.roadAddress;
            franchiseeInfo.setFranchiseeinput({
                ...franchiseeInfo.franchiseeinput,
                displayAddress: data.roadAddress,
            });
            if (data.autoJibunAddress === "") {
                // autoAddress가 없는 경우
                franchiseeInfo.setFranchiseeaddressinfo({
                    ...franchiseeInfo.franchiseeaddressInfo,
                    jibun: data.jibunAddress,
                    postalCode: data.zonecode,
                    road: data.address,
                });
            } else {
                // autoAddress가 있는 경우
                franchiseeInfo.setFranchiseeaddressinfo({
                    ...franchiseeInfo.franchiseeaddressInfo,
                    jibun: data.autoJibunAddress,
                    postalCode: data.zonecode,
                    road: data.address,
                });
            }
        } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            document.getElementById("postcode--address").value =
                data.jibunAddress;
            franchiseeInfo.setFranchiseeinput({
                ...franchiseeInfo.franchiseeinput,
                displayAddress: data.jibunAddress,
            });
            franchiseeInfo.setFranchiseeaddressinfo({
                ...franchiseeInfo.franchiseeaddressInfo,
                jibun: data.jibunAddress,
                postalCode: data.zonecode,
                road: data.address,
            });
        }
    };

    const searchAddressClick = () => {
        open({ onComplete: searchAddress });
    };

    const onchangeValue = (e) => {
        franchiseeInfo.setFranchiseeinput({
            ...franchiseeInfo.franchiseeinput,
            [e.target.name]: e.target.value,
        });
    };

    //   이미지 인코딩 및 프리뷰
    let [firstImgsrc, setFirstImgsrc] = useState("");
    let [firstImgId, setFirstImgId] = useState("");
    const onLoadimage = (e) => {
        const imageFile = e.target.files[0];
        encodingImg(imageFile);

        var frm = new FormData();
        frm.append("files", e.target.files[0]);

        axios({
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "post",
            url: `http://192.168.240.250:8080/api/v1/file`,
            data: frm,
        }).then(function (res) {
            console.log(res.data[0].path);
            setFirstImgsrc(res.data[0].path);
            setFirstImgId(res.data[0].id);
        });
    };

    const [imgsrc, setImgsrc] = useState(
        "http://192.168.240.250:8080/api/v1/file/a70427302ce343c2bd29054e7dd82cc0-default-image.jpg"
    );
    const encodingImg = (imgfile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgfile);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImgsrc(reader.result);
                resolve();
            };
        });
    };
    //   이미지 인코딩 및 프리뷰 끝

    //   사업자 등록번호 확인
    const checkID = (e) => {
        e.preventDefault();
        const value = franchiseeInfo.franchiseeinput.businesscode;
        axios
            .post(
                "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=SkzUgJzO5Ju61s661QVhT7zHnZghYrBq2kymfg8v46g%2FSFN7VcgiWR3KYtaWyjRvZhfoBRizMSz6%2FiOwK9KOtA%3D%3D",
                {
                    b_no: [value],
                }
            )
            .then((response) => {
                if (response.data.match_cnt === 1) {
                    instance({
                        method: "get",
                        url:
                            `/franchisee/` + value + `/check`,
                    }).then(function (res) {
                        if (res.data.result === true) {
                            console.log("디비에없음");
                            franchiseeInfo.setBusinessChk("a");
                        } else {
                            franchiseeInfo.setBusinessChk("c");
                            console.log("디비에있음");
                        }
                    });
                } else {
                    franchiseeInfo.setBusinessChk("b");
                    inputElement.current.focus();
                }
            })
            .catch(function (error) { });
    };
    //영업시간 상태
    const [timeState, setTimeState] = useState("true");

    const handleTime = () => {
        timeState === "true" ? setTimeState("false") : setTimeState("true");
        console.log(timeState);
    };

    // 가맹점 등록
    const addFranchiseeFunction = () => {
        console.log(timeState);
        let time = "";
        if (timeState === "true") {
            time = {
                friday:
                    document.getElementById("frommonday").value +
                    "~" +
                    document.getElementById("tomonday").value,
                monday:
                    document.getElementById("frommonday").value +
                    "~" +
                    document.getElementById("tomonday").value,
                saturday:
                    document.getElementById("frommonday").value +
                    "~" +
                    document.getElementById("tomonday").value,
                sunday:
                    document.getElementById("frommonday").value +
                    "~" +
                    document.getElementById("tomonday").value,
                thursday:
                    document.getElementById("frommonday").value +
                    "~" +
                    document.getElementById("tomonday").value,
                tuesday:
                    document.getElementById("frommonday").value +
                    "~" +
                    document.getElementById("tomonday").value,
                wednesday:
                    document.getElementById("frommonday").value +
                    "~" +
                    document.getElementById("tomonday").value,
            };
        } else {
            time = {
                friday:
                    document.getElementById("fromfriday").value +
                    "~" +
                    document.getElementById("tofriday").value,
                monday:
                    document.getElementById("frommonday").value +
                    "~" +
                    document.getElementById("tomonday").value,
                saturday:
                    document.getElementById("fromsaturday").value +
                    "~" +
                    document.getElementById("tosaturday").value,
                sunday:
                    document.getElementById("fromsunday").value +
                    "~" +
                    document.getElementById("tosunday").value,
                thursday:
                    document.getElementById("fromthursday").value +
                    "~" +
                    document.getElementById("tothursday").value,
                tuesday:
                    document.getElementById("fromtuesday").value +
                    "~" +
                    document.getElementById("totuesday").value,
                wednesday:
                    document.getElementById("fromwednesday").value +
                    "~" +
                    document.getElementById("towednesday").value,
            };
        }
        let tempTel = franchiseeInfo.franchiseeinput.phonenumber.substring(
            0,
            franchiseeInfo.franchiseeinput.phonenumber.length - 4
        );
        if (tempTel.substring(0, 2) === "02") {
            tempTel = tempTel.substring(2);
        } else {
            tempTel = tempTel.substring(3);
        }

        if (franchiseeInfo.businessChk === "a") {
            let chknum = /^[0-9]+$/;

            // 가맹점 추가시 비어있는 값 찾기.
            if (franchiseeInfo.franchiseeinput.franchiseename) {
                if (franchiseeInfo.franchiseeinput.phonenumber.length > 8 && franchiseeInfo.franchiseeinput.phonenumber.length < 12 &&
                    chknum.test(franchiseeInfo.franchiseeinput.phonenumber) && tempTel.length > 2) {
                    if (firstImgsrc && firstImgId) {
                        if (time) {
                            if (franchiseeInfo.franchiseeaddressInfo.road &&
                                franchiseeInfo.franchiseeaddressInfo.jibun &&
                                franchiseeInfo.franchiseeaddressInfo.postalCode) {
                                    instance({
                                        method: "post",
                                        url: `/franchisee`,
                                        data: {
                                            address: {
                                                detail: franchiseeInfo.franchiseeinput
                                                    .detailaddress,
                                                jibun: franchiseeInfo.franchiseeaddressInfo.jibun,
                                                postalCode:
                                                    franchiseeInfo.franchiseeaddressInfo.postalCode,
                                                road: franchiseeInfo.franchiseeaddressInfo.road,
                                            },
                                            businessNumber:
                                                franchiseeInfo.franchiseeinput.businesscode,
                                            firstImg: firstImgsrc,
                                            firstImgId: firstImgId,
                                            hours: time,
                                            intro: franchiseeInfo.franchiseeinput.franchiseeintro,
                                            name: franchiseeInfo.franchiseeinput.franchiseename,
                                            ownerId: localStorage.getItem("userId"),
                                            tel: franchiseeInfo.franchiseeinput.phonenumber,
                                            x: franchiseeInfo.franchiseeinput.x,
                                            y: franchiseeInfo.franchiseeinput.y,
                                        },
                                    }).then(function (res) {
                                        listRefresh.setList((list) => [...list, res.data]);
                                        console.log("입력 성공");
                                        console.log(res);
                                        listRefresh.setAddFrenModalShow(false);
                                        franchiseeInfo.setFranchiseeaddressinfo({
                                            ...franchiseeInfo.franchiseeaddressInfo,
                                            jibun: "",
                                            postalCode: "",
                                            road: "",
                                        });
                                        franchiseeInfo.setFranchiseeinput({
                                            ...franchiseeInfo.franchiseeinput,
                                            businesscode: "",
                                            franchiseename: "",
                                            perspectname: "",
                                            detailaddress: "",
                                            franchiseeintro: "",
                                            displayAddress: "",
                                            phonenumber: "",
                                        });
                                    })
                                }
                            else {
                                alert('가맹점 주소를 확인해주세요.')
                            }
                        } else {
                            alert('영업 시간을 확인해주세요.')
                        }
                    } else {
                        alert('가맹점 대표이미지를 확인해주세요.')
                    }
                } else {
                    alert('전화번호 란을 확인해 주세요.')
                }

            } else {
                alert('가게 명 란이 비어있습니다.')
            }
        }else {
            inputElement.current.focus();
            alert('사업자 번호를 확인해주세요.')
        }
    };

    const [ordertime, setOrdertime] = useState({
        fromfriday: "09:00",
        tofriday: "09:00",
        frommonday: "09:00",
        tomonday: "09:00",
        fromsaturday: "09:00",
        tosaturday: "09:00",
        fromsunday: "09:00",
        tosunday: "09:00",
        fromthursday: "09:00",
        tothursday: "09:00",
        fromtuesday: "09:00",
        totuesday: "09:00",
        fromwednesday: "09:00",
        towednesday: "09:00",
    });
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2 style={{ textAlign: "center" }}>가맹점 등록</h2>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <Row>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>사업자 번호</Form.Label>
                                {franchiseeInfo.franchiseeinput.businesscode
                                    .length === 0 ? (
                                    <></>
                                ) : null}
                                {franchiseeInfo.businessChk === "a" ? (
                                    <span
                                        style={{
                                            marginLeft: "10px",
                                            color: "green",
                                            fontSize: "8pt",
                                        }}
                                    >
                                        (사업자번호 확인완료.)
                                    </span>
                                ) : franchiseeInfo.franchiseeinput.businesscode
                                    .length === 0 ? (
                                    <></>
                                ) : franchiseeInfo.businessChk === "b" ? (
                                    <span
                                        style={{
                                            marginLeft: "10px",
                                            color: "red",
                                            fontSize: "8pt",
                                        }}
                                    >
                                        (국세청에 등록되지 않은
                                        사업자등록번호입니다.)
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            marginLeft: "10px",
                                            color: "red",
                                            fontSize: "8pt",
                                        }}
                                    >
                                        (이미 등록된 사업자 번호입니다.)
                                    </span>
                                )}
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        onChange={onchangeValue}
                                        ref={franchiseeInfo.inputElement}
                                        type="Number"
                                        placeholder="-를 제외한 10자리를 입력해주세요."
                                        name="businesscode"
                                    />
                                    <Button onClick={checkID}>확인</Button>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <Image
                                    className="imgBox"
                                    src={imgsrc}
                                    style={{
                                        width: "130px",
                                        height: "150px",
                                    }}
                                ></Image>
                                <Form.Control
                                    type="file"
                                    className="file mt-3"
                                    onChange={onLoadimage}
                                    style={{
                                        width: "95px",
                                        marginLeft: "18px",
                                    }}
                                />
                            </Col>
                            <Col>
                                <Form.Label>가게 명</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="가게 이름"
                                    onChange={onchangeValue}
                                    name="franchiseename"
                                />
                                <Form.Label>전화번호</Form.Label>
                                <Form.Control
                                    type="Number"
                                    placeholder="전화번호"
                                    onChange={onchangeValue}
                                    name="phonenumber"
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        영업시간
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Button
                                            className="timeBtn"
                                            style={{
                                                float: "right",
                                                marginRight: "30px",
                                            }}
                                            onClick={() => {
                                                setTimeState("false");
                                                console.log(timeState);
                                            }}
                                        >
                                            요일별로 달라요
                                        </Button>
                                        <Button
                                            className="timeBtn"
                                            style={{
                                                marginLeft: "30px",
                                            }}
                                            onClick={() => {
                                                setTimeState("true");
                                                console.log(timeState);
                                            }}
                                        >
                                            모든 영업일이 같아요
                                        </Button>
                                        {timeState === "true" ? (
                                            <div className="runningTime">
                                                <input
                                                    type="time"
                                                    id="frommonday"
                                                    value={ordertime.frommonday}
                                                    style={{
                                                        height: "30px",
                                                    }}
                                                    onChange={(e) =>
                                                        setOrdertime({
                                                            ...ordertime,
                                                            [e.target.id]: [
                                                                e.target.value,
                                                            ],
                                                        })
                                                    }
                                                />
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        marginLeft: "10px",
                                                    }}
                                                >
                                                    ~
                                                </span>
                                                <input
                                                    type="time"
                                                    id="tomonday"
                                                    value={ordertime.tomonday}
                                                    style={{
                                                        height: "30px",
                                                    }}
                                                    onChange={(e) =>
                                                        setOrdertime({
                                                            ...ordertime,
                                                            [e.target.id]: [
                                                                e.target.value,
                                                            ],
                                                        })
                                                    }
                                                />
                                            </div>
                                        ) : timeState === "false" ? (
                                            <>
                                                <div className="runningTime">
                                                    <label
                                                        name="monday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        월 :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="frommonday"
                                                        value={
                                                            ordertime.frommonday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        ~
                                                    </span>
                                                    <input
                                                        type="time"
                                                        id="tomonday"
                                                        value={
                                                            ordertime.tomonday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="runningTime">
                                                    <label
                                                        name="tuesday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        화 :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromtuesday"
                                                        value={
                                                            ordertime.fromtuesday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        ~
                                                    </span>
                                                    <input
                                                        type="time"
                                                        id="totuesday"
                                                        value={
                                                            ordertime.totuesday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="runningTime">
                                                    <label
                                                        name="wednesday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        수 :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromwednesday"
                                                        value={
                                                            ordertime.fromwednesday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        ~
                                                    </span>
                                                    <input
                                                        type="time"
                                                        id="towednesday"
                                                        value={
                                                            ordertime.towednesday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="runningTime">
                                                    <label
                                                        name="thursday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        목 :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromthursday"
                                                        value={
                                                            ordertime.fromthursday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        ~
                                                    </span>
                                                    <input
                                                        type="time"
                                                        id="tothursday"
                                                        value={
                                                            ordertime.tothursday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="runningTime">
                                                    <label
                                                        name="friday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        금 :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromfriday"
                                                        value={
                                                            ordertime.fromfriday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        ~
                                                    </span>
                                                    <input
                                                        type="time"
                                                        id="tofriday"
                                                        value={
                                                            ordertime.tofriday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="runningTime">
                                                    <label
                                                        name="saturday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        토 :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromsaturday"
                                                        value={
                                                            ordertime.fromsaturday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        ~
                                                    </span>
                                                    <input
                                                        type="time"
                                                        id="tosaturday"
                                                        value={
                                                            ordertime.tosaturday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="runningTime">
                                                    <label
                                                        name="sunday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        일 :
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromsunday"
                                                        value={
                                                            ordertime.fromsunday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        ~
                                                    </span>
                                                    <input
                                                        type="time"
                                                        id="tosunday"
                                                        value={
                                                            ordertime.tosunday
                                                        }
                                                        style={{
                                                            height: "30px",
                                                        }}
                                                        onChange={(e) =>
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]: [
                                                                    e.target
                                                                        .value,
                                                                ],
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : null}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Row>
                        <Row className="franchiseeadd-container--post">
                            <Row>
                                <Col className="mt-3">
                                    <InputGroup style={{ width: "300px" }}>
                                        <Form.Control
                                            id="postcode--addressNumber"
                                            type="text"
                                            placeholder="우편번호"
                                            name="postcode"
                                            value={
                                                franchiseeInfo
                                                    .franchiseeaddressInfo
                                                    .postalCode
                                            }
                                            readOnly
                                        />
                                        <Button
                                            variant="primary"
                                            onClick={searchAddressClick}
                                        >
                                            우편번호 검색
                                        </Button>
                                    </InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="주소"
                                        id="postcode--address"
                                        name="fulladdress"
                                        readOnly
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="상세 주소"
                                        id="postcode-detailAddress"
                                        onChange={onchangeValue}
                                        name="detailaddress"
                                    />
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Row>
                                <Col>
                                    <Form.Label>가맹점 소개 </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="가맹점 소개글을 써주세요"
                                        style={{
                                            height: "100px",
                                            resize: "none",
                                        }}
                                        onChange={onchangeValue}
                                        name="franchiseeintro"
                                    />
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Row>
                <Row>
                    <Button
                        style={{ marginTop: "10px" }}
                        onClick={addFranchiseeFunction}
                    >
                        입력
                    </Button>
                </Row>
            </Container>
        </>
    );
}

export default AddFranchisee;
