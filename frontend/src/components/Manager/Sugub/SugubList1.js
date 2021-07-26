// import React, {useEffect, useState} from "react";
// import {Link} from 'react-router-dom';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import filterFactory, {selectFilter} from 'react-bootstrap-table2-filter';
// import {getHrSugub} from "../../../actions/sugubActions";
// import {connect} from "react-redux";
// import * as common from "../../../function/common"
// import JobApDrawer from "./JobApDrawer"
// import Filter from "./Filter"
// import {Panel} from "rsuite"
//
// const { SearchBar } = Search;
//
// const SugubList = (props) => {
//     const [sugubs, setSugubs] = useState();
//     const [selectedId, setSelectedId] = useState(null);
//     const [selectIndex, setSelectIndex] = useState(null);
//     const [selected, setSelected] = useState(null);
//     const [show, setShow] = useState(false);
//     const [data, setData] = useState([]);
//     const [reload, setReload] = useState(null);
//     const selectOptions = props.comcode.filter(v =>v.code_topidx === 'AA' && v.code_topcd === null).map((v,index) =>{
//         return {'label': v.code_name, 'value': v.code_name}
//     });
//
//     const toggleReload = (data) => {
//         setReload(data)
//     }
//   const handleClickJobAp = (row) => {
//       setShow(true);
//       setData(row.jobadvertise[0].jobapplicants)
//   }
//     const selectRow = {
//         mode: 'radio',
//         hideSelectColumn: true,
//         clickToSelect: true,
//         bgColor: '#ced1d4',
//         onSelect: (row, isSelect, rowIndex, e) => {
//             setSelectIndex(rowIndex);
//             setSelectedId(row.id);
//             setSelected(row);
//         },
//     };
//
//     useEffect(() => {
//         getHrSugub().then( (data) => {
//             console.log(data);
//             setSugubs(data);
//         }).catch(((err) => console.log(err)));
//     }, [reload]);
//     const columns = [
//         {
//             text: 'ID',
//             dataField: 'id',
//             sort: true,
//             hidden:true
//         },
//         {
//             text: '의뢰일',
//             dataField: 'created_at',
//             sort: true,
//             formatter : (cell, row) => {
//                 return cell.substring(0,10)
//             },
//         },
//         {
//             text: '채용마감일',
//             dataField: 'sugub_end_dt',
//             sort: true,
//         },
//         {
//             text:'진행상태',
//             dataField: 'sugub_status.code_name',
//             sort: true,
//         },
//         {
//             text: '의뢰제목',
//             dataField: 'sugub_title',
//             sort: true,
//             formatter : (cell, row) => {
//                 return <Link to={{ pathname: props.match.url + '/' + row.id, state: { sugub: row } }}>{row.sugub_title}</Link>
//             },
//         },
//         {
//             text: '채용형태',
//             dataField: 'chae_cd.code_name',
//         },
//         {
//             text: '기업명',
//             dataField: 'companyprofile.custname',
//             sort: true,
//         },
//
//         {
//             text: '포지션',
//             dataField: 'work_position',
//             sort: true,
//         },
//         {
//             text: 'TO',
//             dataField: 'hire_count',
//             sort: true,
//         },
//         {
//             text: '경력',
//             dataField: 'sugub_career_gb.code_name',
//             sort: true,
//         },
//         {
//             text: '학력',
//             dataField: 'education_cd.code_name',
//             sort: true,
//         },
//         {
//             text:'',
//             dataField: 'sugub_jikjong_top.code_name',
//             filter: selectFilter({
//                 placeholder:'직종',
//                 options: selectOptions,
//                 style:{padding:'0px'}
//             })
//         },
//         {
//             text: '급여(만원)',
//             dataField: 'salary_start',
//             sort: true,
//             formatter : (cell, row) => {
//                 return <>{row.salary_start}~{row.salary_end}</>
//             },
//         },
//         {
//             text: '근무지역',
//             dataField: 'work_load_addr',
//             sort: true,
//         },
//         {
//             text: '나의 지원자',
//             dataField: 'id1',
//             sort: true,
//             formatter : (cell,row) => {
//                 var num = common.getCountMyJobApplicant(row,props.hr.id);
//                 return  num > 0 ? (<Link to='#' onClick={() => handleClickJobAp(row)}>{num}명</Link>) : (<>{num}명</>)
//             },
//
//         },
//         {
//             text: '총 지원자',
//             dataField: 'id2',
//             sort: true,
//             formatter : (cell,row) => {
//               return  <>{common.getCountTotalJobApplicant(row)}</>
//             },
//
//         },
//
//
//     ];
//     const defaultSorted = [{
//           dataField: 'id',
//           order: 'desc'
//         }];
//
//     return sugubs && sugubs.length > 0 ? (
//         <>
//             <JobApDrawer jobApData={data} show={show} setShow={setShow} toggleReload={toggleReload} handleClickJobAp={handleClickJobAp}/>
//
//             <Panel style={{background:'white'}}>
//
//                 <Filter />
//
//             <br/>
//             <h6>조회결과</h6>
//             <br/>
//             <Panel bordered>
//                 {/*<CardBody>*/}
//                     <ToolkitProvider
//                         keyField='id'
//                         data={sugubs}
//                         condensed
//                         bootstrap4
//                         columns={columns}
//                         search
//                     >
//                         {
//                             props => (
//                                 <div>
//                                     <SearchBar {...props.searchProps} placeholder="결과내 검색" style={{width:'200px'}}/>
//                                     <hr />
//                                     <BootstrapTable
//                                         bordered={ false }
//                                         noDataIndication="데이터가 없습니다."
//                                         selectRow={selectRow}
//                                         hover
//                                         defaultSorted={ defaultSorted }
//                                         pagination={paginationFactory()}
//                                         filter={ filterFactory() }
//
//                                         {...props.baseProps}
//                                     />
//                                 </div>
//                             )
//                         }
//                     </ToolkitProvider>
//                 {/*</CardBody>*/}
//             </Panel>
//             </Panel>
//             {/*<JobApplicants selected={selected} selectId={selectedId} selectIndex={selectIndex} props={props}/>*/}
//         </>
//     ) : (<></>) ;
// }
// //export default SugubList;
// function mapStateToProps(state) {
//     return {
//         hr: state.auth.hr,
//         user: state.auth.user,
//         token: state.auth.token,
//         comcode:state.comcode.comcode,
//     }
// }
//
// export default connect(mapStateToProps)(SugubList);
//
