import React, {useEffect, useState} from "react";
// reactstrap components
import {Card,} from "reactstrap";
import {
    Breadcrumb,
    Button,
    ButtonToolbar,
    Container,
    Content,
    ControlLabel,
    FlexboxGrid,
    Form,
    FormControl,
    FormGroup,
    InputPicker,
    Panel,
    Radio,
    RadioGroup,
    Uploader
} from 'rsuite';
import {getFee, postRefund} from "../../actions/employeeActions";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import defaultClient from "../../utils/defaultClient";
import {apiUrls} from "../../constants/urls";

const NavLink = props => <Breadcrumb.Item componentClass={Link} {...props} />;
const RefundApply = (props) => {
    const [comcode, setComcode] = useState([])
    const [formValue, setFormValue] = useState({})
    const [fileList, setFileList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState([]);
    useEffect(() => {
        if(props){
            setComcode(props.comcode.filter(v => v.code_topidx === 'ZF'))
        }
        if(props.token){
            getFee()
                .then((data) => {
                    var t = [];
                    console.log(data)
                    data.map((v,i)=>{
                        t = t.concat({
                            label:`[${v.contract.id}]${v.contract.employee.emp_name}`,
                            value:v.contract.id});
                    })
                    setItems(t);
                })
        }
    }, []);

    const handleSubmit = () => {
        let formData = new FormData();
        console.log(formValue)
        Object.keys(formValue).map(v => {

            if(v==='refund_file'){
                formData.append(v,formValue[v][0]['blobFile'],formValue[v][0]['blobFile'].name)
            }else{
                formData.append(v,formValue[v])
            }
        } )

        postRefund(formData);
    }
    const getUsers = (word) => {

        if(props.token){
            defaultClient.get(apiUrls.CONTRACT + word + '/',{
                headers:{
                    authorization: 'Token ' + props.token
                }})
                .then(({data}) => {

                    setLoading(false);
                    setItems((data));
                    console.log(items);
                })
        }

        // fetch(`https://api.github.com/search/users?q=${word}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data);
        //     this.setState({
        //       loading: false,
        //       items: data.items
        //     });
        //   })
        //   .catch(e => console.log('Oops, error', e));
    }
    console.log(items)
    const handleSearch = (word) => {
        if (!word) {
            return;
        }
        setLoading(true);
        getUsers(word);
    }
    return items && (
        <>
            <Container>
                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={8}>
                            <Breadcrumb>
                                <NavLink to="Refund">환불신청</NavLink>
                                <NavLink to="Refund/history">환불내역</NavLink>
                            </Breadcrumb>
                            <Card>
                                <Panel header={<h3>환불신청</h3>} bordered>
                                    <Form fluid
                                          onChange={formValue => {
                                              setFormValue( formValue );
                                          }}
                                          formValue={formValue}
                                    >
                                        <FormGroup>
                                            <ControlLabel>환불계약ID로 검색해주세요.</ControlLabel>
                                            <FormControl name="contract" data={items}
                                                style={{ width: 224 }} accepter={InputPicker}>
                                            </FormControl>
                                        </FormGroup>
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
                                                        <Button appearance="primary" onClick={handleSubmit} size="lg">전송</Button>
                                                    </ButtonToolbar>
                                                </FormGroup>
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </Form>
                                </Panel>
                            </Card>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>

            </Container>
        </>
    )
};
function mapStateToProps(state) {
    return {
        comcode:state.comcode.comcode,
        token: state.auth.token,
    }
}
export default connect(mapStateToProps)(RefundApply);

// export default reduxForm({
//     form: 'RefundApply', // a unique identifier for this form
//     enableReinitialize: true,
//     // onSubmit: postRefund
// })(RefundApply)
// export default RefundApply