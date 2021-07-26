import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import axios from "axios";
import {apiUrls} from "../../constants/urls";
import {formValueSelector} from "redux-form";
import {getUserProfile} from "../../actions/authActions";
import HrProfileFormStep1 from "./HrProfileForm_Step1";
import HrProfileFormStep2 from "./HrprofileForm_Step2";
import HrProfileFormStep3 from "./HrProfileForm_Step3";
import HrProfileFormEmailCheck from "./HrProfileForm_EmailCheck";
import HrProfileStep3Finish from "./HrProfileForm_Step3_Finish";
import LoaderSpinner from "../Etc/LoaderSpinner";
import Nothing from "../Common/Nothing";
import HrProfileFormInfo from "./HrProfileForm_info";
import LinearDeterminate from "../Common/LinearDeterminate";
import {Link} from "react-router-dom";

const HrProfileForm = (props) => {
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState(null);
    const [jikjongInfo, setJikjongInfo] = useState([]);
    const [fitUsers, setFitUsers] = useState(null);
    const [comCode, setComCode] = useState([]);

    const {onSubmit, user, hr } = props;
    const [progress, setProgress] = React.useState(0);
    const {company, selected, authenticated, sugub_jikjong_mid} = props;


    const onNextPage = (jumpPage) => {
        if(jumpPage > 0){
            setPage(page + 1 + jumpPage)
        }else{
            setPage(page + 1)
        }
    };

    const onPreviousPage = () => {
        setPage(page - 1)
    };

    useEffect(()=>{
        if(page >= 3){
            setProgress(100)
        } else {
            setProgress(Math.round(100/3 * (page-1)))
        }

    },[page])


    useEffect(()=>{
        if(selected){
            if(selected.sec === 'mid') {
                axios
                    .get(apiUrls.JIKJONG, {
                        params:{
                            jikjong_mid: selected.code_id
                        }
                    })
                    .then( ({data}) => {
                        setJikjongInfo(data)
                    })
            }else if(selected.sec === 'top'){

            }
        }

    },[selected]);

    // Comcode
    useEffect(() => {
        if(props.comcode)
            setComCode(props.comcode.filter(v=> v.code_topidx === 'BE' || v.code_topidx === 'AC' ||
                v.code_topidx === 'AO' || v.code_topidx === 'AQ' || v.code_topidx === 'AE'))
    }, []);

    console.log('page', page)

    return  (
        <>

            <div className="section text-center"
                 style={{
                     color: '#FFFFFF',
                     backgroundImage: "url(" + require("../../assets/img/sample1.jpg") + ")"
                 }}
            >
                <h3> {selected && selected.groupName}<br/></h3>
                {/*<h5> {selected.code_name}<br/></h5>*/}
            </div>
            <Container>
                <div className="title">
                    <h4>아래 정보를 입력해주세요.<br/>
                        <small>진행중인 의뢰서와 매치시켜드립니다.</small>
                    </h4>
                </div>
                <hr/>
                <div>
                    <Card className="card card-sugub">
                        <CardTitle>
                            <LinearDeterminate progress={progress}/>
                            <div className="centered">
                                <small>{progress} {'%'}</small>
                            </div>
                        </CardTitle>
                        <CardBody>
                            <Row>
                                {/*<HrMainSearchModal/>*/}
                                <Col md="8">
                                    {page === 1 && <HrProfileFormStep1 onSubmit={onNextPage} comCode={comCode} {...selected}/>}
                                    {page === 2 && (
                                        <HrProfileFormStep2
                                            previousPage={onPreviousPage}
                                            onSubmit={onNextPage}
                                            comCode={comCode}
                                        />
                                    )}
                                    {/* 로그인 안된 경우*/}
                                    {page === 3 && ( authenticated === undefined || authenticated === false ) && (
                                        <HrProfileFormEmailCheck
                                            previousPage={onPreviousPage}
                                            nextPage={onNextPage}
                                            onSubmit={onSubmit}
                                        />
                                    )}
                                    {/* 로그인은 됐지만 기업정보 등록 안한 경우*/}
                                    {page === 3 && authenticated !== undefined && user && user.hrprofile.length === 0 && (
                                        <HrProfileFormStep3
                                            previousPage={onPreviousPage}
                                            nextPage={onNextPage}
                                            onSubmit={onSubmit}
                                        />
                                    )}
                                    {/* 로그인 기업정보 등록 완료된 경우 */}
                                    {page === 3 && authenticated !== undefined && user && user.hrprofile.length > 0 && (
                                        <HrProfileStep3Finish
                                            previousPage={onPreviousPage}
                                            nextPage={onNextPage}
                                            onSubmit={onSubmit}
                                        />
                                    )}

                                </Col>
                                <Col md="4">
                                    {page <= 3 && (
                                        <HrProfileFormInfo page={page}/>
                                    )}
                                    {/*<blockquote className="blockquote text-center"
                                                style={{
                                                    "border": "1px solid rgba(0, 0, 0, 0.12)",
                                                    "background-color": "#FFFFFF",
                                                    "border-radius": "12px",
                                                    "box-shadow": "0 6px 10px -4px rgb(0 0 0 / 15%)"
                                                }}>
                                        <p className="mb-0">{selected.code_name}<br/></p>
                                        <footer className="blockquote-footer">
                                            {jikjongInfo.map( (value, index) => <>{value.jikjong_comment}</>
                                            )}
                                        </footer>
                                    </blockquote>*/}
                                </Col>
                                <Col>
                                {page === 4 && (
                                    <>
                                        <Card className="card card-plain card-sugub">
                                            <CardTitle>전문 직종 등록중</CardTitle>
                                            <CardBody>
                                                <div className="description text-center">
                                                    잠시만 기다려주세요....
                                                    <LoaderSpinner/>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </>
                                )}
                                {page === 5 && (
                                    <>
                                        <Card className="card card-sugub text-center">
                                            <h4>전문 직종 등록 완료</h4>
                                            <CardBody>
                                                <div className="centered">
                                                    <img
                                                        alt="..."
                                                        className="border-gray centered"
                                                        width={"400px"}
                                                        src={require("assets/img/undraw_having_fun_iais.svg")}
                                                    />
                                                </div>
                                                <br/>
                                                <br/>
                                                <Link to={'/Hr/Profile'}>
                                                    <button type="button" className="btn btn-lg btn-outline-info">
                                                        내역 확인하기
                                                    </button>
                                                </Link>
                                            </CardBody>
                                        </Card>
                                    </>
                                )}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
                <hr/>
                <div>
                    <h5>관련 의뢰리스트
                        <small style={{color:"red"}}>0</small>
                    </h5>
                    <hr/>
                    <Nothing text={''}/>
                    {/*{fitUsers ? (
                        <>
                            {fitUsers.length > 0 ? (
                                <div>
                                    <Row>
                                        {fitUsers.length > 0 && fitUsers.map((fitUser, index)=>{
                                            if(index <= 7){
                                                return (
                                                    <Col md={3}>
                                                        <FitUserCard fituser={fitUser}/>
                                                    </Col>
                                                )
                                            }
                                        })}
                                    </Row>
                                </div>
                            ): (<>현재 조건에 맞는 인재가 없습니다.</>)}
                        </>
                    ) : (<LoaderSpinner/>)}*/}
                </div>

            </Container>
        </>
    )
}

HrProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

const selector = formValueSelector('hr_profile_wizard');


function mapStateToProps(state, props) {
    const sugub_jikjong_mid = selector(state, 'hr_jikjong_mid')
    if(props.location.state) {
        return {
            sugub_jikjong_mid: sugub_jikjong_mid,
            authenticated: state.auth.authenticated,
            selected: props.location.state.selected,
            company: state.auth.company,
            user: state.auth.user,
            hr: state.auth.hr,
            comcode: state.comcode.comcode
        }
    }else{
        return {
            sugub_jikjong_mid: sugub_jikjong_mid,
            authenticated: state.auth.authenticated,
            company: state.auth.company,
            user: state.auth.user,
            hr: state.auth.hr,
            comcode: state.comcode.comcode
        }
    }
}

// export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(SugubForm)
export default connect(mapStateToProps, {getUserProfile})(HrProfileForm)
