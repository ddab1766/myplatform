import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {reducer as notifReducer} from 'redux-notifications';
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import comcodeReducer from "./comcodeReducer";
import alarmReducer from "./alarmReducer";
import coworkerReducer from "./coworkerReducer";
import sugubReducer from "./sugubReducer";

const rootReducer = combineReducers({
    form: formReducer,
    notifs: notifReducer,
    auth: authReducer,
    common: commonReducer,
    comcode: comcodeReducer,
    alarm: alarmReducer,
    coworker: coworkerReducer,
    sugub: sugubReducer
    // hr_list: hrReducer
});

export default rootReducer;
