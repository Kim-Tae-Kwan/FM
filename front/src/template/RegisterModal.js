import React, { useState } from 'react'
import Register from '../pages/Register';
import { Button, Modal, ModalBody } from 'react-bootstrap';

export default function RegisterModal({modalShow}) {

  const handleClose = () => modalShow.setRegisterShow(false);

  return (
    <>
        <Modal
            show={modalShow.showRegister}
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
