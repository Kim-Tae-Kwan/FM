import '../App.css';
import {Container,Form,Row,Col,Image,Button,InputGroup } from 'react-bootstrap'
import useDaumPostcodePopup from 'react-daum-postcode/lib/useDaumPostcodePopup';
import 'bootstrap/dist/css/bootstrap.css';
import { useContext, useEffect, useState } from 'react';
import { franchiseeinfoContext } from '../template/AddFranchiseeModal'

function AddFranchisee() {
  const franchiseeInfo = useContext(franchiseeinfoContext);
  let scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  const open = useDaumPostcodePopup(scriptUrl);
  let postcode;
  let jibun;
  let roadAdd;
  const handleComplete = (data) => {
    document.getElementById('postcode--addressNumber').value = data.zonecode
    roadAdd = data.address
    postcode = data.zonecode
    franchiseeInfo.setPostcode(postcode)
    franchiseeInfo.setJibunaddress(jibun)
    franchiseeInfo.setRoadaddress(roadAdd)

    if (data.userSelectedType === 'R') { 
      // 사용자가 도로명 주소를 선택했을 경우
      document.getElementById('postcode--address').value = data.roadAddress;
      franchiseeInfo.setFulladdress(roadAdd)
      jibun = data.autoJibunAddress;
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      document.getElementById('postcode--address').value = data.jibunAddress;
      jibun = data.jibunAddress
      franchiseeInfo.setFulladdress(jibun)
    }
    
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  let businessinput
  const businessOnchange = (event) => {
    businessinput = event.target.value
    franchiseeInfo.setBusinesscode(businessinput)
  }

  let franchiseename
  const franchiseOnchange = (event) =>{
    franchiseename = event.target.value
    franchiseeInfo.setFranchiseename(franchiseename)
  }

  let perspectname
  const persOnchange = (event) => {
    perspectname = event.target.value
    franchiseeInfo.setPerspectname(perspectname)
  }

  let detailaddress;
  const extraOnchange = (event) => {
    detailaddress = event.target.value
    franchiseeInfo.setDetailaddress(detailaddress)
  }

  let franchiseeIntro;
  const introOnchange = (event) => {
    franchiseeIntro = event.target.value
    franchiseeInfo.setFranchiseeintro(franchiseeIntro);
  }

  const [files,setFiles] = useState();
  const onLoadimage = (e)=>{
    const imageFile = e.target.files[0];
    encodingImg(imageFile)
  }

  const [imgsrc,setImgsrc] = useState('');
  const encodingImg = (imgfile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgfile);
    return new Promise((resolve)=>{
      reader.onload = () => {
        setImgsrc(reader.result);
        resolve();
      }
    })
  }
  
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2 style={{textAlign:'center'}}>상권 등록</h2>
          </Col>
        </Row>

        <Row>
          <Form>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>사업자 번호</Form.Label>
                <Form.Control 
                  onChange={businessOnchange} 
                  type="text" 
                  placeholder='사업자 번호' 
                  name='businessNumber' 
                  value={franchiseeInfo.businesscode} 
                  />
              </Form.Group>
            </Row>
            <Row>
                <Col sm={4}>
                  <Image className='imgBox' src={imgsrc}
                    style={
                        {
                          width:'130px', 
                          height:'150px',
                        }
                      }>
                  </Image>
                  <Form.Control
                    type="file"
                    className='file mt-3'
                    onChange={onLoadimage}
                    style={{width:'95px',marginLeft:'18px'}}
                  />
                </Col>
                <Col>
                    <Form.Label>가게 명</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="가게 이름"
                      onChange={franchiseOnchange}
                      value={franchiseeInfo.franchiseename}
                     />
                    <Form.Label>대표자</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="대표자 이름"
                    onChange={persOnchange}
                    value={franchiseeInfo.perspectname}
                    />
                </Col>
            </Row>

            <Row className='franchiseeadd-container--post'>
              <Row>
                <Col className='mt-3'>
                  <InputGroup style={{width:'300px'}}>
                    <Form.Control
                      id='postcode--addressNumber'
                      type='text'
                      placeholder='우편번호'
                      value={franchiseeInfo.postcode}
                    />
                    <Button variant="primary" onClick={handleClick}>우편번호 검색</Button>
                  </InputGroup>
                  <Form.Control 
                      type='text'
                      placeholder='주소'
                      id='postcode--address'
                      value={franchiseeInfo.fulladdress}
                  />
                  <Form.Control 
                      type='text'
                      placeholder='상세 주소'
                      id='postcode-detailAddress'
                      onChange={extraOnchange}
                      value={franchiseeInfo.detailaddress}
                  />
                </Col>
              </Row>

            </Row>
            <Row>
              <Row>
                <Col>
                  <Form.Label>가맹점 소개 </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    as="textarea"
                    placeholder="가맹점 소개글을 써주세요"
                    style={{ height: '100px',resize:'none'}}
                    onChange={introOnchange}
                    value={franchiseeInfo.franchiseeintro}
                  />
                </Col>
              </Row>
            </Row>
          </Form>          
        </Row>
      </Container>
    </>
  );
}

export default AddFranchisee;
