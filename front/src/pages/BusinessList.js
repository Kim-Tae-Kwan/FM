import React, { createContext, useEffect, useState } from "react";
import { Container, Accordion } from "react-bootstrap";
import Header from "../template/Header";
import Footer from "../template/Footer";
import "../css/BusinessList.css";
import BusinessListForm from "../template/BusinessListForm";
import axios from "axios";

function BusinessListAccordian() {
    const [franList, setFranList] = useState("");
    let userId = localStorage.getItem("userId");

    useEffect(() => {
        axios({
            method: "get",
            url:
                `http://192.168.240.250:8080/api/v1/member/` +
                userId +
                `/franchisee`,
        }).then(function (res) {
            setFranList(res.data);
        });
    }, []);
    return (
        <>
            <Container className="businessList-Container" style={{position:'relative',minHeight:'100%',height:'auto'}}>
                <Accordion defaultActiveKey="0">
                    {Array.from({ length: franList.length }).map((_, idx) => (
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
                    ))}
                </Accordion>
            </Container>
            <Footer></Footer>
        </>
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