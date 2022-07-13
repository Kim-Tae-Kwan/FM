import React, { useContext, useState } from "react";
import Login from "../pages/Login";
import { Modal, ModalBody, Button } from "react-bootstrap";
import {loginCreateContext} from './SearchBar'

export default function LoginModal() {
  const loginmodalHandler = useContext(loginCreateContext)
  const handleClose = () => loginmodalHandler.setLoginShow(false);
  return (
    <>
      <Modal
        style={{
          marginTop: "10%",
        }}
        show={loginmodalHandler.showLogin}
        onHide={handleClose}
        keyboard={false}
      >
        <ModalBody>
          <Login></Login>
        </ModalBody>
      </Modal>
    </>
  );
}
