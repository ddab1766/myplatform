// import React, {useEffect, useState} from "react";
// import {Link} from 'react-router-dom';
// import {ChaegongUrls} from "../../constants/urls";
// import {useDispatch} from "react-redux";
// import {getApiData} from "../../actions/commonActions";
// import DataTable from 'react-data-table-component';
// import DataTableExtensions from "react-data-table-component-extensions";
// import "react-data-table-component-extensions/dist/index.css";
// import {Card, CardBody,} from "reactstrap";
//
// const JobApList = (props) => {
//     const [perPage, setPerPage] = useState(10);
//     const [totalRows, setTotalRows] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [jobaps, setJobAp] = useState();
//     const dispatch = useDispatch();
//     const fetchTable = async (page, size = perPage) => {
//         getApiData(ChaegongUrls.JOBAP + `?page=${page}&page_size=${size}`, '').then(function (result) {
//             dispatch(result);
//             setJobAp(result.payload.results);
//             setTotalRows(result.payload.count);
//         });
//     }
//     useEffect(() => {
//         fetchTable(1);
//     }, []);
//     const handlePageChange = page => {
//         fetchTable(page);
//         setCurrentPage(page);
//     };
//
//     const handlePerRowsChange = async (newPerPage, page) => {
//         fetchTable(page, newPerPage);
//         setPerPage(newPerPage);
//     };
//     const data = jobaps;
//     const columns = [
//         {
//             name: '사용자',
//             selector: 'user_nm',
//             sortable: true,
//             button: true,
//             cell: row => <Link to={{ pathname: props.match.url + '/' + row.id, state: { jobap: row } }}>{row.user_nm}</Link>,
//         },
//         {
//             name: '비회원 이름',
//             selector: 'non_username',
//             sortable: true,
//             button: true,
//             cell: row => <Link to={{ pathname: props.match.url + '/' + row.id, state: { jobap: row } }}>{row.non_username}</Link>,
//         },
//         {
//             name: '채용공고',
//             selector: 'jobadvertise_nm',
//             sortable: true,
//         },
//         {
//             name: '지원자상태',
//             selector: 'applied_status_nm',
//             sortable: true,
//         },
//         {
//             name: '지원경로',
//             selector: 'companyprofile_nm',
//             sortable: true,
//         },
//         {
//             name: '지원시간',
//             selector: 'applied_at',
//             sortable: true,
//         },
//     ];
//     const tableData = { columns, data };
//     return (
//         <>
//             {jobaps && jobaps.length > 0 && (
//                 <>
//                     <Card>
//                         {/* <CardHeader><CardTitle tag="h4">지원자 리스트</CardTitle></CardHeader> */}
//                         <CardBody>
//                             <DataTableExtensions {...tableData}>
//                                 <DataTable
//                                     pagination
//                                     dense
//                                     highlightOnHover
//                                     paginationServer
//                                     paginationTotalRows={totalRows}
//                                     paginationDefaultPage={currentPage}
//                                     onChangeRowsPerPage={handlePerRowsChange}
//                                     onChangePage={handlePageChange}
//                                     title="지원자 리스트"
//                                     columns={columns}
//                                     data={jobaps}
//                                 />
//                             </DataTableExtensions>
//                         </CardBody>
//                     </Card>
//                 </>)}
//         </>
//     )
// }
// export default JobApList;