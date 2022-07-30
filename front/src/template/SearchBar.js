import React, { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Card } from "react-bootstrap";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { TbSearch } from "react-icons/tb";

import "../css/SearchBar.css";
import { instance } from "./AxiosConfig/AxiosInterceptor";

export const loginCreateContext = createContext();
export const registcreateContext = createContext();

function SearchBar({ searchResultTogFun }) {
    let [showRegister, setRegisterShow] = useState(false);

    const showRegisterModal = () => {
        setRegisterShow(true);
    };

    let [showLogin, setLoginShow] = useState(false);

    const showLoginModal = () => {
        setLoginShow((showLogin = !showLogin));
    };

    let [showAddFren, setAddFrenShow] = useState(false);

    const showAddFrenModal = () => {
        setAddFrenShow((showAddFren = !showAddFren));
    };
    const [username, setUsername] = useState(localStorage.getItem("userName"));
    //사업자 번호에 따른 사업자 번호 메인 화면에서 출력
    // const [havefranchisee, setHavefranchisee] = useState(false);

    const logoutHandler = () => {
        instance({
            method: "post",
            url: "/sign/signout",
            data: {
                email: localStorage.getItem('email'),
                // localStorage.getItem('email')
            },
        }).then(function (res) {
            localStorage.clear();
            setUsername("");
            alert("로그 아웃");
        });
    };

    return (
        <>
            <div className="searchArea">
                <div className="searchArea--Input">
                    <InputGroup className="mb-4" id="searchArea--InputForm">
                        <input
                            type="text"
                            id="searchArea__searchInput"
                            placeholder="검색내용"
                        />
                        <button
                            id="searchArea--Input__searchBtn"
                            onClick={searchResultTogFun}
                        >
                            <TbSearch
                                id="searchArea--Input__searchIcon"
                                size="24"
                            />
                        </button>
                    </InputGroup>
                </div>
                <div className="dropdown">
                    <img
                        src="./img/usermarker.png"
                        alt="유저사진"
                        role="button"
                    ></img>
                    <ul
                        className="dropdown-menu searchArea--dropdown__dropdownlist"
                        // role="card"
                        aria-labelledby="dropdownMenuLink"
                    >
                        {localStorage.getItem("accessToken") && (
                            <Card.Header> <p>{username} 님</p>
                            <p>환영합니다.</p></Card.Header>
                        )}
                        {/* {havefranchisee && (
                            <Card.Body>
                                <Card.Text>사업자 번호</Card.Text>
                            </Card.Body>
                        )} */}
                        {!localStorage.getItem("accessToken") && (
                            <registcreateContext.Provider
                                value={{
                                    showRegister,
                                    setRegisterShow,
                                }}
                            >
                                <li role="button">
                                    <p
                                        className="dropdown-item"
                                        onClick={showRegisterModal}
                                    >
                                        회원가입
                                    </p>
                                    <RegisterModal></RegisterModal>
                                </li>
                            </registcreateContext.Provider>
                        )}
                        {!localStorage.getItem("accessToken") && (
                            <loginCreateContext.Provider
                                value={{
                                    showLogin,
                                    setLoginShow,
                                    username,
                                    setUsername,
                                }}
                            >
                                <li role="button">
                                    <p
                                        className="dropdown-item"
                                        onClick={showLoginModal}
                                    >
                                        로그인
                                    </p>
                                    <LoginModal></LoginModal>
                                </li>
                            </loginCreateContext.Provider>
                        )}
                        {localStorage.getItem("accessToken") && (
                            <li role="button">
                                <a className="dropdown-item" href="/mypage">
                                    마이페이지
                                </a>
                            </li>
                        )}
                        {localStorage.getItem("accessToken") && (
                            <li role="button">
                                <p
                                    className="dropdown-item"
                                    onClick={logoutHandler}
                                >
                                    로그아웃
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SearchBar;
