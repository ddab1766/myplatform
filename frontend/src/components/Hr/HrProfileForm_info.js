import React from "react";
// import {getUserProfile} from "../../../actions/authActions";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const HrProfileFormInfo = (props) => {
    const {comcode, values, page} = props;
    console.log('values', values)
    return  values !== undefined && Object.keys(values).length !== 0 && comcode && (
        <Card variant="outlined">

            <CardContent>
                {values.services && (
                    <dl>
                        <dt>제공서비스</dt>
                        {
                            values.services.map( item => {
                                if(typeof item !== 'object') return <></>;
                                if(item.code_id === 'AC0100000'){
                                    return (<dd>{item.code_name} </dd>)
                                }else{
                                    return (<dd>{item.code_name}</dd>)
                                }
                            })
                        }
                    </dl>
                )}

                {page >= 2 && (
                    <>
                        <hr/>
                        <dl>
                            <dt>서비스별 수수료</dt>
                        </dl>
                        {values.hrfee_AC0100000 && (
                            <dl>
                                <dt>파견</dt>
                                <dd>{values.hrfee_AC0100000[0].fee_start} % ~ {values.hrfee_AC0100000[0].fee_end} %</dd>
                            </dl>
                        )}
                        {values.hrfee_AC0200000 && (
                            <dl>
                                <dt>도급</dt>
                                <dd>{values.hrfee_AC0200000[0].fee_start} % ~ {values.hrfee_AC0200000[0].fee_end} %</dd>
                            </dl>
                        )}
                        {values.hrfee_AC0300000 && (
                            <dl>
                                <dt>채용대행</dt>
                                {values.hrfee_AC0300000.map(item => {
                                    if(!item) return;
                                    return (<dd>{item.start} ~ {item.end} => {item.fee_start} %</dd>)
                                })}

                            </dl>
                        )}
                        {values.hrfee_AC0400000 && (
                            <dl>
                                <dt>헤드헌팅</dt>
                                {values.hrfee_AC0400000.map(item => {
                                    if(!item) return;
                                    return (<dd>{item.start} ~ {item.end} => {item.fee_start} %</dd>)
                                })}

                            </dl>
                        )}
                    </>
                )}

                {page >= 3 && (
                    <>
                        <hr/>
                        {values.service_address && (
                            <dl>
                                <dt>서비스 지역</dt>
                                {values.service_address.map(item => {
                                    return (<dd>{item.code_name}</dd>)
                                })}
                            </dl>
                        )}
                    </>
                )}

            </CardContent>
        </Card>
    )
}

// const selector = formValueSelector('sugub_wizard');


function mapStateToProps(state, props) {
    return {
        values: state.form.hr_profile_wizard ? state.form.hr_profile_wizard.values : [],
        comcode: state.comcode.comcode
    }
}


export default connect(mapStateToProps, {})(HrProfileFormInfo)
