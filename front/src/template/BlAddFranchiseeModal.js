import React, {
    useState,
    createContext,
    useRef,
    useEffect,
    useContext,
} from "react";
import { Modal, ModalBody } from "react-bootstrap";
import BlAddFranchisee from "../pages/BlAddFranchisee";
import { BlmodalControllerContext } from "../pages/BusinessList";

export const blfranchiseeinfoContext = createContext();

export default function BlFrenchiseeModal() {
    const blmodalController = useContext(BlmodalControllerContext);
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
        blmodalController.setAddFrenModalShow(false);
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
            <blfranchiseeinfoContext.Provider
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
                    show={blmodalController.showAddFrenModal}
                    onHide={addFrenModalClose}
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton></Modal.Header>
                    <ModalBody>
                        <BlAddFranchisee inputElement={inputElement} />
                    </ModalBody>
                </Modal>
            </blfranchiseeinfoContext.Provider>
        </>
    );
}
