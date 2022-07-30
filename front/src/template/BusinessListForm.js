import { useEffect, useState } from "react";
import {
    Row,
    Button,
    ListGroup,
    Form,
    Modal,
    FloatingLabel,
    InputGroup,
    Accordion,
} from "react-bootstrap";
import "../css/AddMenu.css";
import DelMenuModals from "../pages/DelMenuModals";
import { instance } from "./AxiosConfig/AxiosInterceptor";
import { TbBoxOff } from "react-icons/tb";

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
    if (menuName.length === 0 || menuPrice.length === 0) {
        alert("메뉴이름또는메뉴가격을확인해주세요.");
        return;
    } else if (
        menuImgsrc ===
        "/api/v1/file/a70427302ce343c2bd29054e7dd82cc0-default-image.jpg"
    ) {
        console.log("디폴트");
        instance({
            method: "post",
            url: `/franchisee/` + franchiseeList.businessNumber + `/menu`,
            data: {
                description: menuDescription,
                name: menuName,
                price: menuPrice,
            },
        }).then(function (res) {
            console.log("메뉴추가 성공");
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
    } else {
        console.log("실행");
        instance({
            method: "post",
            url: `/franchisee/` + franchiseeList.businessNumber + `/menu`,
            data: {
                description: menuDescription,
                name: menuName,
                price: menuPrice,
                imageId: menuImgId,
            },
        })
            .then(function (res) {
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
            })
            .catch((err) => {
                console.log(err.request.response);
                console.log(franchiseeList.businessNumber);
            });
    }
    setMenuAddModaShow(false);
}

//가맹점리스트 정보 수정 함수
function FranUpdate(isEdit, setIsEdit, franchiseeList, firstImgsrc) {
    setIsEdit(!isEdit);
    let tempTel = franchiseeList.tel.substring(
        0,
        franchiseeList.tel.length - 4
    );

    if (tempTel.substring(0, 2) === "02") {
        tempTel = tempTel.substring(2);
    } else {
        tempTel = tempTel.substring(3);
    }
    if (isEdit === true) {
        let chknum = /^[0-9]+$/;
        if (
            franchiseeList.tel.length > 8 &&
            franchiseeList.tel.length < 12 &&
            chknum.test(franchiseeList.tel) &&
            tempTel.length > 2
        ) {
            instance({
                method: "put",
                url: `/franchisee/` + franchiseeList.businessNumber,
                data: {
                    firstImg: firstImgsrc,
                    hours: {
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
                    },
                    intro: franchiseeList.intro,
                    tel:
                        Number(franchiseeList.tel.split("-")[0]) +
                        Number(franchiseeList.tel.split("-")[1]) +
                        Number(franchiseeList.tel.split("-")[2]),
                },
            }).then(function (res) {
                console.log(res);
                console.log("가맹점 정보를 수정하였습니다");
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

    // 이미지 인코딩
    // const encodingImg = (imgfile) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(imgfile);
    //     return new Promise((resolve) => {
    //         reader.onload = () => {
    //             resolve();
    //         };
    //     });
    // };
    const onLoadprofile = (e) => {
        // const imageFile = e.target.files[0];
        // encodingImg(imageFile);

        var frm = new FormData();
        frm.append("files", e.target.files[0]);

        instance({
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "post",
            url: `/file`,
            data: frm,
        }).then(function (res) {
            console.log("파일서버에 프로필사진 올라감");

            //가맹점 대표이미지 src 설정
            setFirstImgsrc(res.data[0].path);
        });
    };

    const onLoadMenuimage = (e) => {
        // const imageFile = e.target.files[0];
        // encodingImg(imageFile);

        var frm = new FormData();
        frm.append("files", e.target.files[0]);
        instance({
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "post",
            url: `/file`,
            data: frm,
        }).then(function (res) {
            console.log("파일서버에 메뉴사진 올라감");
            console.log(res.data[0].path);

            //매뉴 이미지 src 설정
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
    const [cardmenu, setCardMenu] = useState();

    const menuAddModalClose = () => {
        setMenuAddModaShow(false);
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
    }

    //영업 시간 통신
    const [ordertime, setOrdertime] = useState({});

    //가맹점 메뉴 조회
    const [menuList, setMenuList] = useState([
        {
            image: {
                path: "/api/v1/file/a70427302ce343c2bd29054e7dd82cc0-default-image.jpg",
            },
        },
    ]);
    useEffect(() => {
        instance({
            method: "get",
            url: `/franchisee/` + franchiseeList.businessNumber + `/menus`,
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
        instance({
            method: "get",
            url: `/franchisee/` + franchiseeList.businessNumber + `/schedule`,
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

    function CardClick() {
        setCardChk(true);
        setMenuAddModaShow(true);
    }

    //메뉴 수정 통신
    const MenuEdit = () => {
        instance({
            method: "put",
            url: `/menu/` + cardmenu.id,
            data: {
                description: cardmenu.description,
                name: cardmenu.name,
                price: Number(cardmenu.price),
            },
        }).then(function (res) {
            setMenuAddModaShow(false);
            let tempArr = [...menuList];
            menuList.map((ele, idx) => {
                if (ele.id === cardmenu.id) {
                    tempArr[idx] = cardmenu;
                }
                return setMenuList(tempArr);
            });
        });
    };

    return (
        <>
            <div className="main-body">
                <div className="row mb-3 franinfozone">
                    {/* 헤더존 */}
                    <div className="col-sm-4 franinfozone--headerzone">
                        <div className="card franinfozone--frantitle">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    {isEdit ? (
                                        <div
                                            className="image-upload"
                                            onChange={onLoadprofile}
                                        >
                                            <label
                                                htmlFor="file-input"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    alt="가맹점이미지"
                                                    className="businessListImg"
                                                    src={
                                                        "http://192.168.240.250:8080" +
                                                        firstImgsrc
                                                    }
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
                                        <textarea
                                            className="franchiseeIntro"
                                            name="intro"
                                            style={{
                                                textAlign: "center",
                                                resize: "none",
                                                height: "auto",
                                            }}
                                            value={franchiseeList.intro}
                                            rows="3"
                                            cols="40"
                                            readOnly={!isEdit}
                                            onChange={(e) =>
                                                setFranchiseeList({
                                                    ...franchiseeList,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 바디존 */}
                    <div className="col-sm-8 franinfozone--bodyzone">
                        <div className="card franinfozone--frantitle">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <h6>사업자번호</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary businessListInput">
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
                                        <h6>전화번호</h6>
                                    </div>
                                    <div className="col-sm-10 text-secondary telZone">
                                        {isEdit ? (
                                            <input
                                                name="tel"
                                                type="text"
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
                                    <div className="col-sm-9 text-secondary ordertime">
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>
                                                    영업시간
                                                </Accordion.Header>
                                                <Accordion.Body id="qq">
                                                    <div>
                                                        <div className="runningTime">
                                                            <label
                                                                name="monday"
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
                                                                    marginLeft:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="runningTime">
                                                            <label
                                                                name="tuesday"
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
                                                                    marginLeft:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="runningTime">
                                                            <label
                                                                name="wednesday"
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
                                                                    marginLeft:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="runningTime">
                                                            <label
                                                                name="thursday"
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
                                                                    marginLeft:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="runningTime">
                                                            <label
                                                                name="friday"
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
                                                                    marginLeft:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="runningTime">
                                                            <label
                                                                name="saturday"
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
                                                                    marginLeft:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                style={{
                                                                    height: "30px",
                                                                }}
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="runningTime">
                                                            <label
                                                                name="sunday"
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
                                                                    marginLeft:
                                                                        "10px",
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
                                                                readOnly={
                                                                    !isEdit
                                                                }
                                                                onChange={(e) =>
                                                                    setOrdertime(
                                                                        {
                                                                            ...ordertime,
                                                                            [e
                                                                                .target
                                                                                .id]:
                                                                                [
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ],
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
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
                            <div className="col-sm-2 btnAddMenuArea">
                                <button
                                    className="btn btnMenu btnAddMenu"
                                    onClick={() => {
                                        MenuModalShow();
                                    }}
                                >
                                    메뉴 추가
                                </button>
                            </div>
                            <Modal
                                show={menuAddModalshow}
                                onHide={menuAddModalClose}
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        {cardchk ? "메뉴 수정" : "메뉴 추가"}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <div className="ex-layout">
                                            <div className="main">
                                                <div className="left-menu addMenuModalImg">
                                                    {cardchk ? (
                                                        <img
                                                            alt="메뉴이미지"
                                                            src={
                                                                cardmenu.image
                                                                    .path
                                                            }
                                                        />
                                                    ) : (
                                                        <img
                                                            alt="메뉴이미지"
                                                            src={
                                                                `http://192.168.240.250:8080` +
                                                                menuImgsrc
                                                            }
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
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        console.log(
                                                                            cardmenu
                                                                        );
                                                                        setCardMenu(
                                                                            {
                                                                                ...cardmenu,
                                                                                [e
                                                                                    .target
                                                                                    .name]:
                                                                                    e
                                                                                        .target
                                                                                        .value,
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
                                                                    id="menuName"
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
                                                                <InputGroup className="mb-3">
                                                                    <Form.Control
                                                                        name="price"
                                                                        type="Number"
                                                                        value={
                                                                            cardmenu.price
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
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                    <InputGroup.Text id="basic-addon2">
                                                                        원
                                                                    </InputGroup.Text>
                                                                </InputGroup>
                                                            ) : (
                                                                <InputGroup className="mb-3">
                                                                    <Form.Control
                                                                        name="price"
                                                                        type="Number"
                                                                        id="menuprice"
                                                                        value={
                                                                            menuPrice
                                                                        }
                                                                        placeholder="메뉴 가격을 적어주세요."
                                                                        autoFocus
                                                                        onChange={
                                                                            menuPriceChange
                                                                        }
                                                                    />
                                                                    <InputGroup.Text id="basic-addon2">
                                                                        원
                                                                    </InputGroup.Text>
                                                                </InputGroup>
                                                            )}
                                                        </Form.Group>
                                                    </div>
                                                    <div className="comment">
                                                        <Form.Group className="mb-3 filebox">
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
                                                        [e.target.name]:
                                                            e.target.value,
                                                    });
                                                }}
                                                className="menuDescription addMenuModalIntro"
                                                name="description"
                                                as="textarea"
                                                value={cardmenu.description}
                                            />
                                        ) : (
                                            <Form.Control
                                                onChange={menuDescriptionChange}
                                                className="addMenuModalIntro"
                                                name="description"
                                                as="textarea"
                                                value={menuDescription}
                                                placeholder="메뉴 소개"
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
                            {/* </div> */}
                        </div>
                        <hr />
                        <div className="row franmenuzone--bodyzone">
                            <div className="franmenuzone--menulistzone">
                                <ListGroup>
                                    <Row>
                                        {menuList.length > 0 ? (
                                            <div>
                                                {menuList.map((ele, idx) => {
                                                    return (
                                                        <div
                                                            className="menulistIndex"
                                                            key={idx}
                                                        >
                                                            <img
                                                                alt="메뉴이미지"
                                                                src={
                                                                    `http://192.168.240.250:8080` +
                                                                    menuList[
                                                                        idx
                                                                    ].image.path
                                                                }
                                                                className="menulistImg"
                                                            />
                                                            <div className="menulistMenuName">
                                                                <span>
                                                                    {
                                                                        menuList[
                                                                            idx
                                                                        ].name
                                                                    }
                                                                </span>
                                                            </div>

                                                            <span className="menulistButtonZone">
                                                                <span
                                                                    role="button"
                                                                    className="EventText"
                                                                    onClick={() => {
                                                                        setCardMenu(
                                                                            ele
                                                                        );
                                                                        CardClick();
                                                                    }}
                                                                >
                                                                    수정
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        color: "#4187f5",
                                                                        opacity:
                                                                            "0.5",
                                                                    }}
                                                                >
                                                                    ㅣ
                                                                </span>
                                                                <span
                                                                    role="button"
                                                                    className="EventText"
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
                                                                </span>
                                                            </span>
                                                            <div className="menulistPriceZone">
                                                                {`${menuList[idx].price}원`}
                                                            </div>
                                                            <div className="menulistIntroZone">
                                                                {
                                                                    menuList[
                                                                        idx
                                                                    ]
                                                                        .description
                                                                }
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="franmenuzone--menulistzone--defaultMenuZone">
                                                <h1>
                                                    <TbBoxOff
                                                        style={{
                                                            color: "#4187f5",
                                                        }}
                                                    />
                                                </h1>
                                                <div>
                                                    <p>
                                                        가맹점에 등록된 메뉴가
                                                        없습니다
                                                    </p>
                                                    <p>
                                                        우측 상단의 메뉴추가
                                                        버튼을 통해 메뉴를
                                                        추가해주세요
                                                    </p>
                                                </div>
                                            </div>
                                        )}
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
            </div>
        </>
    );
}

export default BusinessListForm;
