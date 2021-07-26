import {AlarmTypes} from "../constants/actionTypes";


export default function (state = {}, action) {
    switch(action.type) {
        case AlarmTypes.GET_ALARM:
            return { ...state, alarm: action.payload};
        case AlarmTypes.READ_ALARM:
            return {
                ...state,
                alarm: state.alarm.map((alarm, index)=> {
                    if (alarm.id === action.payload.id)
                        alarm.is_read = true;
                        return alarm
                }, {})
            };
            // return produce(state, draft => {
            //     console.log('state', state)
            //     console.log('draft', draft)
            //     console.log('draft.alarm', draft.alarm)
            //     const alarm = draft.alarm.find( alarm => console.log('a..?', alarm) );
            //     alarm.is_read = !alarm.is_read
            // })
        case AlarmTypes.CLEAN_ALARM:
            return [];
        default:
            return state;
    }
}
