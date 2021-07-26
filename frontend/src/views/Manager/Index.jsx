import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SugubEdit from '../../components/Manager/Sugub/SugubDetailView.js';
import PagyeonList from "./PagyeonList.jsx";
// import JobAdEdit from '../components/Manager/JobAd/JobAdEdit.js';
import {Provider} from "react-redux";
import store from "../../store";
import Chat from "../../components/Chat/Chat";

// import 'bootstrap/dist/css/bootstrap.min.css';
function Sugub({ match }) {

  return (
    <>
        <Provider store={store}>
          <Router>

            <Switch>
              {/*<Route path="/admin/sugub/pagyeonInsert" component={PagyeonInsert} />*/}
              {/*<Route path={`/admin/jobad/:id/`} component={JobAdEdit} />*/}
              {/*<Route exact path={match.path} component={SugubList} />*/}
              <Route path={`${match.path}/:id/`} component={SugubEdit} />
              <Route path={'/Mng/Chat/:receiver/:sugubid'} component={Chat}/>
              <Route path={`${match.path}`} component={PagyeonList} />
              {/*<Route exact path={`/Mng/Chat/:receiver`} component={Chat} />*/}
            </Switch>
          </Router>
        </Provider>
    </>
  )
}
export default Sugub;
