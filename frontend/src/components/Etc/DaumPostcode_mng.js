import DaumPostcode from 'react-daum-postcode';
import store from "../../store";
import {change} from "redux-form";

import React, {useState} from 'react';
import {Button, Modal, ModalBody} from 'reactstrap';

const Postcode = (props) => {
  const {
    btnText,
    className,
    formName, filed1,filed2,filed3,formValue,setFormValue
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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

      console.log('postcode data:', data)
    }
    // store.dispatch(change('SugubEditForm', 'work_load_addr', fullAddress));
    // store.dispatch(change('SugubEditForm', 'work_post_addr_code', data.zonecode));
    // store.dispatch(change('SugubEditForm', 'work_load_addr_detail', ''));


    if(formValue){
      setFormValue({...formValue, addr:fullAddress, addr_code:data.zonecode, addr_detail:''})
    }else{
      store.dispatch(change(formName, filed1, fullAddress));
      store.dispatch(change(formName, filed2, data.zonecode));
      store.dispatch(change(formName, filed3, ''));
    }


    toggle()
  }

  return (
      <div>
        <Button style={{margin:"0"}} className="btn" color="primary" onClick={toggle}>주소찾기</Button>
        <Modal isOpen={modal} toggle={toggle} className={className} backdrop={false}>
          <div className="modal-header text-left" style={{padding:"10px"}}>
            <button
                aria-hidden={true}
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggle}
            >
              <i className="nc-icon nc-simple-remove" />
            </button>
          </div>
          <ModalBody>
            <DaumPostcode
                autoClose
                onComplete={handleComplete}
                { ...props }
            />
          </ModalBody>

        </Modal>
      </div>


  );
}

export default Postcode;