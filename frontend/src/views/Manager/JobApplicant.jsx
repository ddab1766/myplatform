import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import JobApList from '../../components/Manager/Jobap/JobApList.js';
import JobApEdit from '../../components/Manager/Jobap/JobApEdit.js';
import {Provider} from "react-redux";
import store from "../../store";
function JobApplicant({ match }) {
  return (
    <>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path={match.path} component={JobApList} />
              <Route path={`${match.path}/:id/`} component={JobApEdit} />
            </Switch>
          </Router>
        </Provider>
    </>
  )
}
export default JobApplicant;
