import React, {useCallback, useEffect, useState} from "react";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import {Breadcrumb, BreadcrumbItem, Col, Container, Row} from "reactstrap";
import PartnersList from "../../components/Company/PartnersList";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {CheckField} from "../../utils/renderUtils_rsuite";
import {CheckboxGroup, ControlLabel, Form, FormGroup, Loader, Radio, RadioGroup, TagPicker} from "rsuite";
import axios from "axios"
import {vUrls} from "../../constants/urls";
import store from "../../store";
import {CommonTypes} from "../../constants/actionTypes";
import CustomPagination from "../../components/Common/Pagination";
import qs from "qs";
import Nothing from "../../components/Common/Nothing";

const Partners = (props) => {
    const { comcode, loading, partners } = useSelector(state => ({
            comcode: state.comcode.comcode,
            loading: state.common.loading,
            partners: state.common.data ? state.common.data : []
        }),
        shallowEqual
    );
    const [page, setPage] = useState(1);
    // const [searchLists, setSearchLists] = useState([]);
    const [options, setOptions] = useState(comcode.filter(v=> v.code_topidx === 'BE'));
    const [filters, setFilters] = useState([]);

    const filter = (nam,v) => {
        setPage(1)
        setFilters({...filters,[nam]:v})
    };

    // 파트너스 불러오기
    useEffect(()=>{
        setOptions(options.map(v=>{
            return { 'label': v.code_name, 'value': v.code_id }
        }))
    },[]);

    useEffect(()=>{
        // setPage(1)
        store.dispatch({
            type: CommonTypes.LOADING
        });
        axios.get(vUrls.PARTNERS_LIST,{
            params:{ ...filters, page: page},
            paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        })
            .then((response) => {
                store.dispatch({
                    type: CommonTypes.GET_API_DATA,
                    payload: response.data
                });
            })
        return () => {
            store.dispatch({
                type: CommonTypes.RESET
            })
        }
    },[filters, page]);


    // const onOrderChange = (e, ordering) => {
    //     e.preventDefault()
    //     let sortedList = [];
    //
    //     if(ordering === 'id') {
    //         sortedList = partners.results.sort(function (a, b) {
    //             return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
    //         })
    //     } else if(ordering === 'jobad_count'){
    //         sortedList = partners.results.sort(function (a, b) {
    //             return a.jobad_count > b.jobad_count ? -1 : a.jobad_count < b.jobad_count ? 1 : 0;
    //         })
    //     } else if(ordering === 'resume_count'){
    //         sortedList = partners.results.sort(function (a, b) {
    //             return a.resume_count > b.resume_count ? -1 : a.resume_count < b.resume_count ? 1 : 0;
    //         })
    //     }
    //     store.dispatch({
    //         type: CommonTypes.SORT,
    //         payload: {...partners, results: sortedList }
    //     });
    //     // setSearchLists(sortedList)
    // };

    // console.log('searchLists', searchLists)
    const selectOptions = comcode.filter(v =>v.code_topidx === 'AA' && v.code_topcd === null).map((v,index) =>{
        return {'label': v.code_name, 'value': v.code_id, 'id' : v.code_id}
    });

    const menuList = () => {
        return (
            <div>
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem>
                        <Link to={`#`} onClick={(e)=>filter('ordering',1)}>기본 정렬순</Link>
                        {/*<span onClick={(e)=>onOrderChange(e, 'id')}>기본 정렬순</span>*/}
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={`#`} onClick={(e)=>filter('ordering',2)}>진행 많은 순</Link>
                        {/*<Link to={`${match.url}/CC0300000`}>수급 진행 많은 순</Link>*/}
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={`#`} onClick={(e)=>filter('ordering',3)}>이력서 많은 순</Link>
                        {/*<Link to={`${match.url}/CC0300000`}>수급 진행 많은 순</Link>*/}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        )
    };

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>파트너스<br/>
                        <small>
                            총 {!loading && partners.count !== null ? partners.count : 0} 개의 파트너스가 있습니다.
                        </small>
                    </h3>

                </div>
                <Row>
                    <Col md={3}>
                        <Card>
                            <CardContent>
                                파트너스 필터
                                <hr/>
                                <Form layout="inline">
                                    <FormGroup controlId="radioList">
                                        <ControlLabel>입점여부 </ControlLabel>
                                        <RadioGroup name="radioList" inline defaultValue="all" onChange={(v)=>{filter('is_partners',v)}}>
                                            <Radio value="all" checked>전체</Radio>
                                            <Radio value="y" checked>입점</Radio>
                                            <Radio value="n" >미입점</Radio>
                                        </RadioGroup>
                                    </FormGroup>
                                    {/*<CheckField name="service_address" data={props.comcode.filter(v=> v.code_topidx === 'BE')} label="서비스지역"
                                                accepter={CheckboxGroup} topidx='BE' topcd={null} filter={filter}
                                                inline
                                    />*/}
                                    <label className="rs-control-label">전문직종</label>
                                    <TagPicker data={selectOptions}
                                               size="sm"
                                               style={{ width:300}} placeholder="전체"
                                               onChange={(v, item)=>filter('hrspecial__hr_jikjong_top',v)}
                                               onClean={() => filter('hrspecial__hr_jikjong_top', [])}
                                    />
                                </Form>
                            </CardContent>
                        </Card>
                        <hr/>
                    </Col>
                    <Col md={9}>
                        {menuList()}
                        {!loading && partners.results && (
                            <>
                                {partners.results.length > 0 ? partners.results.map((v, index) => {
                                    return (
                                        <>
                                            <PartnersList key={index} partner={v}/>
                                        </>
                                    )
                                }) : (<Nothing/>)}
                            </>
                        )}
                        {loading && <Loader size="lg" content="로딩중...." backdrop vertical center/>}
                        <CustomPagination current={page} postsPerPage={10} totalPosts={partners && partners.count} paginate={setPage}></CustomPagination>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

// function mapStateToProps(state) {
//     return {
//         authenticated: state.auth.authenticated,
//         user: state.auth.user,
//         company: state.auth.company,
//         hr: state.auth.hr,
//         comcode: state.comcode.comcode
//     }
// }

// export default connect(mapStateToProps, {getUserProfile})(Partners);
export default Partners;
