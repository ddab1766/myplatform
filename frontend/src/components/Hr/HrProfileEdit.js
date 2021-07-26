import React, {useEffect, useRef, useState} from "react";
import {change, Field, FieldArray, formValueSelector, initialize, reduxForm} from "redux-form";
import {
    renderAsyncCreatableSelectField,
    renderError,
    renderField,
    renderMultiSelectField, renderNumberField,
    renderTextAreaField
} from "../../utils/renderUtils";
import {updateHrProfile} from "../../actions/authActions";
import {connect, useSelector} from "react-redux";
import {Card, CardBody, CardHeader, Col, Container, FormText, Row, Spinner} from "reactstrap";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import store from "../../store";
import history from "utils/historyUtils";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import DaumPostcode from "../Etc/DaumPostcode_mng";
import Nothing from "../Common/Nothing";
import Chip from "@material-ui/core/Chip";
import {Checkbox} from "rsuite";
import {required} from "redux-form-validators";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const HrProfileEdit = (props) => {
    const {handleSubmit, error, submitting, initialValues} = props;
    const {service_address, company_logo, services, hrfee} = props;
    const {comcode, hr} = useSelector(state => ({
            comcode: state.comcode.comcode,
            hr: state.auth.hr
        })
    );

    const [value, setValue] = useState(0);
    const [previewURL, setPreviewURL] = useState(null);
    const [previewImageURL, setPreviewImageURL] = useState(null);
    const [addressOptions, setAddressOptions] = useState(comcode.filter(v=> v.code_topidx === 'BE'));
    const [addressData, setAddressData] = useState(initialValues ? initialValues.service_address : []);

    const [taxRange, setTaxRange] = useState([5, 7]);
    const [dogubTaxRange, setDogubTaxRange] = useState([5, 7]);

    const hrprofile_file = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.hrprofile_file : null
    );
    const company_logo_file = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.company_logo_file : null
    );
    const company_image = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.company_image : null
    );

    const handleTaxChange = (event, newValue) => {
        setTaxRange(newValue);
        props.change('hrfee_AC0100000[0].fee_start', newValue[0]);
        props.change('hrfee_AC0100000[0].fee_end', newValue[1]);
    };

    const handleDogubTaxChange = (event, newValue) => {
        setDogubTaxRange(newValue);
        props.change('hrfee_AC0200000[0].fee_start', newValue[0]);
        props.change('hrfee_AC0200000[0].fee_end', newValue[1]);
    };

    useEffect(()=>{
        if(addressData && addressData.length >= 0 ){
            props.change('service_address', addressData);
        }
    },[addressData])

    // tab value
    const handleChange = (event, newValue) => {
        const syncErrors = store.getState().form.hrupdate.syncErrors;
        if(syncErrors === undefined) {
            setValue(newValue);
        }else{
            alert('필수 입력사항을 입력해주세요!')
        }
    };

    const handleClick = (e, data, selected) => {
        // setLowData(service_address);
        if(selected){
            setAddressData(addressData.concat(data));
            e.currentTarget.classList.add('MuiChip-primary');
            e.currentTarget.classList.remove('MuiChip-outlined');
        }else{
            console.log('data?', data)
            setAddressData(addressData.filter(v => v.code_id !== data.code_id));
            e.currentTarget.classList.add('MuiChip-outlined');
            e.currentTarget.classList.remove('MuiChip-primary');
        }
        // props.change('service_address', lowData)
    };



    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>파트너 회사 정보를 업데이트 해주세요.<br/>
                        <small></small>
                    </h3>
                </div>
                <hr/>
                <form className=""
                      onSubmit={handleSubmit}
                >
                    <Card>

                        <CardHeader>
                            <Tabs value={value} onChange={handleChange} textColor="Primary" aria-label="simple tabs example" indicatorColor="primary">
                                <Tab label="기본정보" {...a11yProps(0)} />
                                <Tab label="회사소개" {...a11yProps(1)} />
                                <Tab label="서비스" {...a11yProps(2)} />
                                <Tab label="이미지" {...a11yProps(3)} />
                                <Tab label="첨부파일" {...a11yProps(4)} />
                            </Tabs>
                        </CardHeader>
                        {/* </AppBar> */}
                        <CardBody>
                            <TabPanel value={value} index={0}>
                                {/* EnterKey Prevent */}
                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="custname" label="회사명" component={renderAsyncCreatableSelectField}
                                                   type="text"
                                                   required={true}
                                                   disabled={initialValues && initialValues.custname ? true : false}
                                            />
                                            {initialValues && initialValues.custname && (
                                                <FormHelperText>회사명 수정은 admin@chaegong.co.kr 로 문의해주세요</FormHelperText>
                                            )}
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="custid" label="사업자번호" component={renderField}
                                                   type="text"
                                                   required={true}
                                                   disabled={initialValues && initialValues.custid ? true : false}
                                            />
                                            {initialValues && initialValues.custid && (
                                                <FormHelperText>사업자번호 수정은 admin@chaegong.co.kr 로 문의해주세요</FormHelperText>
                                            )}
                                        </fieldset>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="gross_total" label="매출액(억)/투자금액" component={renderField}
                                                   type="number"
                                                   required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="emp_count" label="임직원수(명)" component={renderField}
                                                   type="number"
                                                   required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>
                                {/*<Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="manager_email" label="담당자 이메일" component={renderField}
                                                   type="text"
                                                   required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="manager_phone" label="담당자 연락처" component={renderField}
                                                   type="text"
                                                   required={true}
                                                   placeholder={"ex) 010-0000-0000"}
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>*/}
                                {/*<fieldset className="form-group">*/}
                                {/*    <Field name="load_addr" label="본사 주소" component={renderField}*/}
                                {/*           type="text"*/}
                                {/*    />*/}
                                {/*</fieldset>*/}
                                <Row>
                                    <Col md={1}>
                                        <fieldset className="form-group">
                                            <Field
                                                name="load_addr_code"
                                                component={renderField}
                                                label=""
                                                type="text"
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col>
                                        <DaumPostcode formName="hrupdate" filed1="load_addr" filed2='load_addr_code' filed3='load_addr_detail'/>
                                    </Col>
                                </Row>
                                <fieldset className="form-group">
                                    <Field name="load_addr" label="주소" component={renderField}
                                           type="text"
                                           labelSize={3}
                                           colSize={9}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field name="load_addr_detail" label="상세주소" component={renderField}
                                           type="text"
                                           labelSize={3}
                                           colSize={9}
                                    />
                                </fieldset>



                                <fieldset className="form-group">
                                    <div style={{marginBottom: '10px',fontSize: '1.0em'}}>서비스 가능지역(중복가능)</div>
                                    <Checkbox onChange={(e, checked)=>{
                                        if(checked) setAddressData(comcode.filter(v=> v.code_topidx === 'BE'))
                                        else {
                                            setAddressData([])
                                        }
                                    }}
                                    > 전국
                                    </Checkbox>
                                    {addressOptions.map( data => {
                                        if(addressData && addressData.length > 0){
                                            if(addressData.filter(v=> v.code_id === data.code_id).length > 0){
                                                return (
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                        // onDelete={(e)=>console.log('e', e)}
                                                        // deleteIcon={<DoneIcon />}
                                                          onClick={(e) => {handleClick(e,data, false)}}
                                                          color="secondary"
                                                          variant="outlined"
                                                    />
                                                )
                                            }else{
                                                return (
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                          onClick={(e) => handleClick(e,data, true)}
                                                          variant="outlined"
                                                    />
                                                )
                                            }
                                        } else {
                                            return (
                                                <>
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                          onClick={(e) => handleClick(e,data,true)}
                                                          variant="outlined"
                                                    />
                                                </>
                                            )
                                        }
                                    })}
                                </fieldset>

                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="homepage" label="홈페이지" component={renderField}
                                                   type="text"
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="since" label="설립년도" component={renderField}
                                                   type="number"
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>
                                <hr/>
                                {renderError(error)}
                            </TabPanel>
                            <TabPanel index={1} value={value}>
                                <fieldset className="form-group">
                                    <Field name="introduce" label="회사소개" component={renderTextAreaField}
                                           type="text"
                                        // required={true}
                                    />
                                </fieldset>
                                <FormHelperText className="text-right">한글 기준 10,000자 미만</FormHelperText>
                                <fieldset className="form-group">
                                    <Field name="hr_bokri" label="복리후생" component={renderTextAreaField}
                                           type="text"
                                    />
                                </fieldset>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Col md={12}>
                                    <fieldset className="form-group">
                                        <Field name="services" label="제공서비스" component={renderMultiSelectField}
                                               code_topidx="AC"
                                               code_topcd={null}
                                               type="text"
                                               options={comcode}
                                               multi
                                        />
                                    </fieldset>
                                </Col>

                                { services && (
                                    <Col md={6}>
                                        {services.filter(v=>v.code_id ==='AC0100000').length > 0 && (
                                            <>

                                                <div style={{marginBottom: '10px',fontSize: '1.0em'}}>인재파견 서비스의 수수료는 어느정도인가요?</div>
                                                <FieldArray name={`hrfee_AC0100000`} component={renderServices1}
                                                            handleChange={handleTaxChange} taxRange={taxRange} setTaxRange={setTaxRange}/>
                                            </>
                                        )}
                                        {services.filter(v=>v.code_id ==='AC0200000').length > 0 && (
                                            <>
                                                <div style={{marginBottom: '10px',fontSize: '1.0em'}}>도급 서비스의 수수료는 어느정도인가요?</div>
                                                <FieldArray name="hrfee_AC0200000" component={renderServices1}
                                                            handleChange={handleDogubTaxChange} taxRange={dogubTaxRange} setTaxRange={setDogubTaxRange}/>
                                            </>
                                        )}
                                        {services.filter(v=>v.code_id ==='AC0300000').length > 0 && (
                                            <>
                                                <div style={{marginBottom: '10px',fontSize: '1.0em'}}>채용대행 서비스의 연봉 구간별 수수료는 어느정도인가요?</div>

                                                <FieldArray name="hrfee_AC0300000" component={renderServices} />
                                            </>
                                        )}
                                        {services.filter(v=>v.code_id ==='AC0400000').length > 0 && (
                                            <>
                                                <div style={{marginBottom: '10px',fontSize: '1.0em'}}>헤드헌팅 서비스의 연봉 구간별 수수료는 어느정도인가요?</div>
                                                <FieldArray name="hrfee_AC0400000" component={renderServices} />
                                            </>
                                        )}
                                    </Col>
                                )}
                                {renderError(error)}
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <>
                                    <Row>
                                        <Col className="col-md-4">
                                            <p>로고이미지(410x250)</p>

                                            {typeof company_logo === 'object' && company_logo !== null &&  (
                                                <div className="thumbnail img-circle">
                                                    <img src={previewURL} alt="..." style={{width:410, height:250}}/>
                                                </div>
                                            )}

                                            {hr && hr.company_logo !== null && !previewURL && (
                                                <div className="thumbnail img-circle">
                                                    <img src={hr.company_logo} alt="..." style={{width:410, height:250}}/>
                                                </div>
                                            )}

                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="company_logo"
                                                type="file"
                                                onChange={(event)=>{
                                                    event.preventDefault();
                                                    let reader = new FileReader();
                                                    let logofile = event.target.files[0];
                                                    reader.onloadend = () => setPreviewURL(reader.result);
                                                    reader.readAsDataURL(logofile);
                                                    props.change('company_logo', event.target.files[0]);
                                                }}
                                            />
                                            <label htmlFor="company_logo">
                                                <Button color="primary"
                                                        variant="outlined"
                                                        component="span"
                                                        type="submit"
                                                    // className={classes.button}
                                                >
                                                    파일선택
                                                </Button>
                                            </label>
                                        </Col>
                                    </Row>
                                </>
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <p>사업소개서 및 기타 첨부자료를 업로드해주세요</p>
                                {/* 새로 추가한 파일 */}
                                {hrprofile_file && (
                                    <a href='#' target="_blank">{hrprofile_file.name}<br/></a>
                                )}

                                <input
                                    // accept="image/*"
                                    style={{ display: 'none' }}
                                    id="hrfile"
                                    type="file"
                                    onChange={(event)=>{
                                        event.preventDefault();
                                        let reader = new FileReader();
                                        let file = event.target.files[0];
                                        reader.onloadend = () => setPreviewURL(reader.result);
                                        reader.readAsDataURL(file);
                                        props.change('hrprofile_file', event.target.files[0])
                                    }}
                                />
                                <label htmlFor="hrfile">
                                    <Button color="primary"
                                            variant="outlined"
                                            component="span"
                                            type="submit"
                                    >
                                        파일선택
                                    </Button>
                                </label>
                                <hr/>
                                <p >업로드된 파일</p>
                                {hr && hr.hrprofile_file ? (
                                    <FileList file={hr.hrprofile_file}/>
                                ) : <Nothing text={'업로드'}/>}
                            </TabPanel>
                        </CardBody>
                    </Card>
                    <hr/>
                    <div className={"text-center"}>
                        <button className="btn btn-lg btn-outline-info "
                                onClick={()=>history.push(`/Hr/Profile`)}
                                disabled={submitting}
                        >뒤로가기
                        </button>
                        <button action="submit" className="btn btn-lg btn-info" disabled={submitting}>
                            {submitting === true && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />)
                            } 수정
                        </button>
                    </div>
                </form>

            </Container>
        </div>
    )
};

const ImageList = ({file}) => {
    return file ? (
        <>
            {
                file.map( v =>{
                    return (
                        <img src={v.hr_image} alt="..." style={{width:410, height:250}}/>
                    )
                })
            }
        </>
    ) : (
        <ul>대표 사진이 없습니다.</ul>
    )
}

const FileList = ({file}) => {
    return file ? (
        <ul>
            {file.map( v =>{
                return (
                    <li>
                        <a className="nav-link"
                           href={v.hr_file}
                        >{v.hr_filename}
                        </a>
                    </li>
                )
            })
            }
        </ul>
    ) : (
        <ul>첨부자료가 없습니다.</ul>
    )
};

// 인재파견
const renderServices1 = ({ fields, taxRange, setTaxRange, handleChange, meta: { error, submitFailed } }) => {
    if(fields.length === 0) fields.push({});
    return (
        <>
            <div>
                {submitFailed && error && <span>{error}</span>}
            </div>
            {fields && fields.map((item, index) => (
                <div className="input-group" key={index}>
                    <Col md="3">
                        <fieldset className="form-group">
                            <Field name={`${item}.fee_start`} component={renderField}
                                   type="number"
                                   value={taxRange[0]}
                                   onChange={(e)=>{
                                       setTaxRange([e.target.value, taxRange[1]])
                                   }}
                                   validate={[required({message: "필수 입력사항입니다."})]}
                                   inputAddon={true}
                                   inputAddonText={'%'}
                            />
                        </fieldset>
                    </Col>
                    <Col md="6">
                        <Slider
                            value={taxRange}
                            max={20}
                            min={0}
                            step={0.1}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        />
                    </Col>
                    <Col md="3">
                        <fieldset className="form-group">
                            <Field name={`${item}.fee_end`} component={renderField}
                                   type="number"
                                   value={taxRange[1]}
                                   onChange={(e)=>{
                                       setTaxRange([taxRange[0], e.target.value])
                                   }}
                                   validate={[required({message: "필수 입력사항입니다."})]}
                                   inputAddon={true}
                                   inputAddonText={'%'}
                            />
                        </fieldset>
                    </Col>
                </div>
            ))}
        </>
    )
}


// 채용대행
const renderServices = ({ fields, meta: { error, submitFailed } }) => {
    if(fields.length === 0) fields.push({});
    return (
        <>
            <div>
                <FormText style={{fontSize: '1.0em'}}>
                    예시) 3,000만원 ~ 4,000만원 : 10%<br/>
                </FormText>
                {submitFailed && error && <span>{error}</span>}
            </div>
            <br/>
            <>
                {fields.map((item, index) => (
                    <div key={index}>

                        {/*<h6>구간 #{index + 1} {item}</h6>*/}
                        <div className="input-group">
                            <Col md="4">
                                <fieldset className="form-group">
                                    <Field name={`${item}.start`} component={renderNumberField}
                                           required={true}
                                           validate={[
                                               required({message: "필수 입력사항입니다."}),
                                           ]}
                                           inputAddonText={'만원'}
                                    />
                                </fieldset>
                            </Col>

                            <Col md="4">
                                <fieldset className="form-group">
                                    <Field name={`${item}.end`} component={renderNumberField}
                                           inputAddonText={'만원'}
                                           validate={[required({message: "필수 입력사항입니다."})]}
                                    />
                                </fieldset>
                            </Col>
                            <Col md="3">
                                <fieldset className="form-group">
                                    <Field name={`${item}.fee_start`} component={renderField}
                                           type={'number'}
                                           inputAddon={true}
                                           inputAddonText={'%'}
                                           validate={[required({message: "필수 입력사항입니다."})]}
                                    />
                                </fieldset>
                            </Col>
                            <Col md={"1"}>
                                {index >= 1 && (
                                    <IconButton aria-label="delete" >
                                        <DeleteIcon fontSize="small" onClick={()=>fields.remove(index)}/>
                                    </IconButton>
                                    /*<button
                                    className="btn"
                                    type="button"
                                    title="Remove"
                                    onClick={() => fields.remove(index)}
                                    >
                                        <i className="fa fa-trash"/>
                                    </button>*/
                                )}
                            </Col>

                        </div>
                    </div>

                ))}
            </>
            <button type="button" className="btn" onClick={() => fields.push()}>
                <i className="nc-icon nc-simple-add"/>
                구간추가
            </button>
        </>
    )
};



const validate = values => {
    const errors = {};
    // console.log('validate values', values)
    if (!values.custname) {
        errors.custname = '필수입력 사항입니다.'
    }
    if (!values.custid) {
        errors.custid = '필수입력 사항입니다.'
    }
    if (!values.gross_total) {
        errors.gross_total = '필수입력 사항입니다.'
    }

    if (!values.emp_count) {
        errors.emp_count = '필수입력 사항입니다.'
    } else if (isNaN(Number(values.emp_count))) {
        errors.emp_count = '숫자로 입력해주세요.'
    }

    if(!values.services){
        errors.services = '필수입력 사항입니다.'
    }
    // if (!values.manager_email) {
    //     errors.manager_email = '필수입력 사항입니다.'
    // }
    // if (!values.manager_phone) {
    //     errors.manager_phone = '필수입력 사항입니다.'
    // }
    // errors.
    // if(!values.homepage){
    //
    // }else if(values.homepage && !validator.isURL(values.homepage)){
    //     errors.homepage = '올바른 URL주소를 입력해주세요'
    // }

    return errors;
};


function mapStateToProps(state, props) {
    const selector = formValueSelector('hrupdate');
    const service_address = selector(state, 'service_address');
    const services = selector(state, 'services');
    const company_logo = selector(state, 'company_logo');
    const hrfee = selector(state, 'hrfee');
    let hrfee_AC0100000 = {};
    let hrfee_AC0200000 = {};
    let hrfee_AC0300000 = {};
    let hrfee_AC0400000 = {};
    if(hrfee){
        hrfee_AC0100000 = hrfee.map(item => {
            if(item.fee_gubun.code_id === 'AC0100000')
                return { 'fee_start': item.fee_start, 'fee_end': item.fee_end }
        }).filter(o=>o);
        hrfee_AC0200000 = hrfee.map(item => {
            if(item.fee_gubun.code_id === 'AC0200000') return { 'fee_start': item.fee_start, 'fee_end': item.fee_end }
        }).filter(o=>o)
        hrfee_AC0300000 = hrfee.map(item => {
            if(item.fee_gubun.code_id === 'AC0300000') return { 'start': item.start, 'end': item.end, 'fee_start': item.fee_start }
        }).filter(o=>o)
        hrfee_AC0400000 = hrfee.map(item => {
            if(item.fee_gubun.code_id === 'AC0400000') return { 'start': item.start, 'end': item.end, 'fee_start': item.fee_start }
        }).filter(o=>o)
    }

    if(state.auth.hr) {
        delete state.auth.hr.cmp_manager;
        return {
            initialValues: {
                ...state.auth.hr,
                hrfee_AC0100000: hrfee_AC0100000,
                hrfee_AC0200000: hrfee_AC0200000,
                hrfee_AC0300000: hrfee_AC0300000,
                hrfee_AC0400000: hrfee_AC0400000,
                custname: {
                    label: state.auth.hr.custname,
                    value: state.auth.hr.custname,
                },
            },
            hr: state.auth.hr,
            service_address: service_address,
            services: services,
            company_logo: company_logo,
            hrfee: hrfee
        }
    }

}

const afterSubmit = (result, dispatch) => {
    dispatch(initialize('hrupdate', {}));
    history.push("/Hr/Profile");
}

export default connect(mapStateToProps)(reduxForm({
    form: "hrupdate",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: updateHrProfile,
    onSubmitSuccess: afterSubmit,
})(HrProfileEdit));

