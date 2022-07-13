import React, { useState } from "react";
import Mypage from "../pages/Mypage";
import { Modal, ModalBody, Button, Container, Row, Col } from "react-bootstrap";

export default function MypageModal({ modalShow }) {
  const handleClose = () => modalShow.setMypageShow(false);

  return (
    <>
      <Modal
        style={{ marginTop: "10%" }}
        show={modalShow.showMypage}
        onHide={handleClose}
        keyboard={false}
      >
        <ModalBody>
          <Container>
            <Row className="Mypage--RowContents">
              <Col>
                <h5>이름</h5>
              </Col>
              <Col>
                <h5>홍길동</h5>
              </Col>
              <Col>
                <h5 style={{ float: "right", fontWeight: "bold" }}>{">"}</h5>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
}
