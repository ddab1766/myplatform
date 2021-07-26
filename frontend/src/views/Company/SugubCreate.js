import React, {useEffect, useState} from 'react';
import SugubCreateForm from '../../components/Company/Sugub/SugubCreateForm';
import {CardTitle, Container} from "reactstrap"
import {getUserToken} from "../../utils/authUtils";
import store from "../../store";
import {connect} from "react-redux";
import {postSugub} from "../../actions/sugubActions";

const SugubCreate = (props) => {
    const [sugub, setSugub] = useState(null);
    const { company } = props;
    const token = getUserToken(store.getState());
    useEffect(() => {
        //case not undefined : 수정
        if(props.location.state != undefined) {
            setSugub(props.location.state.sugub);
        }
    }, []);
    const submitForm = (formData,dispatch) => {
        delete formData.manager;
        formData.sugub_status = 'CC0100000';
        return postSugub(formData,dispatch);

        // formData.sugub_status = sugub.sugub_status;
        // formData.user = formData.user.value;
        // formData.companyprofile = formData.companyprofile.value;
        // if(formData.sugub_jikjong_low != undefined){
        //     formData.sugub_jikjong_low.map((value, index) => {
        //         if(formData.sugub_jikjong_low[index].value){
        //             formData.sugub_jikjong_low[index] = formData.sugub_jikjong_low[index].value;
        //         }
        //     });
        // }
        // if(sugub != undefined){
        //     formData.id = sugub.id;
        //     defaultClient.patch(AuthUrls.SUGUB + sugub.id + "/",formData,{
        //         headers:{
        //             authorization: 'Token ' + token
        //         },
        //     }).then(res => {
        //         window.notify.onChange('정상적으로 처리되었습니다.');
        //         history.push('/Mng/SugubListDetail/CC0100000');
        //     });
        // } else{
        //     formData.user = store.getState().auth.user.id;
        //     formData.sugub_status = 'CC0100000';
        //     formData.companyprofile = store.getState().auth.company.id;
        //     formData.jobadvertise = null;
        //     formData.created_at = null;
        //     formData.created_time = null;
        //     formData.modified_time = null;
        //     defaultClient.post(AuthUrls.SUGUB , formData,{
        //         headers:{
        //             authorization: 'Token ' + token
        //         },
        //     }).then(res => {
        //         window.notify.onChange('정상적으로 처리되었습니다.');
        //         history.push('/Company/Sugub');
        //     }).catch((error) => {
        //         console.log(error.response.data);
        //         alert('실패했습니다.');
        //         history.push('/Company/Sugub');
        //     });
        // }
    };

    return(
        <div className="content mt-5">
           <Container>
                <CardTitle tag="h3">의뢰등록</CardTitle>
                <hr/>
                {/*<Modal buttonLabel={"이전 의뢰 불러오기"} />*/}
                <SugubCreateForm history={props} onSubmit={submitForm} initialValues={sugub} />
            </Container>
        </div>
       )
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        comcode: state.comcode.comcode
    }
}
export default connect(mapStateToProps)(SugubCreate);

