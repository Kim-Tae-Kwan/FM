import { useState } from "react";
import { Nav } from "react-bootstrap";
import "../css/Header.css";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Header() {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [color, setColor] = useState(false);

  const logoutHandler = () => {
    axios({
        method: 'post',
        url: 'http://192.168.240.250:8080/api/v1/sign/signout',
        data: {
            email: localStorage.getItem('email')
            // localStorage.getItem('email')
        }
    }).then(function (res) {
        console.log(res)
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = ''
        window.location.href='http://localhost:3000/'
    })
}

  return (
    <>
        <Navbar expand="lg" style={{ background: "#4287f5" }}>
            <Navbar.Brand 
                id="Header__mainText" 
                href="/"
                style={{marginTop:'-10px'}}
                >
                <img src="./img/logo.jpg"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav
                justify
                variant="pills"
                style={{ marginRight: "10px" }}
            >
                <Nav.Item>
                <NavLink
                    role='button'
                    to="/mypage"
                    eventkey="/link-1"
                    id="Header--Nav__BusinessList"
                    style={({ isActive }) => (isActive ? {backgroundColor:'rgb(13,110,253)'} : {})}
                >
                    마이페이지
                </NavLink>
                </Nav.Item>
                <Nav.Item>
                <NavLink
                    role='button'
                    to="/businessList"
                    eventkey="/link-1"
                    id="Header--Nav__BusinessList"
                    style={({ isActive }) => (isActive ? {backgroundColor:'rgb(13,110,253)'} : {})}
                >
                    가맹점리스트
                </NavLink>
                </Nav.Item>
                <Nav.Item>
                <NavLink
                    role='button'
                    to="/apitest"
                    eventkey="/link-1"
                    id="Header--Nav__BusinessList"
                    style={({ isActive }) => (isActive ? {backgroundColor:'rgb(13,110,253)'} : {})}
                >
                    API서비스
                </NavLink>
                </Nav.Item>
            </Nav>
            {/* <Navbar.Brand id="header__accountInfo" href="/">로그인</Navbar.Brand> */}
            <Navbar.Text className="dropdown">
                <a href="#" id="Header__Account__UserName">
                {localStorage.getItem('userName')}
                </a>
                <Navbar.Text className="Header--Account__UserInfo" href="/">
                <img
                    id="Header--Account__Img"
                    src="./img/usermarker.png"
                />
                </Navbar.Text>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li role="button">
                    <a className="dropdown-item">
                    마이페이지
                    </a>
                </li>
                <li role="button">
                    <a className="dropdown-item" onClick={logoutHandler}>
                    로그아웃
                    </a>
                </li>
                </ul>
            </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
      
    </>
  );
}

export default Header;
