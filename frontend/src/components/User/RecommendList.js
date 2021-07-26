import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {apiUrls, AuthUrls, vUrls} from "../../constants/urls";
import UserCard from "./UserCard";
import {Button, Card, CardBody, Col, Table} from "reactstrap";
import UserUrl from "./UserUrl";
import LoaderSpinner from "../Etc/LoaderSpinner";
import {Link} from "react-router-dom";

const RecommendList = (props) => {

    const {type} = props.match.params;
    const [referList, setReferList] = useState(null);                 // 내가 추천한 사람
    const [recvList, setRecvList] = useState([]);                   // 추천 받은 공고
    const [advUrlList, setAdvurlList] = useState(null);               // 나의 광고URL
    const [companyAdvUrl, setCompanyAdvUrl] = useState([]);         // 나의 기업광고URL
    const [custReferList, setCustReferList] = useState([]);        // 내가 추천한 기업
    const user = props.user;

    // 내가 추천한 사람 목록 (최초 회원가입)
    useEffect(() => {
        if (user) {
            axios
                .get(vUrls.CUSTOM_PROFILE, {
                    params: {
                        recuser: user.id
                    }
                })
                .then(({data}) => {
                    setReferList(data)
                })
        }
    }, [user]);

    // 내가 추천한 기업 & 정보
    useEffect(() => {
        if (user && type === 'custrefer') {
            axios
                .get(apiUrls.CUSTOM_COMPANY_PROFILE, {
                    params: {
                        company_recuser: user.id
                    }
                })
                .then(({data}) => {
                    console.log('custom profile:', data )
                    setCustReferList(data)
                })
        }
    }, [user]);

    // 공고 URL
    useEffect(() => {
        if (user) {
            axios
                .get(AuthUrls.ADVERKEY, {
                    params: {
                        user: user.id
                    }
                })
                .then(({data}) => {
                    // console.log('jobAdvKey', data);
                    setAdvurlList(data)
                })
        }
    }, [user]);

    // 기업 URL
    useEffect(() => {
        if (user && type === 'custrefer') {
            axios
                .get(apiUrls.COMPANY_ADVERKEY, {
                    params: {
                        user: user.id
                    }
                })
                .then(({data}) => {
                    setCompanyAdvUrl(data)
                })
        }
    }, [user]);

    const createUrlkey = () => {
        axios
            .get(AuthUrls.CREATE_URLKEY,{
                params:{
                    user: props.user.id
                }
            })
            .then(({data}) => {
                setCompanyAdvUrl([data.result]);
            })
            .catch((err) => console.log(err))
    };

    console.log('custReferList:', custReferList)

    const list = () => {
        if (type === 'refer') {
            return (
                <>
                    {referList ? (
                        <>
                            <p className="description">
                                추천해 둔 사람이 언제든 이직하면 합격자와 추천인 각각 50만원의 보상금을 드려요.
                            </p>
                                {referList.length > 0 ? (
                                    <>
                                        {referList.map((list, index) => (
                                            <Col md="3">
                                                <UserCard key={index} info={list}/>
                                            </Col>
                                        ))}
                                    </>
                                ):(<>나를 추천인으로 등록한 사람이 없습니다.</>)}
                        </>
                    ):(<LoaderSpinner/>)}
                </>
            )
        } else if (type === 'advUrl') {
            return (
                <>
                    {advUrlList ? (
                        <>
                            <p className="description">
                                해당 광고 URL로 유입된 사용자가 회원가입을 하면 내가 추천한 사람으로 등록돼요.<br/>
                            </p>
                            {advUrlList.length > 0 ? (
                                    <Table>
                                        <thead>
                                        <tr>
                                            <td>공고마감일</td>
                                            <td>공고명</td>
                                            <td>URL</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {advUrlList.map((list, index) => (
                                            <UserUrl key={index} info={list}/>
                                        ))}
                                        </tbody>
                                    </Table>
                                ):
                                (
                                    <>
                                        <p className="description">
                                            아직 광고 URL이 없어요.<br/>
                                        </p>
                                        <p className="description">
                                            채용공고의 공유하기 버튼을 눌러서 광고 URL을 생성하면 돼요.<br/>
                                        </p>
                                        <Link to={'/User/List'}>
                                            <Button
                                                className="btn-round btn-outline-primary"
                                                color="danger"
                                            >
                                                광고URL 만들러가기
                                            </Button>
                                        </Link>
                                    </>
                                )
                            }
                        </>
                    ):(<LoaderSpinner/>)
                    }
                </>
            )
        } else if (type === 'custrefer') {

            return (
                <>
                    <p className="description">
                        기업 인사담당자의 추천은 늘 힘이 됩니다.<br/>
                        추천해 둔 업체에서 인재요청을 하면 추천인에게 구간별 인센티브를 드려요.<br/>
                        <small>
                            예시) 진행건수 1 ~ 5 건 ==> 50만원 <br/>
                            {'  '}진행건수 6 ~ 10 건 ==> 100만원 <br/>
                        </small>
                    </p>
                    { companyAdvUrl.length > 0 ?
                        (
                            <Card>
                                <CardBody>
                                    나만의 URL : {companyAdvUrl[0].url} {' '}
                                </CardBody>
                            </Card>
                        ) :
                        (
                            <>
                                <Button onClick={() => createUrlkey()}>기업 광고용 URL 생성</Button>
                            </>
                        )
                    }
                    { custReferList.length > 0 ? (
                            <div className="content">
                                <Table>
                                    <thead>
                                    <tr>
                                        <td>기업명</td>
                                        <td>진행건수</td>
                                        <td>누적보상금</td>
                                        <td>담당자이메일</td>
                                        <td>담당자연락처</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {custReferList.map( (custRefer, index) => (
                                        <tr>
                                            <td>{custRefer.custname}</td>
                                            <td>{custRefer.company_sugub.length} 건</td>
                                            <td>{' '}</td>
                                            <td>{custRefer.manager_email}</td>
                                            <td>{custRefer.manager_phone}</td>
                                        </tr>
                                    ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        ) : (
                            <div className="content">
                                <Table>
                                    <thead>
                                    <tr>
                                        <td>기업명</td>
                                        <td>진행건수</td>
                                        <td>누적보상금</td>
                                        <td>담당자이메일</td>
                                        <td>담당자연락처</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5}>아직 추천한 기업이 없습니다</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>)
                    }

                </>
            )
        } else if (type === 'received') {
            return (
                // recvList.map((list,index) => (
                <Col md="3">
                    <small>{'나를 추천한사람'}</small>
                    {/*<ChaeCard key={index} info={list}/>*/}
                </Col>
                // ))
            )
        }
    }

    return (
        <>
            {list()}
        </>
    )
};

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(RecommendList)