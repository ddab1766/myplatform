import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SugubList from '../../components/Admin/SugubList.js';
import SugubEdit from '../../components/Admin/SugubEdit.js';
// import PagyeonInsert from "components/Manager/Pagyeon/PagyeonInsert.js";
// import JobAdEdit from '../components/Manager/JobAd/JobAdEdit.js';
import {Provider} from "react-redux";
import store from "../../store";
import SugubEditForm from "../../components/Admin/SugubEditForm";

// import 'bootstrap/dist/css/bootstrap.min.css';
function Sugub({ match }) {

  return (
    <>
        <Provider store={store}>
          <Router>
            {/* <h1>수급관리</h1> */}
            <Switch>
              {/*<Route path="/admin/sugub/pagyeonInsert" component={PagyeonInsert} />*/}
              {/*<Route path={`/admin/jobad/:id/`} component={JobAdEdit} />*/}
              <Route exact path={match.path} component={SugubList} />
              {/*<Route path={`${match.path}/:id/`} component={SugubEdit} />*/}
              <Route path={`${match.path}/:id/`} component={SugubEditForm} />
            </Switch>
          </Router>
        </Provider>
    </>
  )
}
export default Sugub;
