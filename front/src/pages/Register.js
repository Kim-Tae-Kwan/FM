import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import useDaumPostcodePopup from 'react-daum-postcode/lib/useDaumPostcodePopup';
import DatePickerForm from '../template/DatePickerForm';
import { registcreateContext } from '../template/SearchBar';
import Timer from '../template/Timer'
import { instance } from '../template/AxiosConfig/AxiosInterceptor';
function RegisterFormDesign() {

    const registmodalInfo = useContext(registcreateContext)

    let scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    const open = useDaumPostcodePopup(scriptUrl);

    const [address, setAddress] = useState({
        jibun: '',
        postalCode: '',
        road: ''
    })

    const searchAddress = (data) => {
        document.getElementById("postcode--addressNumber").value = data.zonecode;
        setAddress({
            ...address,
            jibun: data.jibunAddress,
            postalCode: data.zonecode,
            road: data.address
        })
        if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            document.getElementById("postcode--Address").value = data.roadAddress;
            setAddress({
                ...address,
                jibun: data.jibunAddress,
                postalCode: data.zonecode,
                road: data.address
            })
            if (data.autoJibunAddress === "") {
                // autoAddress가 없는 경우
                setAddress({
                    ...address,
                    jibun: data.jibunAddress,
                    postalCode: data.zonecode,
                    road: data.address
                })
            } else {
                // autoAddress가 있는 경우
                setAddress({
                    ...address,
                    jibun: data.autoJibunAddress,
                    postalCode: data.zonecode,
                    road: data.address
                })
            }
        } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            document.getElementById("postcode--Address").value = data.jibunAddress;
            setAddress({
                ...address,
                jibun: data.jibunAddress,
                postalCode: data.zonecode,
                road: data.address
            })
        }
    };

    const handleClick = () => {
        open({ onComplete: searchAddress });
    };

    const registOnclick = (e) => {
        // console.log('1',e.target.form[1].value)
        // console.log('2',e.target.form[2].value)
        // console.log('3',e.target.form[3].value)
        // console.log('4',e.target.form[4].value)
        // console.log('5',e.target.form[5].value)
        // console.log('6',e.target.form[6].value)
        // console.log('7',e.target.form[8].value)
        // console.log('8',e.target.form[9].value)
        // console.log('9',e.target.form[10].value)
        e.preventDefault();
        if (e.target.form[1].value) {
            if (e.target.form[2].value) {
                if (e.target.form[4].value) {
                    if (e.target.form[5].value) {
                        if (e.target.form[6].value) {
                            if (registstate.pwchkstate
                                && registstate.emailchkstate
                                && e.target.form[5].value.length === 8
                                ) {
                                instance({
                                    method: 'post',
                                    url: '/sign/signup',
                                    data: {
                                        address: {
                                            ...address,
                                            detail: e.target.form[9].value,
                                        },
                                        email: e.target.form[1].value,
                                        password: e.target.form[2].value,
                                        name: e.target.form[4].value,
                                        phoneNumber: '010' + e.target.form[5].value,
                                        birth: e.target.form[10].value
                                    }
                                }).then(function (res) {
                                    registmodalInfo.setRegisterShow(false);
                                    alert('회원가입이 완료 되었습니다.')
                                }).catch(function(err){
                                    console.log(err)
                                })
                            }else{
                            }
                        } else {
                            alert('주소와 우편번호가 비어있습니다.')
                        }
                    } else {
                        alert('전화번호 란이 비어 있습니다.')
                    }
                } else {
                    alert('이름 란이 비어 있습니다.')
                }
            } else {
                alert('비밀번호 란이 비어 있습니다.')
            }
        } else {
            alert('이메일 란이 비어 있습니다.')
        }

    }

    //  value validate check logic
    const [emailchkMessage, setEmailchkmessage] = useState();
    const [registstate, setRegiststate] = useState({
        emailchkstate: false,
        pwchkstate: false,
    })
    const validateEmail = (e) => {
        const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (regexEmail.test(e.target.value)) {
            setEmailchkmessage(true)
            setRegiststate({
                ...registstate,
                emailchkstate: true
            })
        } else {
            setEmailchkmessage(false)
            setRegiststate({
                ...registstate,
                emailchkstate: false
            })
        }
    }

    const [chkemailinput, setChkemailinput] = useState(false)
    const [activeTimer, setActiveTimer] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();

        if (chkemailinput && activeTimer) {
            setActiveTimer(false)
            setTimeout(() => { setActiveTimer(true) }, 1)
        }
        if (registstate.emailchkstate) {
            instance.post(
                '/validation/sign-up/send-code', 
                { email: e.target.form[1].value }
            ).then((res) => {
                console.log(res)
                setChkemailinput(true)
                setActiveTimer(true)
                setRegiststate({
                    ...registstate,
                    emailchkstate: false
                })
                setTimeout(() => {
                    setRegiststate({
                        ...registstate,
                        emailchkstate: true
                    })
                }, 60000)
            }).catch((err) => {
                console.log(err)
                alert('이미 회원가입 되어 있습니다.')
            })
        } else {
            alert('올바른 이메일 형식을 넣어 주십시오')
        }
    }

    const [sendvaliemail, setSendvaliemail] = useState(false);
    const chkvalidateEmail = (e) => {
        e.preventDefault();
        if (e.target.form[2].value) {
            instance.get(
                '/validation/sign-up/check-code?email='+e.target.form[1].value+'&code='+e.target.form[2].value
                ).then((res) => {
                setChkemailinput(false)
                setSendvaliemail(true)
                setActiveTimer(false)
                alert('인증이 완료되었습니다.')
            }).catch((err) => {
                console.log(err)
            })
        } else {
            alert('인증번호 값이 비어있습니다.')
        }
        // e.target.form[2].value
    }

    const [validatepw, setValidatepw] = useState({ pw: '', pwchk: '' });
    const [chkmsg, setChkmsg] = useState();
    const pwvalidate = (e) => {
        setValidatepw({
            ...validatepw,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (validatepw.pw === validatepw.pwchk) {
            setChkmsg('')
            setRegiststate({
                ...registstate,
                pwchkstate: true
            })
        } else {
            setChkmsg('비밀번호가 일치 하지 않습니다.')
            setRegiststate({
                ...registstate,
                pwchkstate: false
            })
        }
    }, [validatepw.pw, validatepw.pwchk])



    return (
        <Container>
            <Row>
                <Col className="Contents-Header" style={{ textAlign: 'center' }}><h2>회원가입</h2></Col>
            </Row>
            <Form className='LoginForm'>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Button
                        onClick={sendEmail}
                        style={{ marginLeft: '5px', width: '60px', paddingTop: '0px', paddingBottom: '0px' }}
                        disabled={!registstate.emailchkstate}>
                        인증
                    </Button>
                    {emailchkMessage ?
                        <span style={{ fontSize: '10pt', color: 'green', marginLeft: '10px' }}>올바른 이메일 형식입니다.</span>
                        : <span style={{ fontSize: '10pt', color: 'red', marginLeft: '10px' }}>이메일 형식을 확인해 주세요</span>

                    }
                    <Form.Control
                        type="email"
                        placeholder="이메일"
                        onChange={validateEmail} />
                    {chkemailinput && <Form.Control type='text' placeholder='인증번호 입력'></Form.Control>}
                    {chkemailinput && <Button onClick={chkvalidateEmail}>확인</Button>}
                    {activeTimer && <Timer active={activeTimer} />}
                    {/* {!chkemailinput && <div style={{fontSize:'10pt',color:'green'}}>인증이 완료 되었습니다.</div>} */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        name='pw'
                        placeholder="비밀번호"
                        onChange={pwvalidate}
                        readOnly={!sendvaliemail}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPasswordChk">
                    <Form.Label>비밀번호확인</Form.Label>
                    <Form.Control type="password" name='pwchk' placeholder="비밀번호확인" onChange={pwvalidate} readOnly={!sendvaliemail} />
                    <div style={{ fontSize: '10pt', color: 'red' }}>{chkmsg}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" name='name' placeholder="이름" readOnly={!sendvaliemail} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='phonNum'>전화번호</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon3"> 010 </InputGroup.Text>
                        <Form.Control id="phonNum" placeholder='-를제외하고 입력해주세요.' readOnly={!sendvaliemail} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>주소</Form.Label>
                    <InputGroup style={{ width: '300px' }}>
                        <Form.Control
                            id="postcode--addressNumber"
                            type='text'
                            placeholder='우편번호'
                            defaultValue={address.postalCode}
                            readOnly={true}
                        />
                        <Button onClick={handleClick} style={{ zIndex: '0', backgroundColor:'#4187f5'}} variant="primary">우편번호 검색</Button>
                    </InputGroup>
                    <Form.Control
                        className='mb-3'
                        type='text'
                        id="postcode--Address"
                        readOnly={!sendvaliemail}
                        // readOnly={false}
                        placeholder='주소'></Form.Control>
                    <Form.Control
                        className='mb-3'
                        type='text'
                        id="postcode-detailAddress"
                        readOnly={!sendvaliemail}
                        // readOnly={false}
                        placeholder='상세주소'></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                    {/* <Form.Label>생년월일</Form.Label> */}
                    <DatePickerForm />
                </Form.Group>
                <Button
                    variant="primary"
                    size="lg"
                    id="Login-LoginForm__loginBtn"
                    onClick={registOnclick}
                    disabled={false}
                >
                    가입하기
                </Button>
            </Form>
        </Container >
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