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
import HrProfileFormStep4 from "./HrProfileForm_Step4";
import HrProfileFormStep5 from "./HrProfileForm_Step5";
import HrProfileFormStep6 from "./HrProfileForm_Step6";
import Nothing from "../Common/Nothing";
import HrProfileFormInfo from "./HrProfileForm_info";
import LinearDeterminate from "../Common/LinearDeterminate";
import {Link, Prompt} from "react-router-dom";
import {Loader} from "rsuite";

const HrProfileForm = (props) => {
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState(null);
    const [jikjongInfo, setJikjongInfo] = useState([]);
    const [fitUsers, setFitUsers] = useState(null);
    const [comCode, setComCode] = useState([]);
    const [prompt, setPrompt] = useState(true)

    const {onSubmit, user, hr } = props;
    const [progress, setProgress] = React.useState(0);
    const {company, selected, authenticated, sugub_jikjong_mid} = props;


    const onNextPage = (jumpPage) => {
        console.log('onNextPage jumpPage:', jumpPage)
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
        if(page >= 5){
            setProgress(100)
        } else {
            setProgress(Math.round(100/4 * (page-1)))
        }
        if(page >= 7) setPrompt(false)

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
                v.code_topidx === 'AO' || v.code_topidx === 'AQ' || v.code_topidx === 'AE' || v.code_topidx === 'CI'))
    }, []);

    console.log('HrProfileForm page?', page);
    return  (
        <>
            <Prompt when={prompt} message="변경사항이 저장되지 않을 수 있습니다." />
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
                                <small style={{fontSize: '1.5em'}}>{progress} {'%'}</small>
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
                                    {/*{page === 3 && ( authenticated === undefined || authenticated === false ) && (
                                        <HrProfileFormEmailCheck
                                            previousPage={onPreviousPage}
                                            nextPage={onNextPage}
                                            onSubmit={onSubmit}
                                        />
                                    )}*/}
                                    {/* 로그인은 됐지만 기업정보 등록 안한 경우*/}
                                    {/*{page === 3 && authenticated !== undefined && user && user.hrprofile.length === 0 && (
                                        <HrProfileFormStep3
                                            previousPage={onPreviousPage}
                                            nextPage={onNextPage}
                                            onSubmit={onSubmit}
                                        />
                                    )}*/}
                                    {/* 로그인 기업정보 등록 완료된 경우 */}
                                    {/*{page === 3 && authenticated !== undefined && user && user.hrprofile.length > 0 && (
                                        <HrProfileStep3Finish
                                            previousPage={onPreviousPage}
                                            nextPage={onNextPage}
                                            onSubmit={onSubmit}
                                        />
                                    )}*/}
                                    { page === 3 && authenticated && (
                                        <HrProfileFormStep3
                                            previousPage={onPreviousPage}
                                            // nextPage={onNextPage}
                                            onSubmit={onNextPage}
                                        />
                                    )}
                                    { page === 4 && authenticated && (
                                        <HrProfileFormStep4
                                            comCode={comCode}
                                            previousPage={onPreviousPage}
                                            // nextPage={onNextPage}
                                            onSubmit={onNextPage}
                                            // onSubmit={onSubmit}
                                        />
                                    )}
                                    { page === 5 && authenticated && (
                                        <HrProfileFormStep5
                                            comCode={comCode}
                                            previousPage={onPreviousPage}
                                            // nextPage={onNextPage}
                                            onSubmit={onNextPage}
                                        />
                                    )}
                                    { page === 6 && authenticated && (
                                        <HrProfileFormStep6
                                            previousPage={onPreviousPage}
                                            nextPage={onNextPage}
                                            // onSubmit={onNextPage}
                                            onSubmit={onSubmit}
                                        />
                                    )}

                                </Col>
                                <Col md="4">
                                    {page <= 6 && (
                                        <HrProfileFormInfo page={page}/>
                                    )}

                                </Col>

                                <Col>
                                    {page === 7 && (
                                        <>
                                            <Card className="card card-sugub text-center">
                                                <h4>회사정보 등록중</h4>
                                                {/*<CardTitle>채용의뢰서 등록중</CardTitle>*/}
                                                <CardBody>
                                                    <div className="description">
                                                        {/*잠시만 기다려주세요....*/}
                                                        <Loader content="잠시만 기다려주세요...." vertical />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </>
                                    )}
                                    {page === 8 && (
                                        <>
                                            <Card className="card card-sugub text-center">
                                                <h3>회사 프로필 등록 완료</h3>
                                                <CardBody>
                                                    <div className="centered">
                                                        <img
                                                            alt="..."
                                                            className="border-gray centered"
                                                            width={"200px"}
                                                            src={require("assets/img/undraw_having_fun_iais.svg")}
                                                        />
                                                    </div>
                                                    <br/>
                                                    <br/>
                                                    <Link to={'/Hr/Profile'}>
                                                        <button type="button" className="btn btn-lg btn-info">
                                                            프로필 페이지로 이동
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
                    {/*<h5>관련 의뢰리스트
                        <small style={{color:"red"}}>0</small>
                    </h5>
                    <hr/>
                    <Nothing text={''}/>*/}
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
