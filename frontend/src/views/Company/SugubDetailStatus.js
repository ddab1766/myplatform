import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import {connect} from "react-redux";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import JobAppContainer from "../../components/Company/JobAppContainer"
import SugubDetailView from "../../components/Company/Sugub/SugubDetailView"
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import InterviewScheduleModal from "../../components/Company/InterviewScheduleModal"
import SugubEstimate from "../../components/Company/Sugub/SugubEstimate";
import Nothing from "../../components/Common/Nothing";
import {Dropdown, FlexboxGrid, Icon, Nav, Sidenav, Button, SelectPicker} from "rsuite";
import Avatar from "@material-ui/core/Avatar";
import ManagerCard from "../../components/Common/ManagerCard";
import CPPage from "../../components/Common/CPPage"
import {getSugub, getSugubDetail} from "../../actions/sugubActions";
import {isMobile} from "react-device-detect"
import history from "../../utils/historyUtils";
import UpButton from "../../components/Common/UpButton";
// core components
const RightMenu = styled.div`
    background:white;
    box-shadow:0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.87);
    position: absolute;
    right: 5rem;
    height: auto;
    width: 190px;
    top: 3rem;
    text-align: center;
    @media screen and (max-width: 1670px){
        display:none;
    }
}
`;
const RightMenu_M = styled.div`
    text-align : right;
    margin-bottom:10px;
    @media screen and (min-width: 1670px){
        display:none;
    }
} `;
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
// 수급진행상황
const SugubStatus = (props) => {
    const [sugub, setSugub] = useState([])
    const [jobAds, setJobAds] = useState([]);
    const [loader, setLoader] = useState(false);
    const [modal, setModal] = useState(false);
    const [newArr, setNewArr] = useState([]);
    const classes = useStyles();
    const toggle = () => {
        setModal(!modal);
    }

    useEffect(() => {
        if(isMobile) document.querySelector('.navbar-brand').style.marginLeft='40px';

        setLoader(true)
        getSugubDetail(props.match.params.sugubid).then((res)=>{
            setSugub(res)
            setLoader(false)
        }).catch(error=>{
            setLoader(false)
        });

    },[]);
    const handleBack = () => {
        history.goBack();
        document.querySelector('.navbar-brand').style.marginLeft='0px';
    }


    console.log('SugubStatus sugub', sugub)

    return sugub ? (
        <>
            <UpButton />
            <div className="content">
                {isMobile &&
                <div style={{position:'fixed',top:'12px',marginLeft:'10px',zIndex:'1035',color: 'white'}}
                     onClick={handleBack}>
                    <Icon icon="chevron-circle-left" size="2x" />
                </div>
                }
                <div className={!isMobile && 'container'} >
                    <Card>
                        <CardContent>

                            <h3 className="text-md-left" style={{fontSize: '1.7em'}}>진행상황<br/>
                                <small>
                                    지원한 이력서를 검토 후 서류전형 합격여부를 정해주세요.<br/>
                                </small>
                            </h3>
                            <RightMenu_M>
                                <Button appearance="ghost" size="sm" onClick={toggle}><Icon icon="calendar" />&nbsp;면접일정등록</Button>
                                {/*<Dropdown title="더보기.." placement="bottomEnd" className="RightMenu_M">*/}
                                {/*    <Dropdown.Item eventKey={0} onClick={toggle}>면접일정등록</Dropdown.Item>*/}
                                {/*    <Dropdown.Item eventKey={1}>결과발표(x)</Dropdown.Item>*/}
                                {/*    <Dropdown.Item eventKey={2}>예상견적계산(x)</Dropdown.Item>*/}
                                {/*    <Dropdown.Item eventKey={3} >일정캘린더(x)</Dropdown.Item>*/}
                                {/*</Dropdown>*/}
                            </RightMenu_M>
                            {/*지원자 테이블*/}
                            {!loader ? (
                                <div>
                                    {
                                        (sugub.jobadvertise == null || sugub.jobadvertise.length < 1)  ?
                                            (<>현재 등록된 공고가 없습니다.<br/>현재 공고등록 중 이오니 잠시만 기다려주시기 바랍니다.</>)
                                            : (<JobAppContainer jobap={sugub.jobadvertise[0].jobapplicants} modal={modal} toggle={toggle} sugub={sugub}/> )
                                    }
                                </div>
                            ) : (<LoaderSpinner/>)}

                            <div className="title">
                                {/*<h5>수급정보</h5>*/}
                                {!loader && (
                                    <SugubDetailView sugub={sugub}/>
                                ) }
                            </div>
                            <hr/>
                            <div>
                                <div className="title">
                                    <h5>채용의뢰서 담당자</h5>
                                </div>
                                <hr/>
                                {sugub.manager ? (<ManagerCard manager={sugub.manager}/>) : (<Nothing text={'담당자 지정'}/>)}<br/>
                            </div>

                        </CardContent>
                    </Card>
                </div>
                <RightMenu>
                    <Sidenav appearance="subtle" >
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" icon={<Icon icon="calendar" />} onClick={toggle}>
                                    <div>면접일정등록</div>
                                </Nav.Item>
                                <Nav.Item eventKey="2" icon={<Icon icon="speaker" />}>
                                    결과발표(x)
                                </Nav.Item>
                                <Nav.Item eventKey="3" icon={<Icon icon="calculator" />}>
                                    예상견적계산(x)
                                </Nav.Item>
                                <Nav.Item eventKey="4" icon={<Icon icon="calendar" />}>
                                    일정캘린더(x)
                                </Nav.Item>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>


                </RightMenu>
                {/*{sugub.jobadvertise && <InterviewScheduleModal modal={modal} toggle={toggle} jobap={sugub.jobadvertise[0].jobapplicants}/>}*/}
            </div>
        </>

    ) : props.hr && (<CPPage/>)
}



function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr:state.auth.hr,
    }
}

export default connect(mapStateToProps)(SugubStatus);
