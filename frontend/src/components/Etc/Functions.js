import React from "react";
import store from "../../store";

let comcode = store.getState().comcode.comcode;

function getCodeName(code_id) {
    return comcode.filter( v => v.code_id === code_id)[0]['code_name']
}

export { getCodeName };