import { List } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Modals = ({ show, setShow, data, list, setList }) => {
    const handleClose = () => setShow(false);
    const DelFran = () => {
        console.log(data);
        console.log(list);
        axios({
            method: "delete",
            headers: {
                Authorization: 'Bearer '+localStorage.getItem("accessToken")
            },
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
                <Button variant="danger" onClick={DelFran}>
                    삭제
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Modals;
