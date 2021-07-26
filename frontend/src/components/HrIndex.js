import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import Footer from "./Footers/Footer";
import ProgressContainer from "./Etc/ProgressContainer";
import NoMatch from "./NoMatch";
import HrHome from "./Hr/HrHome";
import HrNavbar from "./Hr/HrNavbar";
import Logout from "./auth/Logout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";


import "assets/css/paper-dashboard_mng.css"
import {getComCode} from "../actions/commonActions";
import {connect} from "react-redux";
import RequireAuth from "./auth/RequireAuth";
import HrProfileView from "views/Hr/HrProfile";
import HrAccountView from "views/Hr/HrAccount";
import HrProfileEdit from "./Hr/HrProfileEdit";
import SugubContainer from "../views/Hr/SugubContainer";
import HrProfileForm from "./Hr/HrProfileForm";
import AlarmView from "../views/Company/Alarm";
import ProfileView from "views/Common/Profile";
import ProfileEdit from "components/Common/ProfileEdit";
import SignupDone from "./auth/SignupDone";
import HrProfileSignup from "./Hr/HrProfileSignup";
import {getRecUser, getUserProfile,getHrUserProfile} from "../actions/authActions";
import PasswordChangeDone from "./auth/PasswordChangeDone";
import PasswordReset from "./auth/PasswordReset";
import PasswordResetDone from "./auth/PasswordResetDone";
import PasswordResetConfirm from "./auth/PasswordResetConfirm";
import PasswordChange from "./auth/PasswordChange";
import AlarmEdit from "./Common/AlarmEdit";

const HrIndex = ( props ) => {
    const {match} = props;
    // 공통코드
    useEffect(()=>{
        props.getHrUserProfile();
        if(props.comcode) return;
        getComCode()
    },[]);

    return (
        <div style={{  overflowX: 'hidden'}}>
            <ProgressContainer/>
            <HrNavbar/>
            <Switch>
                <Route exact path={`${match.url}/`} component={HrHome}/>
                <Route path={`${match.url}/SugubList`} component={SugubContainer}/>
                {/*<Route path={`${match.url}/hrsp/:jikjong`} render={props=> <HrProfileForm {...props}/>} />*/}
                <Route path={`${match.url}/profileForm`} component={RequireAuth(HrProfileForm)}/>
                {/*<Route path={`${match.url}/ProfileDetail/:id`} component={RequireAuth(HrProfileDetail_test)}/>*/}
                <Route path={`${match.url}/Profile`} component={RequireAuth(HrProfileView)}/>
                <Route path={`${match.url}/Account`} component={RequireAuth(HrAccountView)}/>
                <Route path={`${match.url}/Profile_edit`} component={HrProfileEdit}/>
                <Route path={`${match.url}/HrSignup`} component={HrProfileSignup}/>
                <Route path={`${match.url}/Alarm_edit`} component={AlarmEdit}/>
                <Route path={`${match.url}/Alarm`} component={AlarmView}/>                        {/* 알람 */}
                {/*<Route path={`${match.url}/Chat/:receiver/:sugubid`} component={Chat}/>*/}
                {/*<Route path={`${match.url}/Chat/:room_number`} component={Chat}/>*/}
                {/*<Route path={`${match.url}/Chat`} component={ChatView}/>                        /!* 채팅 *!/*/}
                <Route path={`${match.url}/My`} component={RequireAuth(ProfileView)}/>
                <Route path={`${match.url}/My_edit`} component={RequireAuth(ProfileEdit)}/>

                <Route path={`${match.url}/login`} component={Login}/>
                <Route path={`${match.url}/logout`} component={Logout}/>
                <Route path={`${match.url}/signup`} component={Signup}/>
                {/*<Route path={`${match.url}/signup`} component={<HrMainSearch/>}/>*/}
                <Route path={`${match.url}/signup_done`} component={SignupDone}/>
                {/*<Route path={`${match.url}/reset_password`} component={PasswordReset}/>*/}
                {/*<Route path={`${match.url}/reset_password_done`} component={PasswordResetDone}/>*/}
                {/*<Route path={`${match.url}/reset/:uid/:token/`} component={PasswordResetConfirm}/>*/}
                <Route path={`${match.url}/change_password`} component={RequireAuth(PasswordChange)}/>
                <Route path={`${match.url}/change_password_done`} component={PasswordChangeDone}/>

                <Route component={NoMatch}/>
            </Switch>
            <Footer/>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        comcode: state.comcode.comcode
    }
}
export default connect(mapStateToProps,{getUserProfile,getHrUserProfile})(HrIndex);

