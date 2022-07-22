import React, {
    useState,
    createContext,
    useRef,
    useEffect,
    useContext,
} from "react";
import { Modal, ModalBody } from "react-bootstrap";
import Addfranchisee from "../pages/AddFranchisee";
import { modalControllerContext } from "../pages/Mypage";

export const franchiseeinfoContext = createContext();

export default function FrenchiseeModal() {
    const modalController = useContext(modalControllerContext);
    const [franchiseeaddressInfo, setFranchiseeaddressinfo] = useState({
        jibun: "",
        postalCode: "",
        road: "",
    });

    const [franchiseeinput, setFranchiseeinput] = useState({
        businesscode: "",
        franchiseename: "",
        detailaddress: "",
        franchiseeintro: "",
        displayAddress: "",
        phonenumber: "",
        x: "",
        y: "",
    });
    const [businessChk, setBusinessChk] = useState("");

    const addFrenModalClose = () => {
        modalController.setAddFrenModalShow(false);
        setFranchiseeaddressinfo({
            ...franchiseeaddressInfo,
            jibun: "",
            postalCode: "",
            road: "",
        });
        setFranchiseeinput({
            ...franchiseeinput,
            businesscode: "",
            franchiseename: "",
            perspectname: "",
            detailaddress: "",
            franchiseeintro: "",
            displayAddress: "",
            phonenumber: "",
        });
    };

    useEffect(() => {
        setBusinessChk("b");
    }, [franchiseeinput.businesscode]);
 
    const inputElement = useRef();

    return (
        <>
            <franchiseeinfoContext.Provider
                value={{
                    businessChk,
                    setBusinessChk,
                    inputElement,
                    franchiseeinput,
                    setFranchiseeinput,
                    franchiseeaddressInfo,
                    setFranchiseeaddressinfo,
                }}
            >
                <Modal
                    show={modalController.showAddFrenModal}
                    onHide={addFrenModalClose}
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton></Modal.Header>
                    <ModalBody>
                        <Addfranchisee
                            inputElement={inputElement}
                        ></Addfranchisee>
                    </ModalBody>
                </Modal>
            </franchiseeinfoContext.Provider>
        </>
    );
}
