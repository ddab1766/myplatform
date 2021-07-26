import React, {useEffect, useState,useRef} from 'react'
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
    TagPicker, Dropdown, FlexboxGrid,ButtonGroup,Button,Navbar,Nav,Icon,SelectPicker,ButtonToolbar
} from 'rsuite';
import store from "../../../store";
import CardContent from "@material-ui/core/CardContent";
import SearchField from "react-search-field";
import {Col, Row} from "reactstrap";
import Chip from "@material-ui/core/Chip";
import Select from "react-select";
import styled from 'styled-components';
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
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                        <ControlLabel>{label} </ControlLabel>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                        <FormControl
                            name={name}
                            accepter={accepter}
                            errorMessage={error}
                            inline
                            onChange={v=>{test(name,v);}}
                        >{list}</FormControl>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </>

        );
    }
}
const slimText = {
    color: '#97969B',
    cursor: 'pointer',
};
const area0 = ["서울","인천","대전","광주","대구","울산","부산","경기","강원","충북","충남","전북","전남","경북","경남","제주"];
const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-top: 8px;
  padding: 10px;
  border: 1px solid salmon;
`
const Style_ul = styled.ul`
  display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
                
`;
const Style_li = styled.li`
  list-style: none;
    display: flex;
    margin: 0 5px 5px 0;
`;

const Label = styled.label`
    margin: 0;
      padding: 5px 15px;
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      border: solid 1px #DDD;
      background-color: #FFF;
      line-height: 140%;
      text-align: center;
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
      transition: border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out;
      cursor: pointer;
`
const Label1 = styled.label`
   margin: 0;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    border: solid 1px #DDD;
    background-color: #FFF;
    line-height: 28px;
    text-align: center;
    box-shadow: 0 0 0 rgb(255 255 255 / 0%);
    transition: border-color .15s ease-out, color .25s ease-out, background-color .15s ease-out, box-shadow .15s ease-out;
    cursor: pointer;
    border-radius: 24px;
    height: 30px;
    font-size: 14px;
`
const RadioInput = styled.input`
    width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
  &:checked + ${Label}{
        background-color: #4B9DEA;
      color: #FFF;
      box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
      border-color: #4B9DEA;
      z-index: 1;
  }
  &:checked + ${Label1}{
        background-color: #4B9DEA;
      color: #FFF;
      box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
      border-color: #4B9DEA;
      z-index: 1;
  }
`
const SugubEditForm = props => {
    const {filter,setFilter,paginate,loading} = props;
    const [comCode, setComcode] = useState([]);
    const [viewtype,setViewtype] = useState('all');
    const [career,setCareer] = useState(null);
    const [jikL, setJikL] = useState([]);
    const [jikM, setJikM] = useState([]);
    const [jikS, setJikS] = useState([]);
    const [onFilter, setOnFilter] = useState(false);
    const [value, setValue] = useState([])
    const [formValue, setFormValue] = useState([])
    const [filterToggle, setFilterToggle] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const formRef = useRef();
    useEffect(() => {
        setComcode(store.getState().comcode.comcode);

    }, [])
    const selectOptions = comCode.filter(v =>v.code_topidx === 'AA' && v.code_topcd === null).map((v,index) =>{
        return {'label': v.code_name, 'value': v.code_name, 'id' : v.code_id}
    });
    const areaOptions = area0.map((v,index) =>{
        return {'label': v, 'value': index}
    });

    const test = (nam,v) => {
        setFormValue({...formValue,[nam]:v});

    }
    const handleChange = (item) => {
        if(item !== null) {
            setJikM(comCode.filter(v => v.code_topcd === item.id).map((v, index) => {
                return {'label': v.code_name, 'value': v.code_name, 'id': v.code_id}
            }))
        } else {
            item = {'id':''};
        }
        test('sugub_jikjong_top', item.id)
    }
    const handleChange1 = (item) => {
        if(item !== null) {
            setJikS(comCode.filter(v=>v.code_topcd === item.id).map((v,index) =>{
                return {'label': v.code_name, 'value': v.code_name, 'id' : v.code_id}
            }))
        } else{
            item = {'id':''};
        }

        test('sugub_jikjong_mid',item.id)
    }
    const handleTextChange = (v) => {
        test('sugub_title',v)
    }
    const handleResetFilter = () => {

        setFilter({page : 1});
        paginate(1);
        setOnFilter(!onFilter)
        setCheckedItems([])
        setTimeout(()=> {
            setOnFilter(false)
        },500)
    }
    const handleOnFilter = () => {
        // setFilterToggle(!filterToggle)
        document.getElementById('filterBox').classList.toggle('show')
    }
    const handleCheckBox = (id,isChecked,name) => {
        if(checkedItems[name] === undefined){
            checkedItems[name] = []
        }
        if (isChecked) {
            checkedItems[name].push(id);
            setCheckedItems(checkedItems);
        } else if (!isChecked && checkedItems[name].indexOf(id) !== -1) {
            checkedItems[name].splice(checkedItems[name].indexOf(id),1);
            setCheckedItems(checkedItems);
        }
        console.log(checkedItems)
        test(name,checkedItems[name])
    }
    const handleSubmit = () => {
        handleOnFilter();
         setFormValue({...formValue,['page']:1});
        setFilter(formValue);
        paginate(1);
    }
    console.log('formValue',formValue)
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
                #filterBox .show {
                display:''
                }
                .filterBox{
                background: white;
                    margin-bottom: 30px;
                    margin-top: 30px;
                    border-color: #3498ff;
                    overflow: visible;
                }
                .filterBox .rs-panel-body{
                    padding: 15px 4px;
                }
            `}</style>
            <div style={{marginBottom:20}}>

                <br/>
                <Row>
                    <Col  className="col-md-4 col-auto">
                        <SearchField
                            placeholder="키워드를 입력해주세요"
                            onSearchClick={handleTextChange}
                            classNames="searchField"
                            style={{width:'200px'}}
                        />
                    </Col>
                    <Col className="col-md-8">
                        <div className="text-right">
                            {/*<Button appearance="primary" onClick={()=>setOnFilter(!onFilter)}><Icon icon="filter"/> 상세검색</Button>*/}
                            <Button appearance="primary" onClick={handleOnFilter}><Icon icon="filter"/> 상세검색</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            {!onFilter && <Panel className="filterBox" id="filterBox" bordered style={(loading || !filterToggle) ?
                {display:'none',} :
                {display:'',}}
            >
                <Form
                    // layout="inline"
                    //   onSubmit={handleSubmit}
                    // onChange={formValue => {
                    //     setFormValue( formValue );
                    // }}
                    // formValue={formValue}
                    //   ref={formRef}
                >

                    {/*<FormGroup controlId="radioList">*/}
                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>수급진행상태 </ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Style_ul onChange={(v)=>test('sugub_status', v.target.value)}>
                                <Style_li>
                                    <RadioInput type="radio" id="option11" name="radioList"
                                                value="CC0200000" />
                                    <Label1 htmlFor="option11">진행중</Label1>
                                </Style_li>
                                <Style_li>
                                    <RadioInput type="radio" id="option21" name="radioList" value="CC0300000" />
                                    <Label1 htmlFor="option21">종료</Label1>
                                </Style_li>
                            </Style_ul>
                        </FlexboxGrid.Item>

                    </FlexboxGrid>
                    {/*</FormGroup>*/}
                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>경력</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Style_ul onChange={(v)=>handleCheckBox(v.target.value, v.target.checked,"sugub_career_gb")}>
                                {comCode.filter(v => v.code_topidx === 'AB' && v.code_topcd === null).map(v => {
                                    return(
                                        <Style_li>
                                            <RadioInput type="checkbox" id={v.code_id} name="sugub_career_gb"
                                                        value={v.code_id}/>
                                            <Label htmlFor={v.code_id}>{v.code_name}</Label>
                                        </Style_li>
                                    )
                                })
                                }
                            </Style_ul>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    {/*<CheckField name="sugub_career_gb" data={comCode} label="경력"*/}
                    {/*            accepter={CheckboxGroup} topidx='AB' topcd={null} test={test}*/}
                    {/*            inline*/}
                    {/*/>*/}


                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>학력 </ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Style_ul onChange={(v)=>test('education_cd', v.target.value)}>
                                {comCode.filter(v => v.code_topidx === 'AO' && v.code_topcd === null).map(v => {
                                    return(
                                        <>
                                            <Style_li>
                                                <RadioInput type="radio" id={v.code_id} name="education_cd"
                                                            value={v.code_id} />
                                                <Label1 htmlFor={v.code_id}>{v.code_name}</Label1>
                                            </Style_li>
                                        </>)
                                })
                                }
                            </Style_ul>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    {/*<CheckField name="chae_cd" data={comCode} label="채용형태"*/}
                    {/*            accepter={CheckboxGroup} topidx='AC' topcd={null} test={test}*/}
                    {/*            inline*/}
                    {/*/>*/}

                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>채용형태</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Style_ul onChange={(v)=>handleCheckBox(v.target.value, v.target.checked,"chae_cd")}>
                                {comCode.filter(v => v.code_topidx === 'AC' && v.code_topcd === null).map(v => {
                                    return(
                                        <Style_li>
                                            <RadioInput type="checkbox" id={v.code_id} name="chae_cd"
                                                        value={v.code_id}/>
                                            <Label htmlFor={v.code_id}>{v.code_name}</Label>
                                        </Style_li>
                                    )
                                })
                                }
                            </Style_ul>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>직종</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Select
                                className="basic1-single"
                                classNamePrefix="select"
                                options={selectOptions}
                                placeholder="직종(대)"
                                isClearable={true}
                                onChange={(item) => handleChange(item)}
                            />
                            <Select
                                className="basic1-single"
                                classNamePrefix="select"
                                options={jikM}
                                placeholder="직종(중)"
                                isClearable={true}
                                onChange={(item) => handleChange1(item)}
                            />
                            {/*<SelectPicker*/}
                            {/*    data={selectOptions}*/}
                            {/*    searchable={false}*/}
                            {/*    style={{minWidth:150,width: "auto"}}*/}
                            {/*    cleanable={false}*/}
                            {/*    onSelect={(v, item) => handleChange(v, item)}*/}
                            {/*    size="sm"*/}
                            {/*    placeholder="직종(대)"*/}
                            {/*/>*/}
                            {/*<SelectPicker*/}
                            {/*    data={jikM}*/}
                            {/*    searchable={false}*/}
                            {/*    style={{minWidth:150,width: "auto"}}*/}
                            {/*    cleanable={false}*/}
                            {/*    onSelect={(v, item) => handleChange1(v, item)}*/}
                            {/*    size="sm"*/}
                            {/*    placeholder="직종(중)"*/}
                            {/*/>*/}

                        </FlexboxGrid.Item>

                    </FlexboxGrid>

                    <FlexboxGrid justify="start" style={{marginTop:5}}>

                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>지역(x)</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={8}>
                            <Select
                                className="basic1-single"
                                classNamePrefix="select"
                                // defaultValue={selectData[0]}
                                options={areaOptions}
                                placeholder="지역(x)"
                            />
                            {/*<TagPicker data={areaOptions} size="sm" style={{ minWidth:100,width:"auto",marginLeft:'9px' }}*/}
                            {/*           placeholder="선택"/>*/}
                        </FlexboxGrid.Item>

                    </FlexboxGrid>

                    <br/>
                    <ButtonToolbar style={{textAlign: 'center'}}>
                        <Button appearance="ghost" onClick={() => handleOnFilter()}>닫기</Button>
                        <Button appearance="ghost" onClick={() => handleResetFilter()}>초기화</Button>
                        <Button appearance="ghost" onClick={handleSubmit}>적용</Button>
                    </ButtonToolbar>
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
