import React, { useContext } from 'react'
import Register from '../pages/Register';
import { Modal, ModalBody } from 'react-bootstrap';
import {registcreateContext} from './SearchBar'



export default function RegisterModal() {

  const registmodalInfo = useContext(registcreateContext)
  const handleClose = () => registmodalInfo.setRegisterShow(false);
  return (
    <>
      <Modal
          show={registmodalInfo.showRegister}
          onHide={handleClose}
          keyboard={false}
      >
          <ModalBody>
              <Register></Register>
          </ModalBody>
      </Modal>
    </>
  )
}
