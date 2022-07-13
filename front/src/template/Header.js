import { useState } from "react";
import {
  Nav,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Tab,
  Tabs,
} from "react-bootstrap";
import "../css/Header.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";

function Header(props) {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [color, setColor] = useState(false);

  return (
    <>
        <Navbar expand="lg" style={{ background: "#4287f5" }}>
            <Navbar.Brand id="Header__mainText" href="/">
            비즈플레이&비플페이
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
                    eventKey="/link-1"
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
                    eventKey="/link-1"
                    id="Header--Nav__BusinessList"
                    style={({ isActive }) => (isActive ? {backgroundColor:'rgb(13,110,253)'} : {})}
                >
                    사업장리스트
                </NavLink>
                </Nav.Item>
                <Nav.Item>
                <NavLink
                    role='button'
                    to="/apitest"
                    eventKey="/link-1"
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
                임상운
                </a>
                <Navbar.Text className="Header--Account__UserInfo" href="/">
                <img
                    id="Header--Account__Img"
                    src="data:image/png;base64,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"
                />
                </Navbar.Text>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                    <a className="dropdown-item" href="#">
                    마이페이지
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                    로그아웃
                    </a>
                </li>
                </ul>
            </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
      {/* <Navbar style={{ padding: "5px", borderBottom: "1px solid darkgray" }}>
        <Navbar.Text
          className="Header--Account__UserInfo"
          id="Header--Navbar__Detail"
        >
          {props.title}
        </Navbar.Text>
      </Navbar> */}
    </>
  );
}

export default Header;
