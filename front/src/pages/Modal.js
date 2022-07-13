import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Modal = ({ modalOption }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return <>{modalOption?.show && <div>a</div>}</>;
};

export default Modal;
