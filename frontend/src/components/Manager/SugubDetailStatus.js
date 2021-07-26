import React, {useEffect, useState} from "react";
import {Col, Container} from "reactstrap";
import ChaeCard from "../../components/User/ChaeCard";
import defaultClient from "../../utils/defaultClient";
import {connect} from "react-redux";
import store from "../../store";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import JobAppContainer from "../Company/JobAppContainer"
import {vUrls} from "../../constants/urls";

// 수급진행상황
function SugubStatus(props) {
    const [sugub, setSugub] = useState(props.location.state ? props.location.state.sugub : null)
    const [jobAds, setJobAds] = useState([]);
    const [loader, setLoader] = useState(false);

    // 관련 공고 받아오기
    useEffect(() => {
        if(sugub.jobadvertise.length > 0){
            setLoader(true)
            defaultClient
                .get(vUrls.JOB_ADVERTISE, {
                    headers:{
                        authorization: 'Token ' + store.getState().auth.token
                    },
                    params: {
                        jobid: sugub.jobadvertise[0].id,
                    }
                })
                .then(({data}) => {
                    setJobAds(data);
                    // let apps = data[0].jobapplicants.filter(v => v.applied_status.code_id !== 'BW0100000' && v.applied_status.code_id !== 'BW1000000')
                    // setApplicants(apps);
                    // setFilterList(apps);
                    // getJobApCount(data[0].jobapplicants);
                    setLoader(false)
                }).catch(error => {
                console.log(error);
            })
        }
    }, []);

    return (
        <div className="content">
            <Container>
                <Card>
                    <CardContent>
                        <h3 className="text-md-left">진행상황<br/>
                            <small>
                                지원한 이력서를 검토 후 서류전형 합격여부를 정해주세요.<br/>
                            </small>
                        </h3>
                        {!loader ? (
                            <div>
                                {
                                    (jobAds == null || jobAds.length < 1)  ?
                                        (<>현재 등록된 공고가 없습니다.<br/>현재 공고등록 중 이오니 잠시만 기다려주시기 바랍니다.</>)
                                        : (<JobAppContainer jobad={jobAds}/> )
                                }
                            </div>
                        ) : (<LoaderSpinner/>)}
                        <div className="title">
                            <h5>수급정보</h5>
                        </div>
                        <hr/>
                        <div>
                            <div className="title">
                                <h5>수급담당자</h5>
                            </div>
                            <hr/>
                            {sugub.manager_nm}<br/>
                        </div>

                        <div>
                            <hr/>
                            <div className="title">
                                <h5>해당 채용공고</h5>
                            </div>
                            <hr/>
                            {jobAds.map((jobAd, index) => (
                                <Col md="3">
                                    <ChaeCard key={index} chaeList={jobAd} externelLink={true}/>
                                </Col>
                            ))}

                        </div>
                    </CardContent>
                </Card>
            </Container>
        </div>

    )
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
    }
}

export default connect(mapStateToProps)(SugubStatus);
