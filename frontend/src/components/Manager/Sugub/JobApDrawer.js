import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Alert, Drawer, Dropdown, FlexboxGrid, Icon, IconButton, List, Panel, PanelGroup, Popover, Whisper} from 'rsuite'
import {birthFormat, fileViewerUrl, phoneFormat} from "../../../function/common"
import defaultClient from '../../../utils/defaultClient';
import {apiUrls} from "../../../constants/urls";
import store from "../../../store";
import {getHrSugub} from "../../../actions/sugubActions";
import { useObserver } from 'mobx-react';
import useStore from './useStore';
import moment from "moment";
import {isMobile} from "react-device-detect"
const Menu = ({ onSelect,item }) => (
    <Dropdown.Menu onSelect={onSelect} >
        <Dropdown.Item eventKey={1}>이력서 보기</Dropdown.Item>
        <Dropdown.Item eventKey={2}>이력서 다운로드</Dropdown.Item>
        {item.applied_status.code_id === "BW0100000" && <Dropdown.Item eventKey={3}>접수취소</Dropdown.Item>}
    </Dropdown.Menu>
);

const MenuPopover = ({ onSelect, item, ...rest }) => (
    <Popover {...rest} full>
        <Menu onSelect={onSelect} item={item} />
    </Popover>
);

let tableBody;
//접수 취소 이벤트
const handleCancle = (data,toggleReload,handleClickJobAp,counter) => {
    if(window.confirm("접수취소와 동시에 목록에서 삭제됩니다. 취소하시겠습니까?")){
        defaultClient.patch(apiUrls.JOB_APPLICANT + data.id + "/",{applied_status: 'BW0702000'},{
                headers:{
                    authorization: 'Token ' + store.getState().auth.token
                },
            }
        ).then(res => {
            const itemToTake = counter.number.jobadvertise[0].jobapplicants.find((item) => item.id === data.id);
            counter.number.jobadvertise[0].jobapplicants.remove(itemToTake)
            // 접수현황 Drawer 리로드
            // getHrSugub(data.sugub.id).then( (res) => {
            //     handleClickJobAp(res);
            // }).catch(((err) => console.log(err)));
            //
            // // 전체수급리스트 테이블 리로드
            // toggleReload(res)

            Alert.success('취소가 완료되었습니다.')
        }).catch(error => {
            console.log(error);
        });
    } else{
        return false;
    }
}
const CustomWhisper = ({item,children,toggleReload,handleClickJobAp}) => {
    const { counter } = useStore();
    const handleSelectMenu = (eventKey, event) => {
        if(eventKey === 1){ //이력서 보기
            window.open(`${fileViewerUrl(item.resume_pdf)}`,"_blank")
        } else if(eventKey === 2){ //이력서 다운로드
            window.open(item.resume_pdf,"_blank")
        } else if(eventKey === 3){ //접수취소
            handleCancle(item,toggleReload,handleClickJobAp,counter)
        }
        // trigger.hide();
    }
    return (
        <Whisper
            placement="bottomEnd"
            trigger="click"
            // triggerRef={ref => {
            //     trigger = ref;
            // }}
            container={() => {
                return tableBody;
            }}
            speaker={<MenuPopover onSelect={handleSelectMenu} item={item}/>}
        >
            {children}
        </Whisper>
    );
}
// class CustomWhisper extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.handleSelectMenu = this.handleSelectMenu.bind(this);
//   }
//   //각 버튼 이벤트
//   handleSelectMenu(eventKey, event) {
//     if(eventKey === 1){ //이력서 보기
//         window.open(`${fileViewerUrl(this.props.item.resume_pdf)}`,"_blank")
//     } else if(eventKey === 2){ //이력서 다운로드
//         window.open(this.props.item.resume_pdf,"_blank")
//     } else if(eventKey === 3){ //접수취소
//         handleCancle(this.props.item,this.props.toggleReload,this.props.handleClickJobAp)
//     }
//     this.trigger.hide();
//   }
//   render() {
//     return (
//       <Whisper
//         placement="bottomEnd"
//         trigger="click"
//         triggerRef={ref => {
//           this.trigger = ref;
//         }}
//         container={() => {
//           return tableBody;
//         }}
//         speaker={<MenuPopover onSelect={this.handleSelectMenu} item={this.props.item}/>}
//       >
//         {this.props.children}
//       </Whisper>
//     );
//   }
// }

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

const renderList = (item,index,toggleReload,handleClickJobAp) => {
    return (
        <List.Item key={item.id} index={index}>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={4} style={styleCenter}>
                    <div style={item.applied_status.code_name.indexOf('불') !== -1 ? ({color:'red'}) :
                        (item.applied_status.code_id === 'BW0301000' || item.applied_status.code_id === 'BW0401000' ?
                            ({color:'#0a5dc2'}) : ({color:'black'}))}>
                        {item.applied_status.code_name}</div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                    colspan={6}
                    style={{
                        ...styleCenter,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        overflow: 'hidden'
                    }}
                >
                    <div style={titleStyle}><Icon icon="user-circle-o" />
                        {item.applied_username}
                    </div>
                    <div style={slimText}>
                        <div>{birthFormat(item.applied_birth)}</div>
                        <div>{phoneFormat(item.applied_phone)}</div>
                        <div>{moment(item.applied_at).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                    colspan={14}
                    style={{
                        ...styleCenter,
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        overflow: 'hidden'
                    }}
                >
                    <CustomWhisper item={item} toggleReload={toggleReload} handleClickJobAp={handleClickJobAp}>
                        <IconButton appearance="subtle" icon={<Icon icon="more" />} />
                    </CustomWhisper>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </List.Item>
    )
}
const JobApDrawer = (props) => {
    const {show,setShow,jobApData,toggleReload,handleClickJobAp} = props
    // const [data0, setData0] = useState([]);
    // const [data1, setData1] = useState([]);
    // const [data2, setData2] = useState([]);
    // const [data3, setData3] = useState([]);
    // const [data4, setData4] = useState([]);
    const { counter } = useStore();

    console.log(jobApData)
    const close = () => {
        setShow(false);
    }
    // useEffect(() =>{
    //     filteredList(counter.number.jobadvertise[0].jobapplicants);
    // },[])
    //
    // //각 상태 패널에 넣기 위해 상태별 state 저장
    // const filteredList = (data) => {
    //     var data0 = [];
    //     var data1 = [];
    //     var data2 = [];
    //     var data3 = [];
    //     var data4 = [];
    //     counter.number.jobadvertise[0].jobapplicants.map((item, index) =>{
    //         if(item.hrprofile.id === props.hr.id || item.hrprofile === props.hr.id){
    //             var code =item.applied_status.code_id;
    //             if(code === 'BW0100000'){
    //                 data0.push(renderList(item,index,toggleReload,handleClickJobAp))
    //             } else if(code === 'BW0200000' || code === 'BW0302000'){
    //                 data1.push(renderList(item,index))
    //             } else if(code === 'BW0301000'){
    //                 data2.push(renderList(item,index))
    //             } else if(code === 'BW0401000' || code === 'BW0402000'){
    //                 data3.push(renderList(item,index))
    //             } else if(code === 'BW0801000'){
    //                 data4.push(renderList(item,index))
    //             }
    //         }
    //     })
    //
    //     setData0(data0);
    //     counter.data = data0
    //     console.log(counter.data )
    //     setData1(data1);
    //     setData2(data2);
    //     setData3(data3);
    //     setData4(data4);
    // }

    return  useObserver(()=> {
        var data0 = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        counter.number.jobadvertise[0].jobapplicants.map((item, index) => {
            if (item.hrprofile.id === props.hr.id || item.hrprofile === props.hr.id) {
                var code = item.applied_status.code_id;
                if (code === 'BW0100000') {
                    data0.push(renderList(item, index, toggleReload, handleClickJobAp))
                } else if (code === 'BW0200000' || code === 'BW0302000') {
                    data1.push(renderList(item, index))
                } else if (code === 'BW0301000') {
                    data2.push(renderList(item, index))
                } else if (code === 'BW0401000' || code === 'BW0402000') {
                    data3.push(renderList(item, index))
                } else if (code === 'BW0801000') {
                    data4.push(renderList(item, index))
                }
            }
        })
        // const data1 = counter.number.jobadvertise[0].jobapplicants
        //     .filter(item=>item.hrprofile.id === props.hr.id || item.hrprofile === props.hr.id)
        //     .map((item, index) => {
        //         console.log(item)
        //         var code = item.applied_status.code_id;
        //         if (code === 'BW0200000' || code === 'BW0302000') {
        //             return renderList(item, index, toggleReload, handleClickJobAp)
        //         }
        //     })

        return (
            <>
                <Drawer
                    show={show}
                    onHide={close}
                    backdrop={false}
                    style={isMobile ? {width:'100%'} : {width:'600px'}}
                >
                    <Drawer.Header>
                        <Drawer.Title>접수현황</Drawer.Title>
                    </Drawer.Header>
                    <hr/>
                    <Drawer.Body>
                        <PanelGroup accordion bordered>
                            <Panel header="접수대기" defaultExpanded={Boolean(data0.length > 0)}>
                                <List hover>
                                    {data0}
                                </List>
                            </Panel>
                            <Panel header="서류전형" defaultExpanded={Boolean(data1.length > 0)}>
                                <List hover>
                                    {data1}
                                </List>
                            </Panel>
                            <Panel header="면접대기" defaultExpanded={Boolean(data2.length > 0)}>
                                <List hover>
                                    {data2}
                                </List>
                            </Panel>
                            <Panel header="면접결과" defaultExpanded={Boolean(data3.length > 0)}>
                                <List hover>
                                    {data3}
                                </List>
                            </Panel>
                            <Panel header="최종합격" defaultExpanded={Boolean(data4.length > 0)}>
                                <List hover>
                                    {data4}
                                </List>
                            </Panel>
                        </PanelGroup>
                    </Drawer.Body>
                    <Drawer.Footer>

                    </Drawer.Footer>
                </Drawer>

            </>)
    } )
}
//export default SugubList;
function mapStateToProps(state) {
    return {
        hr: state.auth.hr,
        user: state.auth.user,
        token: state.auth.token,
        comcode:state.comcode.comcode,
    }
}

export default connect(mapStateToProps)(JobApDrawer);

