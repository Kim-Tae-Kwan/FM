import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DelMenuModals = ({ show, setShow, data, menuList, setMenuList }) => {
    const handleClose = () => setShow(false);
    const DelMenu = () => {
        axios({
            method: "delete",
            url: `http://192.168.240.250:8080/api/v1/menu/` + data.id,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem("accessToken")

            },
        }).then(function (res) {
            setShow(false);
            setMenuList(
                menuList.filter((menuList) => {
                    return menuList.id !== res.data.id;
                })
            );
        });
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>메뉴 삭제</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>{`${data.name} - ${data.businessNumber} `}</Modal.Body> */}
            <Modal.Body>{`메뉴 : ${data.name} (을)를 삭제하시겠습니까?`}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={DelMenu}>
                    삭제
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DelMenuModals;
