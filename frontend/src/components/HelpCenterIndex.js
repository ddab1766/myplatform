import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import Footer from "./Footers/Footer";
import ProgressContainer from "./Etc/ProgressContainer";
import LoaderSpinner from "./Etc/LoaderSpinner";
import HelpCenter from "../views/HelpCenter/HelpCenter";
import RequestsView from "../views/HelpCenter/Requests";

import "assets/css/paper-dashboard.css"
import CommentView from "../views/HelpCenter/Comments";
import PrivacyView from "../views/HelpCenter/Privacy";
import TermsView from "../views/HelpCenter/Terms";
import PagyeonView from "../views/HelpCenter/Pagyeon";
import CompanyNavbar from "./Company/CompanyNavbar";
import CompanyHeader from "./Company/CompanyHeader";

const MainContent = ( {match} ) => {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });
    return (
        <div>
            <ProgressContainer/>
            {/*<UserNavbar/>*/}
            {/*<UserHeader/>*/}
            <CompanyNavbar/>
            <CompanyHeader/>
            {/*<SectionNavbars/>*/}
            <Switch>
                <Suspense fallback={<LoaderSpinner/>}>
                    <Route exact path={`${match.url}/`} component={HelpCenter}/>
                    <Route exact path={`${match.url}/Requests`} component={RequestsView}/>
                    <Route path={`${match.url}/comments/:id`} component={CommentView} />
                    <Route exact path={`${match.url}/privacy`} component={PrivacyView} />
                    <Route exact path={`${match.url}/terms`} component={TermsView} />
                    <Route exact path={`${match.url}/pagyeon`} component={PagyeonView} />
                    {/*<Route path={`${match.url}/:id`} render={props => <CommentView {...props}/>} />*/}

                </Suspense>
            </Switch>
            <Footer/>
        </div>
    )
};

export default MainContent;
