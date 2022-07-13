import React from "react";
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
import DatePickerForm from "../template/DatePickerForm";
import { FaChevronRight } from "react-icons/fa";
import "../css/BusinessList.css";

function BusinessListForm(props) {
  return (
    <>
      <Container
        className="BusinessList--Container"
        style={{
          marginTop: "40px",
        }}
      >
        <Row className="BusinessList--Row" style={{ padding: "30px" }}>
          <Col></Col>
          <Col>
            <h1 id="BusinessList--Row__Header">사업장</h1>
            <Form.Select
              aria-label="Default select example"
              className="BusinessList--Row__ColText"
            >
              <option className="BusinessList--Row__ColText">한신닭발</option>
              <option className="BusinessList--Row__ColText" value="1">
                이디야
              </option>
              <option className="BusinessList--Row__ColText" value="2">
                청기와식당
              </option>
            </Form.Select>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={8}  className="BusinessList--Coll__ContentBox">
            <Row className="BusinessList--RowContents">
              <Col>
                <h5 className="BusinessList--Row__ColText">대표이미지</h5>
              </Col>
              <Col>
                <h5></h5>
              </Col>
              <Col>
                <img
                  src="https://dummyimage.com/90x90/000/fff&text=food"
                  style={{ float: "right", borderRadius: "50px" }}
                />
              </Col>
            </Row>
            <Row className="BusinessList--RowContents">
              <Col>
                <h5 className="BusinessList--Row__ColText">사업자번호</h5>
              </Col>
              <Col>
                <h5 className="BusinessList--Row__ColText">3714-158988-01</h5>
              </Col>
              <Col>
                <h5 className="BusinessList--Enter">
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
            <Row className="BusinessList--RowContents">
              <Col>
                <h5 className="BusinessList--Row__ColText">가게명</h5>
              </Col>
              <Col>
                <h5 className="BusinessList--Row__ColText">한신닭발</h5>
              </Col>
              <Col>
                <h5 className="BusinessList--Enter">
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
            <Row className="BusinessList--RowContents">
              <Col>
                <h5 className="BusinessList--Row__ColText">대표자명</h5>
              </Col>
              <Col>
                <h5 className="BusinessList--Row__ColText">백주부</h5>
              </Col>
              <Col>
                <h5 className="BusinessList--Enter">
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
            <Row className="BusinessList--RowContents">
              <Col>
                <h5 className="BusinessList--Row__ColText">주소</h5>
              </Col>
              <Col>
                <Form.Control
                  className="BusinessList--Row__ColText"
                  id="postcode--addressNumber"
                  type="text"
                  placeholder="우편번호"
                  readOnly
                />

                <Form.Control
                  className="mt-3 BusinessList--Row__ColText"
                  type="text"
                  id="postcode--Address"
                  placeholder="주소"
                  readOnly
                ></Form.Control>
                <Form.Control
                  className="mt-3 BusinessList--Row__ColText"
                  type="text"
                  id="postcode-detailAddress"
                  placeholder="상세주소"
                  readOnly
                ></Form.Control>
              </Col>
              <Col>
                <h5 className="BusinessList--Enter">
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
            <Row className="Mypage--RowContents">
              <Col>
                <h5 className="BusinessList--Row__ColText">가맹점소개</h5>
              </Col>
              <Col>
                <h5>
                  <Form.Control
                    className="BusinessList--Row__ColText"
                    as="textarea"
                    value="가맹점 소개글"
                    style={{ height: "300px", width: "400px", resize: "none" }}
                    readOnly
                  />
                </h5>
              </Col>
              <Col>
                <h5 className="BusinessList--Enter">
                  <FaChevronRight />
                </h5>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

function BusinessList() {
  const title = "사업장리스트";
  return (
    <>
      <Header title={title}></Header>
      <BusinessListForm></BusinessListForm>
      <Footer></Footer>
    </>
  );
}

export default BusinessList;
