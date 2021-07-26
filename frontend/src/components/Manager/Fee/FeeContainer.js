import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {
    Checkbox,
    CheckboxGroup,
    Dropdown,
    FlexboxGrid,
    Icon,
    IconButton,
    List,
    Loader,
    Panel,
    Popover,
    Whisper
} from "rsuite";
import {birthFormat, fileViewerUrl, phoneFormat, thousands} from "../../../function/common";
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
const EmployeeList = (props) => {
    const {employees,loading,handleReload,tabValue} = props

    return (
        <>
            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>이름</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>생년월일</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>연락처</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={1} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>채용건</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>채용형태</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={3} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>기업명</div></FlexboxGrid.Item>
                {tabValue === 0 ? <>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>계약시작</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>계약종료</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>계약기간</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>직접비</div></FlexboxGrid.Item>
                    </>
                    :
                    <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>연봉</div></FlexboxGrid.Item>
                    }
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>수수료</div></FlexboxGrid.Item>
                {/*<FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',*/}
                {/*        alignItems: 'flex-start',*/}
                {/*        overflow: 'hidden'}}><div tyle={slimText}></div></FlexboxGrid.Item>*/}


            </FlexboxGrid>
            <List hover>
                {employees.map((item, index) => (
                    <List.Item key={item.id} index={index} style={{padding:0}}>
                        <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{
                                    ...styleCenter,
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    overflow: 'hidden'
                                }}
                            >
                                {/*<div style={slimText}>이름</div>*/}
                                <div style={titleStyle}>
                                    {item.contract.employee.emp_name}
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>생년월일</div>*/}
                                <div style={titleStyle}>{birthFormat(item.contract.employee.emp_birth)}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>연락처</div>*/}
                                <div style={titleStyle}>{phoneFormat(item.contract.employee.emp_phone)}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={1}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>채용건</div>*/}
                                <div style={titleStyle}>
                                    <Link to={`sugub/${item.contract.sugub}`} target='_blank'>보기</Link>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>채용형태</div>*/}
                                <div style={titleStyle}>
                                    {item.contract.chae_cd.code_name}
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={3}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>기업명</div>*/}
                                <div style={titleStyle}>{item.contract.companyprofile.custname}</div>
                            </FlexboxGrid.Item>
{tabValue === 0 && <>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>계약시작</div>*/}
                                <div style={titleStyle}>{item.contract.contract_from}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>계약종료</div>*/}
                                <div style={titleStyle}>{item.contract.contract_to}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>계약기간</div>*/}
                                <div style={titleStyle}>{item.contract.contract_gigan}개월</div>
                            </FlexboxGrid.Item>
                            </>}
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>직접비</div>*/}
                                <div style={titleStyle}>{thousands(item.contract.direct_cost)}원</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>수수료</div>*/}
                                <div style={titleStyle}>{thousands(item.fee)}원</div>
                            </FlexboxGrid.Item>

                            {/*<FlexboxGrid.Item*/}
                            {/*    colspan={2}*/}
                            {/*    style={{*/}
                            {/*        ...styleCenter,*/}
                            {/*        flexDirection: 'column',*/}
                            {/*        alignItems: 'flex-end',*/}
                            {/*        overflow: 'hidden'*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <CustomWhisper item={item} handleReload={handleReload}>*/}
                            {/*        <IconButton appearance="subtle" icon={<Icon icon="ellipsis-h" size="lg" />} />*/}
                            {/*    </CustomWhisper>*/}
                            {/*</FlexboxGrid.Item>*/}

                        </FlexboxGrid>
                    </List.Item>
                ))}
            </List>
        </>
    )
};


function mapStateToProps(state) {
    return {
        // user: state.auth.user,
        // company: state.auth.company
    }
}

export default connect(mapStateToProps)(EmployeeList);