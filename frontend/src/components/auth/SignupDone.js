import React, {useState} from "react";
import {Container} from "reactstrap";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SugubDrawer from "../Company/Sugub/SugubDrawer";

const SignupDone = (props) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal)
    console.log('signupDone props', props)

    const renderLinks = () => {
        if(props.match.path.match('/Company')){
            return (
                <>
                    <div className="centered">
                        {/*<button*/}
                        {/*        className="btn btn-lg btn-primary"*/}
                        {/*        color="danger"*/}
                        {/*    >*/}
                        {/*        채용마켓 시작하기*/}
                        {/*    </button>*/}
                        <SugubDrawer/>
                        {/*<Link to={'/Company'}>
                            <button
                                className="btn btn-lg btn-primary"
                                color="danger"
                            >
                                채용마켓 시작하기
                            </button>
                        </Link>*/}
                    </div>
                    <div className="centered">
                        <Link to={'/Company'}>
                            <p>메인으로 가기</p>
                        </Link>
                    </div>
                </>
            )

        }else if(props.match.path.match('/Hr')){
            return (
                <>
                    <div className="centered">
                        {/*<HrMainSearchModal/>*/}
                        <Link to={'/Hr/profileForm'}>
                            <button
                                className="btn btn-lg btn-primary"
                                color="danger"
                                 // onClick={toggleModal}
                            >
                                기업정보 등록
                            </button>
                        </Link>
                    </div>
                    <div className="centered">
                        <Link to={'/Hr'}>
                            <p>메인으로 가기</p>
                        </Link>
                    </div>

                    {/*<Modal size="lg" isOpen={modal} toggle={toggleModal} >
                        <HrMainSearchModal toggle={toggleModal}/>
                        <CompanyMainSearch/>
                    </Modal>*/}
                </>
            )
        }
    }


    return (
        <div className="content">
            <Container>
                <Card>
                    <CardContent>
                        <div className="col-md-6 ml-auto mr-auto pt-lg-4" style={{backGroundColor:'#FFFFFF'}}>
                            <div className="title">
                                <h4>
                                    회원가입 완료
                                    <hr/>
                                    <small>
                                        회원가입이 완료 되었습니다. <br/>
                                        {/*입력하신 이메일로 인증 메일을 보냈습니다.<br/>*/}
                                        {/*(인증 없이도 이용 가능)<br/>*/}
                                    </small>
                                </h4>
                            </div>
                            <div className="centered">
                                <img
                                    alt="..."
                                    className="avatar border-gray centered"
                                    width={"300px"}
                                    src={require("assets/img/undraw_done_a34v.svg")}
                                />
                            </div>
                            <hr/>
                            {renderLinks()}
                            <br/>
                        </div>
                    </CardContent>
                </Card>

            </Container>
        </div>
    )
}

export default SignupDone;