import React, {useEffect,useState} from 'react';
import {Col, Label, Modal, ModalBody, Row} from 'reactstrap';

import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import {Form, FormGroup, CheckPicker, ControlLabel, FormControl,
    ButtonToolbar,Button, InputPicker, DatePicker, DateRangePicker,Checkbox,Schema} from "rsuite"
import axios from "axios";
import {apiUrls} from "../../../constants/urls";
import moment from "moment";
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
     interview_dt: DateType().isRequired('해당 필드는 필수입니다.'),
});
const InterviewScheduleModal = (props) => {
    const {checked, jobap, setJobap,data} = props;
    const [modal, setModal] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const [formValue, setFormValue] = useState({})
    const [formError, setFormError] = useState({})
    const [loading, setLoading] = useState(false)
    const [checkAll, setCheckAll] = useState(null)
    const [indeterminate, setIndeterminate] = useState(null)
    const [value, setValue] = useState(null);
    const [allValue, setAllValue] = useState(null);
    const formRef = React.useRef(null);
    const toggle = () => {
        setModal(!modal);
        console.log(data)
    }
    useEffect(() => {

    }, []);
    useEffect(()=>{

    },[])
    const  handleSubmit = () => {
        setLoading(true)
        let formData = new FormData();

        formData.append('interview_dt',moment(formValue['interview_dt']).format('YYYY-MM-DDTHH:mm'))
        formData.append('addr',data.addr)
        formData.append('addr_code',data.addr_code)
        formData.append('addr_detail',data.addr_detail)
        formData.append('comments',data.comments)
        formData.append('interview_email',data.interview_email)
        formData.append('interview_manager',data.interview_manager)
        formData.append('interview_phone',data.interview_phone)
        formData.append('jobapp',data.jobapp)
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
                    window.location.reload();
                    // test = test.map(val =>
                    //     val.id === data.jobapp
                    //         ? {
                    //             ...val,
                    //             interview_jobapp:[data]
                    //         } : val
                    // );
                    setLoading(false)
                    // setJobap(test);
                })
                .catch((error) => {
                    setLoading(false)
                    console.log('updateHrSpecial err:', error)
                });

    }
    const  handleCheckAll = (value, checked) => {

    }
    const handleChange = (value) => {

    }

    return <>
        <style jsx>{`
            .rs-picker-menu{
            z-index:1051
            }
            `}</style>
        { (
            <div>
                <a href='javascript:void(0);' onClick={toggle}>면접일 수정</a>
                <Modal isOpen={modal} toggle={toggle} backdrop={true}>
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
                            면접일정등록
                        </h5>

                    </div>
                    <ModalBody className="p-4">
                        <Container>
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
                                {/*<Row>*/}
                                {/*    <Col className="col-3">*/}
                                {/*        <Label>대상자</Label>*/}
                                {/*    </Col>*/}
                                {/*    <Col className="col-9">*/}
                                {/*        <FormControl name="jobapp"*/}
                                {/*                     accepter={CheckPicker}*/}
                                {/*                     block*/}
                                {/*                     data={filteredList}*/}
                                {/*                     groupBy="role"*/}
                                {/*                     searchable={false}*/}
                                {/*                     onChange={handleChange}*/}
                                {/*                     value={value}*/}
                                {/*                     placeholder="지원자 선택"*/}
                                {/*                     renderExtraFooter={() => (*/}
                                {/*                         <div style={footerStyles}>*/}
                                {/*                             <Checkbox*/}
                                {/*                                 inline*/}
                                {/*                                 indeterminate={indeterminate}*/}
                                {/*                                 checked={checkAll}*/}
                                {/*                                 onChange={handleCheckAll}*/}
                                {/*                             >*/}
                                {/*                                 모두선택*/}
                                {/*                             </Checkbox>*/}
                                
                                {/*                         </div>*/}
                                {/*                     )}*/}
                                {/*                     renderMenuItem={(label, item) => {*/}
                                {/*                         return (*/}
                                {/*                             <div>*/}
                                {/*                                 <i className="rs-icon rs-icon-user" /> {label}({item.interview && moment(item.interview).format('YYYY-MM-DD HH:mm')})*/}
                                {/*                             </div>*/}
                                {/*                         );*/}
                                {/*                     }}*/}
                                {/*                     renderMenuGroup={(label, item) => {*/}
                                {/*                         return (*/}
                                {/*                             <div>*/}
                                {/*                                 <i className="rs-icon rs-icon-group" /> {label} - ({*/}
                                {/*                                 item.children.length*/}
                                {/*                             })*/}
                                {/*                             </div>*/}
                                {/*                         );*/}
                                {/*                     }}*/}
                                {/*                     renderValue={(value, items) => {*/}
                                {/*                         console.log(items)*/}
                                {/*                         const item = items.map(v=>v.label)*/}
                                {/*                         return (*/}
                                {/*                             <span>*/}
                                {/*                          <span style={{ color: '#575757' }}>*/}
                                {/*                            <i className="rs-icon rs-icon-user" /> 지원자 :*/}
                                {/*                          </span>{' '}*/}
                                {/*                                 {item.join(' , ')}*/}
                                {/*                        </span>*/}
                                {/*                         );*/}
                                {/*                     }}*/}
                                {/*        >*/}
                                {/*        </FormControl>*/}
                                {/*    </Col>*/}
                                {/*</Row>*/}
                                {/*<br/>*/}
                                {/*<Row>*/}
                                {/*    <Col className="col-3">*/}
                                {/*        <Label>메세지</Label>*/}
                                {/*    </Col>*/}
                                {/*    <Col className="col-9">*/}
                                {/*        <FormControl componentClass="textarea" rows={3} name="comments" />*/}
                                {/*    </Col>*/}
                                {/*</Row>*/}
                                {/*<br/>*/}
                                <Row>
                                    <Col className="col-4">
                                        <Label>면접일시</Label>
                                    </Col>
                                    <Col className="col-10">
                                        <FormControl
                                            accepter={DatePicker}
                                            format="YYYY-MM-DD HH:mm"
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

                                {/*<Row>*/}
                                {/*    <Col className="col-3">*/}
                                {/*        <Label>면접장소</Label>*/}
                                {/*    </Col>*/}
                                {/*    <Col className="col-3">*/}
                                {/*       <FormControl name="addr_code" style={{width:'75px'}}/>*/}
                                {/*    </Col>*/}
                                {/*    <Col style={{marginBottom:10}}>*/}
                                {/*        /!*<DaumPostcode formValue={formValue} setFormValue={setFormValue} formName="InterviewScheduleModal" filed1="work_load_addr" filed2='work_post_addr_code' filed3='work_load_addr_detail'/>*!/*/}
                                {/*    </Col>*/}
                                {/*</Row>*/}
                                {/*<Row>*/}
                                {/*    <Col className="col-3">*/}
                                {/*        <Label></Label>*/}
                                {/*    </Col>*/}
                                {/*    <Col>*/}
                                {/*       <FormControl name="addr" style={{width:'100%',marginBottom:10}}/>*/}
                                {/*    </Col>*/}
                                {/*</Row>*/}
                                {/*<Row>*/}
                                {/*    <Col className="col-3">*/}
                                {/*        <Label></Label>*/}
                                {/*    </Col>*/}
                                {/*    <Col>*/}
                                {/*       <FormControl name="addr_detail" style={{width:'100%'}}/>*/}
                                {/*    </Col>*/}
                                {/*</Row>*/}
                                
                                {/*<hr/>*/}
                                {/*<Row>*/}
                                {/*    <Col className="col-3">*/}
                                {/*        <Label>면접담당자</Label>*/}
                                {/*    </Col>*/}
                                {/*    <Col className="col-9">*/}
                                {/*        <Row>*/}
                                {/*            <Col className="col-3">*/}
                                {/*                <Label>이름</Label>*/}
                                {/*            </Col>*/}
                                {/*            <Col className="col-9">*/}
                                {/*                <FormControl name="interview_manager" style={{width:214,marginBottom:10}}*/}
                                {/*                             size="sm"  type="input" />*/}
                                {/*            </Col>*/}
                                {/*        </Row>*/}
                                {/*        <Row>*/}
                                {/*            <Col className="col-3">*/}
                                {/*                <Label>핸드폰</Label>*/}
                                {/*            </Col>*/}
                                {/*            <Col className="col-9">*/}
                                {/*                <FormControl name="interview_phone" style={{width:214,marginBottom:10}}*/}
                                {/*                             size="sm" />*/}
                                {/*            </Col>*/}
                                {/*        </Row>*/}
                                {/*        <Row>*/}
                                {/*            <Col className="col-3">*/}
                                {/*                <Label>이메일</Label>*/}
                                {/*            </Col>*/}
                                {/*            <Col className="col-9">*/}
                                {/*                <FormControl name="interview_email" style={{width:214,marginBottom:2}}*/}
                                {/*                             size="sm" />*/}
                                {/*            </Col>*/}
                                {/*        </Row>*/}
                                {/*    </Col>*/}
                                {/*</Row>*/}
                                <hr/>
                                <FormGroup style={{textAlign: 'right'}}>
                                    <ButtonToolbar>
                                        <Button appearance="default">취소</Button>
                                        <Button appearance="primary" type="submit" onClick={handleSubmit}
                                               disabled={( formValue != null && typeof formValue == "object" && !Object.keys(formValue).length )}
                                                loading={loading}>등록</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </Container>
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