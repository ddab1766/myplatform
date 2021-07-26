import React, {useEffect, useState} from 'react';
import SugubEditForm from './SugubEditForm';
import {apiUrls} from "../../../constants/urls";
import history from "../../../utils/historyUtils";
import defaultClient from 'utils/defaultClient';
import {CardTitle, Container} from "reactstrap"

const SugubEdit = (props) => {
    const [sugub, setSugub] = useState(null);
    const id = props.match.params.id;
    useEffect(() => {
        setSugub(props.location.state.sugub);
    }, []);
    const submitForm = (formData) => {
        //셀렉필드들은 리턴값이 label,value 2개 이기때문에 value값으로 재지정
        formData.user = formData.user.value;
        formData.companyprofile = formData.companyprofile.value;
        formData.manager = formData.manager.value;
        formData.sugub_jikjong_low.map((value, index) => {
            if(formData.sugub_jikjong_low[index].value){
                formData.sugub_jikjong_low[index] = formData.sugub_jikjong_low[index].value;
            }
        });
        return defaultClient.patch(apiUrls.SUGUB + id + "/",
            formData,{
                headers:{
                    authorization: 'Token ' + localStorage.getItem("token")
                }
            }
        ).then(res => {
            history.push('/Mng/sugub');
            window.notify.onChange('정상적으로 처리되었습니다.');
        }).catch(error => {
            alert("실패했습니다.");
            // window.location.reload();
            console.log(error.response.data);
        });
    };

    return (
        <Container>
               <CardTitle tag="h3">수급의뢰서</CardTitle><hr/>
                    <SugubEditForm history={props} onSubmit={submitForm} initialValues={sugub} />
        </Container>
    )
}

export default SugubEdit;
