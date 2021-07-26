import React, {useEffect, useState} from "react";

import CompanyProfile from "components/Company/Auth/CompanyProfile"
import Tip from "../../components/Common/Tip";
// reactstrap components
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import CompanyProfileEdit from "../../components/Company/Auth/CompanyProfileEdit";
import CompanyProfileDetail from "../../components/Company/Auth/CompanyProfileDetail";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import SugubDrawer from "../../components/Company/Sugub/SugubDrawer";


const CompanyProfileView = (props) => {
    const company = props.company;
    const user = props.user;
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal)

    useEffect(() => {
       if(user) return;
       props.getUserProfile();
    }, [user]);



    return user ? (
        <>
            {company ? (
                <div className="content">
                    <Container>
                        <div className="title">
                            <h5>기업정보<br/>
                                <small>
                                    {/*회사정보<br/>*/}
                                </small>
                            </h5>
                        </div>
                        <hr/>

                        <Row>
                            {/* 기업프로필 */}
                            <Col md={company && company.custname ? 4 : 12}>
                                <CompanyProfile/>
                                <Tip/>
                            </Col>
                            {company && company.custname &&
                            <Col md={8}>
                                <Card variant="outlined">
                                    <CardContent className="text-center">
                                        <div className="title">
                                            <h5>안녕하세요 {company.custname} 담당자님
                                                <br/>
                                                <small>
                                                    채용의뢰서를 빠르게 작성하고,
                                                    많은 인재 이력서를 받아보세요.
                                                </small>
                                            </h5>
                                        </div>
                                    </CardContent>
                                    <CardContent className="text-center">
                                        <SugubDrawer/>


                                        {' '}
                                       {/* <Link to={"/Company/Partners"}>
                                            <button
                                                className="btn btn-lg btn-primary"
                                                color="danger"
                                            >파트너 찾기</button>
                                        </Link>*/}
                                    </CardContent>
                                    {/*<CardContent className="text-center">
                                        <div className="modal-lg">
                                            <Modal size="lg" isOpen={modal} toggle={toggleModal} >
                                                <SugubRequesthModal toggle={toggleModal}/>
                                                <CompanyMainSearch/>
                                            </Modal>
                                        </div>
                                    </CardContent>*/}
                                </Card>
                                <hr/>
                                <CompanyProfileDetail/>
                                {/*<Coworker/>*/}
                            </Col>
                            }
                        </Row>
                    </Container>
                </div>
            ) : (
                <CompanyProfileEdit user={user}/>
            )}
        </>
    ) : (<LoaderSpinner/>)
    // }
};

function mapStateToProps(state) {
    return {
        company: state.auth.company,
        user: state.auth.user
    }
}

// export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(CompanyProfileView);
export default connect(mapStateToProps, {getUserProfile})(CompanyProfileView);

