import React, {useEffect, useState} from "react";
import {Field, initialize, reduxForm} from "redux-form";
import {required} from "redux-form-validators"
// reactstrap components
import {Col, Container, Spinner} from "reactstrap";
import {
    renderError,
    renderField,
    renderJsonField,
    renderMultiSelectField,
    renderSelectField,
} from "../../utils/renderUtils";
import {connect} from "react-redux";
import {getUserSpecial, updateUserSpecial} from "../../actions/userActions";
import {JIKJONGTOP} from "../../variables/common";
import history from "utils/historyUtils";

const UserSpecialEdit = props => {

    const [jikjongTop, setJikjongTop] = useState(JIKJONGTOP);
    const [jikjongMid, setJikjongMid] = useState([]);
    const [jikjongLow, setJikjongLow] = useState([]);

    const [selectedTop, setSelectedTop] = useState(props.location.state.special.jikjong_top);
    const {handleSubmit, submitting, error} = props;


    useEffect(() => {
        // props.getUserSpecial(null, props.match.params.specialid)
        let params = {};
        params.id = props.match.params.specialid;
        getUserSpecial(params)
    }, []);

    const userSpecial = props.userSpecial;

    useEffect(() => {
        if(props.comcode) {
            setJikjongMid(props.comcode.filter(v=> v.code_topcd === selectedTop.code_id))
            if(userSpecial) setJikjongLow(props.comcode.filter(v=> v.code_topcd === userSpecial.jikjong_mid.code_id))
        }
    }, [selectedTop]);

    const onChangeMid = (value) => {
        setJikjongLow(props.comcode.filter(v=> v.code_topcd === value))
    };

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>전문분야를 설정해주세요.<br/>
                        <small>추천인/후보자들에게 좋은 일자리를 제공하기 위해, 다음 정보를 입력하면 매칭 확률이 올라갑니다.</small>
                    </h3>
                </div>
                <hr/>
                <form
                    className="mx-3"
                    onSubmit={handleSubmit}
                >
                    <Col sm="12">
                        <fieldset className="form-group">
                            <Field name="jikjong_top" label="직군(대분류)*" component={renderSelectField}
                                   code_topidx="AA"
                                   code_topcd={null}
                                   type="text"
                                   options={jikjongTop}
                                   onChange={value => (
                                       setSelectedTop(value.currentTarget.value)
                                   )}
                                   disableOption="대분류"
                                   validate={[required({message: "필수 입력사항입니다."})]}
                            />
                        </fieldset>
                    </Col>
                    <Col sm="12">
                        <fieldset className="form-group">
                            <Field name="jikjong_mid" label="직군(중분류)*" component={renderSelectField}
                                   code_topidx="AA"
                                   code_topcd={selectedTop}
                                   type="text"
                                   options={jikjongMid}
                                   disableOption='중분류'
                                   onChange={(e)=>onChangeMid(e.target.value)}
                                   validate={[required({message: "필수 입력사항입니다."})]}
                            />
                        </fieldset>
                    </Col>
                    <Col sm="12">
                        <fieldset className="form-group">
                            <Field name="jikjong_low" label="직군(소분류)-최대5개" component={renderMultiSelectField}
                                // code_topidx="AA"
                                // code_topcd={selectedTop}
                                   type="text"
                                   options={jikjongLow ? jikjongLow : userSpecial.jikjong_low}
                                   // options={jikjongLow}
                                   multi
                            />
                        </fieldset>
                    </Col>
                    <Col sm="12">
                        <fieldset className="form-group">
                            <Field name="career_gigan" label="경력" component={renderField}
                                   type="number"
                            />
                        </fieldset>
                    </Col>
                    <Col sm="12">
                        <fieldset className="form-group">
                            <Field name="hope_salary" label="희망연봉(만원)" component={renderField}
                                   type="number"
                            />
                        </fieldset>
                    </Col>
                    <Col sm="12">
                        <fieldset className="form-group">
                            <Field name="answers_json" label="답변" component={renderJsonField}
                                   type="text"
                            />
                        </fieldset>
                    </Col>
                    {renderError(error)}
                    <Col className="col-md-2 ml-auto">
                        <fieldset className="form-group">

                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting === true && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />)
                                }
                                설정
                            </button>
                            {/*<button action="submit"*/}
                            {/*        disabled={submitting} className="btn">설정</button>*/}
                        </fieldset>
                    </Col>
                </form>
            </Container>
        </div>
    )
}

function mapStateToProps(state, props) {
    return {
        initialValues: {
            // user: props.location.state.user,
            ...props.location.state.special
        },
        userSpecial: props.location.state.special,
        comcode: state.comcode.comcode
    }
}

export default connect(mapStateToProps, {getUserSpecial})(reduxForm({
    form: "update_user_special",
    onSubmit: updateUserSpecial,
    onSubmitSuccess: (result, dispatch) => {
        dispatch(initialize('update_user_special', {}));
        history.push('/User/profile');
    },
    // destroyOnUnmount: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
})(UserSpecialEdit));

