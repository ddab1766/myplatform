import React from "react";
import {connect} from "react-redux";
import {Table,} from "reactstrap";

const SugubApplicant = props => {
    const {sugub} = props;
    // const [applicants, setApplicants] = useState(null);
    // const [applicants, setApplicants] = useState(props.applicants);
    const applicants = props.applicants;

    // useEffect(() => {
    //     if (sugub) {
    //         defaultClient
    //             .get(AuthUrls.JOB_APPLICANT, {
    //                 params: {
    //                     sugub_id: sugub.id
    //                 }
    //             })
    //             .then(({data}) => {
    //                 setApplicants(data);
    //             })
    //     }
    // }, []);
    // console.log('applicants:', applicants)

    return applicants.length > 0 ?(
        <>
            <Table className="table-shopping">
                <thead>
                <tr>
                    <th>지원경로</th>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>이력서</th>
                </tr>
                </thead>
                <tbody>
                <>
                    {applicants.map((applicant, index) => (
                        <>
                            {applicant.applied_status !== 'BW0100000' && applicant.applied_status !== 'BW1000000' && (
                                <tr>
                                    {applicant.resume ? (
                                        <></> ): (
                                        <>
                                            <td>{applicant.companyprofile_nm}</td>
                                            <td>{applicant.non_username}</td>
                                            <td>{applicant.non_phone}</td>
                                            <td>
                                                <a className=""
                                                   href={applicant.resume_pdf}
                                                >{applicant.resume_filename}</a>
                                            </td>

                                        </>
                                    )}
                                </tr>
                            )}
                            {/* 접수대기, 이력서 미등록이 아니고 HR회사에서 지원시  */}
                        </>))
                    }
                </>
                </tbody>
            </Table>
        </>
    ) : (<>지원자가 아직 없습니다.</>)
}

export default connect()(SugubApplicant);
