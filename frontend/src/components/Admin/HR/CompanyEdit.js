import React, {useEffect, useState} from 'react';
import CompanyEditForm from './CompanyEditForm';
import {apiUrls} from "../../../constants/urls";
import history from "../../../utils/historyUtils";
import {CardTitle, Container} from "reactstrap"
import defaultClient from "../../../utils/defaultClient";
import {getUserToken} from "../../../utils/authUtils";
import store from "../../../store";
import {updateHrProfile} from "../../../actions/adminActions"
import {connect} from "react-redux";

const CompanyEdit = (props) => {
    const [compInfo, setCompInfo] = useState(null);
    const id = props.match.params.id;
    useEffect(() => {
        setCompInfo(props.location.state.comp);
    }, []);
    const submitForm = (formData) => {
        return updateHrProfile(formData);
    };

    return (
        <Container>
               <CardTitle tag="h3">기업정보</CardTitle><hr/>
                    <CompanyEditForm history={props} onSubmit={submitForm} initialValues={compInfo} />
        </Container>

    );
}

// export default CompanyEdit;
function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr: state.auth.hr,
        token:state.auth.token,
        comcode:state.comcode.comcode,
    }
}
export default connect(mapStateToProps)(CompanyEdit);