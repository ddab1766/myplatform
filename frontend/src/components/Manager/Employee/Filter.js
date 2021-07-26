import React, {useEffect, useState} from 'react'
import {reduxForm, SubmissionError} from 'redux-form'
import {
    Checkbox,
    CheckboxGroup,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Panel,
    Radio,
    RadioGroup,
    TagPicker,
    Dropdown,
    FlexboxGrid,
    ButtonGroup,
    Button,
    Navbar,
    Nav,
    Icon,
    SelectPicker,
    DatePicker,
    Input,
    InputGroup
} from 'rsuite';
import store from "../../../store";
import CardContent from "@material-ui/core/CardContent";
import SearchField from "react-search-field";
import {Col, Row} from "reactstrap";
import moment from "moment";
import {appliedStatusCode} from "../../../function/common"

class CheckField extends React.PureComponent {
    render() {
        const { test,name, message, label, accepter, data, topidx, topcd, error, ...props } = this.props;
        const list = data.map((v,index) => {
            if (v.code_topidx === topidx && v.code_topcd === topcd) {
                return (
                    <Checkbox key={index} value={v.code_id}>{v.code_name}</Checkbox>
                )
            } else{
                return null;
            }
        }).filter(o => o);

        return (
            <>
                <FlexboxGrid justify="start">
                    <FlexboxGrid.Item colspan={3}>
                        <ControlLabel>{label} </ControlLabel>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={12}>
                        <FormControl
                            name={name}
                            accepter={accepter}
                            errorMessage={error}
                            inline
                            onChange={v=>test(name,v)}
                        >{list}</FormControl>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </>

        );
    }
}
const selectData =  [
    {
        "label": "이름",
        "value": "emp_name",
    },
    {
        "label": "연락처",
        "value": "emp_phone",
    },
    {
        "label": "채용건",
        "value": "sugub_title",
    },
    {
        "label": "기업명",
        "value": "company_name",
    },
]

const SugubEditForm = props => {
    const [comCode, setComcode] = useState([]);
    const [viewtype,setViewtype] = useState('all');
    const [career,setCareer] = useState(null);

    const [date1, setDate1] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    const [date2, setDate2] = useState(new Date());
    const [onFilter, setOnFilter] = useState(false);
    const {filter,setFilter,paginate} = props;
    const [searchText, setSearchText] = useState(null);
    const [searchType, setSearchType] = useState('emp_name');
    useEffect(() => {
        setComcode(store.getState().comcode.comcode);

    }, [])

    const test = (nam,v) => {
        setFilter({...filter,[nam]:v,page : 1})
        paginate(1)
    }

    const handleTextChange = () => {
        setFilter({...filter,
            ['emp_name']:'',
            ['emp_phone']:'',
            ['sugub_title']:'',
            ['company_name']:'',
            [searchType]:searchText,
            page : 1
        })
        paginate(1)
    }
    const handleDateFilter = () => {
        setFilter({...filter,['created_time_min']:moment(date1).format('YYYY-MM-DD'),
            ['created_time_max']:moment(new Date(new Date().setDate(date2.getDate()+1))).format('YYYY-MM-DD'),page : 1})
        paginate(1)
        // test('applied_at_min',moment(date1).format('YYYYMMDD'))
        // test('applied_at_max',moment(date2).format('YYYYMMDD'))
    }
    return (
        <>
            <style jsx>{`
                .rs-form-inline > *{
                margin-bottom: 0px;
                }
                .rs-dropdown-menu{
                width:100%;
                }
                .rs-dropdown{
                position:static;
                }
                .searchField { width: 100%; }
            `}</style>
            <div style={{marginBottom:20}}>

                <br/>
                <Row>
                    <Col  className="col-md-6 col-auto">
                        <DatePicker
                            onChange={v=>setDate1(v)}
                            format="YYYY-MM-DD"
                            oneTap
                            cleanable={false}
                            name="date1"
                            placeholder="날짜선택"
                            defaultValue={new Date(new Date().setMonth(new Date().getMonth() - 1))}
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
                        {' ~ '}
                        <DatePicker
                            onChange={v=>setDate2(v)}
                            format="YYYY-MM-DD"
                            oneTap
                            cleanable={false}
                            defaultValue={new Date()}
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
                        <Button appearance="primary" className="ml-2" onClick={handleDateFilter}>검색</Button>

                        <div style={{display: 'inline-block'}}>
                            <InputGroup style={{width:260,marginLeft:'9px'}}>
                                <SelectPicker data={selectData} style={{ width: 'auto' }}
                                              defaultValue={'emp_name'}
                                              onChange={(v)=>setSearchType(v)}
                                              cleanable={false}
                                              searchable={false}
                                />
                                <Input onChange={(v)=>setSearchText(v)}/>
                                <InputGroup.Button onClick={handleTextChange}>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                        </div>

                    </Col>
                    <Col className="col-md-6">
                        <div className="text-right">
                            <Button appearance="primary" onClick={()=>setOnFilter(!onFilter)}><Icon icon="filter"/> 상세검색</Button>
                        </div>
                    </Col>

                </Row>

            </div>

            {onFilter && <Panel  bordered  style={{background:'white',marginBottom:30,marginTop:30,borderColor:'#3498ff'}}>
                <Form layout="inline"
                    // onChange={formValue => {
                    //     setFormValue( formValue );
                    // }}
                    // formValue={formValue}
                >


                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item colspan={3}>
                            <ControlLabel>채용형태</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={12}>
                            <RadioGroup name="education_cd" inline defaultValue="all" onChange={(v)=>{test('chae_cd',v);}}>
                            {comCode.filter(v=>v.code_topidx === 'AC' && v.code_topcd === null).map(v=>{
                                return <Radio value={v.code_id}>{v.code_name}</Radio>
                            })
                            }
                        </RadioGroup>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>



                </Form>
            </Panel>}

        </>
    )
}
function mapStateToProps(state, props) {
    return {
        initialValues: state.common.data,

    }
}
// export default connect(mapStateToProps)(reduxForm({
//     form: 'SugubEditForm',
//     enableReinitialize: true,
//     // onSubmit:submitForm
// })(SugubEditForm))
export default reduxForm({
    form: 'SugubEditForm', // a unique identifier for this form
    enableReinitialize: true,
    onSubmitFail: (errors) => {
        document.getElementsByClassName('main-panel')[0].scrollTop=0;
    }
})(SugubEditForm)
