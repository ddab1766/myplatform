// import React, {useEffect, useState} from "react";
// import {connect} from "react-redux";
// import axios from "axios";
// import Select from "@material-ui/core/Select";
// import {apiUrls} from "../../constants/urls";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import {makeStyles} from '@material-ui/core/styles';
// import FormControl from "@material-ui/core/FormControl";
// import LoaderSpinner from "../Etc/LoaderSpinner";
// import MUIDataTable from "mui-datatables";
// import store from "../../store";
// import Link from "react-router-dom/Link";
// import {birthFormat, phoneFormat} from "../../function/common";
// import {Alert} from "rsuite";
//
// const ApplicantTable = props => {
//     const {applicant, setApplicants} = props;
//     const [comcode, setComcode] = useState();
//     const [status, setStatus] = useState(applicant.applied_status);
//     // const [applicants, setApplicants] = useState(applicant);
//
//
//     useEffect(() => {
//         var codes = ['BW0200000','BW0301000','BW0302000','BW0401000','BW0402000','BW0801000']
//         setComcode(props.comcode.filter(v=> codes.includes(v.code_id)))
//
//     }, []);
//
//     const handleAppliedStatusChange = (e, selectedData) => {
//         let selectedApplicant = selectedData.map( (value, index) => {
//             return {'id' : value[0].data[7], 'applied_status': value[0].data[4].props.children}
//         });
//         // let newArr = applicant;
//         for(let i=0; i<selectedApplicant.length; i++){
//             if(selectedApplicant[i]['applied_status'] === '최종합격'){
//                 alert('최종합격자의 상태는 변경할 수 없습니다.')
//                 return false
//             }
//             // 지원자상태변경
//             axios
//                 .patch(apiUrls.JOB_APPLICANT + selectedApplicant[i]['id'] + '/', {
//                     applied_status: e.target.value
//                 }, {
//                     headers: {
//                         authorization: 'Token ' + store.getState().auth.token
//                     },
//                 })
//                 .then(({data}) => {
//                     Alert.success('선택한 이력서의 상태가 변경되었습니다.')
//                     // console.log(data);
//                     // newArr = newArr.filter(v => v.id !== data.id);
//                     // newArr.push(data)
//                     // setApplicants(statusFilter(newArr,index));
//                     // changeStatus(newArr)
//                     window.location.reload();
//                 }).catch(error => console.log(error.response.data));
//         }
//
//
//     };
//
//     const useStyles = makeStyles((theme) => ({
//         formControl: {
//             //margin: theme.spacing(1),
//             minWidth: 120,
//         },
//         selectEmpty: {
//             marginTop: theme.spacing(2),
//         },
//     }));
//     const classes = useStyles();
//
//
//     const columns = [
//         {
//             name: "hrprofile",
//             label: "기업명",
//             options:{
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return <>{value.custname}</>
//                 }
//             },
//         },
//         {
//             name: "applied_username",
//             label: "이름",
//             options: {
//                 filter: false,
//                 sort: false
//             }
//         },
//         {
//             name: "applied_birth",
//             label: "생년월일",
//             options: {
//                 filter: false,
//                 sort: false,
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return <>{birthFormat(value)}</>
//                 }
//             }
//         },
//         {
//             name: "applied_phone",
//             label: "연락처",
//             options: {
//                 filter: false,
//                 sort: false,
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return <>{phoneFormat(value)}</>
//                 }
//             }
//         },
//         {
//             name: "applied_status",
//             label: "접수상태",
//             options:{
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return <>{value.code_name}</>
//                 }
//             },
//         },
//         {
//             name: "applied_at",
//             label: "지원일시",
//             options: {
//                 filter: false,
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return (
//                         value.substring(0,19).replace('T',' ')
//                     );
//                 },
//             }
//         },
//         {
//             name: "resume_pdf",
//             label: "이력서",
//             options: {
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return (
//                         <>
//                             <a href={value} target="_blank">다운로드</a>{' / '}
//                             <Link to={{
//                                 pathname: `/Viewer/${value}`,
//                             }} target="_blank">보기</Link>
//                         </>
//                     );
//                 },
//                 filter: false
//             }
//         },
//         {
//             name: "id",
//             label: "지원번호",
//             options: { sort: true, sortDirection:'asc', filter: false}
//         },
//     ];
//
//     const options = {
//         selectableRows: true,
//         filterType: 'checkbox',
//         textLabels: {
//             pagination : {
//                 rowsPerPage : ""
//             },
//             body: {
//                 noMatch: '지원자가 존재하지 않습니다.',
//                 toolTip:'정렬'
//             },
//             toolbar: {
//                 search: '검색',
//                 downloadCsv : "csv다운로드",
//                 print:"프린트",
//                 viewColumns:"컬럼필터",
//                 filterTable:"테이블필터"
//             },
//             selectedRows:{
//                 text : "선택"
//             }
//         },
//         customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
//             let selectedData = selectedRows.data.map( (value, index) => {
//                 return displayData.filter(v => v.dataIndex === value.dataIndex)
//             })
//             return (
//                 <span>
//                     <FormControl className={classes.formControl}>
//                         <Select value={status}
//                                 onChange={(e) => handleAppliedStatusChange(e, selectedData)}
//                         >
//                             {comcode.map((value, index) => (
//                                 <MenuItem value={value.code_id}>{value.code_name}</MenuItem>
//                             ))}
//                         </Select>
//                         <FormHelperText>지원자 상태를 변경해주세요</FormHelperText>
//                     </FormControl>
//                     {/* 불합격사유 */}
//                 </span>
//             )
//         },
//         onRowClick: (rowData, rowState) => {
//             /*if(jobAds) {
//                 let _id = rowData[0]
//                 props.history.push({
//                     pathname: `/Mng/chae/${_id}`,
//                     state: {jobAds: jobAds.filter(value => value.id === _id)[0]}
//                 })
//             }*/
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
//         <>
//
//             {applicant ? (
//                 <MUIDataTable
//                     // title={"지원자 List"}
//                     data={applicant}
//                     columns={columns}
//                     options={options}
//                 />
//             ): (<LoaderSpinner/>)}
//         </>
//     )
// }
//
// function mapStateToProps(state) {
//     return {
//         comcode:state.comcode.comcode,
//     }
// }
//
// export default connect(mapStateToProps)(ApplicantTable);
