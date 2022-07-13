import React, { createContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup, Card } from 'react-bootstrap';
import RegisterModal from "./RegisterModal";
import LoginModal from './LoginModal'
import AddFranchiseeModal from './AddFranchiseeModal'
import { TbSearch } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';

import '../css/SearchBar.css';

export const loginCreateContext = createContext();

function SearchBar({callback}){
  let [showRegister,setRegisterShow] = useState(false);

  const showRegisterModal = () => {
    setRegisterShow(showRegister=!showRegister);
  }

  let [showLogin,setLoginShow] = useState(false);

  const showLoginModal = () => {
    setLoginShow(showLogin=!showLogin);
  }

  let [showAddFren,setAddFrenShow] = useState(false);

  const showAddFrenModal = () => {
    setAddFrenShow(showAddFren=!showAddFren);
  }

  return (
    <>
    <div className="searchArea"> 
        <div className="searchArea--Input"> 
            <InputGroup className="mb-4" id="searchArea--InputForm">
                <input type="text" id="searchArea__searchInput" placeholder="검색내용"/>
                <button id="searchArea--Input__searchBtn" onClick={callback}><TbSearch id="searchArea--Input__searchIcon" size="24"/></button>
            </InputGroup>
        </div>
        <div className="dropdown" >
            <img src='./img/usermarker.png' role='button'></img>
            <ul className="dropdown-menu searchArea--dropdown__dropdownlist" role="card" aria-labelledby="dropdownMenuLink">
            <Card.Header>유저이름</Card.Header>
            <Card.Body>
                <Card.Text>
                사업자 번호      
                </Card.Text>
            </Card.Body>
                <li role="button"><p className="dropdown-item" onClick={showRegisterModal}>회원가입</p><RegisterModal modalShow={{showRegister,setRegisterShow}}></RegisterModal></li>
                <loginCreateContext.Provider
                  value={
                    {
                      showLogin,setLoginShow
                    }
                  }
                >
                  <li role="button"><p className="dropdown-item" onClick={showLoginModal}>로그인</p><LoginModal></LoginModal></li>
                </loginCreateContext.Provider>
                <li role="button"><p className="dropdown-item" onClick={showAddFrenModal}>상권등록</p><AddFranchiseeModal modalShow={{showAddFren,setAddFrenShow}}></AddFranchiseeModal></li>
            </ul>
        </div>
    </div>
    </>
  );
}

export default SearchBar;
