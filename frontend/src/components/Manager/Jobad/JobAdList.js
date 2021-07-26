// import React, {useEffect, useState} from "react";
// import {Link} from 'react-router-dom';
// import {vUrls} from "../../../constants/urls";
// import {useDispatch} from "react-redux";
// import {getApiData} from "../../../actions/commonActions";
// import {Card, CardBody,} from "reactstrap";
// import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
//
// const { SearchBar } = Search;
// const JobAdList = (props) => {
//     const [jobads, setJobAd] = useState();
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//          getApiData(vUrls.JOB_ADVERTISE , {}).then(function (result) {
//             setJobAd(result.payload);
//         });
//     }, []);
//
//     const data = jobads;
//     const columns = [
//         {
//             text: 'ID',
//             dataField: 'id',
//             sort: true,
//             formatter : (cell, row) => {
//                 return <Link to={{ pathname: props.match.url + '/' + row.id, state: { jobad: row } }}>{row.id}</Link>
//             },
//         },
//         {
//             text: '공고제목',
//             dataField: 'user_nm',
//             sort: true,
//             formatter : (cell, row) => {
//                 return <Link to={{ pathname: props.match.url + '/' + row.id, state: { jobad: row } }}>{row.jobadvertise_title}</Link>
//             },
//         },
//         {
//             text: '회사명',
//             dataField: 'company_name',
//             sort: true,
//         },
//         {
//             text: '주요업무',
//             dataField: 'main_work',
//             sort: true,
//         },
//         {
//             text: '급여',
//             dataField: 'salary',
//             sort: true,
//         },
//
//     ];
//     const defaultSorted = [{
//           dataField: 'id',
//           order: 'desc'
//         }];
//     const tableData = { columns, data };
//     return (
//         <>
//             {jobads && jobads.length > 0 && (
//                 <>
//                     <Card>
//                         <CardBody>
//                     <ToolkitProvider
//                         keyField='id'
//                         data={jobads}
//                         condensed
//                         bootstrap4
//                         columns={columns}
//                         search
//
//                     >
//                         {
//                             props => (
//                                 <div>
//                                     <SearchBar {...props.searchProps} />
//                                     <hr />
//                                     <BootstrapTable
//                                         bordered={ false }
//                                         noDataIndication="데이터가 없습니다."
//                                         // selectRow={selectRow}
//                                         hover
//                                         defaultSorted={ defaultSorted }
//                                         pagination={paginationFactory()}
//                                         {...props.baseProps}
//                                     />
//                                 </div>
//                             )
//                         }
//                     </ToolkitProvider>
//                 </CardBody>
//                         {/* <CardHeader><CardTitle tag="h4">공고 리스트</CardTitle></CardHeader> */}
//                         {/*<CardBody>*/}
//                         {/*    <DataTableExtensions {...tableData}>*/}
//                         {/*        <DataTable*/}
//                         {/*            pagination*/}
//                         {/*            dense*/}
//                         {/*            highlightOnHover*/}
//                         {/*            paginationServer*/}
//                         {/*            paginationTotalRows={totalRows}*/}
//                         {/*            paginationDefaultPage={currentPage}*/}
//                         {/*            onChangeRowsPerPage={handlePerRowsChange}*/}
//                         {/*            onChangePage={handlePageChange}*/}
//                         {/*            title="공고 리스트"*/}
//                         {/*            columns={columns}*/}
//                         {/*            data={jobads}*/}
//                         {/*        />*/}
//                         {/*    </DataTableExtensions>*/}
//                         {/*</CardBody>*/}
//                     </Card>
//                 </>)}
//         </>
//     )
// }
// export default JobAdList;