import React, { createContext, useEffect, useState } from "react";
import { Container, Accordion, Nav, NavLink } from "react-bootstrap";
import Header from "../template/Header";
import Footer from "../template/Footer";
import "../css/BusinessList.css";
import BusinessListForm from "../template/BusinessListForm";
import axios from "axios";
import BlAddFranchiseeModal from "../template/BlAddFranchiseeModal";
import { instance } from "../template/AxiosConfig/AxiosInterceptor";

export const BlmodalControllerContext = createContext();

function BusinessListAccordian() {
    const [franList, setFranList] = useState("");
    const [franChk, setFranChk] = useState();

    //createContext()에 대한 넒길 정보 useState
    const [showAddFrenModal, setAddFrenModalShow] = useState(false);

    const [list, setList] = useState([]);
    useEffect(() => {
        instance({
            method: "get",
            url: `/member/` + localStorage.getItem("userId") + `/franchisee`,
        }).then(function (res) {
            if (res.data.length !== 0) {
                setFranChk(false);
            } else {
                setFranChk(true);
            }
            setFranList(res.data);
        });
    }, [list]);
    return (
        <BlmodalControllerContext.Provider
            value={{
                showAddFrenModal,
                setAddFrenModalShow,
                setList,
                list,
            }}
        >
            <Container
                className="businessList-Container"
                style={{
                    position: "relative",
                    minHeight: "100%",
                    height: "auto",
                }}
            >
                {franChk ? (
                    <div style={{ marginTop: "200px" }}>
                        <div style={{ textAlign: "center", fontSize: "24px" }}>
                            권한을 보유한 업체가 없습니다.
                        </div>
                        <div style={{ textAlign: "center", color: "gray" }}>
                            마이페이지에서 상권등록버튼을 이용하여 추가해주세요.
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button
                                className="col-sm-4 btn btn-primary"
                                onClick={() => setAddFrenModalShow(true)}
                            >
                                상권등록
                            </button>
                        </div>
                    </div>
                ) : (
                    <Accordion defaultActiveKey={Number(0)}>
                        {Array.from({ length: franList.length }).map(
                            (_, idx) => (
                                <Accordion.Item eventKey={idx} key={idx}>
                                    <Accordion.Header>
                                        {franList[idx].name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <BusinessListForm
                                            franchiseeList={franList[idx]}
                                        ></BusinessListForm>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        )}
                    </Accordion>
                )}
            </Container>
            <BlAddFranchiseeModal />
            <Footer></Footer>
        </BlmodalControllerContext.Provider>
    );
}

function BusinessList() {
    return (
        <>
            <Header></Header>
            <BusinessListAccordian></BusinessListAccordian>
        </>
    );
}

export default BusinessList;
