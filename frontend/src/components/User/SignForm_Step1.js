import React, {useEffect, useState} from 'react'
import {Field, reduxForm, reset} from 'redux-form'
import {renderField, renderMultiSelectField, renderSelectField} from "../../utils/renderUtils";
import {Card, CardBody, CardTitle, Col} from "reactstrap";
import {connect} from "react-redux";
import validate from "./Validate_SignForm";
import store from "../../store";


const SignFormStep1 = props => {
    const [jikjongLow, setJikjongLow] = useState([]);
    const [jikjongMid, setJikjongMid] = useState([]);
    const {handleSubmit, error} = props;
    console.log('error', error)
    useEffect(() => {
        if(props.comcode)
            if( props.sec === 'mid' ) {
                // defaultClient
                //     .get(AuthUrls.COMMON, {
                //         params: {
                //             code_topcd: props.code_id
                //         }
                //     })
                //     .then(({data}) => {
                //         setJikjongLow(data);
                //     })
                setJikjongLow(props.comcode.filter(v=> v.code_topcd === props.code_id))
            }else if(props.sec === 'top'){
                // defaultClient
                //     .get(AuthUrls.COMMON, {
                //         params: {
                //             code_topcd: props.code_id
                //         }
                //     })
                //     .then(({data}) => {
                //         setJikjongMid(data);
                //     })
                setJikjongMid(props.comcode.filter(v=> v.code_topcd === props.code_id))
            }
    }, []);

    const onChangeMid = (value) => {
        if(props.comcode)
            store.dispatch(reset('signup_wizard', 'jikjong_low'));
            // defaultClient
            //     .get(AuthUrls.COMMON, {
            //         params: {
            //             code_topcd: value
            //         }
            //     })
            //     .then(({data}) => {
            //         setJikjongLow(data);
            //     })
            setJikjongLow(props.comcode.filter(v=> v.code_topcd === value))
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card className="card card-plain">
                    <CardTitle>Step-1</CardTitle>
                    <CardBody>

                        {/*<div className="title">
                            Step-1
                        </div>*/}
                        <div>
                            {/* 직종(중) */}
                            {jikjongMid.length > 0 && (
                                <fieldset className="form-group">
                                    <Field name="jikjong_mid" label="직군(중분류)" component={renderSelectField}
                                           code_topidx="AA"
                                           code_topcd={props.code_id}
                                           type="text"
                                           options={jikjongMid}
                                           onChange={(e)=>onChangeMid(e.target.value)}
                                           disableOption="중분류"
                                    />
                                </fieldset>
                            )}
                            {/* 직종(소) 없는경우 */}
                            {jikjongLow.length > 0 && (
                                <fieldset className="form-group">
                                    <Field name="jikjong_low" label="직군(소분류)-최대5개" component={renderMultiSelectField}
                                           code_topidx="AA"
                                           code_topcd={jikjongLow[0].code_topcd}
                                           type="text"
                                           options={jikjongLow}
                                           multi
                                    />
                                </fieldset>
                            )}
                            <fieldset className="form-group">
                                <Field name="career_gigan" label="해당 직종의 경력은 몇년이신가요?" component={renderField}
                                       type="number"
                                />
                            </fieldset>
                        </div>
                    </CardBody>
                </Card>
                <Col className="text-center" md="12">
                    <button type="submit" className="btn btn-primary">
                        다음
                        <span className="btn-label">
                            <i className="nc-icon nc-minimal-right" />
                        </span>
                    </button>
                </Col>
            </form>
        </>
    )
}

function mapStateToProps(state, props) {
    // console.log('mapStateToProps:', props)
    return {
        initialValues: {
            jikjong_top: props.code_topcd,
            jikjong_mid: props.code_id,
            recuser: state.auth.recUser, //추천인
            // authSuccess: false, // 인증
        },
        comcode: state.comcode.comcode,
    }
}
export default connect(mapStateToProps)(reduxForm({
    form: 'signup_wizard',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    // touchOnChange: true,
    // keepDirtyOnReinitialize: true,
    validate
})(SignFormStep1))

