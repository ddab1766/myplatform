import React, {lazy, Suspense, useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import RequireAuth from "components/auth/RequireAuth";
import Login from "components/auth/Login";
import Logout from "components/auth/Logout";
import Signup from "components/auth/Signup";
import SignupDone from "components/auth/SignupDone";
import AccountActivation from "components/auth/AccountActivation";
// import UserProfile from "components/auth/UserProfile";
import UserProfileView from "views/user/UserProfile";
import UserProfileEdit from "components/auth/UserProfileEdit";
import PasswordChange from "components/auth/PasswordChange";
import PasswordReset from "components/auth/PasswordReset";
import PasswordResetDone from "components/auth/PasswordResetDone";
import PasswordResetConfirm from "components/auth/PasswordResetConfirm";
// 구직자
// import ResumeView from "views/user/Resume";
import ChaeListView from "views/user/ChaeList";
import UserNavbar from "components/User/UserNavbar";
import UserHome from "components/User/UserHome";
// import ChaeInfo from "./User/ChaeInfo";
import StatusView from "../views/user/Status";
import PointView from "../views/user/Point";
import ResumeInfo from "./User/ResumeInfo";
// import UserSpecialEdit from "./User/UserSpecialEdit";
// import RecommendView from "../views/user/Recommend";
import Footer from "./Footers/Footer";
import SignForm from "./User/SignForm";
import ProgressContainer from "./Etc/ProgressContainer";
import ExchangeView from "../views/user/Exchange";
import LoaderSpinner from "./Etc/LoaderSpinner";

import "assets/css/paper-dashboard.css"
import {connect} from "react-redux";
import {getComCode} from "../actions/commonActions";

const ChaeInfo = lazy(() => import('./User/ChaeInfo'));
const ResumeView = lazy(() => import('views/user/Resume'));
const RecommendView = lazy(() => import('../views/user/Recommend'));
const UserSpecialEdit = lazy(() => import('./User/UserSpecialEdit'));

const MainContent = ( props, ) => {
    const {match} = props;
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });

    // 공통코드
    useEffect(()=>{
        if(props.comcode) return;
        getComCode()
    },[]);

    return (
        <div>
            <ProgressContainer/>
            <UserNavbar/>
            {/*<UserHeader/>*/}
            <Switch>
                <Suspense fallback={<LoaderSpinner/>}>
                    <Route exact path={`${match.url}/`} component={UserHome}/>
                    <Route path={`${match.url}/Recommend?type=:type`} component={RequireAuth(RecommendView)}/>
                    <Route path={`${match.url}/Recommend`} component={RecommendView}/>
                    <Route path={`${match.url}/Resume_edit/:resumeid`} component={RequireAuth(ResumeInfo)}/>
                    {/*<Route path={`${match.url}/Special/:specialid`} component={RequireAuth(ResumeView)}/>*/}
                    {/*<Route path={`${match.url}/Resume_edit`} component={RequireAuth(ResumeInfo)}/>*/}

                    <Route path={`${match.url}/Resume?specialid=:specialid`} component={RequireAuth(ResumeView)}/>
                    <Route path={`${match.url}/Resume`} component={ResumeView}/>

                    <Route path={`${match.url}/List/:upid/:recuser`} component={ChaeInfo}/>
                    <Route exact path={`${match.url}/List/:upid`} component={ChaeInfo}/>
                    <Route exact path={`${match.url}/List`} component={ChaeListView}/>
                    <Route path={`${match.url}/special_edit/:specialid`} render={props=> <UserSpecialEdit {...props} />} />
                    {/*<Route path={`${match.url}/special_edit/:specialid`} component={RequireAuth(UserSpecialEdit)} />*/}
                    <Route exact path={`${match.url}/special_edit/`} component={RequireAuth(UserSpecialEdit)}/>
                    <Route path={`${match.url}/Status?type=:type`} component={StatusView}/>
                    <Route path={`${match.url}/Status`} component={StatusView}/>
                    <Route path={`${match.url}/Point?type=:type`} component={PointView}/>
                    <Route path={`${match.url}/Exchange`} component={ExchangeView}/>
                    <Route path={`${match.url}/Point`} component={PointView}/>
                    {/*<Route path={`${match.url}/loginPopup/`} component={PopupLogin}/>*/}
                    <Route path={`${match.url}/login`} component={Login}/>
                    <Route path={`${match.url}/logout`} component={Logout}/>
                    <Route path={`${match.url}/signup/:jikjong`} render={props=> <SignForm {...props}/>} />
                    {/*<Route path={`${match.url}/signup/:jikjong`} component={SignForm}/>*/}
                    <Route exact path={`${match.url}/signup`} component={Signup}/>
                    <Route path={`${match.url}/account/confirm-email/:key`} component={AccountActivation}/>
                    <Route path={`${match.url}/signup_done`} component={SignupDone}/>
                    <Route path={`${match.url}/reset_password`} component={PasswordReset}/>
                    <Route path={`${match.url}/reset_password_done`} component={PasswordResetDone}/>
                    <Route path={`${match.url}/reset/:uid/:token/`} component={PasswordResetConfirm}/>
                    <Route path={`${match.url}/profile`} component={RequireAuth(UserProfileView)}/>
                    <Route path={`${match.url}/profile_edit`} component={RequireAuth(UserProfileEdit)}/>
                    <Route path={`${match.url}/change_password`} component={RequireAuth(PasswordChange)}/>
                    {/*<Route component={NoMatch}/>*/}
                </Suspense>
            </Switch>
            <Footer/>
        </div>
    )
};

// export default MainContent;

function mapStateToProps(state) {
    return {
        comcode: state.comcode.comcode
    }
}
// export default App
export default connect(mapStateToProps)(MainContent);
