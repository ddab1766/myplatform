import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import JobApplicants from './JobApplicants';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, {selectFilter} from 'react-bootstrap-table2-filter';
import {Card, CardBody,} from "reactstrap";
import {getHrSugub, getSugub} from "../../actions/sugubActions";
import {connect, useSelector} from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import * as common from "../../function/common"
import defaultClient from "../../utils/defaultClient";
import {vUrls} from "../../constants/urls";
import store from "../../store";
import {SubmissionError} from "redux-form";
import history from "../../utils/historyUtils";
const { SearchBar } = Search;

const SugubList = (props) => {
    const [sugubs, setSugubs] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectIndex, setSelectIndex] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading,setLoading] = useState(false);

    const {comcode} = useSelector( state => ({ comcode: state.comcode.comcode}));

    const selectOptions = comcode.filter(v =>v.code_topidx === 'AA' && v.code_topcd === null).map((v,index) =>{
        return {'label': v.code_name, 'value': v.code_name}
    });
    const selectOptions_status = comcode.filter(v =>v.code_topidx === 'CC' && v.code_topcd === null).map((v,index) =>{
        return {'label': v.code_name, 'value': v.code_name}
    });
    const selectOptions_chae = comcode.filter(v =>v.code_topidx === 'AC' && v.code_topcd === null).map((v,index) =>{
        return {'label': v.code_name, 'value': v.code_name}
    });
    const selectRow = {
        mode: 'radio',
        hideSelectColumn: true,
        clickToSelect: true,
        bgColor: '#ced1d4',
        onSelect: (row, isSelect, rowIndex, e) => {
            setSelectIndex(rowIndex);
            setSelectedId(row.id);
            setSelected(row);
        },
    };
    const checkCPStatus = (e,row) => {
        console.log('checkCPStatus row:', row)
        e.preventDefault();
        if(row.sugub_status.code_id === 'CC0100000' && row.companyprofile.status_cd.code_id === 'CB0100000'){
            alert('해당 기업은 검토중이므로 수정이 불가합니다.\n기업관리에서 승인을 완료해주십시오.');
            return false;
        } else{
            history.push({pathname: props.match.url + '/' + row.id, state: { sugub: row }})
        }
    }
    useEffect(() => {
        setLoading(true)
        getSugub().then((response)=>{
            setSugubs(response.results);
            setLoading(false)
        })
        return () => {
            console.log('clean up!')
        }
    }, []);
    const columns = [
        {
            text: 'ID',
            dataField: 'id',
            sort: true,
            hidden:true
        },
        {
            text: '의뢰일',
            dataField: 'created_at',
            sort: true,
            formatter : (cell, row) => {
                return cell.substring(0,10)
            },
        },
        {
            text: '채용마감일',
            dataField: 'sugub_end_dt',
            sort: true,
        },
        {
            text:'',
            dataField: 'sugub_status.code_name',
            filter: selectFilter({
                placeholder:'진행상태',
                options: selectOptions_status,
                style:{padding:'0px'}
            })
        },
        {
            text: '수급제목',
            dataField: 'sugub_title',
            sort: true,
            formatter : (cell, row) => {
                return <a href='#' onClick={(e)=>checkCPStatus(e,row) }>{row.sugub_title}</a>
            },
        },
        {
            text:'',
            dataField: 'chae_cd.code_name',
            filter: selectFilter({
                placeholder:'채용형태',
                options: selectOptions_chae,
                style:{padding:'0px'}
            })
        },
        {
            text: '기업명',
            dataField: 'companyprofile.custname',
            sort: true,
        },

        {
            text: '포지션',
            dataField: 'work_position',
            sort: true,
        },
        {
            text: 'TO',
            dataField: 'hire_count',
            sort: true,
        },
        {
            text: '경력',
            dataField: 'sugub_career_gb.code_name',
            sort: true,
        },
        {
            text: '학력',
            dataField: 'education_cd.code_name',
            sort: true,
        },
        {
            text:'',
            dataField: 'sugub_jikjong_top.code_name',
            filter: selectFilter({
                placeholder:'직종',
                options: selectOptions,
                style:{padding:'0px'}
            })
        },
        {
            text: '급여',
            dataField: 'salary_start',
            sort: true,
            formatter : (cell, row) => {
                return <>{row.salary_start}-{row.salary_end}</>
            },
        },
        {
            text: '근무지역',
            dataField: 'work_load_addr',
            sort: true,
        },

        {
            text: '총 지원자',
            dataField: '',
            formatter : (cell,row) => {
              // return  <Tooltip title=""><span>{common.getCountTotalJobApplicant(row)}</span></Tooltip>
              return  <>{row.jobadvertise[0] && row.jobadvertise[0].applicants_count}명 지원중</>
            },

        },
        // {
        //     text: '공고요청상태',
        //     dataField: 'jobadvertise_nm',
        //     sort: true,
        //     formatter : (cell, row) => {
        //         if(row.jobadvertise && row.jobadvertise.length > 0 && row.sugub_status.code_name != "종료"){
        //             if(row.jobadvertise[0].jobadvertise_status.code_name == '공고미등록'){
        //                 return(
        //                     <>
        //                         <span>미등록</span>
        //                         <Link to={{ pathname: 'jobad/' + row.jobadvertise[0].id, state: { sugub:row, jobad: row.jobadvertise[0] } }}>(공고등록)</Link>
        //                     </>
        //                 )
        //             } else if(row.jobadvertise[0].jobadvertise_status.code_name == '공고대기중'){
        //                 return(
        //                     <>
        //                         <span>대기중</span>
        //                         <Link to={{ pathname: 'jobad/' + row.jobadvertise[0].id, state: { jobad: row.jobadvertise[0] } }}>(공고수정)</Link>
        //                     </>
        //                 )
        //             } else if(row.jobadvertise[0].jobadvertise_status.code_name == '공고게시중'){
        //                 return(
        //                     <>
        //                         <span>게시중</span>
        //                         <Link to={{ pathname: 'jobad/' + row.jobadvertise[0].id, state: { jobad: row.jobadvertise[0] } }}>(공고수정)</Link>
        //                     </>
        //                 )
        //             }
        //             else {
        //                 return <div></div>
        //             }
        //         }
        //         //return <Link to={{ pathname: props.match.url + '/' + row.id, state: { sugub: row } }}>{row.companyprofile_nm}</Link>
        //     },
        // },

    ];
    const defaultSorted = [{
          dataField: 'id',
          order: 'desc'
        }];

    return  (sugubs && !loading) && (
        <>
            <Card>
                <CardBody>

                    <ToolkitProvider
                        keyField='id'
                        data={sugubs}
                        condensed
                        bootstrap4
                        columns={columns}
                        search
                    >

                        {
                            props => (
                                <div>
                                    <SearchBar {...props.searchProps} />
                                    <hr />
                                    <BootstrapTable
                                        bordered={ false }
                                        noDataIndication="데이터가 없습니다."
                                        selectRow={selectRow}
                                        hover
                                        defaultSorted={ defaultSorted }
                                        pagination={paginationFactory()}
                                        filter={ filterFactory() }

                                        {...props.baseProps}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </CardBody>
            </Card>
            <JobApplicants selected={selected} selectId={selectedId} selectIndex={selectIndex} props={props}/>
        </>
    )
}
//export default SugubList;
function mapStateToProps(state) {
    return {
        hr: state.auth.hr,
        user: state.auth.user,
        token: state.auth.token,
        comcode:state.comcode.comcode,
    }
}

// export default connect(mapStateToProps)(SugubList);
export default SugubList;

