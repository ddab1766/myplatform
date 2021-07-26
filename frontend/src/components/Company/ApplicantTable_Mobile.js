import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {apiUrls} from "../../constants/urls";
import LoaderSpinner from "../Etc/LoaderSpinner";
import moment from "moment";
import store from "../../store";
import {
    Dropdown, FlexboxGrid, Icon, IconButton, List,
    Panel, PanelGroup, Popover, Whisper, CheckboxGroup, Checkbox, Button, SelectPicker, Alert,Tag
} from "rsuite";
import {initialize} from "redux-form";
import defaultClient from "../../utils/defaultClient";
import Link from "react-router-dom/Link";
import history from "../../utils/historyUtils";
import {birthFormat, phoneFormat,fileViewerUrl} from "../../function/common";
import ReactBSAlert from "react-bootstrap-sweetalert";
import useStore from "../Manager/Sugub/useStore";
const Menu = ({ onSelect,item }) => (
    <Dropdown.Menu onSelect={onSelect} >
        <Dropdown.Item eventKey={1}>가견적 정보</Dropdown.Item>
        <Dropdown.Item eventKey={2}>담당자 정보</Dropdown.Item>
        <Dropdown.Item eventKey={3}>채팅문의</Dropdown.Item>
    </Dropdown.Menu>
);

const MenuPopover = ({ onSelect, item, ...rest }) => (
    <Popover {...rest} full>
        <Menu onSelect={onSelect} item={item} />
    </Popover>
);

let tableBody;

const CustomWhisper = ({item,sugub,children,toggleReload,handleClickJobAp}) => {
    const [esAlert, setEsAlert] = useState(false);
    const [inAlert, setInAlert] = useState(false);

    const handleSelectMenu = (eventKey, event) => {
        if(eventKey === 1){ //가견적 정보
            setEsAlert(true);
        } else if(eventKey === 2){ //담당자 정보
            setInAlert(true);
        } else if(eventKey === 3){ //채팅문의
            history.push({
                pathname: `/Company/Chat/${item.user.id}/${sugub.id}`,
                state: {
                    receiver: item.user,
                    sugub: sugub,
                    chat: {participants: [], is_end: false}
                }
            })
        }
        // this.trigger.hide();
    }
    return (
        <>
            {inAlert && <ReactBSAlert title="담당자 정보"
                                      onConfirm={() => setInAlert(false)}
                                      confirmBtnText="닫기"
            >
                <div>{item.user.phone !== null && phoneFormat(item.user.phone)}</div>
                <div>{item.user.email}</div>
            </ReactBSAlert>}

            {esAlert && <ReactBSAlert title="가견적 정보"
                                      onConfirm={() => setEsAlert(false)}
                                      confirmBtnText="닫기"
            >
                {item.estimate_file.length > 0 ? item.estimate_file.map(file=>{
                    return (
                        <div>가견적 파일 :
                            {/*{file.estimate_filename} {' '}*/}
                            <a href={file.estimate_file} target="_blank"><Icon icon="file-download"  size="lg"/>다운로드</a>{' / '}
                            <Link to={{
                                pathname: `${fileViewerUrl(file.estimate_file)}`,
                            }} target="_blank">보기</Link>
                            {}<br/>
                        </div>
                    )
                }) : <div >
                    미업로드
                    {/*{file.estimate_filename} {' '}*/}
                    {/*<span><Icon icon="file-download"  size="lg"/>다운로드</span>{' / '}*/}
                    {/*    <span>보기</span>*/}
                    {/*{}<br/>*/}
                </div>
                }
                <div>코멘트 : <span>{item.comments}</span></div>
            </ReactBSAlert>}
            <Whisper
                placement="bottomEnd"
                trigger="click"
                // triggerRef={ref => {
                //     this.trigger = ref;
                // }}
                container={() => {
                    return tableBody;
                }}
                speaker={<MenuPopover onSelect={handleSelectMenu} item={item}/>}
            >
                {children}
            </Whisper>
        </>
    );
}

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '67px'
};
const styleStart = {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    // height: '67px'
};
const styleLeft = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    height: '67px'
};
const styleRight = {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '67px'
};
const slimText = {
    fontSize: '0.666em',
    color: '#97969B',
    fontWeight: 'lighter',
    paddingBottom: 5
};

const titleStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontWeight: 300
};
const styleHeader = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    flexDirection: 'column',
    height:'46px',
}
const ApplicantTable = props => {
    const {applicant,step,setJobap,jobap,sugub} = props;
    const [indet, setIndet] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [value, setValue] = useState([]);
    const [checkedValue, setCheckedValue] = useState([]);
    //체크박스 id
    var options = [];
    const chkboxOptions = applicant.map(v=> v.jobap.map(v=> options.push(v.id)))
    console.log(options)
    useEffect(() => {

        setValue([]);
        setCheckAll(false);
        // setCheckedValue([]);

    },[step])

    const handleCheckAll = (value, checked) => {
        const nextValue = checked ? options : [];
        setCheckAll(checked);
        setValue(nextValue);
        setIndet(false);
        setCheckedValue(nextValue)
    }
    const handleCheckBoxChange = (value) => { //value에 체크된 값 모두 들어가잇음
        console.log(value)
        setIndet(value.length > 0 && value.length < options.length)
        setCheckAll(value.length === options.length);
        setValue();
        setCheckedValue(value)
    }
    const onSelect = (key) => {
        var status_code = ''
        if(key === 0){
            status_code = 'BW0200000'
        } else if(key === 1){
            status_code = 'BW0301000'
        } else if(key === 2){
            status_code = 'BW0302000'
        } else if(key === 3){
            status_code = 'BW0401000'
        } else if(key === 4){
            status_code = 'BW0402000'
        } else if(key === 5){
            status_code = 'BW0801000'
        }
        async function showMessages() {
            var test = jobap;
            const messages = await Promise.all(
                checkedValue.map(value=>{
                    // 지원자상태변경
                    return defaultClient
                        .patch(apiUrls.JOB_APPLICANT + value + '/', {
                            applied_status: status_code
                        }, {
                            headers: {
                                authorization: 'Token ' + store.getState().auth.token
                            },
                        })
                        .then(({data}) => {
                            // window.notify.onChange('선택한 이력서의 상태가 변경되었습니다.');
                            test = test.map(v =>
                                v.id === data.id
                                    ? {
                                        ...v,
                                        applied_status:data.applied_status
                                    } : v
                            );
                        }).catch(error => console.log(error.response.data));
                })

            );
            setJobap(test);
            setValue([]);
            setCheckAll(false);
            Alert.success('선택한 이력서의 상태가 변경되었습니다.')
        }
        if(checkedValue.length < 1){
            alert('지원자를 선택해 주세요!')
        } else {
            if (window.confirm("지원자 상태를 변경하시겠습니까?")) {
                showMessages();
            }
        }
    }
    console.log(value)
    const renderList = (item, index) =>{
        return (<>
            <List.Item index={index} style={{borderBottom:'lightgray',borderTop:'none'}}>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={3} style={{ ...styleHeader}}>
                        <IconButton appearance="subtle" onClick={()=>{
                            document.querySelector('.list'+item.hrprofile.id).classList.toggle('show')}
                        }
                                    icon={<Icon icon="angle-down" />} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                        colspan={5}
                        style={{
                            ...styleHeader,
                        }}
                        onClick={()=>{
                            document.querySelector('.list'+item.hrprofile.id).classList.toggle('show')}
                        }
                    >
                        <div style={slimText}>지원 기업</div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                        colspan={14}
                        style={{
                            ...styleHeader,
                        }}
                        onClick={()=>{
                            document.querySelector('.list'+item.hrprofile.id).classList.toggle('show')}
                        }
                    >
                        <div style={{...titleStyle,fontSize:"15px"}}>{item.hrprofile.custname}</div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                        colspan={2}
                        style={{
                            ...styleHeader,
                        }}
                    >
                        <CustomWhisper item={item} sugub={sugub}>
                            <IconButton appearance="subtle" icon={<Icon icon="ellipsis-h" size="lg" />} />
                        </CustomWhisper>
                    </FlexboxGrid.Item>
                    {/*<FlexboxGrid.Item colspan={4} style={{*/}
                    {/*    ...styleCenter,*/}
                    {/*    flexDirection: 'column',*/}
                    {/*    alignItems: 'flex-start',*/}
                    {/*    overflow: 'hidden'*/}
                    {/*}}>*/}
                    {/*    <div style={slimText}>예상견적서</div>*/}
                    {/*    {item.estimate_file.length > 0 ? item.estimate_file.map(file=>{*/}
                    {/*        return (*/}
                    {/*            <div style={titleStyle}>*/}
                    {/*                /!*{file.estimate_filename} {' '}*!/*/}
                    {/*                <a href={file.estimate_file} target="_blank"><Icon icon="file-download"  size="lg"/>다운로드</a>{' / '}*/}
                    {/*                <Link to={{*/}
                    {/*                    pathname: `${fileViewerUrl(file.estimate_file)}`,*/}
                    {/*                }} target="_blank">보기</Link>*/}
                    {/*                {}<br/>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    }) : <div style={titleStyle}>*/}
                    {/*        미업로드*/}
                    {/*        /!*{file.estimate_filename} {' '}*!/*/}
                    {/*        /!*<span><Icon icon="file-download"  size="lg"/>다운로드</span>{' / '}*!/*/}
                    {/*        /!*    <span>보기</span>*!/*/}
                    {/*        /!*{}<br/>*!/*/}
                    {/*    </div>*/}
                    {/*    }*/}
                    {/*</FlexboxGrid.Item>*/}
                    {/*<FlexboxGrid.Item colspan={6} style={{*/}
                    {/*    flexDirection: 'column',*/}
                    {/*    height: '67px',*/}
                    {/*    overflow: 'hidden',*/}
                    {/*    display: 'flex',*/}
                    {/*    justifyContent: 'center'*/}
                    {/*}}>*/}
                    {/*    <div style={slimText}>코멘트</div>*/}
                    {/*    <div style={{...titleStyle,overflowWrap: 'break-word',whiteSpace: 'none',paddingRight:'5px'}}>{item.comments}</div>*/}
                    {/*</FlexboxGrid.Item>*/}
                    {/*<FlexboxGrid.Item*/}
                    {/*    colspan={3}*/}
                    {/*    style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>*/}
                    {/*    <div style={slimText}>담당자 이메일</div>*/}
                    {/*    <div style={titleStyle}>{item.user.email}</div>*/}
                    {/*</FlexboxGrid.Item>*/}
                    {/*<FlexboxGrid.Item*/}
                    {/*    colspan={3}*/}
                    {/*    style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>*/}
                    {/*    <div style={slimText}>담당자 연락처</div>*/}
                    {/*    <div style={titleStyle}>{item.user.phone !== null && phoneFormat(item.user.phone)}</div>*/}
                    {/*</FlexboxGrid.Item>*/}
                    {/*<FlexboxGrid.Item*/}
                    {/*    colspan={3}*/}
                    {/*    style={{*/}
                    {/*        ...styleCenter*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Button color="blue" onClick={()=>history.push({*/}
                    {/*        pathname: `/Company/Chat/${item.user.id}/${sugub.id}`,*/}
                    {/*        state: {*/}
                    {/*            receiver: item.user,*/}
                    {/*            sugub: sugub,*/}
                    {/*            chat: {participants: [], is_end: false}*/}
                    {/*        }*/}
                    {/*    })}>*/}
                    {/*        채팅문의*/}
                    {/*    </Button>*/}
                    {/*</FlexboxGrid.Item>*/}
                </FlexboxGrid>
            </List.Item>
        </>)
    }
    return (
        <>
            <style jsx>{`
            .estimateHeader{
                overflow:unset;
            }
            .estimateHeader .rs-panel-heading{
                padding : 0px 10px 0px 10px;
                font-size:14px;
                // border-top: 1px solid lightgray;
            }
            .estimateHeader .rs-panel-heading .rs-list-item-md{
                padding-top: 0;
                padding-bottom: 0;
            }
            .estimateHeader .rs-panel-body{
                padding : 0px !important;
            }
            .rslist{
                overflow:unset;
            }
            .rslist .show{
                display:'';
            }
            `}</style>
            {applicant ? (
                <>
                    <FlexboxGrid justify="space-between">
                        <FlexboxGrid.Item
                            colspan={12}
                            style={{
                                ...styleLeft,
                                flexDirection: 'column',
                            }}>
                            <Checkbox
                                indeterminate={indet}
                                checked={checkAll}
                                onChange={handleCheckAll}>
                                전체선택
                            </Checkbox>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item
                            colspan={12}
                            style={{
                                ...styleRight,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }}>
                            <Dropdown  renderTitle={children => {
                                return <Button color="orange" size="xs"  appearance="ghost"
                                               disabled={checkedValue.length < 1}>
                                    <Icon icon="check" />{children} &nbsp;<Icon icon="angle-down" />
                                </Button>;
                            }}
                                       placement="bottomEnd" title="지원자 상태 변경" onSelect={onSelect} >
                                {/*<Dropdown.Item eventKey={0} disabled={step !== 0 && true}>인사전형진행중</Dropdown.Item>*/}
                                {/*<Dropdown.Item eventKey={1} disabled={step !== 1 && true}>서류합격</Dropdown.Item>*/}
                                {/*<Dropdown.Item eventKey={2} disabled={step !== 1 && true}>서류불합격</Dropdown.Item>*/}
                                {/*<Dropdown.Item eventKey={3} disabled={step !== 2 && true}>면접합격</Dropdown.Item>*/}
                                {/*<Dropdown.Item eventKey={4} disabled={step !== 2 && true}>면접불합격</Dropdown.Item>*/}
                                {/*<Dropdown.Item eventKey={5} disabled={step !== 3 && true}>최종합격</Dropdown.Item>*/}

                                <Dropdown.Item eventKey={0}>인사전형진행중</Dropdown.Item>
                                <Dropdown.Item eventKey={1}>서류합격</Dropdown.Item>
                                <Dropdown.Item eventKey={2}>서류불합격</Dropdown.Item>
                                <Dropdown.Item eventKey={3} >면접합격</Dropdown.Item>
                                <Dropdown.Item eventKey={4} >면접불합격</Dropdown.Item>
                                <Dropdown.Item eventKey={5} >최종합격</Dropdown.Item>
                            </Dropdown>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <List hover style={{borderTop: 'none',
                        boxShadow: 'none',
                        overflow:'unset',
                        borderBottom: '1px solid lightgray'}}>
                        <CheckboxGroup
                            inline
                            name="checkboxList"
                            value={value}
                            onChange={handleCheckBoxChange}
                        >
                            {applicant.map((item, index) => (
                                <Panel header={renderList(item,index)}
                                       className={"estimateHeader estimateHeader"+item.hrprofile.id} defaultExpanded>
                                    <List hover className={'rslist list' + item.hrprofile.id} style={{display:'none'}}>
                                        {item.jobap.map((item, index) => (
                                            <List.Item key={item.id} index={index} style={{borderBottom:'1px solid lightgray'}}>
                                                <FlexboxGrid justify="start" align="middle">
                                                    <FlexboxGrid.Item
                                                        colspan={3}
                                                        style={{
                                                            ...styleStart,
                                                        }}
                                                    >
                                                        <Checkbox value={item.id} data-name={item.applied_username} ></Checkbox>
                                                    </FlexboxGrid.Item>
                                                    <FlexboxGrid.Item
                                                        colspan={6}
                                                        style={{
                                                            ...styleStart,
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start',
                                                        }}
                                                    >
                                                        {/*<div style={slimText}>지원자</div>*/}
                                                        <div style={titleStyle}><Icon icon="user-circle-o" />
                                                            {item.applied_username}
                                                        </div>
                                                    </FlexboxGrid.Item>
                                                    <FlexboxGrid.Item
                                                        colspan={7}
                                                        style={{...styleRight,height:'auto'}}>
                                                        <div style={slimText}>접수일시 </div>
                                                    </FlexboxGrid.Item>
                                                    <FlexboxGrid.Item
                                                        colspan={8}
                                                        style={{...styleRight,height:'auto'}}>
                                                        <div style={titleStyle}>{moment(item.applied_at).format('YYYY-MM-DD HH:mm')}</div>
                                                    </FlexboxGrid.Item>

                                                </FlexboxGrid>
                                                <FlexboxGrid  justify="end">
                                                    <FlexboxGrid.Item colspan={8} style={{...styleCenter,height:'auto'}}>
                                                        {item.applied_status.code_name.indexOf('불') !== -1 ?
                                                            <Tag color="red">{item.applied_status.code_name}</Tag> :
                                                            item.applied_status.code_id === 'BW0301000' || item.applied_status.code_id === 'BW0401000' ?
                                                                <Tag color="green">{item.applied_status.code_name}</Tag> :
                                                                <Tag color="green">{item.applied_status.code_name}</Tag>}
                                                        {/*{'['}&nbsp;*/}
                                                        {/*<div style={item.applied_status.code_name.indexOf('불') !== -1 ? ({color:'red'}) :*/}
                                                        {/*    ({color:'#4caf50'})}>*/}
                                                        {/*    {item.applied_status.code_name}</div>&nbsp;{']'}*/}
                                                    </FlexboxGrid.Item>
                                                    <FlexboxGrid.Item
                                                        colspan={15}
                                                        style={{...styleRight,height:'auto'}}>
                                                        <Dropdown title={<><Icon icon="file" />이력서</>} placement="bottomEnd" size="xs">
                                                            <Dropdown.Item >
                                                                <Link to={{
                                                                    pathname: `${fileViewerUrl(item.resume_pdf)}`,
                                                                }} target="_blank" style={{color:'#2c2c2c'}}><Icon icon="eye"/>&nbsp;보기</Link>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item >
                                                                <a href={item.resume_pdf} target="_blank" style={{color:'#2c2c2c'}}>
                                                                    <Icon icon="file-download" />&nbsp;다운로드</a>
                                                            </Dropdown.Item>
                                                        </Dropdown>
                                                    </FlexboxGrid.Item>
                                                    {step === 3 &&
                                                    <>
                                                        <FlexboxGrid.Item colspan={7}
                                                                          style={{...styleRight,height:'auto'}}>
                                                            <div style={{...slimText,color:'red'}}>면접일정</div>
                                                        </FlexboxGrid.Item>
                                                        <FlexboxGrid.Item
                                                            colspan={8}
                                                            style={{...styleRight,height:'auto'}}>
                                                            <div style={titleStyle}>{item.interview_jobapp.length > 0 ? (moment(item.interview_jobapp[item.interview_jobapp.length-1].interview_dt).format('YYYY-MM-DD HH:mm'))
                                                                : ("미등록")}</div>
                                                        </FlexboxGrid.Item>
                                                    </>
                                                    }

                                                </FlexboxGrid>
                                            </List.Item>
                                        ))}
                                    </List>
                                </Panel>
                            ))}
                        </CheckboxGroup>
                    </List>
                </>
            ): (<LoaderSpinner/>)}
        </>
    )
}

function mapStateToProps(state) {
    return {
        comcode:state.comcode.comcode,
    }
}

export default connect(mapStateToProps)(ApplicantTable);
