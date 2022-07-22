import axios from "axios";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DelFranModals = ({ show, setShow, data, list, setList }) => {
    const handleClose = () => setShow(false);
    const DelFran = () => {
        axios({
            method: "delete",
            url:
                `http://192.168.240.250:8080/api/v1/franchisee/` +
                data.businessNumber,
        }).then(function (res) {
            setShow(false);
            setList(
                list.filter((ele) => ele.businessNumber != data.businessNumber)
            );
        });
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data.name}</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>{`${data.name} - ${data.businessNumber} `}</Modal.Body> */}
            <Modal.Body>{`사업자번호 : ${data.businessNumber} 를 삭제하시겠습니까?`}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={DelFran}>
                    삭제
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DelFranModals;
