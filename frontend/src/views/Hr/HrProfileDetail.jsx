import React, {useEffect, useState} from "react";

import {Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import HrProfileDetail from "../../components/Hr/HrProfileDetail";
import {getHrList} from "../../actions/commonActions";

const HrProfileDetailView = (props) => {

    const [hrProfile, setHrProfile] = useState(null);
    const { params } = props.match;
    useEffect(() => {
        if(props.location) {
            setHrProfile(props.location.state.hrprofile)
        }else{
            getHrList(params).then((data)=>{
                setHrProfile(data.results);
            })
        }
    }, []);

    return (
        <>
            <div className="content">
                <Container>
                    <div className="title">
                        <h5>파트너 상세정보<br/>
                            <small>
                                <br/>
                            </small>
                        </h5>
                    </div>
                    <Row>
                        {hrProfile ? (
                            <HrProfileDetail hrprofile={hrProfile}/>
                        ):(<LoaderSpinner/>)}
                        {/**/}
                    </Row>
                </Container>
            </div>
        </>
    )
};

function mapStateToProps(state) {
    return {
        company: state.auth.company,
        user: state.auth.user,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps, {getUserProfile})(HrProfileDetailView);

