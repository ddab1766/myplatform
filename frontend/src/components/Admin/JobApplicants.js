import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {apiUrls, AuthUrls, vUrls} from "../../constants/urls";
import {connect} from "react-redux";
// import Modal from "./modal.js"
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import defaultClient from '../../utils/defaultClient';
// import Resume from '../Resume'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import axios from "axios";

const JobApplicants = ({props, selectId, selectIndex, selected}) => {
    const {token} = props;
    const [ users, setUsers ] = useState([]);
    const [ comCode, setComcode ] = useState([]);
    const [ sugub, setSugub ] = useState();
    const [ select, setSelect ] = useState([]);
    const [ status, setStatus ] = useState();
    const [ test, setTest ] = useState([1,3]);
    const [ disabled, setDisabled ] = useState(false);
    //지원자상태 셀렉옵션
    useEffect(()=>{
        // axios.get(AuthUrls.COMMON, {
        //     params: {
        //         code_topidx__in: 'BW',
        //         code_id__in: 'BW0100000,BW0200000,BW0301000,BW0302000,BW0401000,BW0402000,BW0403000,BW0501000,BW0502000,BW0503000,BW0601000,BW0602000,BW0603000,BW0701000,BW0702000,BW0801000,BW0803000,BW0900000'
        //     }
        // })
        //     .then( ({data}) => {
        //         const lists = data.map((value, index) => {
        //             if (value.code_topidx === 'BW') {
        //                 return (
        //                     {
        //                         value : value.code_name,
        //                         label : value.code_name,
        //                         id : value.code_id
        //                     }
        //                 )
        //             }
        //             return null;
        //         });
        //         const code = lists.filter((list) => {
        //             return list !== null;
        //         })
        //         setComcode(code);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    },[]);
    //지원자 상태 체크 전체 변환 이벤트
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: false,
        selected: select.appid,
        onSelect: (row, isSelect, rowIndex, e) => {
            //체크 -> 삽입
            if(isSelect){
                //setSelect(select.concat(row));
                setSelect(select.concat({appid : row.id,userid : row.user.id}));
                setTest(test.concat({appid : row.id,userid : row.user.id}));
            } else{ //체크해제 -> 제거
                //setSelect(select.filter(val => val.id !== row.id));
                setSelect(select.filter(val => val.appid !== row.id));
                setTest(test.filter(v => v.appid !== row.id));
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            //체크 -> 삽입
            if(isSelect){
                console.log(rows);
                //setSelect(rows);
                setSelect(rows.map(v => {
                    return ( {appid : v.id,
                            userid : v.user.id}
                    )
                }));
                setTest(rows.map(v => {
                    return ( {appid : v.id,
                            userid : v.user.id}
                    )
                }));
            } else{ //체크해제 -> 제거
                setSelect([]);
                setTest([])
            }
        }

    };
    //적용 버튼 클릭 이벤트(지원자상태변환)
    const handleClick = () => {
        if(typeof status === 'undefined'){
            alert("변경하실 상태를 선택해주세요.");
            return false;
        }
        if(select.length > 0){
            setDisabled(true);
            select.map((data,index) => {
                defaultClient.patch(apiUrls.JOB_APPLICANT + data + "/",{applied_status: status},{
                    headers:{
                            authorization: 'Token ' + props.token
                        },
                    }
                ).then(res => {
                    window.notify.onChange('정상적으로 처리되었습니다.');
                    console.log(res);
                    //마지막 index 업데이트 완료시 테이블 리로드(여러번 리로드되는걸 막기 위함)
                    setDisabled(false);
                    if(select.length - 1 == index){
                        handleReload();
                    }
                });
            });
        }
    }
    const deleteUserAccount = async (id) => {
        try{
            await axios.delete(AuthUrls.CREATE_TEMPREGISTER,{params:id})
                .then(console.log('secfce'))
                .catch(error => console.log(error));
        } catch(e){
            console.log(e);
        }
    }
    //삭제 이벤트
    const handleDelete = () => {
        setDisabled(true);
        select.map((data,index) => {
            defaultClient.patch(apiUrls.JOB_APPLICANT + data.appid + "/",{applied_status: 'BW0702000'},{
                    headers:{
                            authorization: 'Token ' + props.token
                        },
                    }
                ).then(res => {
                    window.notify.onChange('정상적으로 처리되었습니다.');
                    console.log(res);
                    //마지막 index 업데이트 완료시 테이블 리로드(여러번 리로드되는걸 막기 위함)
                    setDisabled(false);
                    if(select.length - 1 == index){
                        handleReload();
                    }
                });
            // defaultClient.delete(AuthUrls.CREATE_TEMPREGISTER,  {data:{user_id:data.userid}})
            //     .then(res => {
            //         window.notify.onChange('정상적으로 처리되었습니다.');
            //         //마지막 index 업데이트 완료시 테이블 리로드(여러번 리로드되는걸 막기 위함)
            //         setDisabled(false);
            //         setSelect([]);
            //         if (select.length - 1 == index) {
            //             handleReload();
            //         }
            //     }).catch(error => console.log(error));
            // ;
        });

    }
    //지원자상태 셀렉 옵션 변환 이벤트
    const handleChange = (value) => {
        setStatus(value.id);
    }
    //지원자 상태 개별 변환 이벤트
    function beforeSaveCell(oldValue, newValue, row, column, done) {
        setTimeout(() => {
            if(oldValue != newValue){
                if (window.confirm('수정하시겠습니까?')) {
                    const sLabel = comCode.filter((l) => {
                        return l.label === newValue;
                    });
                    defaultClient.patch(apiUrls.JOB_APPLICANT + row.id + "/",
                        { applied_status: sLabel[0].id, },{
                    headers:{
                            authorization: 'Token ' + props.token
                        },
                    }
                    ).then(res => {
                        window.notify.onChange('정상적으로 처리되었습니다.');
                        // setHandleClick(!handleClick);
                        handleReload();
                    });
                    done(true);
                } else {
                    done(false);
                }
            }
        }, 0);
        return { async: true };
    }

    //각 행 클릭시 공고지원자 출력
    useEffect(() => {
        if (selectId != null && typeof selected !== 'undefined') {
            defaultClient.get(vUrls.JOB_ADVERTISE ,{params:{
                sugub:selectId,
            }})
            .then(({ data }) => {
                console.log(data);
                setSugub(selected);
                if(data.count > 0){
                    if(data.results[0].jobapplicants.length > 0){
                        let users = data.results[0].jobapplicants;
                        setUsers(users);
                    } else{
                        setUsers([]);
                    }
                } else{
                    setUsers([]);
                }
                // 이전 지원자상태 변환 체크 리셋
                setTest([]);
                setSelect([]);
            })
            .catch(error => {
                console.log(error);
            });

            ////갱신안하는 로직
            // setSugub(selected);
            // if(selected.jobadvertise.length > 0){
            //     if(selected.jobadvertise[0].jobapplicant1.length > 0){
            //         setUsers(selected.jobadvertise[0].jobapplicant1);
            //     } else{
            //         setUsers([]);
            //     }
            // } else{
            //     setUsers([]);
            // }

        }
    }, [selectId]);
    //상태변환시 리로드
    const handleReload = () => {
        setUsers([]);
        defaultClient.get(vUrls.JOB_ADVERTISE, {params:{
                sugub:selectId,
            }}).then(({ data }) => {
                console.log(data)
            if(data.length > 0){
                    if(data[0].jobapplicants.length > 0){
                        let users = data[0].jobapplicants.filter(v => v.hrprofile.id === props.hr.id);
                        setUsers(users);
                    } else{
                        setUsers([]);
                    }
                } else{
                    setUsers([]);
                }
        });
    }

    const columns = [
        {
            text: '',
            dataField: '',
            formatter : (cell, row) => {
                if(row.applied_status == 'BW0801000'){
                    return (
                        <Link to={{pathname : 'sugub/pagyeonInsert',
                            state : { pagyeonData : row, sugub : sugub }}}>
                            파견사원등록</Link>
                    )
                }
            },
        },
        {
            text: '',
            dataField: 'id',
            hidden: true
        },
        {
            text: '사용자',
            dataField: 'applied_username',
            sort: true,
            editable:false,
        },
        {
            text: '생년월일',
            dataField: 'applied_birth',
            sort: true,
            editable:false,
        },
        {
            text: '핸드폰',
            dataField: 'applied_phone',
            sort: true,
            editable:false,
        },
        {
            text: '지원자상태',
            dataField: 'applied_status.code_name',
            sort: true,
            editable:false,
            // editor: {
            //     type: Type.SELECT,
            //     options: comCode
            // }
        },
        {
            text: '지원경로',
            dataField: 'hrprofile.custname',
            sort: true,
            editable:false,
        },
        {
            text: '지원시간',
            dataField: 'applied_at',
            sort: true,
            editable:false,
        },
        {
            text: '코멘트',
            dataField: 'applied_comment',
            editable:false,
            formatter : (cell, row) => {
                //return <Button className="btn-sm" color="danger" onClick={toggle}>리뷰</Button>
                // return <Modal buttonLabel={"보기"} user={row.user} jobad={row.jobadvertise}/>
            },
        },
        {
            text: '이력서',
            dataField: 'resume_filename',
            sort: true,
            editable:false,
            formatter : (cell, row) => {
                return (
                    <a href={row.resume_pdf} target="_blank"> {row.resume_filename} </a>
                )
            }
        },
    ];

    return (
        <>
            <Card>
                <CardHeader >

                    <Row>
                         <h5 className="ml-4">접수현황</h5>

                        { select && select.length > 0 && (
                            <>
                        {/*<Col md="auto" md="2">*/}
                        {/*    <Select*/}
                        {/*        options={comCode}*/}
                        {/*        onChange={(value) => handleChange(value)}*/}
                        {/*    />*/}
                        {/*</Col>*/}
                        <Col>
                            {/*<button type="button" className="btn btn-primary m-0 btn-sm" onClick={() => handleClick()} disabled={disabled}>적용</button>*/}
                            <button type="button" className="btn btn-danger mt-0 mb-0 btn-sm" onClick={() => handleDelete()} disabled={disabled}>지원취소</button>
                        </Col>
                              </>  )}
                        <Col>
                            <div className="text-right">
                                {/*{sugub && sugub.jobadvertise && (sugub.jobadvertise.length > 0 ?*/}
                                {/*    (<Resume sugub={sugub} handleReload={handleReload}/>)*/}
                                {/*    : (<span>공고게시전</span>)) }*/}
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <BootstrapTable
                        keyField="id"
                        hover
                        bordered={ false }
                        noDataIndication="데이터가 없습니다."
                        bootstrap4
                        data={users}
                        columns={columns}
                        cellEdit={cellEditFactory({ mode: 'click', blurToSave: true, beforeSaveCell })}
                        selectRow={ selectRow }
                    />
                </CardBody>
            </Card>
        </>
    )
}
// export default JobApplicants;
function mapStateToProps(state) {
    return {
        user: state.common.data,
        company: state.auth.company,
        hr: state.auth.hr,
        token:state.auth.token,
        comcode:state.comcode.comcode,
    }
}
export default connect(mapStateToProps)(JobApplicants);