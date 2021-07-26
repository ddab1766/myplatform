// import {Container} from "reactstrap";
// import React, {useEffect, useState} from "react";
// import JobAdList from "components/Manager/JobAdList";
// import {connect} from "react-redux";
// import {getCompanyProfile, getUserProfile} from "../../../actions/authActions";
// import axios from "axios";
//
// const JobAdListView = ( props ) => {
//
//     const company = props.company;
//     const [jobAdList, setJobAdList] = useState([]);
//
//     useEffect(() => {
//         props.getUserProfile();
//         if (!company) {
//             props.getCompanyProfile();
//         }
//     }, []);
//
//     useEffect(() => {
//         if (company) {
//             if( company.custid !== null) {
//                 axios
//                     .get(apiUrls.JOB_ADVERTISE, {
//                         params: {
//                             // "custid": company.custid
//                             user: company.id
//                         }
//                     })
//                     .then(({data}) => {
//                         setJobAdList(data)
//                     })
//             }
//         }
//     }, [company]);
//     console.log( 'jobAdlist View:',jobAdList)
//
//     return (
//         <>
//             <div className="content">
//                 <Container>
//                     <h3 className="text-md-left">맞춤채용공고<br/>
//                         <small>
//                             리스트<br/>
//                         </small>
//                     </h3>
//                     <div>
//                         <JobAdList jobAdList={jobAdList}/>
//                     </div>
//                 </Container>
//             </div>
//         </>
//     )
// };
//
//
// function mapStateToProps(state) {
//     return {
//         user: state.auth.user,
//         company: state.auth.company
//     }
// }
//
// export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(JobAdListView);