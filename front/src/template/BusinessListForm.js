import { RadioButtonChecked } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Row,
    Button,
    Col,
    ListGroup,
    Card,
    Form,
    Modal,
    FloatingLabel,
} from "react-bootstrap";
import { useDaumPostcodePopup } from "react-daum-postcode";
import "../css/AddMenu.css";
import DelMenuModals from "../pages/DelMenuModals";

//메뉴 삭제하기
function menuDel(idx, menuList, setMenuList) {
    axios({
        method: "delete",
        url: `http://192.168.240.250:8080/api/v1/menu/` + menuList[idx].id,
    }).then(function (res) {
        console.log("메뉴 삭제 성공");
        setMenuList(
            menuList.filter((menuList) => {
                return menuList.id != res.data.id;
            })
        );
    });
}
// 메뉴추가 함수
function menuAdd(
    franchiseeList,
    menuDescription,
    menuName,
    menuPrice,
    menuImgId,
    menuList,
    setMenuList,
    setMenuAddModaShow,
    menuImgsrc
) {
    console.log(
        menuDescription + " " + menuName + " " + menuPrice + " " + menuImgId
    );
    axios({
        method: "post",
        url:
            `http://192.168.240.250:8080/api/v1/franchisee/` +
            franchiseeList.businessNumber +
            `/menu`,
        data: {
            description: menuDescription,
            name: menuName,
            price: menuPrice,
            imageId: menuImgId,
        },
    }).then(function (res) {
        console.log("메뉴추가 성공");

        //res.data와 menuList의 객체 구조가 다름(res.data에는 image객체가 없음)
        //따라서 같게 만듬
        let tempObj = {
            id: res.data.id,
            businessNumber: res.data.businessNumber,
            description: res.data.description,
            createDate: res.data.createDate,
            name: res.data.name,
            price: res.data.price,
            image: {
                path: menuImgsrc,
            },
        };
        setMenuList(menuList.concat(tempObj));
    });
    setMenuAddModaShow(false);
}

//가맹점리스트 정보 수정 함수
function FranUpdate(isEdit, setIsEdit, franchiseeList, firstImgsrc) {
    setIsEdit(!isEdit);
    // console.log(isEdit);
    // console.log(firstImgsrc);
    // console.log(franchiseeList.businessNumber);

    let tempTel = franchiseeList.tel.substring(
        0,
        franchiseeList.tel.length - 4
    );
    console.log(franchiseeList.tel.length);
    console.log(tempTel);


    if (tempTel.substring(0, 2) === "02") {
        tempTel = tempTel.substring(2);
        console.log("02 start " + tempTel);

    } else {
        tempTel = tempTel.substring(3);
        console.log("not 02 start " + tempTel);

    }
    if (isEdit === true) {
        let chknum = /^[0-9]+$/;
        if (
            franchiseeList.tel.length > 8 &&
            franchiseeList.tel.length < 12 &&
            chknum.test(franchiseeList.tel) &&
            tempTel.length > 2
        ) {
            axios({
                method: "put",
                url:
                    `http://192.168.240.250:8080/api/v1/franchisee/` +
                    franchiseeList.businessNumber,
                data: {
                    firstImg: firstImgsrc,
                    hours: {
                        friday:
                            document.getElementById("fromfriday").value +
                            " ~ " +
                            document.getElementById("tofriday").value,
                        monday:
                            document.getElementById("frommonday").value +
                            " ~ " +
                            document.getElementById("tomonday").value,
                        saturday:
                            document.getElementById("fromsaturday").value +
                            " ~ " +
                            document.getElementById("tosaturday").value,
                        sunday:
                            document.getElementById("fromsunday").value +
                            " ~ " +
                            document.getElementById("tosunday").value,
                        thursday:
                            document.getElementById("fromthursday").value +
                            " ~ " +
                            document.getElementById("tothursday").value,
                        tuesday:
                            document.getElementById("fromtuesday").value +
                            " ~ " +
                            document.getElementById("totuesday").value,
                        wednesday:
                            document.getElementById("fromwednesday").value +
                            " ~ " +
                            document.getElementById("towednesday").value,
                    },
                    intro: franchiseeList.intro,
                    tel: franchiseeList.tel,
                },
            }).then(function (res) {
                console.log("가맹점 정보를 수정하였습니다");
                console.log(res.data);
                // setFranchiseeList(res.data)
            });
        } else {
            alert("전화 번호를 다시 확인하고 입력하여 주십시오");
            setIsEdit(true);
        }
    }
}

function BusinessListForm({ franchiseeList: f }) {
    //메뉴삭제모달 띄우기
    const [show, setShow] = useState(false);
    //메뉴삭제 데이터
    const [data, setData] = useState({});

    //유효성검사
    const [franchiseeList, setFranchiseeList] = useState(f);
    const [isEdit, setIsEdit] = useState(false);

    const [menuAddModalshow, setMenuAddModaShow] = useState(false);
    //가맹점 대표 이미지 useState
    const [firstImgsrc, setFirstImgsrc] = useState(franchiseeList.firstImg);
    //메뉴 이미지 useState
    const [menuImgsrc, setMenuImgsrc] = useState(
        "/api/v1/file/a70427302ce343c2bd29054e7dd82cc0-default-image.jpg"
    );
    const [menuImgId, setMenuImgId] = useState("");

    const encodingImg = (imgfile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgfile);
        return new Promise((resolve) => {
            reader.onload = () => {
                console.log(firstImgsrc);
                console.log(menuImgsrc);
                resolve();
            };
        });
    };
    const onLoadprofile = (e) => {
        const imageFile = e.target.files[0];
        encodingImg(imageFile);

        var frm = new FormData();
        frm.append("files", e.target.files[0]);
        console.log(frm);

        axios({
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "post",
            url: `http://192.168.240.250:8080/api/v1/file`,
            data: frm,
        }).then(function (res) {
            console.log("파일서버에 프로필사진 올라감");
            console.log(res.data);

            //가맹점 대표이미지 src 설정
            setFirstImgsrc(res.data[0].path);
        });
    };

    const onLoadMenuimage = (e) => {
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
            console.log("파일서버에 메뉴사진 올라감");

            //매뉴 이미지 src 설정
            console.log(res.data[0].path);
            setMenuImgsrc(res.data[0].path);
            setMenuImgId(res.data[0].id);
        });
    };

    const [menuName, setMenuName] = useState("");
    const [menuPrice, setMenuPrice] = useState("");
    const [menuDescription, setMenuDescription] = useState(0);

    const menuNameChange = (e) => {
        setMenuName(e.target.value);
    };
    const menuPriceChange = (e) => {
        setMenuPrice(e.target.value);
    };
    const menuDescriptionChange = (e) => {
        setMenuDescription(e.target.value);
    };

    //메뉴모달 boolean값으로 상태변경
    const [cardchk, setCardChk] = useState(false);
    //메뉴모달 수정버튼눌렀을때 readonly 상태변경
    const [cardEditChk, setCardEditChk] = useState(true);
    const [cardmenu, setCardMenu] = useState();

    const menuAddModalClose = () => {
        setMenuAddModaShow(false);
        setCardEditChk(true);
    };
    function MenuModalShow() {
        setMenuAddModaShow(true);
        setCardChk(false);
        setMenuName("");
        setMenuPrice("");
        setMenuDescription("");
        setMenuImgsrc(
            "/api/v1/file/a70427302ce343c2bd29054e7dd82cc0-default-image.jpg"
        );
        // console.log('asdfasdf');
    }

    //가맹점 메뉴 조회
    const [menuList, setMenuList] = useState([
        {
            image: {
                path: "/api/v1/file/a70427302ce343c2bd29054e7dd82cc0-default-image.jpg",
            },
        },
    ]);
    useEffect(() => {
        axios({
            method: "get",
            url:
                `http://192.168.240.250:8080/api/v1/franchisee/` +
                franchiseeList.businessNumber +
                `/menus`,
        })
            .then(function (res) {
                setMenuList(res.data);
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    console.log("메뉴가 없습니다");
                }
                setMenuList([]);
            });
    }, []);
    //주소변경
    let scriptUrl =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);
    const [address, setAddress] = useState({
        jibun: "",
        postalCode: "",
        road: "",
    });

    const choiceAddressComplete = (data) => {
        if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            document.getElementById("postcode--Address").value =
                data.roadAddress;
            document.getElementById("postcode--addressNumber").value =
                data.zonecode;
            setAddress({
                jibun: data.autoJibunAddress,
                postalCode: data.zonecode,
                road: data.address,
            });
            if (!address.jibun) {
                setAddress({
                    ...address,
                    jibun: data.autoJibunAddress,
                });
            }
        } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            document.getElementById("postcode--Address").value =
                data.jibunAddress;
            setAddress({
                jibun: data.jibunAddress,
                postalCode: data.zonecode,
                road: data.address,
            });
        }
    };

    const addressClick = () => {
        open({ onComplete: choiceAddressComplete });
    };

    function CardClick(ele) {
        setCardChk(true);
        setMenuAddModaShow(true);
        console.log("asdfasdf", ele);
    }

    //메뉴 수정 통신
    const MenuEdit = () => {
        setCardEditChk(false);
        if (!cardEditChk) {
            axios({
                method: "put",
                url: `http://192.168.240.250:8080/api/v1/menu/` + cardmenu.id,
                data: {
                    description: cardmenu.description[0],
                    name: cardmenu.name[0],
                    price: Number(cardmenu.price),
                },
            }).then(function (res) {
                setMenuAddModaShow(false);
                let tempArr = [...menuList];

                // setMenuList(...menuList, card);
                setCardEditChk(true);
                menuList.map((ele, idx) => {
                    if (ele.id === cardmenu.id) {
                        tempArr[idx] = cardmenu;
                    }
                    return setMenuList(tempArr);
                });
                // setMenuList(tempArr);
            });
        }
    };

    //영업 시간 통신

    const [ordertime, setOrdertime] = useState({});

    useEffect(() => {
        axios({
            method: "get",
            url:
                `http://192.168.240.250:8080/api/v1/franchisee/` +
                franchiseeList.businessNumber +
                `/schedule`,
        }).then(function (res) {
            // setOrderbeforetime(res.data);
            setOrdertime({
                frommonday: res.data.monday.split("~")[0],
                tomonday: res.data.monday.split("~")[1],
                fromtuesday: res.data.tuesday.split("~")[0],
                totuesday: res.data.tuesday.split("~")[1],
                fromwednesday: res.data.wednesday.split("~")[0],
                towednesday: res.data.wednesday.split("~")[1],
                fromthursday: res.data.thursday.split("~")[0],
                tothursday: res.data.thursday.split("~")[1],
                fromfriday: res.data.friday.split("~")[0],
                tofriday: res.data.friday.split("~")[1],
                fromsaturday: res.data.saturday.split("~")[0],
                tosaturday: res.data.saturday.split("~")[1],
                fromsunday: res.data.sunday.split("~")[0],
                tosunday: res.data.sunday.split("~")[1],
            });
        });
    }, []);
    console.log(ordertime);

    return (
        <>
            <div className="main-body">
                <div className="row mb-3 franinfozone">
                    <div className="col-sm-4 franinfozone--headerzone">
                        <div className="card franinfozone--frantitle">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    {isEdit ? (
                                        <div
                                            className="image-upload"
                                            onChange={onLoadprofile}
                                        >
                                            <label htmlFor="file-input">
                                                <img
                                                    alt="가맹점이미지"
                                                    className="businessListImg"
                                                    src={
                                                        "http://192.168.240.250:8080" +
                                                        firstImgsrc
                                                    }
                                                    // className="rounded-c ircle"
                                                />
                                            </label>
                                            <input
                                                id="file-input"
                                                type="file"
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            alt="가맹점이미지"
                                            className="businessListImg"
                                            src={
                                                "http://192.168.240.250:8080" +
                                                firstImgsrc
                                            }
                                        />
                                    )}
                                    <h4 style={{ paddingTop: "15px" }}>
                                        {franchiseeList.name}
                                    </h4>
                                    <p className="text-secondary">
                                        {isEdit ? (
                                            <input
                                                style={{ textAlign: "center" }}
                                                name="intro"
                                                value={franchiseeList.intro}
                                                onChange={(e) =>
                                                    setFranchiseeList({
                                                        ...franchiseeList,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            <>{franchiseeList.intro}</>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 franinfozone--bodyzone">
                        <div className="card franinfozone--frantitle">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <h6>사업자번호</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary businessListInput">
                                        {/* {franchiseeList.businessNumber} */}
                                        {franchiseeList.businessNumber.replace(
                                            /(\d{3})(\d{5})(\d{2})/,
                                            "$1-$2-$3"
                                        )}
                                    </div>
                                    <div
                                        className="col-sm-1 btn btnEditInfo"
                                        role="button"
                                        onClick={() => {
                                            FranUpdate(
                                                isEdit,
                                                setIsEdit,
                                                franchiseeList,
                                                firstImgsrc
                                            );
                                        }}
                                    >
                                        수정
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
                                                name="tel"
                                                value={franchiseeList.tel}
                                                onChange={(e) => {
                                                    setFranchiseeList({
                                                        ...franchiseeList,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            <div className="businessListInput">
                                                {franchiseeList.tel.substring(
                                                    0,
                                                    2
                                                ) === "02"
                                                    ? franchiseeList.tel.replace(
                                                          /(\d{2})(\d{3,4})(\d{4})/,
                                                          "$1-$2-$3"
                                                      )
                                                    : franchiseeList.tel.replace(
                                                          /(\d{3})(\d{3,4})(\d{4})/,
                                                          "$1-$2-$3"
                                                      )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-2">
                                        <h6>주소</h6>
                                    </div>
                                    <div className="col-sm-10 text-secondary businessListInput">
                                        {franchiseeList.address.road +
                                            " " +
                                            franchiseeList.address.detail}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-2">
                                        <h6>영업시간</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary ordertime">
                                        {isEdit ? (
                                            <>
                                                <div style={{ height: "30px" }}>
                                                    <label
                                                        name="monday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        월
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="frommonday"
                                                        value={
                                                            ordertime.frommonday.split(
                                                                " "
                                                            )[0]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
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
                                                            ordertime.tomonday.split(
                                                                " "
                                                            )[1]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ height: "30px" }}>
                                                    <label
                                                        name="tuesday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        화
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromtuesday"
                                                        value={
                                                            ordertime.fromtuesday.split(
                                                                " "
                                                            )[0]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
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
                                                            ordertime.totuesday.split(
                                                                " "
                                                            )[1]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ height: "30px" }}>
                                                    <label
                                                        name="wednesday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        수
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromwednesday"
                                                        value={
                                                            ordertime.fromwednesday.split(
                                                                " "
                                                            )[0]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
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
                                                            ordertime.towednesday.split(
                                                                " "
                                                            )[1]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ height: "30px" }}>
                                                    <label
                                                        name="thursday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        목
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromthursday"
                                                        value={
                                                            ordertime.fromthursday.split(
                                                                " "
                                                            )[0]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
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
                                                            ordertime.tothursday.split(
                                                                " "
                                                            )[1]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ height: "30px" }}>
                                                    <label
                                                        name="friday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        금
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromfriday"
                                                        value={
                                                            ordertime.fromfriday.split(
                                                                " "
                                                            )[0]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
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
                                                            ordertime.tofriday.split(
                                                                " "
                                                            )[1]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ height: "30px" }}>
                                                    <label
                                                        name="saturday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        토
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromsaturday"
                                                        value={
                                                            ordertime.fromsaturday.split(
                                                                " "
                                                            )[0]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
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
                                                            ordertime.tosaturday.split(
                                                                " "
                                                            )[1]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ height: "30px" }}>
                                                    <label
                                                        name="sunday"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        일
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="fromsunday"
                                                        value={
                                                            ordertime.fromsunday.split(
                                                                " "
                                                            )[0]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
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
                                                            ordertime.tosunday.split(
                                                                " "
                                                            )[1]
                                                        }
                                                        onChange={(e) => {
                                                            setOrdertime({
                                                                ...ordertime,
                                                                [e.target.id]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="businessListInput ordertime">
                                                <div style={{ height: "20px" }}>
                                                    <label
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        월
                                                    </label>{" "}
                                                    {ordertime.frommonday +
                                                        "~" +
                                                        ordertime.tomonday}
                                                    {/* {orderbeforetime.monday} */}
                                                </div>
                                                <div style={{ height: "20px" }}>
                                                    <label
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        화
                                                    </label>{" "}
                                                    {/* {orderbeforetime.tuesday} */}
                                                    {ordertime.fromtuesday +
                                                        "~" +
                                                        ordertime.totuesday}
                                                </div>
                                                <div style={{ height: "20px" }}>
                                                    <label
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        수
                                                    </label>{" "}
                                                    {/* {orderbeforetime.wednesday} */}
                                                    {ordertime.fromwednesday +
                                                        "~" +
                                                        ordertime.towednesday}
                                                </div>
                                                <div style={{ height: "20px" }}>
                                                    <label
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        목
                                                    </label>{" "}
                                                    {/* {orderbeforetime.thursday} */}
                                                    {ordertime.fromthursday +
                                                        "~" +
                                                        ordertime.tothursday}
                                                </div>
                                                <div style={{ height: "20px" }}>
                                                    <label
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        금
                                                    </label>{" "}
                                                    {/* {orderbeforetime.friday} */}
                                                    {ordertime.fromfriday +
                                                        "~" +
                                                        ordertime.tofriday}
                                                </div>
                                                <div style={{ height: "20px" }}>
                                                    <label
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        토
                                                    </label>{" "}
                                                    {/* {orderbeforetime.saturday} */}
                                                    {ordertime.fromsaturday +
                                                        "~" +
                                                        ordertime.tosaturday}
                                                </div>
                                                <div style={{ height: "20px" }}>
                                                    <label
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        일
                                                    </label>{" "}
                                                    {/* {orderbeforetime.sunday} */}
                                                    {ordertime.fromsunday +
                                                        "~" +
                                                        ordertime.tosunday}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3 franmenuzone">
                    <div className="card-body">
                        <div className="row franmenuzone--headerzone">
                            <div className="col-sm-10">
                                <h6>메뉴</h6>
                            </div>
                            <div
                                className="col-sm-1"
                                style={{
                                    textAlign: "center",
                                    lineHeight: "0px",
                                }}
                            >
                                <button
                                    className="btn btnMenu btnAddMenu"
                                    onClick={() => {
                                        MenuModalShow();
                                    }}
                                >
                                    +
                                </button>
                                <Modal
                                    show={menuAddModalshow}
                                    onHide={menuAddModalClose}
                                    centered
                                    cardmenu={cardmenu}
                                    cardchk={cardchk}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>
                                            {cardchk
                                                ? "메뉴 수정"
                                                : "메뉴 추가"}
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <div className="ex-layout">
                                                <div className="main">
                                                    <div className="left-menu">
                                                        {cardchk ? (
                                                            <img
                                                                alt="메뉴이미지"
                                                                src={
                                                                    `http://192.168.240.250:8080` +
                                                                    cardmenu
                                                                        .image
                                                                        .path
                                                                }
                                                                style={{
                                                                    width: "200px",
                                                                }}
                                                            />
                                                        ) : (
                                                            <img
                                                                alt="메뉴이미지"
                                                                src={
                                                                    `http://192.168.240.250:8080` +
                                                                    menuImgsrc
                                                                }
                                                                style={{
                                                                    width: "200px",
                                                                }}
                                                            />
                                                        )}

                                                        <br />
                                                    </div>
                                                    <div className="content">
                                                        <div className="article">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>
                                                                    메뉴 이름
                                                                </Form.Label>
                                                                {cardchk ? (
                                                                    <Form.Control
                                                                        name="name"
                                                                        type="text"
                                                                        value={
                                                                            cardmenu.name
                                                                        }
                                                                        readOnly={
                                                                            cardEditChk
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setCardMenu(
                                                                                {
                                                                                    ...cardmenu,
                                                                                    [e
                                                                                        .target
                                                                                        .name]:
                                                                                        [
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        ],
                                                                                }
                                                                            );
                                                                        }}
                                                                        autoFocus
                                                                    />
                                                                ) : (
                                                                    <Form.Control
                                                                        name="name"
                                                                        type="text"
                                                                        placeholder="메뉴 이름을 적어주세요."
                                                                        autoFocus
                                                                        value={
                                                                            menuName
                                                                        }
                                                                        onChange={
                                                                            menuNameChange
                                                                        }
                                                                    />
                                                                )}
                                                            </Form.Group>
                                                        </div>
                                                        <div className="comment">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>
                                                                    메뉴 가격
                                                                </Form.Label>
                                                                {cardchk ? (
                                                                    <Form.Control
                                                                        name="price"
                                                                        type="text"
                                                                        value={
                                                                            cardmenu.price
                                                                        }
                                                                        readOnly={
                                                                            cardEditChk
                                                                        }
                                                                        autoFocus
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setCardMenu(
                                                                                {
                                                                                    ...cardmenu,
                                                                                    [e
                                                                                        .target
                                                                                        .name]:
                                                                                        [
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        ],
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Form.Control
                                                                        name="price"
                                                                        type="text"
                                                                        value={
                                                                            menuPrice
                                                                        }
                                                                        placeholder="메뉴 가격을 적어주세요."
                                                                        autoFocus
                                                                        onChange={
                                                                            menuPriceChange
                                                                        }
                                                                    />
                                                                )}
                                                            </Form.Group>
                                                        </div>
                                                        <div className="comment">
                                                            <Form.Group className="mb-3 filebox">
                                                                {cardchk ? (
                                                                    <></>
                                                                ) : (
                                                                    <>
                                                                        <Form.Label htmlFor="ex_file">
                                                                            이미지
                                                                            업로드
                                                                        </Form.Label>
                                                                        <Form.Control
                                                                            type="file"
                                                                            id="ex_file"
                                                                            onChange={
                                                                                onLoadMenuimage
                                                                            }
                                                                        />
                                                                    </>
                                                                )}
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                        <FloatingLabel label="메뉴 소개">
                                            {cardchk ? (
                                                <Form.Control
                                                    onChange={(e) => {
                                                        setCardMenu({
                                                            ...cardmenu,
                                                            [e.target.name]: [
                                                                e.target.value,
                                                            ],
                                                        });
                                                    }}
                                                    name="description"
                                                    as="textarea"
                                                    value={cardmenu.description}
                                                    readOnly={cardEditChk}
                                                    style={{
                                                        height: "150px",
                                                        resize: "none",
                                                    }}
                                                />
                                            ) : (
                                                <Form.Control
                                                    onChange={
                                                        menuDescriptionChange
                                                    }
                                                    name="description"
                                                    as="textarea"
                                                    value={menuDescription}
                                                    placeholder="메뉴 소개"
                                                    style={{
                                                        height: "150px",
                                                        resize: "none",
                                                    }}
                                                />
                                            )}
                                        </FloatingLabel>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            variant="secondary"
                                            onClick={menuAddModalClose}
                                        >
                                            뒤로
                                        </Button>
                                        {cardchk ? (
                                            <Button
                                                variant="primary"
                                                onClick={MenuEdit}
                                            >
                                                수정
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    menuAdd(
                                                        franchiseeList,
                                                        menuDescription,
                                                        menuName,
                                                        menuPrice,
                                                        menuImgId,
                                                        menuList,
                                                        setMenuList,
                                                        setMenuAddModaShow,
                                                        menuImgsrc,
                                                        setMenuName,
                                                        setMenuPrice,
                                                        setMenuDescription
                                                    );
                                                }}
                                            >
                                                등록
                                            </Button>
                                        )}
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div
                                className="col-sm-1"
                                style={{
                                    textAlign: "center",
                                    lineHeight: "0px",
                                }}
                            >
                                <button className="btn btnMenu btnDelMenu">
                                    -
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="row franmenuzone--bodyzone">
                            <div
                                className="franmenuzone--menulistzone"
                                style={{ height: "420px" }}
                            >
                                <ListGroup>
                                    <Row>
                                        {menuList.map((ele, idx) => {
                                            return (
                                                <Col key={idx}>
                                                    <ListGroup.Item
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        <Card className="AddMenu--MenuList__Menu">
                                                            <Card.Header>
                                                                <Button
                                                                    role={
                                                                        "button"
                                                                    }
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
                                                                </Button>
                                                            </Card.Header>
                                                            <div
                                                                role="button"
                                                                onClick={() => {
                                                                    setCardMenu(
                                                                        ele
                                                                    );
                                                                    CardClick(
                                                                        ele
                                                                    );
                                                                }}
                                                            >
                                                                <Card.Img
                                                                    variant="top"
                                                                    className="AddMenu--MenuList__MenuImg"
                                                                    src={
                                                                        "http://192.168.240.250:8080" +
                                                                        menuList[
                                                                            idx
                                                                        ].image
                                                                            .path
                                                                    }
                                                                />
                                                                <Card.Body>
                                                                    <Card.Title>
                                                                        {
                                                                            menuList[
                                                                                idx
                                                                            ]
                                                                                .name
                                                                        }
                                                                    </Card.Title>
                                                                    <Card.Text
                                                                        style={{
                                                                            paddingTop:
                                                                                "4px",
                                                                        }}
                                                                    >
                                                                        {`${menuList[idx].price}원`}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </div>
                                                        </Card>
                                                    </ListGroup.Item>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                </div>
                {show ? (
                    <DelMenuModals
                        show={show}
                        setShow={setShow}
                        data={data}
                        menuList={menuList}
                        setMenuList={setMenuList}
                    />
                ) : null}
                <div className="card frananalysiszone">
                    <div className="card-body">
                        <div className="row frananalysiszone--headerzone">
                            <div className="col-sm-12">
                                <h6>분석</h6>
                            </div>
                        </div>
                        <hr />
                        <div className="row frananalysiszone--bodyzone">
                            <div className="col-sm-12">
                                <h6>분석결과가 들어갑니다</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BusinessListForm;
