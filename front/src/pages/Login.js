import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillLock } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import "../css/Login.css";
import { useState, useContext } from "react";
import { loginCreateContext } from "../template/SearchBar";
import {instance} from '../template/AxiosConfig/AxiosInterceptor'

function LoginFormDesign() {
    const loginmodalHandler = useContext(loginCreateContext);

    const [email, setEmail] = useState("");
    const userinfoEmail = (e) => {
        setEmail(e.target.value);
    };
    const [password, setPassword] = useState("");
    const userinfoPassword = (e) => {
        setPassword(e.target.value);
    };

    const loginOnclick = (e) => {
        if (email !== "" && password !== "") {
            instance({
                method: "post",
                url: "/sign/signin",
                data: {
                    email: email,
                    password: password,
                },
            })
                .then(function (res) {
                    console.log(res)
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("userId", res.data.id);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    localStorage.setItem("userName", res.data.name);
                    loginmodalHandler.setUsername(localStorage.getItem("userName"));
                }).then(function () {
                    instance
                        .get(
                            "/member/" + localStorage.getItem("userId"),
                        )
                        .then((res) => {
                            loginmodalHandler.setLoginShow(false);
                            localStorage.setItem("email", res.data.email);
                            alert("로그인 되었습니다.");
                        });
                })
                .catch((err) => {
                    alert('이메일을 확인해 주세요.')
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                loginOnclick();
                            }
                        }}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <AiFillLock />
                    </span>
                </div>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="아이디 저장" />
                </Form.Group> */}
                <Button
                    variant="primary"
                    size="lg"
                    id="Login-LoginForm__loginBtn"
                    onClick={loginOnclick}
                >
                    로그인
                </Button>
                {/* <div className="Login--SubContents mb-3">
                    <span>
                        <a className="Login--AccountSearch" href="{()=>false}">
                            아이디찾기/비밀번호찾기
                        </a>
                    </span>
                </div> */}
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
