import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Tab,Tabs,Card,ListGroup} from 'react-bootstrap';
import '../css/SearchDetail.css';

function SearchDetail({options,tog2}) {
  const handleClose2 = () => tog2.setToggle2(false);

  return (
    <>
      <Offcanvas className={'searchDeatil-offcanvas'} show={tog2.toggle2} onHide={handleClose2} placement={'start'} {...options}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>가게 이름</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={'searchDeatil-offcanvasbody--bodyzone'}>
          <div className="offcanvas-body--titlezone">
            <div>
              <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160504_295%2Fzzlidde_1462360339348GT0M2_PNG%2F2016-05-04_20.11.40.png&type=sc960_832" width='200px' />
            </div>
            <div>
              <h1>가게 이름</h1>
              <p>가게설명</p>
            </div>
          </div>
          <div className="searchDeatil-offcanvasbody--buttonzone">  
            <Tabs
              defaultActiveKey="home"
              className="mb-2 searchDeatil-offcanvasbody--buttontab"
            >
              <Tab eventKey="home" title="정보">
              <ListGroup variant="flush">
                <ListGroup.Item>주소 이미지 / 주소입니다</ListGroup.Item>
                <ListGroup.Item>전화번호 이미지 / 전화번호입니다</ListGroup.Item>
                <ListGroup.Item>영업 시간 / 영업시간 표입니다</ListGroup.Item>
              </ListGroup>
              </Tab>
              <Tab eventKey="profile" title="메뉴">
              <Card className={'searchDeatil-offcanvasbody--cardzone'}>
                <Card.Img variant="top" src="https://dummyimage.com/600x400/000/fff&text=menu" />
                <Card.Header>메뉴이름</Card.Header>
                <Card.Body>
                  <Card.Text>가격</Card.Text>
                  <Card.Text>메뉴설명입니다</Card.Text>
                </Card.Body>
              </Card>
              <Card className={'searchDeatil-offcanvasbody--cardzone'}>
                <Card.Img variant="top" src="https://dummyimage.com/600x400/000/fff&text=menu" />
                <Card.Header>메뉴이름</Card.Header>
                <Card.Body>
                  <Card.Text>가격</Card.Text>
                  <Card.Text>메뉴설명입니다</Card.Text>
                </Card.Body>
              </Card>
              <Card className={'searchDeatil-offcanvasbody--cardzone'}>
                <Card.Img variant="top" src="https://dummyimage.com/600x400/000/fff&text=menu" />
                <Card.Header>메뉴이름</Card.Header>
                <Card.Body>
                  <Card.Text>가격</Card.Text>
                  <Card.Text>메뉴설명입니다</Card.Text>
                </Card.Body>
              </Card>  
              </Tab>
              <Tab eventKey="contact" title="리뷰">
              <Card className={'searchDeatil-offcanvasbody--cardzone'}>
                <Card.Body>
                  <Card.Img style={{width:'80px', float: 'left'}} variant="left" src="https://dummyimage.com/600x400/000/fff&text=icon"/>
                  <Card.Title>리뷰1</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">별점</Card.Subtitle>
                  <Card.Text style={{clear:'both'}}>
                    리뷰내용
                    입력테스트~~
                  </Card.Text>
                  <Card.Link href="#">추가 기능1</Card.Link>
                  <Card.Link href="#">추가 기능2</Card.Link>
                </Card.Body>
              </Card>
              <Card className={'searchDeatil-offcanvasbody--cardzone'}>
                <Card.Body>
                  <Card.Img style={{width:'80px', float: 'left'}} variant="left" src="https://dummyimage.com/600x400/000/fff&text=icon"/>
                  <Card.Title>리뷰2</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">별점</Card.Subtitle>
                  <Card.Text style={{clear:'both'}}>
                    리뷰내용
                    입력테스트~~
                  </Card.Text>
                  <Card.Link href="#">추가 기능1</Card.Link>
                  <Card.Link href="#">추가 기능2</Card.Link>
                </Card.Body>
              </Card>
              <Card className={'searchDeatil-offcanvasbody--cardzone'}>
                <Card.Body>
                  <Card.Img style={{width:'80px', float: 'left'}} variant="left" src="https://dummyimage.com/600x400/000/fff&text=icon"/>
                  <Card.Title>리뷰3</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">별점</Card.Subtitle>
                  <Card.Text style={{clear:'both'}}>
                    리뷰내용
                    입력테스트~~
                  </Card.Text>
                  <Card.Link href="#">추가 기능1</Card.Link>
                  <Card.Link href="#">추가 기능2</Card.Link>
                </Card.Body>
              </Card>
              </Tab>
            </Tabs>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchDetail;