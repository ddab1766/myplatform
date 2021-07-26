import React from "react";
import {connect} from "react-redux";
import {Table,} from "reactstrap";

const SugubApplicant = props => {
    const applicants = props.applicants;

    console.log('sugubapplicant props', applicants)

    return applicants.length > 0 ? (
        <>
            <Table className="table-shopping">
                <thead>
                <tr>
                    <th>담당업체</th>
                    <th>이력서</th>
                    <th>전문분야</th>
                    <th>경력</th>
                    <th>생년월일</th>
                    <th>이력서</th>
                    <th>질문답변</th>
                </tr>
                </thead>
                <tbody>
                <>
                    {applicants.map((applicant, index) => (
                        <>
                            {/* 접수대기, 이력서 미등록이 아니고 채공에서 지원시  */}
                            {applicant.applied_status !== 'BW0100000' && applicant.applied_status !== 'BW1000000' && (
                                <tr>
                                    {applicant.resume ? (
                                            <>
                                                <td>{applicant.companyprofile_nm}</td>
                                                <td className="td-name">
                                                    <a className="nav-link">{applicant.resume.resume_title}</a>
                                                    <small>{applicant.userspecial.jikjong_mid_nm }</small>
                                                    <br/>
                                                    <small>{applicant.resume.resume_username} / {applicant.resume.resume_phone} </small>
                                                </td>

                                                <td>{applicant.userspecial.jikjong_top_nm} </td>
                                                <td>{applicant.userspecial.career_gigan}년</td>
                                                <td>{applicant.user_profile.date_of_birth}</td>
                                                {/* 채공이력서 */}
                                                {applicant.resume_pdf ? (
                                                    <td>
                                                        <a className=""
                                                           href={applicant.resume_pdf}
                                                           target="_blank"
                                                        >{applicant.resume_filename}</a>
                                                        {' '}<i className="fa fa-external-link"></i>
                                                    </td>
                                                    /* 기타이력서 */
                                                ) : (
                                                    <td>
                                                        <a className=""
                                                           target="_blank"
                                                           href={applicant.resume.resume_file}
                                                        >{applicant.resume.resume_filename}</a>
                                                        {' '}<i className="fa fa-external-link"></i>
                                                    </td>
                                                )

                                                }
                                                <td>
                                                    {applicant.job_answers_json[0] &&
                                                    (
                                                        Object.entries(applicant.job_answers_json[0]).map( ([key, value]) => {
                                                                return (
                                                                    <><li>{key} / {value}</li></>
                                                                )
                                                            }
                                                        )
                                                    )}
                                                </td>
                                            </>
                                        ):
                                        (
                                            <></>
                                        )}
                                </tr>
                            )}
                        </>))
                    }
                </>
                </tbody>
            </Table>
        </>
    ) : (<>지원자가 아직 없습니다.</> )
}

export default connect()(SugubApplicant);
