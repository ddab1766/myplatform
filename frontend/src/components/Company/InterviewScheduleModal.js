import React, {useEffect,useState} from 'react';
import {Col, Label, Modal, ModalBody, Row} from 'reactstrap';
import {
    infoField,
    renderField,
} from "../../utils/renderUtils_mng";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import DaumPostcode from "../Etc/DaumPostcode_mng";
import {Form, FormGroup, CheckPicker, ControlLabel, FormControl,
    ButtonToolbar,Button, InputPicker, DatePicker, DateRangePicker,Checkbox,Schema} from "rsuite"
import store from "../../store";
import axios from "axios";
import {apiUrls} from "../../constants/urls";
import moment from "moment";
import {isMobile} from "react-device-detect"
const footerStyles = {
    padding: '10px 2px',
    borderTop: '1px solid #e5e5e5'
};

const reducePromises = (array, callback) => (
    array.reduce((prevPrms, currElem, index) => (
        prevPrms.then(async prevRes => {
            const currRes = await callback(currElem, index);
            return [...prevRes, currRes];
        })
    ), Promise.resolve([]))
)
const { StringType, NumberType,ArrayType,DateType } = Schema.Types;
const model = Schema.Model({
  comments: StringType().isRequired('해당 필드는 필수입니다.'),
    jobapp: ArrayType().isRequired('해당 필드는 필수입니다.'),
     interview_dt: DateType().isRequired('해당 필드는 필수입니다.'),
    addr: StringType().isRequired('해당 필드는 필수입니다.'),
    addr_detail: StringType().isRequired('해당 필드는 필수입니다.'),
    addr_code: StringType().isRequired('해당 필드는 필수입니다.'),
});
const InterviewScheduleModal = (props) => {
    const {modal, toggle, checked, jobap, setJobap} = props;
    const [filteredList, setFilteredList] = useState([]);
    const [formValue, setFormValue] = useState({})
    const [formError, setFormError] = useState({})
    const [loading, setLoading] = useState(false)
    const [checkAll, setCheckAll] = useState(null)
    const [indeterminate, setIndeterminate] = useState(null)
    const [value, setValue] = useState(null);
    const [allValue, setAllValue] = useState(null);
    const formRef = React.useRef(null);
    useEffect(() => {
        const list = jobap.filter(v=>v.applied_status.code_id === 'BW0301000').map((value, index) => {
            return {
                value:value.id,
                label:value.applied_username,
                role:value.applied_status.code_name,
                interview:value.interview_jobapp.length>0 && value.interview_jobapp[0].interview_dt
            }
        });
        setFilteredList(list)
        setAllValue(list.map(item => item.value))

    }, [jobap]);
    useEffect(()=>{
        //담당자 정보 세팅
        formValue.interview_manager = props.user.nickname;
        formValue.interview_phone = props.user.phone;
        formValue.interview_email = props.user.email;
        console.log(formValue)
    },[])
    const  handleSubmit = () => {
        if(!formRef.current.check()){
            return false;
        }
        // var addr = store.getState().form.InterviewScheduleModal.values.work_load_addr
        // var addr_detail = store.getState().form.InterviewScheduleModal.values.work_load_addr_detail
        // var addr_code = store.getState().form.InterviewScheduleModal.values.work_post_addr_code
        setLoading(true)
        let formData = new FormData();
        Object.keys(formValue).map(v => {
            if(v === 'interview_dt'){
                formData.append(v,moment(formValue[v]).format('YYYY-MM-DDTHH:mm'))
            } else if(v !== 'jobapp'){
                formData.append(v,formValue[v])
            }
        } )
        // formData['in/*terview_dt'] = moment(formData['interview_dt']).format('YYYY-MM-DDThh:mm');
        console.log('formValue',formValue['jobapp'])
        var test = jobap;
        reducePromises(formValue['jobapp'], (v) => {
        // formValue['jobapp'].map(v => {
            console.log(v)
            formData.append('jobapp',v)

            return axios
                .post(apiUrls.INTERVIEW, formData, {
                    headers: {
                        authorization: 'Token ' + props.token,
                        'content-type': 'multipart/form-data'
                    },
                })
                .then(({data})=>{
                    toggle()
                    console.log(data)
                    window.notify.onChange('면접일정을 정상적으로 등록했습니다.');
                    test = test.map(val =>
                        val.id === data.jobapp
                            ? {
                                ...val,
                                interview_jobapp:[data]
                            } : val
                    );
                    setLoading(false)
                    console.log(test)
                    setJobap(test);
                })
                .catch((error) => {
                    setLoading(false)
                    console.log('updateHrSpecial err:', error)
                });
        })

    }
    const  handleCheckAll = (value, checked) => {
        const nextValue = checked ? allValue : [];
        setValue(nextValue);
        setIndeterminate(false);
        setCheckAll(checked);
        console.log(allValue)
        formValue['jobapp'] = nextValue
    }
    const handleChange = (value) => {
        setValue(value)
        setIndeterminate(value.length > 0 && value.length < allValue.length);
        setCheckAll(value.length === allValue.length);
    }

    return <>
        <style jsx>{`
            .rs-picker-menu{
            z-index:1051
            }
            `}</style>
        { (
            <div>
                <Modal isOpen={modal} toggle={toggle} backdrop={true}>
                    {!isMobile && <div className="modal-header text-left">
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
                            면접일정등록
                        </h5>

                    </div>}
                    <ModalBody className="p-4">
                        <>
                            <Form onSubmit={handleSubmit}
                                  ref={formRef}
                                  onChange={formValue => {
                                      console.log(formValue)
                                      setFormValue( formValue );
                                  }}
                                  formValue={formValue}
                                  model={model}
                                  onCheck={formError => {
                                    setFormError( formError );
                                  }}
                                   formError={formError}
                            >

                                {/*<FormGroup>*/}

                                {/*<ControlLabel>대상자</ControlLabel>*/}
                                <Row>
                                    <Col className="col-3">
                                        <Label>대상자</Label>
                                    </Col>
                                    <Col className="col-9">
                                        <FormControl name="jobapp"
                                                     accepter={CheckPicker}
                                                     block
                                                     data={filteredList}
                                                     groupBy="role"
                                                     searchable={false}
                                                     onChange={handleChange}
                                                     value={value}
                                                     placeholder="지원자 선택"
                                                     renderExtraFooter={() => (
                                                         <div style={footerStyles}>
                                                             <Checkbox
                                                                 inline
                                                                 indeterminate={indeterminate}
                                                                 checked={checkAll}
                                                                 onChange={handleCheckAll}
                                                             >
                                                                 모두선택
                                                             </Checkbox>

                                                         </div>
                                                     )}
                                                     renderMenuItem={(label, item) => {
                                                         return (
                                                             <div>
                                                                 <i className="rs-icon rs-icon-user" /> {label}({item.interview && moment(item.interview).format('YYYY-MM-DD HH:mm')})
                                                             </div>
                                                         );
                                                     }}
                                                     renderMenuGroup={(label, item) => {
                                                         return (
                                                             <div>
                                                                 <i className="rs-icon rs-icon-group" /> {label} - ({
                                                                 item.children.length
                                                             })
                                                             </div>
                                                         );
                                                     }}
                                                     renderValue={(value, items) => {
                                                         console.log(items)
                                                         const item = items.map(v=>v.label)
                                                         return (
                                                             <span>
                                                          <span style={{ color: '#575757' }}>
                                                            <i className="rs-icon rs-icon-user" /> 지원자 :
                                                          </span>{' '}
                                                                 {item.join(' , ')}
                                                        </span>
                                                         );
                                                     }}
                                        >
                                        </FormControl>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col className="col-3">
                                        <Label>메세지</Label>
                                    </Col>
                                    <Col className="col-auto col-9">
                                        <FormControl style={{width:'100%'}} componentClass="textarea" rows={3} name="comments" />
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col className="col-3">
                                        <Label>면접일시</Label>
                                    </Col>
                                    <Col className="col-auto col-10">
                                        <FormControl
                                            accepter={DatePicker}
                                            format="YYYY년MM월DD일 HH시mm분"
                                            placeholder="날짜선택"
                                            name="interview_dt"
                                            ranges={[
                                                {
                                                    // label: '지금',
                                                    // value: new Date()
                                                }
                                            ]}
                                            locale={{
                                                sunday: '일',
                                                monday: '월',
                                                tuesday: '화',
                                                wednesday: '수',
                                                thursday: '목',
                                                friday: '금',
                                                saturday: '토',
                                                hours:'시간',
                                                minutes:'분',
                                                ok: '확인',
                                                today: '오늘',
                                                yesterday: '어제',
                                                last7Days: '지난 7일'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br/>

                                <Row>
                                    <Col className="col-3">
                                        <Label>면접장소</Label>
                                    </Col>
                                    <Col className="col-3">
                                       <FormControl name="addr_code" style={{width:'75px'}}/>
                                    </Col>
                                    <Col style={{marginBottom:10}}>
                                        <DaumPostcode formValue={formValue} setFormValue={setFormValue} formName="InterviewScheduleModal" filed1="work_load_addr" filed2='work_post_addr_code' filed3='work_load_addr_detail'/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-3">
                                        <Label></Label>
                                    </Col>
                                    <Col>
                                       <FormControl name="addr" style={{width:'100%',marginBottom:10}}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-3">
                                        <Label></Label>
                                    </Col>
                                    <Col>
                                       <FormControl name="addr_detail" style={{width:'100%'}}/>
                                    </Col>
                                </Row>

                                <hr/>
                                <Row>
                                    <Col className="col-3">
                                        <Label>면접담당자</Label>
                                    </Col>
                                    <Col className="col-9">
                                        <Row>
                                            <Col className="col-3">
                                                <Label>이름</Label>
                                            </Col>
                                            <Col className="col-9">
                                                <FormControl name="interview_manager" style={{width:'100%',marginBottom:10}}
                                                             size="sm"  type="input" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="col-3">
                                                <Label>핸드폰</Label>
                                            </Col>
                                            <Col className="col-9">
                                                <FormControl name="interview_phone" style={{width:'100%',marginBottom:10}}
                                                             size="sm" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="col-3">
                                                <Label>이메일</Label>
                                            </Col>
                                            <Col className="col-9">
                                                <FormControl name="interview_email" style={{width:'100%',marginBottom:2}}
                                                             size="sm" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <br/>
                                <FormGroup style={{textAlign: 'right'}}>
                                    <ButtonToolbar>
                                        <Button appearance="default" onClick={toggle}>취소</Button>
                                        <Button appearance="primary" type="submit" onClick={handleSubmit} loading={loading}>등록</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </>
                    </ModalBody>

                </Modal>
            </div>
        )
        }
    </>
}
function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        token:state.auth.token,
    }
}
export default connect(mapStateToProps)(reduxForm({
    form: "InterviewScheduleModal",
    // enableReinitialize: true,
    // onSubmit: updateSugub,
    // onSubmitSuccess: (result, dispatch)=>{
    //     history.goBack();
    // },
    // onSubmitFail: (errors) => {
    //     console.log(errors);
    //     window.scrollTo(0, 0);
    // },
    // destroyOnUnmount: false,
    // forceUnregisterOnUnmount: true,
})(InterviewScheduleModal));