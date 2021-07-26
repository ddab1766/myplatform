import React, {useEffect, useState} from "react";
import {getUserProfile} from "../../../actions/authActions";
import {Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import SugubFormInfo from "./SugubForm_info";
import SugubFormStep1 from "./SugubForm_Step1";
import SugubFormStep2 from "./SugubForm_Step2";
import SugubFormStep3 from "./SugubForm_Step3";
import SugubFormStep4 from "./SugubForm_Step4";
import SugubFormStep5 from "./SugubForm_Step5";
import SugubFormStep6 from "./SugubForm_Step6";
import SugubFormStep7 from "./SugubForm_Step7";
import SugubFormStep8 from "./SugubForm_Step8";
import SugubFormStep8Finish from "./SugubForm_Step8_Finish";
import SugubFormEmailCheck from "./SugubForm_EmailCheck";
import axios from "axios";
import {apiUrls, vUrls} from "../../../constants/urls";
import Rating from "@material-ui/lab/Rating/Rating";
import {formValueSelector} from "redux-form";
import LoaderSpinner from "../../Etc/LoaderSpinner";
import FitUserCard from "../FitUserCard";
import {Link, Prompt} from "react-router-dom";
import Nothing from "../../Common/Nothing";
import LinearDeterminate from "../../Common/LinearDeterminate";
import {isMobile} from "react-device-detect";
import {Loader} from "rsuite";

const SugubForm = (props) => {
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState(null);
    const [jikjongInfo, setJikjongInfo] = useState([]);
    const [fitUsers, setFitUsers] = useState(null);
    const [comCode, setComCode] = useState([]);
    const [prompt, setPrompth] = useState(true);

    const {onSubmit, user} = props;
    const {company, selected, authenticated, sugub_jikjong_mid} = props;
    const [progress, setProgress] = React.useState(0);

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

    useEffect(() => {

        window.scrollTo(0, 0);
        //최초 초기화
        // store.dispatch(initialize('sugub_wizard', {}));
        if(user) return;
        // if(authenticated) {
        props.getUserProfile();
        // }
    }, []);

    useEffect(()=>{
        if(page >= 7){
            setProgress(100)
        } else {
            setProgress(Math.round(100/7 * (page-1)))
        }
        if(page === 10) setPrompth(false)

    },[page])

    useEffect(()=>{
        // store.dispatch(initialize('sugub_wizard', {sugub_jikjong_top: selected.code_id}));
        if(selected.sec === 'mid') {
            axios
                .get(vUrls.SUGUB_REVIEW, {
                    params: {
                        jikjong_mid: selected.code_id
                    }
                })
                .then(({data}) => {
                    console.log('data', data)
                    setReviews(data);
                });
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
            axios
                .get(vUrls.SUGUB_REVIEW, {
                    params: {
                        jikjong_top: selected.code_id
                    }
                })
                .then(({data}) => {
                    setReviews(data);
                })
        }
    },[selected]);

    // 수급에 맞는 인재
    useEffect(() => {
        // 직종(대)
        if(page ===1){
            axios
                .get(vUrls.USER_SPECIAL, {
                    params: {
                        jikjong_top: selected.code_id,
                        // jikjong_mid: selected.code_id === props.sugub_jikjong_mid ? null : props.sugub_jikjong_mid
                    }
                })
                .then(({data}) => setFitUsers(data))
                .catch((error) => console.log(error))
        }else if(page === 2){
            setFitUsers(fitUsers.filter( v => v.jikjong_mid.code_id === sugub_jikjong_mid))
        }


    }, [page]);

    // Comcode
    useEffect(() => {
        if(props.comcode)
            setComCode(props.comcode.filter(v=> (v.code_topidx === 'AB' && v.code_topcd === null)|| v.code_topidx === 'AC' ||
                v.code_topidx === 'AO' || v.code_topidx === 'AQ' || v.code_topidx === 'AE' || v.code_topidx === 'AI' ||
                v.code_topidx === 'AD'
            ))
    }, []);

    return  (
        <>
            <Prompt when={prompt} message="변경사항이 저장되지 않을 수 있습니다." />
            <Container>
                <div className="title">
                    <h4>채용 정보를 입력해주세요.<br/>
                        <small>다음정보를 입력하시면 HR 전문가가 배정되어 채용이 진행됩니다.</small>
                    </h4>
                </div>
                <hr/>
                <div>

                    <Card className="card card-sugub">
                        <CardTitle>
                            <div style={{padding:'15px'}}>
                                <LinearDeterminate progress={progress}/>
                                <div className="centered" >
                                    <small style={{fontSize:'1.2em'}}>{progress} {'%'}</small>
                                </div>
                            </div>
                        </CardTitle>
                        <CardBody>
                            <Row>
                                <Col md="8">
                                    <div>
                                        {page === 1 && <SugubFormStep1 onSubmit={onNextPage} comCode={comCode} {...selected}/>}
                                        {page === 2 && (
                                            <SugubFormStep2
                                                previousPage={onPreviousPage}
                                                onSubmit={onNextPage}
                                                comCode={comCode}
                                            />
                                        )}
                                        {page === 3 && (
                                            <SugubFormStep3
                                                previousPage={onPreviousPage}
                                                onSubmit={onNextPage}
                                                comCode={comCode}
                                            />
                                        )}
                                        {page === 4 && (
                                            <SugubFormStep4
                                                previousPage={onPreviousPage}
                                                onSubmit={onNextPage}
                                                comCode={comCode}
                                            />
                                        )}
                                        {page === 5 && (
                                            <SugubFormStep5
                                                previousPage={onPreviousPage}
                                                onSubmit={onNextPage}
                                                comCode={comCode}
                                            />
                                        )}
                                        {page === 6 && (
                                            <SugubFormStep6
                                                previousPage={onPreviousPage}
                                                onSubmit={onNextPage}
                                                comCode={comCode}
                                            />
                                        )}
                                        {page === 7 && (
                                            <SugubFormStep7
                                                previousPage={onPreviousPage}
                                                onSubmit={onNextPage}
                                                comCode={comCode}
                                            />
                                        )}
                                        {/* 로그인 안된 경우*/}
                                        {page === 8 && ( authenticated === undefined || authenticated === false ) && (
                                            <SugubFormEmailCheck
                                                previousPage={onPreviousPage}
                                                nextPage={onNextPage}
                                                onSubmit={onSubmit}
                                            />
                                        )}
                                        {/* 로그인은 됐지만 기업정보 등록 안한 경우*/}
                                        {page === 8 && authenticated === true && company === null && (
                                            <SugubFormStep8
                                                previousPage={onPreviousPage}
                                                nextPage={onNextPage}
                                                onSubmit={onSubmit}
                                            />
                                        )}
                                        {/* 로그인 기업정보 등록 완료된 경우 */}
                                        {page === 8 && authenticated === true && company !== null && (
                                            <SugubFormStep8Finish
                                                previousPage={onPreviousPage}
                                                nextPage={onNextPage}
                                                onSubmit={onSubmit}
                                            />
                                        )}

                                    </div>
                                </Col>
                                <Col md="4">
                                    {page <= 8 && !isMobile && (
                                        <SugubFormInfo page={page}/>
                                    )}
                                </Col>
                                <Col>
                                    {page === 9 && (
                                        <>
                                            <Card className="card card-sugub text-center">
                                                <h4>채용의뢰서 등록중</h4>
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

                                    {page === 10 && (
                                        <>
                                            <Card className="card card-sugub text-center">
                                                <h4>채용의뢰서 등록 완료</h4>
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
                                                    <Link to={'/Company/Sugub'}>
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
                {!isMobile && <>
                    <div>
                        <h5>현재 조건에 맞는 인재 <small style={{color:"red"}}>{fitUsers && fitUsers.length}</small></h5><hr/>
                        {fitUsers ? (
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
                                ): (<Nothing text={''}/>)}
                            </>
                        ) : (<LoaderSpinner/>)}
                    </div>
                    <hr/>
                    <div>
                        <h5>리뷰 <small style={{color:"red"}}>{reviews && reviews.length}</small></h5>
                        <hr/>
                        {reviews ? (
                            <>
                                {reviews.length > 0 ? (
                                    <>
                                        {reviews.map((review, index) => (
                                            <>
                                                <div className="box box-reviews">
                                                    {/*<Typography component="legend">평점</Typography>*/}
                                                    <Row>
                                                        <Col md={6} className="text-left">
                                                            <div className="description">
                                                                [{review.sugub.chae_cd.code_name}] {review.sugub.sugub_title}
                                                            </div>
                                                        </Col>
                                                        <Col md={6} className="text-right">
                                                            {review.created_time}
                                                        </Col>
                                                    </Row>
                                                    <Rating name="read-only" value={review.point_avg} precision={0.5} readOnly />
                                                    <div className="text-left">
                                                        {review.user.nickname}
                                                    </div>
                                                    {review.review_comment}
                                                </div>
                                            </>
                                        ))}
                                    </>
                                ): (<Nothing text={'리뷰'}/>)}
                            </>
                        ) : ( <LoaderSpinner/>)}
                    </div></>}
            </Container>
        </>
    )
}

SugubForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

const selector = formValueSelector('sugub_wizard');


function mapStateToProps(state, props) {
    const sugub_jikjong_mid = selector(state, 'sugub_jikjong_mid');
    if(props.location.state) {
        return {
            sugub_jikjong_mid: sugub_jikjong_mid,
            authenticated: state.auth.authenticated,
            selected: props.location.state.selected,
            company: state.auth.company,
            user: state.auth.user,
            comcode: state.comcode.comcode
        }
    }else{
        return {
            sugub_jikjong_mid: sugub_jikjong_mid,
            authenticated: state.auth.authenticated,
            company: state.auth.company,
            user: state.auth.user,
            comcode: state.comcode.comcode
        }
    }
}

// export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(SugubForm)
export default connect(mapStateToProps, {getUserProfile})(SugubForm)
