import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Table,
  Form,
} from "react-bootstrap";
import Header from "../template/Header";
import Footer from "../template/Footer";
import AddMenu from "./AddMenu";
import "../css/Mypage.css";
import DatePickerForm from "../template/DatePickerForm";
import MypageModal from "../template/MypageModal";
import { FaChevronRight } from "react-icons/fa";

function MypageForm() {
  let [showMypage, setMypageShow] = useState(false);

  const showMypageModal = () => {
    setMypageShow((showMypage = !showMypage));
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="Mypage--Container" style={{ marginTop: "40px" }}>
      <Row className="Mypage--Row ">
        <Col></Col>
        <Col>
          <h1 id="Mypage--Row__Header">개인정보</h1>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={8} className='Mypage--Col__ContentBox'>
          <a href="#" onClick={showMypageModal} className="Mypage--Update">
            <MypageModal
              modalShow={{ showMypage, setMypageShow }}
            ></MypageModal>
            <Row className="Mypage--RowContents">
              <Col>
                <h5 className="Mypage--Row__ColText">이메일</h5>
              </Col>
              <Col>
                <h5 className="Mypage--Row__ColText">tkratnkgasd</h5>
              </Col>
              <Col>
                <h5 style={{ float: "right", fontWeight: "bold" }}>
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
          </a>
          <a href="#" className="Mypage--Update">
            <Row className="Mypage--RowContents">
              <Col>
                <h5 className="Mypage--Row__ColText">이름</h5>
              </Col>
              <Col>
                <h5 className="Mypage--Row__ColText">홍길동</h5>
              </Col>
              <Col>
                <h5 style={{ float: "right", fontWeight: "bold" }}>
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
          </a>
          <a href="#" className="Mypage--Update">
            <Row className="Mypage--RowContents">
              <Col>
                <h5 className="Mypage--Row__ColText">핸드폰 번호</h5>
              </Col>
              <Col>
                <h5 className="Mypage--Row__ColText">010-3211-8749</h5>
              </Col>
              <Col>
                <h5 style={{ float: "right", fontWeight: "bold" }}>
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
          </a>
          <a href="#" className="Mypage--Update">
            <Row className="Mypage--RowContents">
              <Col>
                <h5 className="Mypage--Row__ColText">성별</h5>
              </Col>
              <Col>
                <h5>
                  <Form.Check
                    inline
                    label="남"
                    name="group1"
                    type="radio"
                    className="Mypage--Row__ColText"
                  />
                  <Form.Check
                    inline
                    label="여"
                    name="group1"
                    type="radio"
                    className="Mypage--Row__ColText"
                  />
                </h5>
              </Col>
              <Col>
                <h5 style={{ float: "right", fontWeight: "bold" }}>
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
          </a>
          <a href="#" className="Mypage--Update">
            <Row className="Mypage--RowContents">
              <Col>
                <h5 className="Mypage--Row__ColText">주소</h5>
              </Col>
              <Col>
                <Form.Control
                  className="Mypage--Row__ColText"
                  id="postcode--addressNumber"
                  type="text"
                  placeholder="우편번호"
                  readOnly
                />

                <Form.Control
                  className="mt-3 Mypage--Row__ColText"
                  type="text"
                  id="postcode--Address"
                  placeholder="주소"
                  readOnly
                ></Form.Control>
                <Form.Control
                  className="mt-3 Mypage--Row__ColText"
                  type="text"
                  id="postcode-detailAddress"
                  placeholder="상세주소"
                  readOnly
                ></Form.Control>
              </Col>
              <Col>
                <h5 style={{ float: "right", fontWeight: "bold" }}>
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
          </a>
          <a href="#" className="Mypage--Update">
            <Row className="Mypage--RowContents">
              <Col>
                <h5 className="Mypage--Row__ColText">생년월일</h5>
              </Col>
              <Col>
                <h5 className="Mypage--Row__ColText">
                  <DatePickerForm readOnly />
                </h5>
              </Col>
              <Col>
                <h5 style={{ float: "right", fontWeight: "bold" }}>
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
          </a>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

function Mypage() {
  const title = "마이페이지";
  return (
    <>
      <Header title={title}></Header>
      <MypageForm></MypageForm>
      <Footer></Footer>
    </>
  );
}

export default Mypage;
