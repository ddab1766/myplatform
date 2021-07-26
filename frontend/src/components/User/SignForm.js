import React, {useEffect, useState} from "react";
import {getCompanyProfile} from "../../actions/authActions";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import axios from "axios";
import SignFormStep1 from "./SignForm_Step1";
import SignFormStep2 from "./SignForm_Step2";
import SignFormStep3 from "./SignForm_Step3";
import SignFormStep4 from "./SignForm_Step4";
import SignFormStep5 from "./SignForm_Step5";
import SignFormStep6 from "./SignForm_Step6";
import SignFormEmailCheck from "./SignForm_EmailCheck";

import {apiUrls} from "../../constants/urls";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import SignFormStep6Finish from "./SignForm_Step6_Finish";
import store from "../../store";
import LoaderSpinner from "../Etc/LoaderSpinner";
import ChaeCard from "./ChaeCard";
import {getJobAdvertise} from "../../actions/userActions";


const SignForm = (props) => {

    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [jikjongInfo, setJikjongInfo] = useState([]);
    const [fitChaegong, setFitChaegong] = useState(null);
    const [comCode, setComCode] = useState([]);

    const {onSubmit, authenticated, selected} = props;

    const onNextPage = () => setPage(page + 1);
    const onPreviousPage = () => setPage(page - 1);

    console.log('page:', page)

    useEffect(() => {
        // store.dispatch(initialize('signup_wizard', {}));
        if (selected.sec === 'mid') {
            axios
                .get(apiUrls.SUGUB_REVIEW, {
                    params: {
                        jikjong_mid: selected.code_id
                    }
                })
                .then(({data}) => {
                    setReviews(data);
                })
            axios
                .get(apiUrls.JIKJONG, {
                    params: {
                        jikjong_mid: selected.code_id
                    }
                })
                .then(({data}) => {
                    console.log('jikjong res', data);
                    setJikjongInfo(data)
                })
        } else if (selected.sec === 'top') {
            axios
                .get(apiUrls.SUGUB_REVIEW, {
                    params: {
                        jikjong_top: selected.code_id
                    }
                })
                .then(({data}) => {
                    setReviews(data);
                })
        }
    }, [selected]);

    // 나에게 맞는 채용공고
    useEffect(() => {
        const signup_wizard = store.getState().form.signup_wizard.values;
        let params = {};
        if (selected.sec === 'mid') {
            params.sugub_jikjong_top = selected.code_topcd;
            params.sugub_jikjong_mid = selected.code_id;
            getJobAdvertise(params).then((data)=>setFitChaegong(data))
        }else if(selected.sec === 'top'){
            params.sugub_jikjong_top = selected.code_id;
            getJobAdvertise(params).then((data)=>setFitChaegong(data))
        }

    }, [page]);

    // comCode
    useEffect(()=>{
        console.log('comcode', comCode)
        if(props.comcode)
            setComCode(props.comcode.filter(v=> v.code_topidx === 'BE' || v.code_topidx === 'BX'))
        // axios
        //     .get(AuthUrls.COMMON, {
        //         params: {
        //             code_topidx__in: 'BE,BX'
        //         }
        //     })
        //     .then( ({data}) => {
        //         console.log( 'step2 : ', data)
        //         setComCode(data)
        //     })
        //     .catch(error => {
        //         // const processedError = processServerError(error.response.data);
        //         // throw new SubmissionError(processedError);
        //     })
    },[]);

    return (
        <>
            <div className="section text-center"
                 style={{
                     color: '#FFFFFF',
                     backgroundImage: "url(" + require("../../assets/img/sample1.jpg") + ")"
                 }}
            >
                <h3> {selected.groupName}<br/></h3>
                <h5> {selected.code_name}<br/></h5>
            </div>
            <Container>
                <div className="title">
                    <h4>아래 정보를 입력해주세요.<br/>
                        <small>HR 전문가가 배정되어 알맞는 채용건을 추천해드립니다.</small>
                    </h4>
                </div>
                <hr/>
                <div>
                    {/*<button onClick={onNextPage}>nextPage</button>*/}
                    <Row>
                        <Col md="7">
                            {page === 1 && <SignFormStep1 onSubmit={onNextPage} {...selected}/>}
                            {page === 2 && (
                                <SignFormStep2
                                    previousPage={onPreviousPage}
                                    onSubmit={onNextPage}
                                />
                            )}
                            {page === 3 && (
                                <SignFormStep3
                                    previousPage={onPreviousPage}
                                    onSubmit={onNextPage}
                                    comCode={comCode}
                                />
                            )}
                            {page === 4 && (
                                <SignFormStep4
                                    previousPage={onPreviousPage}
                                    onSubmit={onNextPage}
                                />
                            )}
                            {page === 5 &&
                            <SignFormStep5 {...selected}
                                           previousPage={onPreviousPage}
                                           onSubmit={onNextPage}
                            />
                            }
                            {/* 로그인이 안된 경우 */}
                            {page === 6 && !authenticated && (
                                <SignFormStep6
                                    previousPage={onPreviousPage}
                                    onSubmit={onNextPage}
                                />
                            )}
                            {/* 로그인된 경우  */}
                            {page === 6 && authenticated && (
                                <SignFormStep6Finish
                                    previousPage={onPreviousPage}
                                    onSubmit={onSubmit}
                                />
                            )}
                            {page === 7 && (
                                <SignFormEmailCheck
                                    previousPage={onPreviousPage}
                                    onSubmit={onSubmit}
                                />
                            )}

                        </Col>
                        <Col md="5">
                            <blockquote className="blockquote text-center">
                                <p className="mb-0">{selected.code_name}<br/></p>
                                <footer className="blockquote-footer">
                                    {jikjongInfo.map((value, index) => <>{value.jikjong_comment}</>
                                    )}
                                </footer>
                            </blockquote>
                        </Col>
                    </Row>
                </div>
                <hr/>
                <div>
                    <h6>나에게 맞는 공고</h6><hr/>
                    {fitChaegong ? (
                        <Row>
                            {fitChaegong.length > 0 && fitChaegong.map((list, index)=> {
                                if(list.jobadvertise_status === 'CA0300000')
                                    return (
                                        <Col md="3"><ChaeCard chaeList={list} linkInvisible={true}/></Col>
                                    )
                            })
                            }
                        </Row>
                    ) : (
                        <LoaderSpinner/>
                    )
                    }
                </div>
                <hr/>
                <div>
                    <h6>Review</h6>
                    <hr/>
                    {reviews ? (
                        reviews.map((review, index) => (
                            <>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    {/*<Typography component="legend">평점</Typography>*/}
                                    {review.username} ({review.user_email})
                                    <Rating name="read-only" value={review.point_avg} precision={0.5} readOnly/>
                                </Box>
                                <small> : {review.review_comment}  </small>
                            </>
                        ))
                    ) : (<>Loading...</>)
                    }
                    {/*<p>{ selected }</p>*/}
                </div>
            </Container>
            <div className="title">{' '}</div>
            {/*</div>*/}
        </>
    )
}


SignForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
    return {
        authenticated: state.auth.authenticated,
        selected: props.location.state.selected,
        comcode: state.comcode.comcode,
        //values: state.form.signup_wizard.values
        // user: state.auth.user
    }
}

export default connect(mapStateToProps, {getCompanyProfile})(SignForm)
