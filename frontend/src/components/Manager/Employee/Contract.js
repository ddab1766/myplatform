import React, {useState} from "react";
import {Col, Label, Modal, Row, Spinner} from "reactstrap";
import {
    Button,
    DateRangePicker,
    DatePicker,
    Form,
    Schema,
    FormControl,
    InputNumber,
    SelectPicker,
    FlexboxGrid
} from "rsuite"
import {uploadContract} from "../../../actions/employeeActions"
import {Link} from "react-router-dom";
import moment from "moment";
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const { StringType, NumberType,ArrayType,DateType } = Schema.Types;
const model = Schema.Model({
     date1: DateType().isRequired('해당 필드는 필수입니다.'),
    date2: DateType().isRequired('해당 필드는 필수입니다.'),
});
function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            suffix="원"
        />
    );
}
NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
const Contract = ({employee_id,handleReload,btnLabel,type}) => {
    const [resumeFile, setResumeFile] = useState(null);
    const [modal, setModal] = useState(false);
    const [gigan, setGigan] = useState(0);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [cost, setCost] = useState(0);
    const [contract_from, setContract_from] = useState(null);
    const [contract_to, setContract_to] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const formRef = React.useRef(null);
    const [formValue, setFormValue] = useState({})
    const [formError, setFormError] = useState({})
    const [values, setValues] = React.useState({
        numberformat: '0',
    });
    const toggleModal = () => {
        setModal(!modal);
        setResumeFile([]);
        // setGigan(null);
        setCost(0);
        setValues(0);
    }

    const postData = () => {
        setSubmitting(true);
        console.log(gigan)
        let formValues = new FormData();
        formValues.append(`contract_file`, resumeFile, resumeFile.name);
        formValues.append(`contract_gigan`, gigan);
        formValues.append(`direct_cost`, cost);
        formValues.append('contract_from',contract_from);
        formValues.append('contract_to',contract_to);
        uploadContract(formValues,employee_id).then((data) => {
            toggleModal();
            setSubmitting(false);
            // window.location.reload();
            handleReload();
        }).catch(error => {
            console.log(error.response)
            setSubmitting(false);
        })
    }
    const handleSubmit = () => {
        if(!formRef.current.check() && type === "AC0100000"){
            console.log(formError);
            return false;
        }
        else if(resumeFile.length < 1){
            alert('계약서를 업로드 해주세요.')
            return false;
        }else if(cost === 0){
            alert('직접비를 입력해주세요.')
            return false;
        }
        else if(gigan < 1 && type === "AC0100000"){
            alert('기간이 1개월 미만입니다.')
            return false;
        }
        else{
            console.log(cost)
            postData();
        }

    };
    const handleChangeGigan = (date2) => {
        setContract_from(moment(date1).format('YYYYMMDD'));
        setContract_to(moment(date2).format('YYYYMMDD'));
        var start =moment(date1).format('YYYYMMDD')
        var end = moment(date2).format('YYYYMMDD')
        var da1 = new Date(start.substring(0,4), start.substring(4,6), start.substring(6,8));
        var da2 = new Date(end.substring(0,4), end.substring(4,6), end.substring(6,8));
        var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
        var cMonth = cDay * 30;// 월 만듬
        var result = parseInt((da2-da1) / cMonth);
        setGigan(result);
        // if(result > 0){
        //     setGigan(result + '개월')
        // } else{
        //     setGigan('기간이 1개월 미만입니다.')
        // }

    }
    const handleUploadChange = (e) => {
        console.log(e.target.files[0])
        setResumeFile(e.target.files[0])
    };
    const handleChange = (event) => {
        setCost(event.target.value);
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const renderModal = () => {
        return (
            <Modal isOpen={modal} toggle={toggleModal}>
                {/*<form className="mx-3" onSubmit={handleSubmit} user={props.user}>*/}
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        type="button"
                        onClick={toggleModal}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                    <h5
                        className="modal-title text-center"
                        id="applyModal"
                    >
                        계약서 업로드
                    </h5>
                </div>
                <Form
                                  ref={formRef}
                                  onChange={formValue => {
                                      setFormValue( formValue );
                                  }}
                                  formValue={formValue}
                                  model={model}
                                  onCheck={formError => {
                                    setFormError( formError );
                                  }}
                                   formError={formError}
                            >
                    <div className="modal-body">
                        <Row>
                            <Col className="col-3">
                                계약서
                            </Col>
                            <Col className="col-9">
                                <input type="file" id="resume_file" onChange={handleUploadChange} required />
                            </Col>
                        </Row>
                        <br/>
                        {type === "AC0100000" ?
                            <>
                        <Row>
                            <Col className="col-3">
                                <Label>계약일정</Label>
                            </Col>
                            <Col className="col-auto">
                                <FormControl
                                    accepter={DatePicker}
                                    onChange={v=>setDate1(v)}
                                    format="YYYY-MM-DD"
                                    oneTap
                                    name="date1"
                                    placeholder="날짜선택"
                                    locale={{
                                        sunday: '일',
                                        monday: '월',
                                        tuesday: '화',
                                        wednesday: '수',
                                        thursday: '목',
                                        friday: '금',
                                        saturday: '토',
                                        ok: '확인',
                                        today: '오늘',
                                        yesterday: '어제',
                                        last7Days: '지난 7일'
                                    }}
                                />
                                 </Col>
                            {' ~ '}
                            <Col className="col-auto">
                                <FormControl
                                    accepter={DatePicker}
                                    onChange={v=>handleChangeGigan(v)}
                                    format="YYYY-MM-DD"
                                    oneTap
                                    name="date2"
                                    placeholder="날짜선택"
                                    locale={{
                                        sunday: '일',
                                        monday: '월',
                                        tuesday: '화',
                                        wednesday: '수',
                                        thursday: '목',
                                        friday: '금',
                                        saturday: '토',
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
                                <Label>계약기간</Label>
                            </Col>
                            <Col className="col-9">
                                {gigan !== null ? (gigan < 1 ? '기간이 1개월 미만입니다.' : gigan + '개월') : '기간을 선택해주세요.'}
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col className="col-3">
                                <Label>직접비</Label>
                            </Col>
                            <Col className="col-9">
                                <TextField
                                    required
                                    value={values.numberformat}
                                    onChange={handleChange}
                                    name="numberformat"
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </Col>
                        </Row>
                            </> : <Row>
                            <Col className="col-3">
                                <Label>연봉</Label>
                            </Col>
                            <Col className="col-9">
                                <TextField
                                    required
                                    value={values.numberformat}
                                    onChange={handleChange}
                                    name="numberformat"
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </Col>
                        </Row>}
                    </div>
                    <div className="modal-footer">
                        <Button type="submit" className="m-3"
                                loading={submitting} appearance="primary" size="lg"
                                onClick={handleSubmit}
                        >
                            업로드
                        </Button>
                    </div>
                </Form>
            </Modal>
        )
    };
    return (
        <>
            <style jsx>{`
.rs-picker-menu{
    z-index:1070
}
`}</style>
            {renderModal()}
                <Link to={'#'}
                      onClick={() => {
                          toggleModal()
                      }}
                >{btnLabel}</Link>

        </>
    )
}

export default Contract;
