import Footer from "../template/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillLock } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import "../css/Login.css";
import axios from "axios";
import { useState, useContext } from "react";
import { loginCreateContext } from "../template/SearchBar";

function LoginFormDesign() {
    const loginmodalHandler = useContext(loginCreateContext);
    // axios.defaults.baseURL='http://localhost:8080';

    const [email, setEmail] = useState("");
    const userinfoEmail = (e) => {
        setEmail(e.target.value);
    };
    const [password, setPassword] = useState("");
    const userinfoPassword = (e) => {
        setPassword(e.target.value);
    };

    const loginOnclick = (e) => {
        if (email != "" && password != "") {
            axios({
                method: "post",
                url: "http://192.168.240.250:8080/api/v1/sign/signin",
                data: {
                    email: email,
                    password: password,
                },
            })
                .then(function (res) {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("userId", res.data.id);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    localStorage.setItem("userName", res.data.name);
                    loginmodalHandler.setUsername(
                        localStorage.getItem("userName")
                    );
                    axios
                        .get(
                            "http://192.168.240.250:8080/api/v1/member/" +
                                localStorage.getItem("userId"),
                            {
                                headers: {
                                    Authorization:
                                        localStorage.getItem("accessToken"),
                                },
                            }
                        )
                        .then((res) => {
                            loginmodalHandler.setLoginShow(false);
                            localStorage.setItem("email", res.data.email);
                        });
                    alert("로그인 되었습니다.");
                })
                .catch((err) => {
                    alert("error");
                });
        } else {
            alert("ID,PW를 입력해주세요");
        }
    };

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={5} className="Login-Header">
                    로그인
                </Col>
                <Col></Col>
            </Row>
            <Form className="LoginForm">
                <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                >
                    <input
                        className="input100 userEmail"
                        id="userEmail"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={userinfoEmail}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <MdEmail />
                    </span>
                </div>
                <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                >
                    <input
                        className="input100 userPassword"
                        type="password"
                        name="pass"
                        placeholder="Password"
                        onChange={userinfoPassword}
                        onKeyDown={(e)=>{if(e.key==='Enter'){loginOnclick()}}}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <AiFillLock />
                    </span>
                </div>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="아이디 저장" />
                </Form.Group>
                <Button
                    variant="primary"
                    size="lg"
                    id="Login-LoginForm__loginBtn"
                    onClick={loginOnclick}
                >
                    로그인
                </Button>
                <div className="Login--SubContents mb-3">
                    <span>
                        <a className="Login--AccountSearch" href="#">
                            아이디찾기/비밀번호찾기
                        </a>
                    </span>
                </div>
            </Form>
        </Container>
    );
}

function Login() {
    return (
        <div className="Login">
            <LoginFormDesign></LoginFormDesign>
        </div>
    );
}

export default Login;
