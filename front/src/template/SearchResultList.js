import React, { useState } from 'react';
import {InputGroup, Offcanvas, Card} from 'react-bootstrap';
import '../css/SearchResultList.css';
import SearchDetail from './SearchDetail';



function SearchResultList({options, tog}) {

  const handleClose = () => tog.setToggle(false);

  let [toggle2, setToggle2] = useState(false);

  const callback2 = () => {
    setToggle2(toggle2=!toggle2);
  }

  const options2 = 
    {
      scroll: true,
      backdrop: true,
    }

  return (
    <>
      <Offcanvas className={'searchResultlist-offcanvas'} show={tog.toggle} onHide={handleClose} {...options} style={{width:'480px'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={'searchResultlist-offcanvasbody--bodyzone'} style={{marginTop:'35px'}}>
        <SearchDetail options={options2} tog2={{toggle2,setToggle2}}/>
        <Card role={'button'} onClick={()=>{callback2()}} style={{ width: '100%' }} className={'searchResultlist-offcanvasbody--cardzone'}>          
          <Card.Body>
            <Card.Title>검색된 식당 이름</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">한식당 / 일식당</Card.Subtitle>
            <Card.Text>
              <Card.Img className="searchResultlist-offcanvasbody--cardzone__img" variant="right" src="https://dummyimage.com/600x400/000/fff&text=test"/>
              식당에 대한 내용입니다.
              여러줄이 입력되도 상관없습니다.
              입력테스트~~
            </Card.Text>
            <Card.Link href="#">추가 기능1</Card.Link>
            <Card.Link href="#">추가 기능2</Card.Link>
          </Card.Body>
        </Card>
        <Card className={'searchResultlist-offcanvasbody--cardzone'}>
          <Card.Body>
            <Card.Title>검색된 식당 이름2</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">한식당 / 일식당</Card.Subtitle>
            <Card.Text>
              <Card.Img  className="searchResultlist-offcanvasbody--cardzone__img"variant="right" src="https://dummyimage.com/600x400/000/fff&text=test"/>
              식당에 대한 내용입니다.
              여러줄이 입력되도 상관없습니다.
              입력테스트~~
            </Card.Text>
            <Card.Link href="#">추가 기능1</Card.Link>
            <Card.Link href="#">추가 기능2</Card.Link>
          </Card.Body>
        </Card>
        <Card className={'searchResultlist-offcanvasbody--cardzone'}>
          <Card.Body>
            <Card.Title>검색된 식당 이름3</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">한식당 / 일식당</Card.Subtitle>
            <Card.Text>
              <Card.Img className="searchResultlist-offcanvasbody--cardzone__img" variant="right" src="https://dummyimage.com/600x400/000/fff&text=test"/>
              식당에 대한 내용입니다.
              여러줄이 입력되도 상관없습니다.
              입력테스트~~
            </Card.Text>
            <Card.Link href="#">추가 기능1</Card.Link>
            <Card.Link href="#">추가 기능2</Card.Link>
          </Card.Body>
        </Card>
        <Card className={'searchResultlist-offcanvasbody--cardzone'}>
          <Card.Body>
            <Card.Title>검색된 식당 이름4</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">한식당 / 일식당</Card.Subtitle>
            <Card.Text>
              <Card.Img className="searchResultlist-offcanvasbody--cardzone__img" variant="right" src="https://dummyimage.com/600x400/000/fff&text=test"/>
              식당에 대한 내용입니다.
              여러줄이 입력되도 상관없습니다.
              입력테스트~~
            </Card.Text>
            <Card.Link href="#">추가 기능1</Card.Link>
            <Card.Link href="#">추가 기능2</Card.Link>
          </Card.Body>
        </Card>
        <Card className={'searchResultlist-offcanvasbody--cardzone'}>
          <Card.Body>
            <Card.Title>검색된 식당 이름3</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">한식당 / 일식당</Card.Subtitle>
            <Card.Text>
              <Card.Img className="searchResultlist-offcanvasbody--cardzone__img" variant="right" src="https://dummyimage.com/600x400/000/fff&text=test"/>
              식당에 대한 내용입니다.
              여러줄이 입력되도 상관없습니다.
              입력테스트~~
            </Card.Text>
            <Card.Link href="#">추가 기능1</Card.Link>
            <Card.Link href="#">추가 기능2</Card.Link>
          </Card.Body>
        </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchResultList;