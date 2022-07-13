import React, { useState, createContext } from 'react'
import { Button,Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import Addfranchisee from '../pages/AddFranchisee'
import AddMenu from '../pages/AddMenu'
// import AddMenuModal from './AddMenuModal'

export const franchiseeinfoContext = createContext();

export default function FrenchiseeModal({modalShow}) {

    const [businesscode,setBusinesscode] = useState();
    const [franchiseename,setFranchiseename] = useState();
    const [perspectname,setPerspectname] = useState();
    const [postcode,setPostcode] = useState();
    const [roadaddress,setRoadaddress] = useState();
    const [jibunaddress,setJibunaddress] = useState();
    const [detailaddress,setDetailaddress] = useState();
    const [fulladdress,setFulladdress] = useState();
    const [franchiseeintro,setFranchiseeintro] = useState();

    const [menushow, setMenushow] = useState(false);
    const menuClose = () => {
        setMenushow(false)
        if(true){
            setBusinesscode('')
            setFranchiseename('')
            setPerspectname('')
            setPostcode('')
            setRoadaddress('')
            setJibunaddress('')
            setDetailaddress('')
            setFulladdress('')
            setFranchiseeintro('')
        }
    };
    const menuShow = () => setMenushow(true);
    // const [franchiseshow, franchiseshowsetShow] = useState(false);
    const handleClose = () => {
        modalShow.setAddFrenShow(false)
        if(true){
            setBusinesscode('')
            setFranchiseename('')
            setPerspectname('')
            setPostcode('')
            setRoadaddress('')
            setJibunaddress('')
            setDetailaddress('')
            setFulladdress('')
            setFranchiseeintro('')
        }
    };
    const handleShow = () => modalShow.setAddFrenShow(true);

    const nexthandle = () => {
        modalShow.setAddFrenShow()
        setMenushow(true)
    }
    const backhandle = () => {
        console.log(modalShow.showAddFren);
        handleShow()
        setMenushow(false)
    }

  return (
    <>
        <franchiseeinfoContext.Provider
            value={
                {
                    businesscode,setBusinesscode,
                    franchiseename,setFranchiseename,
                    perspectname,setPerspectname,
                    postcode,setPostcode,
                    roadaddress,setRoadaddress,
                    jibunaddress,setJibunaddress,
                    detailaddress,setDetailaddress,
                    fulladdress,setFulladdress,
                    franchiseeintro,setFranchiseeintro,
                }
            }
        >
            <Modal
                show={modalShow.showAddFren}
                onHide={handleClose}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <ModalBody>
                    <Addfranchisee></Addfranchisee>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary'
                        onClick={nexthandle}
                    >다음</button>
                </ModalFooter>
            </Modal>
            <Modal
                show={menushow}
                onHide={menuClose}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <ModalBody>
                    <AddMenu></AddMenu>
                </ModalBody>
                <ModalFooter>
                    <Button variant='primary' onClick={backhandle}>뒤로</Button>
                    <button 
                        className='btn btn-primary'
                        onClick={menuClose}
                    >입력</button>
                </ModalFooter>
            </Modal>    
        </franchiseeinfoContext.Provider>    
    </>
  )
}
