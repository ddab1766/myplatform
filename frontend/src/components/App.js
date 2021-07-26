import React, {lazy, Suspense, useEffect, useState} from "react";
// import "assets/css/paper-dashboard.css"
import {Switch} from "react-router-dom";
import Route from "react-router-dom/Route";
import LoaderSpinner from "./Etc/LoaderSpinner";

import ReactGA from "react-ga";
// import SelectIndex from "./SelectIndex";
import LoaderSpinnerContainer from "../components/Etc/LoaderSpinnerContainer";
import Notifications from '../components/Etc/Notifications';
import {Viewer} from '../components/DocViewer/';
import {getComCode} from "../actions/commonActions";
import {useSelector, shallowEqual} from "react-redux";
import SignupDone from "./auth/SignupDone";
import PasswordReset from "./auth/PasswordReset";
import PasswordResetDone from "./auth/PasswordResetDone";
import PasswordResetConfirm from "./auth/PasswordResetConfirm";
import RequireAuth from "./auth/RequireAuth";
import PasswordChange from "./auth/PasswordChange";
import {Loader} from "rsuite";

// const SelectIndex = lazy( ()=> import('components/SelectIndex'));
// const UserIndex = lazy( ()=> import('components/UserIndex'));
// const test = lazy( ()=> import('components/Sample.jsx'));
const CompanyIndex = lazy( ()=> import('components/CompanyIndex'));
const HrIndex = lazy( ()=> import('components/HrIndex'));
const HelpCenterIndex = lazy( ()=> import('components/HelpCenterIndex'));
const AdminLayout = lazy( ()=> import('layouts/Admin.jsx'));
const AuthLayout = lazy( ()=> import('layouts/Auth.jsx'));

// export default class App extends Component {
const App = ( { hideLoader } ) => {
    const [isLoading, setIsLoading] = useState(true);

    const {comcode} = useSelector(state => ({
            comcode: state.comcode.comcode
        }),
        shallowEqual
    );

    const getGA = () => {
        console.log("페이지 들어옴");
        const pathName = window.location.pathname;
        ReactGA.initialize("UA-2212276865-01");
        ReactGA.set({ page: pathName });
        ReactGA.pageview(pathName);
    };
    useEffect( ()=>{
        setIsLoading(false)
        getGA()
    }, []);

    // 공통코드
    useEffect(()=>{
        // if(comcode) return;
        // if(props.comcode) return;
        getComCode()
    },[]);
    window.scrollTo(0, 0);
    // render() {
    return !isLoading ? (
        <div className="main" >
            {/*<Notifs />*/}
            <LoaderSpinnerContainer />
            {/*<Notifications />*/}
            <Switch>
                <Suspense fallback={<><Loader size="lg" content="페이지 로딩중...." backdrop vertical center/></>}>
                    {/*<Route exact path="/" component={SelectIndex}/>*/}
                    <Route exact path="/" render={props=> <CompanyIndex {...props} />} />
                    {/*<Route exact path="/" component={UserIndex}/>*/}
                    {/*<Route path="/test" component={test}/>*/}
                    {/*<Route path="/User" component={UserIndex}/>*/}
                    <Route path="/HelpCenter" component={HelpCenterIndex}/>
                    <Route path="/Company" render={props=> <CompanyIndex {...props} />} />
                    <Route path="/Hr" render={props=> <HrIndex {...props} />} />
                    <Route path="/Mng" render={props => <AdminLayout {...props} />} />
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <Route path="/Viewer/:uri" render={props=> <Viewer {...props}/>} />
                    {/*<Route path="/reset" render={props=> <CompanyIndex {...props} />} />*/}
                    {/*<Route path="/invitations" render={props=> <CompanyIndex {...props} />} />*/}
                    <Route path="/accounts" render={props=> <CompanyIndex {...props} />} />
                    {/*<Route path={`signup_done`} component={SignupDone}/>
                    <Route path={`/reset_password`} component={PasswordReset}/>
                    <Route path={`/reset_password_done`} component={PasswordResetDone}/>
                    <Route path={`/reset/:uid/:token/`} component={PasswordResetConfirm}/>
                    <Route path={`/change_password`} component={RequireAuth(PasswordChange)}/>*/}
                </Suspense>
            </Switch>

        </div>
    ) : ( <></>)
}

function mapStateToProps(state) {
    return {
        comcode: state.comcode.comcode
    }
}
export default App
// export default connect(mapStateToProps)(App);
