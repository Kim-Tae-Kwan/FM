import React,{useState} from 'react'
import {Container,Form,Row,Col,InputGroup,Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css'
import useDaumPostcodePopup from 'react-daum-postcode/lib/useDaumPostcodePopup';
import DatePickerForm from '../template/DatePickerForm';




function RegisterFormDesign() {
    let scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    const open = useDaumPostcodePopup(scriptUrl);
 
    const handleComplete = (data) => {

    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
      document.getElementById('postcode--Address').value = data.roadAddress;
    } else { // 사용자가 지번 주소를 선택했을 경우(J)
      document.getElementById('postcode--Address').value = data.jibunAddress;
    }

     console.log(data);
    
   };
 
   const handleClick = () => {
     open({ onComplete: handleComplete });
   };

    return (
        <Container>
        <Row>
            <Col></Col>
            <Col xs={5} className="Contents-Header">회원가입</Col>
            <Col></Col>
        </Row>
        <Form className='LoginForm'>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="이메일" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPasswordChk">
            <Form.Label>비밀번호확인</Form.Label>
            <Form.Control type="password" placeholder="비밀번호확인" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" placeholder="이름" />
          </Form.Group>
          <Form.Group>
              <Form.Label htmlFor='phonNum'>전화번호</Form.Label>
              <InputGroup>
                  <InputGroup.Text id="basic-addon3"> 010 </InputGroup.Text>
                  <Form.Control id="phonNum" placeholder='-를제외하고 입력해주세요.'/>
              </InputGroup>
          </Form.Group>
          <Form.Group className='mt-3'>
              <Form.Label>주소</Form.Label>
              <InputGroup style={{width:'300px'}}>
                  <Form.Control
                  id="postcode--addressNumber"
                  type='text'
                  placeholder='우편번호'
                  />
                  <Button onClick={handleClick} style={{zIndex:'0'}} variant="primary">우편번호 검색</Button>
              </InputGroup>
              <Form.Control className='mt-3' type='text' id="postcode--Address" placeholder='주소'></Form.Control>
              <Form.Control className='mt-3' type='text' id="postcode-detailAddress" placeholder='상세주소'></Form.Control>
          </Form.Group>
          <Form.Group>
              <Row className='mt-3'>
                  <Form.Label>성별</Form.Label>
              </Row>
              <Form.Check
                  inline
                  label="남"
                  name="group1"
                  type='radio'
              />
              <Form.Check
                  inline
                  label="녀"
                  name="group1"
                  type='radio'
              />
          </Form.Group>
          <Form.Group className='mb-3'>
              <Form.Label>생년월일</Form.Label>
              <DatePickerForm></DatePickerForm>
          </Form.Group>
          <Button variant="primary" type="submit" size="lg" id="Login-LoginForm__loginBtn">
            가입하기
          </Button>
        </Form>
      </Container>
    );
  }

  function Register() {
    return (
      <div className="Login">
        <RegisterFormDesign></RegisterFormDesign>
      </div>
    );
  }

export default Register;