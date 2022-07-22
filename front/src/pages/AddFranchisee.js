import "../App.css";
import {
    Container,
    Form,
    Row,
    Col,
    Image,
    Button,
    InputGroup,
} from "react-bootstrap";
import useDaumPostcodePopup from "react-daum-postcode/lib/useDaumPostcodePopup";
import "bootstrap/dist/css/bootstrap.css";
import { useContext, useState } from "react";
import { franchiseeinfoContext } from "../template/AddFranchiseeModal";
import axios from "axios";
import { modalControllerContext } from "../pages/Mypage";

function AddFranchisee({ inputElement }) {
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
            if (data.autoJibunAddress == "") {
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

    const [imgsrc, setImgsrc] = useState("");
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
        console.log(value);
        axios
            .post(
                "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=SkzUgJzO5Ju61s661QVhT7zHnZghYrBq2kymfg8v46g%2FSFN7VcgiWR3KYtaWyjRvZhfoBRizMSz6%2FiOwK9KOtA%3D%3D",
                {
                    b_no: [value],
                }
            )
            .then((response) => {
                if (response.data.match_cnt === 1) {
                    axios({
                        method: "get",
                        url:
                            `http://192.168.240.250:8080/api/v1/franchisee/` +
                            value +
                            `/check`,
                    }).then(function (res) {
                        console.log(res.data.result);
                        if (res.data.result == true) {
                            console.log("디비에없음");
                            franchiseeInfo.setBusinessChk("a");
                        } else {
                            franchiseeInfo.setBusinessChk("c");
                            console.log("디비에있음");
                        }
                    });
                } else {
                    console.log("false");
                    franchiseeInfo.setBusinessChk("b");
                    inputElement.current.focus();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // 가맹점 등록
    const addFranchiseeFunction = () => {
        if(franchiseeInfo.businessChk === 'a'){
            
            axios({
                method: "post",
                url: `http://192.168.240.250:8080/api/v1/franchisee`,
                data: {
                    address: {
                        detail: franchiseeInfo.franchiseeinput.detailaddress,
                        jibun: franchiseeInfo.franchiseeaddressInfo.jibun,
                        postalCode: franchiseeInfo.franchiseeaddressInfo.postalCode,
                        road: franchiseeInfo.franchiseeaddressInfo.road,
                    },
                    businessNumber: franchiseeInfo.franchiseeinput.businesscode,
                    firstImg: firstImgsrc,
                    firstImgId: firstImgId,
                    hours: {
                        friday: "09:00 ~ 18:00",
                        monday: "09:00 ~ 18:00",
                        saturday: "09:00 ~ 18:00",
                        sunday: "09:00 ~ 18:00",
                        thursday: "09:00 ~ 18:00",
                        tuesday: "09:00 ~ 18:00",
                        wednesday: "09:00 ~ 18:00",
                    },
                    intro: franchiseeInfo.franchiseeinput.franchiseeintro,
                    name: franchiseeInfo.franchiseeinput.franchiseename,
                    ownerId: localStorage.getItem("userId"),
                    tel: franchiseeInfo.franchiseeinput.phonenumber,
                    x: franchiseeInfo.franchiseeinput.x,
                    y: franchiseeInfo.franchiseeinput.y,
                },
            })
                .then(function (res) {
                    listRefresh.setList((list) => [...list, res.data]);
                    console.log("입력 성공");
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
                .catch(function (err) {
                    console.log(err);
                    // console.log(err.config.data)
                    alert('공백인 값을 확인 하세요.')
                });
        }else{
            inputElement.current.focus();
        }
        
    };
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
                                        type="text"
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
                                    type="text"
                                    placeholder="전화번호"
                                    onChange={onchangeValue}
                                    name="phonenumber"
                                />
                            </Col>
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
                    <Button onClick={addFranchiseeFunction}>입력</Button>
                </Row>
            </Container>
        </>
    );
}

export default AddFranchisee;
