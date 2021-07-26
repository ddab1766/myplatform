import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import store from "../../store";
import {change} from "redux-form";

const Postcode = (props) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
      // console.log('postcode data:', data)
    }
    store.dispatch(change('sugub_wizard', 'work_load_addr', fullAddress));
    store.dispatch(change('sugub_wizard', 'work_load_addr_code', data.zonecode));
  }

  return (
      <DaumPostcode
          onComplete={handleComplete}
          style={{ border: "1px01 solid #000000"}}
          { ...props }
      />
  );
}

export default Postcode;