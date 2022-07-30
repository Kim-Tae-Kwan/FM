import { Nav, Dropdown} from "react-bootstrap";
import "../css/Header.css";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import { instance } from "./AxiosConfig/AxiosInterceptor";
function Header() {
    // const [dropdownVisibility, setDropdownVisibility] = useState(false);
    // const [color, setColor] = useState(false);
    const logoutHandler = () => {
        instance({
            method: "post",
            url: "/sign/signout",
            data: {
                email: localStorage.getItem("email"),
            },
        }).then(function (res) {
            console.log(res);
            localStorage.clear();
            window.location.href = "http://localhost:3000/";
        });
    };

    return (
        <>
            <Navbar expand="lg" style={{ background: "#4287f5" }} fixed='top'>
                <Navbar.Brand
                    id="Header__mainText"
                    href="/"
                    style={{ marginTop: "-10px" }}
                >
                    <img alt="메인로고이미지" src="./img/logo.jpg" />
                </Navbar.Brand>
                {/* <Navbar.Toggle>
                    <a href={()=>false} id="Header__Account__UserName">
                        {localStorage.getItem("userName")}
                    </a>
                    <Navbar.Text className="Header--Account__UserInfo" href="/">
                        <img
                            alt="유저이미지"
                            id="Header--Account__Img"
                            src="./img/usermarker.png"
                        />
                    </Navbar.Text>
                </Navbar.Toggle> */}
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <Nav
                        justify
                        variant="pills"
                        style={{ marginRight: "10px" }}
                    >
                        <Nav.Item>
                            <NavLink
                                role="button"
                                to="/mypage"
                                eventkey="/link-1"
                                id="Header--Nav__BusinessList"
                                style={({ isActive }) =>
                                    isActive
                                        ? { backgroundColor: "#217af4" }
                                        : {}
                                }
                            >
                                마이페이지
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                role="button"
                                to="/businessList"
                                eventkey="/link-1"
                                id="Header--Nav__BusinessList"
                                style={({ isActive }) =>
                                    isActive
                                        ? { backgroundColor: "#217af4" }
                                        : {}
                                }
                            >
                                가맹점리스트
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                role="button"
                                to="/apiDocs"
                                eventkey="/link-1"
                                id="Header--Nav__BusinessList"
                                style={({ isActive }) =>
                                    isActive
                                        ? { backgroundColor: "#217af4" }
                                        : {}
                                }
                            >
                                API서비스
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text className="dropdown">
                    <Link to={()=>false} id="Header__Account__UserName">
                        {localStorage.getItem("userName")}
                    </Link>
                    <Navbar.Text className="Header--Account__UserInfo" href="/">
                        <img
                            alt="유저이미지"
                            id="Header--Account__Img"
                            src="./img/usermarker.png"
                        />
                    </Navbar.Text>
                    <ul
                        className="dropdown-menu header-dropdown"
                        aria-labelledby="dropdownMenuLink"
                    >
                        <li role="button">
                            <Link
                                to="/mypage"
                                className="dropdown-item"
                            >
                                마이페이지
                            </Link>
                        </li>
                        <li role="button">
                            <Link
                                to="/businessList"
                                className="dropdown-item"
                            >
                                가맹점리스트
                            </Link>
                        </li>
                        <li role="button">
                            <Link
                                to="/apiDocs"
                                className="dropdown-item"
                            >
                                API서비스
                            </Link>
                        </li>
                        <Dropdown.Divider />
                        <li role="button">
                            <Link
                                to={()=>false}
                                className="dropdown-item"
                                onClick={logoutHandler}
                            >
                                로그아웃
                            </Link>
                        </li>
                    </ul>
                </Navbar.Text>
            </Navbar>
        </>
    );
}

export default Header;
