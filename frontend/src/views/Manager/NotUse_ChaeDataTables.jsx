// import React, {useEffect, useState} from "react";
// // reactstrap components
// import {Card, CardBody, CardHeader, Collapse,} from "reactstrap";
// import MUIDataTable from "mui-datatables";
// import {connect} from "react-redux";
// import defaultClient from "../../utils/defaultClient";
// import {Link} from "react-router-dom";
//
// const NotUse_ChaeDataTables = (props) => {
//     const [jobAds, setJobAds] = useState([]);
//     const [selected, setSelected] = useState(
//         {'code_id': '', 'code_name': '전체'}
//     );
//
//     const [openedCollapses, setOpenedCollapses] = useState(['collapseOne'])
//     const collapsesToggle = collapse => {
//         let opened = openedCollapses;
//
//         if (opened.includes(collapse)) {
//             setOpenedCollapses(opened.filter(item => item !== collapse));
//         } else {
//             opened.push(collapse);
//             setOpenedCollapses(opened);
//         }
//     };
//
//     // 관련 공고 받아오기
//     useEffect(() => {
//         defaultClient
//             .get(apiUrls.JOB_ADVERTISE, {
//                 params: {
//                     code_id: selected.code_id
//                 }
//             })
//             .then(({data}) => setJobAds(data))
//     }, [selected]);
//
//     const columns = [
//         {
//             name: "id",
//             label: "공고번호"
//         },
//         {
//             name: "jobadvertise_title",
//             label: "공고제목",
//             options: {
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return (
//                         <Link to='#'>{value}</Link>
//                     );
//                 }
//             }
//         },
//         {
//             name: "company_name",
//             label: "회사명"
//         },
//         {
//             name: "jobadvertise_status_nm",
//             label: "공고상태"
//         },
//         {
//             name: "jobadvertise_end_dt",
//             label: "마감일"
//         }
//     ];
//
//     console.log('jobAds:',jobAds)
//
//     const options = {
//         selectableRows: false,
//         filterType: 'checkbox',
//         onRowClick: (rowData, rowState) => {
//             if(jobAds) {
//                 let _id = rowData[0]
//                 props.history.push({
//                     pathname: `/Mng/chae/${_id}`,
//                     state: {jobAds: jobAds.filter(value => value.id === _id)[0]}
//                 })
//             }
//         },
//         setTableProps: () => (
//             {
//                 style: {
//                     // backgroundColor: 'red'
//                 },
//                 size:'small'
//             }
//         )
//     };
//
//     return (
//         <div className="content">
//             <div className="title">
//                 <h5>HR회사 이력서 지원 페이지</h5>
//             </div>
//             <div
//                 aria-multiselectable={true}
//                 className="card-collapse"
//                 id="accordion"
//                 role="tablist"
//             >
//                 <Card >
//                     <CardHeader role="tab">
//                         <a
//                             aria-expanded={openedCollapses.includes(
//                                 "collapseOne"
//                             )}
//                             href="#pablo"
//                             data-parent="#accordion"
//                             data-toggle="collapse"
//                             onClick={(e) => {collapsesToggle("collapseOne")}}
//                         >▷이력서를 등록하려면?{" "}
//                             <i className="nc-icon nc-minimal-down" />
//                         </a>
//                     </CardHeader>
//                     <Collapse
//                         role="tabpanel"
//                         isOpen={openedCollapses.includes("collapseOne")}
//                     >
//                         <CardBody>
//                             <p className="text-muted">
//                                 1. 수급건에 맞는 이력서를 등록하세요.<br/>
//                                 2. 사용사업주
//                             </p>
//                         </CardBody>
//                     </Collapse>
//                 </Card>
//
//             </div>
//
//             <MUIDataTable
//                 title={"채용공고 List"}
//                 data={jobAds}
//                 columns={columns}
//                 options={options}
//             />
//         </div>
//     )
// };
//
//
// function mapStateToProps(state) {
//     return {
//         // user: state.auth.user,
//         // company: state.auth.company
//     }
// }
//
// export default connect(mapStateToProps)(NotUse_ChaeDataTables);