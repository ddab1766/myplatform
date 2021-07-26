import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Contract from "./Contract";
import {
    ButtonToolbar,
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
    Whisper,Button
} from "rsuite";
import {  Modal, ModalBody, ModalFooter, Label, Input, FormGroup, Form ,ModalHeader} from 'reactstrap';
import {birthFormat, fileViewerUrl, phoneFormat} from "../../../function/common";
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
    const {employees,loading,handleReload} = props
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState(null)
    const toggle = ()=> setModal(!modal)

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} >
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        type="button"
                        onClick={toggle}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                    <h5 className="modal-title text-center" id="applyModal" >계약정보</h5>
                </div>
                <ModalBody>
                    <dl>
                        <dt>계약서</dt>
                        <dd><Link to={item && fileViewerUrl(item.contract_file[0].contract_file)} target="_blank">
                            {item && item.contract_file[0].contract_filename}
                        </Link></dd>
                    </dl>
                    {item && item.chae_cd.code_id === "AC0100000" ?
                        <>
                            <dl>
                                <dt>계약기간</dt>
                                <dd>{`${item && item.contract_from} ~ ${item && item.contract_to}`}</dd>
                            </dl>
                            <dl>
                                <dt>직접비</dt>
                                <dd>{item && item.direct_cost}</dd>
                            </dl>
                        </> :
                        <>
                            <dl>
                                <dt>연봉</dt>
                                <dd>{item && item.direct_cost}</dd>
                            </dl>
                        </>
                    }
                </ModalBody>
                <ModalFooter>

                    <div style={{textAlign: 'center',padding:'5px'}}>
                        {/*<Button type="submit" className="m-3"*/}
                        {/*        appearance="primary" size="lg"> 수정</Button>*/}
                        <Button type="submit" onClick={toggle} className="m-3"
                                size="lg"> 취소</Button>
                    </div>
                </ModalFooter>
            </Modal>

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
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>합격일시</div></FlexboxGrid.Item>
                {/*<FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',*/}
                {/*    alignItems: 'flex-start',*/}
                {/*    overflow: 'hidden'}}><div tyle={slimText}>직접비</div></FlexboxGrid.Item>*/}
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>계약정보</div></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2} style={{...styleCenter,flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'}}><div tyle={slimText}>관리자 확인</div></FlexboxGrid.Item>
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
                                    {item.employee.emp_name}
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>생년월일</div>*/}
                                <div style={titleStyle}>{birthFormat(item.employee.emp_birth)}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>연락처</div>*/}
                                <div style={titleStyle}>{phoneFormat(item.employee.emp_phone)}</div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={1}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>채용건</div>*/}
                                <div style={titleStyle}>
                                    <Link to={`sugub/${item.sugub}`} target='_blank'>보기</Link>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>채용형태</div>*/}
                                <div style={titleStyle}>
                                    {item.chae_cd.code_name}
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={3}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>기업명</div>*/}
                                <div style={titleStyle}>{item.companyprofile.custname}</div>
                            </FlexboxGrid.Item>

                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>합격일시</div>*/}
                                <div style={titleStyle}>{item.created_time}</div>
                            </FlexboxGrid.Item>
                            {/*<FlexboxGrid.Item*/}
                            {/*    colspan={2}*/}
                            {/*    style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>*/}
                            {/*    /!*<div style={slimText}>직접비</div>*!/*/}
                            {/*    <div style={titleStyle}>{item.direct_cost}</div>*/}
                            {/*</FlexboxGrid.Item>*/}
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>계약정보</div>*/}
                                <div style={titleStyle}>
                                    {item.contract_file.length > 0 ? (
                                            <>
                                                <a href='javascript:void(0);' onClick={()=>{toggle();setItem(item)}}>보기</a>
                                                {!item.is_confirm &&
                                                <>
                                                    {' / '}
                                                    <Contract type={item.chae_cd.code_id} employee_id={item.id} handleReload={handleReload} btnLabel={'수정'} /> </>}
                                            </>
                                        ) :
                                        <Contract type={item.chae_cd.code_id} employee_id={item.id} handleReload={handleReload} btnLabel={'업로드'} />
                                    }
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={2}
                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                {/*<div style={slimText}>관리자 확인</div>*/}
                                <div style={titleStyle}>{item.is_confirm ? '확인완료' : '-'}</div>
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