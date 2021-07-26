import React, {useEffect, useState} from "react";
import {Field, initialize, reduxForm} from "redux-form";
import {connect} from 'react-redux'
import {renderError, renderField, renderPhoneNumberField,} from "../../utils/renderUtils";
import {updateUserProfile} from "../../actions/authActions";
import {Card, CardBody, CardFooter, Container, Spinner} from "reactstrap"
import ImageUpload from "../CustomUpload/ImageUpload";
import history from "utils/historyUtils";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import {getUserToken} from "../../utils/authUtils";
import store from "../../store";
import AuthSms from "../auth/AuthSms";

const ProfileEdit = (props) => {
    const {handleSubmit, error, submitting} = props;
    const [comCode, setComcode] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [path, setPath] = useState('Company')

    useEffect(()=>{
        if(props.match.path.match('/Hr')){
            setPath('Hr')
        }
    },[]);
    useEffect(() => {
        if(props.comcode) setComcode(props.comcode.filter(v=> v.code_topidx === 'BE' || v.code_topidx === 'BX'))
    }, []);

    // useEffect(() => {
    //     if(profileImage){
    //         const token = getUserToken(store.getState());
    //         let formValues = new FormData();
    //         formValues.append('profile_image', profileImage, profileImage.name);
    //         axios
    //             .patch(AuthUrls.USER_PROFILE, formValues, {
    //                 headers: {
    //                     authorization: 'Token ' + token,
    //                     'content-type': 'multipart/form-data'
    //                 }
    //             })
    //             .then(({data}) => {
    //                 // setImageFile(data.company_image)
    //                 // props.getCompanyProfile()
    //             })
    //             .catch(err => console.log(err));
    //     }
    //
    //     // if(profileImage) props.change('profile_image', profileImage, profileImage.name)
    // }, [profileImage])

    const handleImage = (data, field) => {
        const token = getUserToken(store.getState());
            let formValues = new FormData();
            formValues.append('profile_image', data, data.name);
            axios
                .patch(AuthUrls.USER_PROFILE, formValues, {
                    headers: {
                        authorization: 'Token ' + token,
                        'content-type': 'multipart/form-data'
                    }
                })
                .then(({data}) => {
                    // setImageFile(data.company_image)
                    // props.getCompanyProfile()
                })
                .catch(err => console.log(err));
    }

    return (
        <div className="content">
            <Container>
                <form
                    className="col-md-6 ml-auto mr-auto"
                    style={{"max-width": "630px"}}
                    onSubmit={handleSubmit}
                    // onSubmit={onSubmit}
                >
                    <div className="title">
                        <h5>프로필 수정<br/>
                            {/*<small>추천인/후보자들에게 좋은 일자리를 제공하기 위해, 다음 정보를 입력하면 매칭 확률이 올라갑니다.</small>*/}
                        </h5>
                    </div>
                    <hr/>
                    <Card className="card card-profile">
                        <CardBody>
                            <ImageUpload avatar
                                         setProfileImage={setProfileImage}
                                         handleImage={handleImage}
                                         imagePreviewUrl={props.initialValues.profile_image}/>

                            <fieldset className="form-group">
                                <Field name="nickname" label="이름" component={renderField}
                                       type="text"
                                       required={true}
                                />
                            </fieldset>

                            <fieldset className="form-group">
                                <Field name="phone" label="연락처" component={renderPhoneNumberField}
                                       type="text" placeholder={"(예) 010-0000-0000"}
                                       required={true}
                                />
                            </fieldset>

                            {/*<AuthSms formName={'update_user_profile'}/>*/}
                            {renderError(error)}
                        </CardBody>
                        <CardFooter>
                            <button className="btn btn-info"
                                    type="submit"
                                    style={{width:"100%"}}
                                // action="submit"
                                    disabled={submitting}
                            >
                                {submitting === true && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />)
                                }저장
                            </button>
                            <br/><br/>
                            <button className="btn btn-outline-info "
                                    onClick={()=>history.push(`/${path}/My`)}
                                // variant="outlined"
                                    style={{width:"100%"}}
                                    disabled={submitting}
                            >뒤로가기
                            </button>
                        </CardFooter>
                    </Card>

                </form>
            </Container>
        </div>
    )
}

const validate = values => {
    const errors = {};
    if (!values.nickname) {
        errors.nickname = '필수입력 항목입니다.'
    }
    if (!values.phone) {
        errors.phone = '필수입력 항목입니다.'
    }else if(values.phone.length > 13 ){
        errors.phone = '13자리 이하로 입력해주세요.'
    }

    return errors
};

function mapStateToProps(state, props) {
    return {
        initialValues: state.auth.user,
        // initialValues: props.location.state.user,
        comcode: state.comcode.comcode
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "update_user_profile",
    enableReinitialize: true,
    destroyOnUnmount: false,
    // forceUnregisterOnUnmount: true,
    validate,
    onSubmit: updateUserProfile,
    onSubmitSuccess: (result, dispatch) => {
        dispatch(initialize('update_user_profile', {}));
        history.goBack();
    },
})(ProfileEdit));
