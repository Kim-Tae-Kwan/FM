import Footer from "../template/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillLock } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import "../css/Login.css";
import axios from "axios";
import { useState,useContext } from "react";
import {loginCreateContext} from '../template/SearchBar'

function LoginFormDesign() {
  const loginmodalHandler = useContext(loginCreateContext)
  // axios.defaults.baseURL='http://localhost:8080';

  const [email,setEmail] = useState();
  const userinfoEmail = (e) =>{
    setEmail(e.target.value)
  }
  const [password,setPassword] = useState();
  const userinfoPassword = (e) => {
    setPassword(e.target.value)
  }
  const loginOnclick = (e)=>{
    e.preventDefault();
    axios({
      method:'post',
      url:'/api/sign/signin',
      data:{
        email: email,
        password: password
      }
    }).then(function (response){
      loginmodalHandler.setLoginShow(false)
      console.log(response.data.accessToken)
      localStorage.setItem('Authorization',response.data.accessToken)
    })
  }


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
            <a href="#">회원가입</a>
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
