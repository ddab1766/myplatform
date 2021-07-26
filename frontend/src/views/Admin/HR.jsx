import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CompanyList from '../../components/Admin/HR/HRList.js';
// import CompanyInfo from '../components/CompanyProfile/CompanyInfo.js';
import CompanyEdit from '../../components/Admin/HR/CompanyEdit.js';
import {Provider} from "react-redux";
import store from "../../store";

function HR({ match }) {
  return (
    <>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path={match.path} component={CompanyList} />
              {/*<Route exact path={`${match.path}/:id`} component={CompanyInfo} />*/}
              <Route exact path={`${match.path}/:id`} component={CompanyEdit} />
              {/*<Route path={`${match.path}/:id/edit`} component={CompanyEdit} />*/}
            </Switch>
          </Router>
        </Provider>
    </>
  )
}
export default HR;