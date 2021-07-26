import React, {useState} from "react";
import {Modal} from "reactstrap";
import PrivacyView from "../HelpCenter/Privacy";

const PrivacyModal = () => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <PrivacyView/>
        </Modal>
    )
}

export default PrivacyModal;