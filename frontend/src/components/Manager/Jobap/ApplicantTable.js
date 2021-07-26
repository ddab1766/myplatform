import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";
import {apiUrls} from "../../../constants/urls";
import LoaderSpinner from "../../Etc/LoaderSpinner";
import moment from "moment";
import store from "../../../store";
import {
    Dropdown, FlexboxGrid, Icon, IconButton, List,
    Panel, PanelGroup, Popover, Whisper, CheckboxGroup, Checkbox, Button, SelectPicker, Tooltip
} from "rsuite";
import {initialize} from "redux-form";
import {birthFormat, fileViewerUrl, phoneFormat} from "../../../function/common";
import InterviewScheduleModal from "./InterviewScheduleModal";

const Menu = ({ onSelect,item }) => (
    <Dropdown.Menu onSelect={onSelect} >
        <Dropdown.Item eventKey={1}>이력서 보기</Dropdown.Item>
        <Dropdown.Item eventKey={2}>이력서 다운로드</Dropdown.Item>
        {/*{item.applied_status.code_id === "BW0100000" && <Dropdown.Item eventKey={3}>접수취소</Dropdown.Item>}*/}
    </Dropdown.Menu>
);

const MenuPopover = ({ onSelect, item, ...rest }) => (
    <Popover {...rest} full>
        <Menu onSelect={onSelect} item={item} />
    </Popover>
);

let tableBody;

class CustomWhisper extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectMenu = this.handleSelectMenu.bind(this);
    }
    //각 버튼 이벤트
    handleSelectMenu(eventKey, event) {
        if(eventKey === 1){ //이력서 보기
            window.open(`${fileViewerUrl(this.props.item.resume_pdf)}`,"_blank")
        } else if(eventKey === 2){ //이력서 다운로드
            window.open(this.props.item.resume_pdf,"_blank")
        } else if(eventKey === 3){ //접수취소
            // handleCancle(this.props.item,this.props.toggleReload,this.props.handleClickJobAp)
        }
        this.trigger.hide();
    }
    render() {
        return (
            <Whisper
                placement="bottomEnd"
                trigger="click"
                triggerRef={ref => {
                    this.trigger = ref;
                }}
                container={() => {
                    return tableBody;
                }}
                speaker={<MenuPopover onSelect={this.handleSelectMenu} item={this.props.item}/>}
            >
                {this.props.children}
            </Whisper>
        );
    }
}

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px'
};
const styleLeft = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    height: '67px'
};
const styleRight = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'right',
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

const ApplicantTable = props => {
    const {jobap,step} = props;
    const [indet, setIndet] = useState(true);
    const [value, setValue] = useState([]);


    return (
        <>

            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item colspan={3} style={{...styleCenter}}><div tyle={slimText}>상태</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>지원자</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={3} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>접수일시</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>생년월일</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={3} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>연락처</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={3} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>면접일정</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>이력서</div></FlexboxGrid.Item>
                {/*<FlexboxGrid.Item colspan={1} style={{...styleCenter,flexDirection: 'column',*/}
                {/*    alignItems: 'flex-start',*/}
                {/*    overflow: 'hidden'}}><div tyle={slimText}></div></FlexboxGrid.Item>*/}


            </FlexboxGrid>
            <List hover>
                {jobap.map((item, index) => (
                    <List.Item key={item.id} index={index} style={{padding:0}}>
                        <FlexboxGrid justify="space-between">

                            <FlexboxGrid.Item colspan={3} style={styleCenter}>
                                <div style={item.applied_status.code_name.indexOf('불') !== -1 ? ({color:'red'}) :
                                    (item.applied_status.code_id === 'BW0301000' || item.applied_status.code_id === 'BW0401000' ?
                                        ({color:'#0a5dc2'}) : ({color:'black'}))}>
                                    {item.applied_status.code_name}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{
                                    ...styleCenter,
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    overflow: 'hidden'
                                }}
                            >
                                {/*<div style={slimText}>지원자</div>*/}
                                <div style={titleStyle}><Icon icon="user-circle-o" />
                                    {item.applied_username}
                                </div>

                            </FlexboxGrid.Item>

                            <FlexboxGrid.Item
                                colspan={3}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>접수일시</div>*/}
                                <div style={titleStyle}>{item.applied_at}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>생년월일</div>*/}
                                <div style={titleStyle}>{birthFormat(item.applied_birth)}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={3}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>연락처</div>*/}
                                <div style={titleStyle}>{phoneFormat(item.applied_phone)}</div>
                            </FlexboxGrid.Item>

                            <FlexboxGrid.Item colspan={3} style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={{...slimText,color:'red'}}>면접일정</div>*/}
                                {item.applied_status.code_id !== "BW0801000" ?
                                    item.interview_jobapp.length > 0 ?
                                        (<><div style={titleStyle} >{(moment(item.interview_jobapp[item.interview_jobapp.length-1].interview_dt).format('YYYY-MM-DD HH:mm'))}</div>
                                            {/*<div style={slimText} onClick={handleChangeInterview}>면접일 변경</div>*/}
                                            <InterviewScheduleModal data={item.interview_jobapp[item.interview_jobapp.length-1]}/>
                                        </>)

                                        : (<div style={titleStyle}>미등록</div>)
                                    : (<div style={titleStyle}>-</div>)
                                }
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>이력서</div>*/}
                                <div style={titleStyle}>
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>
                                        바로보기
                                    </Tooltip>}>
                                        <Icon onClick={()=> window.open(`${fileViewerUrl(item.resume_pdf)}`,"_blank")}
                                              icon="web" style={{cursor:'pointer'}}/>
                                    </Whisper>
                                    {' / '}
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>
                                        다운로드
                                    </Tooltip>}>
                                        <Icon onClick={()=>window.open(item.resume_pdf,"_blank")} icon="download2" style={{cursor:'pointer'}}/>
                                    </Whisper>
                                </div>
                            </FlexboxGrid.Item>
                            {/*<FlexboxGrid.Item*/}
                            {/*    colspan={1}*/}
                            {/*    style={{*/}
                            {/*        ...styleCenter,*/}
                            {/*        flexDirection: 'column',*/}
                            {/*        alignItems: 'flex-end',*/}
                            {/*        overflow: 'hidden'*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <CustomWhisper item={item} >*/}
                            {/*        <IconButton appearance="subtle" icon={<Icon icon="ellipsis-h" size="lg" />} />*/}
                            {/*    </CustomWhisper>*/}
                            {/*</FlexboxGrid.Item>*/}
                        </FlexboxGrid>
                    </List.Item>
                ))}
            </List>
        </>
    )
}

function mapStateToProps(state) {
    return {
        comcode:state.comcode.comcode,
    }
}

export default connect(mapStateToProps)(ApplicantTable);
