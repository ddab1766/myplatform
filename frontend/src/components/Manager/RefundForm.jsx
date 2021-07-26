import React, {useEffect, useState} from "react";
// reactstrap components
import {Col, Row,} from "reactstrap";
import {
    Breadcrumb,
    Button,
    ButtonToolbar,
    ControlLabel,
    FlexboxGrid,
    Form,
    FormControl,
    FormGroup,
    Panel,
    Radio,
    RadioGroup,
    Uploader
} from 'rsuite';
import {postRefund} from "../../actions/employeeActions";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getComCode} from "../../actions/commonActions";

const NavLink = props => <Breadcrumb.Item componentClass={Link} {...props} />;
const RefundForm = (props) => {
    const {data,toggle,setReload} = props;
    const [comcode, setComcode] = useState([])
    const [formValue, setFormValue] = useState({})
    const [fileList, setFileList] = React.useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        console.log('modal')
        // getComCode()
        if(props){
            setComcode(props.comcode.filter(v => v.code_topidx === 'ZF'))
        }

    }, []);

    const handleSubmit = () => {
        setLoading(true)
        let formData = new FormData();
        console.log(formValue)
        Object.keys(formValue).map(v => {
            if(v==='refund_file'){
                formData.append(v,formValue[v][0]['blobFile'],formValue[v][0]['blobFile'].name)
            }else{
                formData.append(v,formValue[v])
            }
        } )
        formData.append('contract',data[5].id)
        postRefund(formData).then(data => {
            toggle(null)
            setLoading(false)
            setReload(true)
        }).catch(error=>{
            setLoading(false)
        });

    }

    console.log('comocde', comcode)

    return data && (
            <Panel >
                <Form fluid
                      onChange={formValue => {
                          setFormValue( formValue );
                      }}
                      formValue={formValue}
                >
                    <FormGroup>
                        <ControlLabel>환불정보</ControlLabel>
                        <Row>
                            <Col>
                                <dl>
                                    <dt>ID</dt>
                                    <dd>{data.id}</dd>
                                </dl>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <dl>
                                    <dt>환불대상</dt>
                                    <dd>{data.contract.employee.emp_name}</dd>
                                </dl>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <dl>
                                    <dt>환불금액</dt>
                                    <dd>{data.fee}</dd>
                                </dl>
                            </Col>
                        </Row>
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <ControlLabel>환불방식</ControlLabel>
                        <FormControl name="gubun" inline  accepter={RadioGroup}>
                            {comcode.map(v=>{
                                return <Radio value={v.code_id}>{v.code_name}</Radio>
                            })}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>첨부파일</ControlLabel>
                        <FormControl
                            autoUpload={false}
                            accepter={Uploader}
                            name="refund_file"
                            disabled={fileList.length > 0}
                            onChange={setFileList}
                        >
                            <button>
                                업로드
                            </button>
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>환불사유</ControlLabel>
                        <FormControl componentClass="textarea" rows={3} name="reason" />
                    </FormGroup>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item >
                            <FormGroup justify="center" >
                                <ButtonToolbar >

                                    <Button appearance="primary" onClick={handleSubmit} size="lg" loading={loading}>전송</Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Form>
            </Panel>
    )
};
function mapStateToProps(state) {
    return {
        comcode:state.comcode.comcode,
        token: state.auth.token,
    }
}
export default connect(mapStateToProps)(RefundForm);

// export default reduxForm({
//     form: 'RefundApply', // a unique identifier for this form
//     enableReinitialize: true,
//     // onSubmit: postRefund
// })(RefundApply)
// export default RefundApply