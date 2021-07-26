import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody} from 'reactstrap';
import SugubHistory from './SugubHistory';
import defaultClient from "../../utils/defaultClient";
import {getUserToken} from "../../utils/authUtils";
import store from "../../store";
import history from "../../utils/historyUtils";

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [sugubHistory, setSugubHistory] = useState();
  const token = getUserToken(store.getState());

  useEffect(() => {
      if(typeof store.getState().auth.company == 'undefined'){
          //새로고침이나 에러 발생시 페이지 이동
          history.push('../SugubListDetail');
      } else{
        defaultClient
                .get(vUrls.SUGUB, {
                    headers:{
                        authorization: 'Token ' + token
                    },
                    params: {
                        // user: user.id,
                        // sugub_status: 'CC0300000',
                        companyprofile: store.getState().auth.company.id
                    }
                })
                .then(({data}) => {
                    console.log(data);
                    setSugubHistory(data);
                })
    }}, []);

  return <>
      { sugubHistory && (
      <div>
        <Button className="btn-sm" color="danger" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className} backdrop={false}>
          <div className="modal-header text-left">
            <button
                aria-hidden={true}
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggle}
            >
              <i className="nc-icon nc-simple-remove" />
            </button>
            <h5 className="modal-title" id="myModalLabel">
              수급내역<small> {store.getState().auth.company.custname}</small>
            </h5>

          </div>
          <ModalBody className="p-1">
           <SugubHistory company={sugubHistory} toggle={toggle}></SugubHistory>
          </ModalBody>

        </Modal>
      </div>
      )
      }
  </>
}

export default ModalExample;