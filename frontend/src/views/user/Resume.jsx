import React, {useEffect, useState} from "react";
// reactstrap components
import {Breadcrumb, BreadcrumbItem, Container, Modal,} from "reactstrap";

import {connect} from "react-redux";
import ResumeList from "../../components/User/ResumeList";
import {getUserProfile} from "../../actions/authActions";
import {Link, Route} from "react-router-dom";
import {getUserSpecial} from "../../actions/userActions";
import SectionResume from "./SectionResume";
import JikjongSearchModal from "../../components/User/JikjongSearchModal";

function ResumeView(props) {
    const {match} = props;
    const user = props.user;
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    useEffect(()=>{
        if(!user) props.getUserProfile()
    },[user]);

    console.log('resume view props.user',user);

    const menuList = () => {
        if(user.userspecial.length > 0){
            return (
                <div>
                    <Breadcrumb tag="nav" listTag="div">
                        {user.userspecial.map((special, index) => (
                            <BreadcrumbItem tag="a">
                                <Link to={`${match.url}/${special.id}`}>
                                    {special.jikjong_top.code_name}
                                    {' '}( {special.resume.length} )
                                </Link>
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumb>
                </div>
            );
        } else {
            return (
                <>
                    <Link className="nav-link"
                          to={`/User/profile/`}
                    >☞ 전문분야를 먼저 설정해주세요.</Link>
                    {/*<Link to={'#'}>*/}
                    {/*    <p className="nav-link"*/}
                    {/*       onClick={()=>toggleModal()}*/}
                    {/*        // to={`#`}*/}
                    {/*    >☞ 전문분야를 먼저 설정해주세요.</p>*/}
                    {/*</Link>*/}
                </>
            )
        }
    };

    return (
        <>
            <div className="content">
                {/*<div className="section" style={{background:"#EEEEEE"}} >*/}
                <Container>
                    { user && (
                        <>
                            <div className="title">
                                <h5>이력서<br/>
                                    <small>
                                        채공에서는 이력서를 전문분야별로 관리합니다.<br/>
                                        전문분야를 먼저 설정 하신 후 이력서를 등록하세요.
                                    </small>
                                </h5>
                            </div>
                            {menuList()}
                        </>
                    )}
                    <Route exact path={props.match.url} render={() => (
                        <>
                            {user ?
                                (
                                    <>
                                        <h4>
                                            이력서 양식, 그 이상<br/>
                                            채용 전문가들의 조언을 얻어, 이력서를 잘 쓸 수 있는 도구를 만들었습니다.<br/>
                                            서류 통과가 잘 되는 이력서를 쉽고 빠르게 작성해 보세요.<br/>
                                            <small>아주 간단한 정보만 입력하세요</small>
                                            <br/>
                                        </h4>
                                    </>
                                )
                                : (
                                    <SectionResume/>
                                )}
                        </>
                    )}/>
                    { user && (
                        <Route path={`${match.url}/:specialid`} render={props=> <ResumeList user={user} {...props}/>} />
                    )}

                </Container>

            </div>
            <div className="modal-lg">
                <Modal size="lg" isOpen={modal} toggle={toggleModal} >
                    <JikjongSearchModal/>
                </Modal>
            </div>
        </>
    )
}


function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {getUserProfile, getUserSpecial})(ResumeView);
