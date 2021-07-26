import React from "react";
import {getUserProfile} from "../../../actions/authActions";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as common from "../../../function/common";

const SugubFormInfo = (props) => {
    const {comcode, values, page} = props;
    return  Object.keys(values).length !== 0 && comcode && (
        <Card variant="outlined">

            <CardContent>
                <dl>
                    <dt>직종(대)</dt>
                    <dd><strong>{comcode.filter(v => v.code_id === values.sugub_jikjong_top)[0].code_name}</strong></dd>
                </dl>
                <dl>
                    <dt>직종(중)</dt>
                    <dd><strong>{values.sugub_jikjong_mid && comcode.filter(v => v.code_id === values.sugub_jikjong_mid)[0].code_name}</strong></dd>
                </dl>
                <dl>
                    {values.sugub_jikjong_low && (<dt>직종(소)</dt>)}
                    {values.sugub_jikjong_low && values.sugub_jikjong_low.length > 0 && values.sugub_jikjong_low.map(value=>{
                        if(typeof value !== 'object') return <></>;
                        return(
                            <dd><strong>{comcode.filter(v => v.code_id === value.code_id)[0].code_name}</strong></dd>
                        )
                    })}
                </dl>

                {values.work_position &&
                (
                    <dl>
                        <dt>포지션</dt>
                        <dd><strong>{common.limitedText(values.work_position)}</strong></dd>
                    </dl>
                )}

                {page >= 2 && (<hr/>)}

                {values.chae_cd &&
                (
                    <dl>
                        <dt>채용형태</dt>
                        <dd>
                            {comcode.filter(v => v.code_id === values.chae_cd)[0].code_name} {' '}
                                {values.chae_gigan && (
                                    <strong>
                                        ( {values.chae_gigan}
                                        {values.chae_gigan_type && (
                                            <>{comcode.filter(v => v.code_id === values.chae_gigan_type)[0].code_name}</>
                                        )} )
                                    </strong>
                                )}
                        </dd>

                    </dl>
                )}

                {page >= 3 && (<hr/>)}

                {values.work_role &&
                (
                    <dl>
                        <dt>담당업무</dt>
                        <dd><strong>{common.limitedText(values.work_role)}</strong></dd>
                    </dl>
                )}
                {values.spec &&
                (
                    <dl>
                        <dt>필수/우대</dt>
                        <dd><strong>{common.limitedText(values.spec)}</strong></dd>
                    </dl>
                )}

                {page >= 4 && (<hr/>)}

                {values.sugub_career_gb &&
                (
                    <dl>
                        <dt>경력</dt>
                        <dd>
                            {comcode.filter(v => v.code_id === values.sugub_career_gb)[0].code_name} {' '}
                                {values.career_start && (
                                    <><strong>
                                        ( {values.career_start} 년 ~ {values.career_end} 년 )
                                    </strong></>
                                )}
                        </dd>
                    </dl>
                )}
                {values.education_cd &&
                (
                    <dl>
                        <dt>학력</dt>
                        <dd>{comcode.filter(v => v.code_id === values.education_cd)[0].code_name}</dd>
                    </dl>
                )}
                {values.hire_count &&
                (
                    <dl>
                        <dt>채용인원</dt>
                        <dd><strong>{values.hire_count}</strong></dd>
                    </dl>
                )}

                {page >= 5 && (<hr/>)}

                {values.age_start &&
                (
                    <dl>
                        <dt>연령</dt>
                        <dd><strong>{values.age_start} 세 ~ {values.age_end} 세</strong></dd>
                    </dl>
                )}
                {values.salary_gubun &&
                (
                    <dl>
                        <dt>급여형태</dt>
                        <dd>{comcode.filter(v => v.code_id === values.salary_gubun)[0].code_name}</dd>
                        {values.salary_gubun === 'AI0100000' ? (
                            <dd><strong>
                                ({values.salary_start} 만원 ~ {values.salary_end} 만원)
                            </strong></dd>
                        ) : (
                            <dd><strong>
                                ( {values.salary_start} 원 ~ {values.salary_end} 원)
                            </strong></dd>
                        )}

                    </dl>
                )}
                {values.sugub_salary_adjust &&
                (
                    <dl>
                        <dt>급여협의</dt>
                        <dd><strong>{values.sugub_salary_adjust ? '가능' : '불가능'}</strong></dd>
                    </dl>
                )
                }

                {page >= 6 && (<hr/>)}



                {values.work_load_addr &&
                (
                    <dl>
                        <dt>실근무지</dt>
                        <dd><strong>{values.work_load_addr}</strong></dd>
                    </dl>
                )}
                {values.work_load_addr_detail &&
                (
                    <dl>
                        <dt>나머지주소</dt>
                        <dd><strong>{values.work_load_addr_detail}</strong></dd>
                    </dl>
                )}

                {values.sugub_end_dt &&
                (
                    <dl>
                        <dt>채용마감일</dt>
                        <dd><strong>{values.sugub_end_dt}</strong></dd>
                    </dl>
                )}
                {/*{values.bokri &&
                    (
                        <dl>
                            <dt>복리후생</dt>
                            <dd><strong>{common.limitedText(values.bokri)}</strong></dd>
                        </dl>
                    )}*/}
                {/*{values.sugub_gender &&
                    (
                        <dl>
                            <dt>선호성별</dt>
                            <dd>{comcode.filter(v => v.code_id === values.sugub_gender)[0].code_name}</dd>
                        </dl>
                    )}*/}
            </CardContent>
        </Card>
    )
}

// const selector = formValueSelector('sugub_wizard');


function mapStateToProps(state, props) {
    return {
        values: state.form.sugub_wizard.values,
        comcode: state.comcode.comcode
    }
}


export default connect(mapStateToProps, {getUserProfile})(SugubFormInfo)
