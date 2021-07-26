import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Icon, Nav, Sidenav} from 'rsuite'
import styled from "styled-components";
import history from "../../../utils/historyUtils";
import Estimate from "./Estimate";
import Resume from "./Resume"
import JobApDrawer from "./JobApDrawer";

const RightMenu = styled.div`
    background:white;
    box-shadow:0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.87);
    position: fixed;
    right: 2rem;
    height: auto;
    width: 180px;
    top: 10rem;
    text-align: center;
    @media screen and (max-width: 1830px){
        display:none;
    }
}
`;
const SugubMenu = (props) => {
    const {setSugub, sugub,getSugubData,eventkey,eventToggle} = props;
    const toggleEstimate = () => setModalEstimate(!modalEstimate);
    const [modalEstimate, setModalEstimate] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() =>{
        // filteredList(sugub);
        // if(eventkey === 0){
        //     toggleEstimate();
        // } else
        if(eventkey === 1){
            // toggleModal();
            toggleEstimate();
        }else if(eventkey === 2){
            handleChat();
        }else if(eventkey === 3){
            handleDrawer();
        }
    },[eventToggle])
    const handleDrawer = () => {
        setShow(true);
    }
    const handleChat = () => {
        history.push({
            pathname: `/Mng/Chat/${sugub.user.id}/${sugub.id}`,
            state: {
                receiver: sugub.user,
                sugub: sugub,
                chat: {participants: [], is_end: false}
            }
        })
    }
    return  (
        <>

            <RightMenu>
                <Sidenav appearance="subtle" >
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item eventKey="1" icon={<Icon icon="file" />} onClick={toggleEstimate}>
                                <div>이력서 접수</div>
                            </Nav.Item>
                            {/*<Nav.Item eventKey="1" icon={<Icon icon="krw" />} onClick={toggleEstimate}>*/}
                            {/*    <div>가견적 제안</div>*/}
                            {/*</Nav.Item>*/}
                            {/*<Nav.Item eventKey="2" icon={<Icon icon="file" />} onClick={toggleModal}>*/}
                            {/*    이력서 접수*/}
                            {/*</Nav.Item>*/}
                            <Nav.Item eventKey="3" icon={<Icon icon="commenting" />} button onClick={handleChat}>
                                채팅문의
                            </Nav.Item>
                            <Nav.Item eventKey="4" icon={<Icon icon="group" />} onClick={handleDrawer}>
                                나의 접수현황
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>

            </RightMenu>

            <Estimate setSugub={setSugub} modal={modalEstimate} toggle={toggleEstimate} sugub={sugub} toggleReload={getSugubData}/>
            {/*<Resume modal={modal} toggleModal={toggleModal} sugub={sugub} toggleReload={getSugubData}/>*/}
            {show && <JobApDrawer jobApData={sugub.jobadvertise[0].jobapplicants} show={show} setShow={setShow} toggleReload={getSugubData} handleClickJobAp={handleDrawer}/>}
        </>
    ) ;
}
//export default SugubList;
function mapStateToProps(state) {
    return {
        hr: state.auth.hr,
        user: state.auth.user,
        token: state.auth.token,
        comcode:state.comcode.comcode,
    }
}

export default connect(mapStateToProps)(SugubMenu);

