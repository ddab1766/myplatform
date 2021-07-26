import React, {useEffect} from 'react';
import {Container} from "reactstrap";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Link from "react-router-dom/Link";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Nothing from "../../Common/Nothing";
import {Checkbox, FlexboxGrid, Icon, IconButton, List, Panel,PanelGroup} from "rsuite";
import moment from "moment";
import {fileViewerUrl} from "../../../function/common";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(22),
        // fontWeight: theme.typography.fontWeightBold,
    },
    container:{
        marginBottom:'10px',
        background: '#f2f6f9',
    },
    title:{
        paddingBottom: 5,
        whiteSpace: 'nowrap',
        fontWeight: 500
    },
    slimText: {
        fontSize: '0.666em',
        color: '#97969B',
        fontWeight: 'lighter',
        paddingBottom: 5
    }
}));
const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
    fontWeight: 300
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
    fontWeight: 300,
    fontSize: '13px'
};

const SugubEstimate = (props) => {
    const {estimate, sugub, jobap, newArr} = props;
    const classes = useStyles();
    console.log(newArr)


    const renderList = (item, index) =>{
        return (<>
            <List.Item index={index}>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={1} style={{ ...styleCenter}}>
                        <IconButton appearance="subtle" icon={<Icon icon="chevron-down" />} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                        colspan={4}
                        style={{
                            ...styleCenter,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            overflow: 'hidden'
                        }}
                    >
                        <div className={classes.title}>{item.hrprofile.custname}</div>
                        <div className={classes.slimText}>
                            <div>
                                <Icon icon="user-circle-o" />
                                {' ' + item['user']['nickname']}
                            </div>
                            <div>{item['created_time']}</div>
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4} style={{
                        ...styleCenter,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        overflow: 'hidden'
                    }}>
                        <div style={slimText}>예상견적서</div>
                        {item.estimate_file.map(file=>{
                            return (
                                <div style={titleStyle}>
                                    {/*{file.estimate_filename} {' '}*/}
                                    <a href={file.estimate_file} target="_blank"><Icon icon="file-download"  size="lg"/>다운로드</a>{' / '}
                                        <Link to={{
                                            pathname: `${fileViewerUrl(file.estimate_file)}`,
                                        }} target="_blank"><Icon icon="eye" size="lg"/>보기</Link>
                                    {}<br/>
                                </div>
                            )
                        })}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6} style={{
                        ...styleCenter,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        overflow: 'hidden'
                    }}>

                        <div style={slimText}>코멘트</div>
                        <div style={titleStyle}>{item.comments}</div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                        colspan={4}
                        style={{
                            ...styleCenter
                        }}
                    >
                        <Link className="nav-link"
                              to={{
                                  pathname: `/Company/Chat/${item.user.id}/${sugub.id}`,
                                  state: {
                                      receiver: item.user,
                                      sugub: sugub,
                                      chat: {participants: [], is_end: false}
                                  }
                              }}
                        >채팅문의</Link>
                    </FlexboxGrid.Item>

                </FlexboxGrid>
            </List.Item>
        </>)
    }
    return sugub && estimate ? (
        <>
         <style jsx>{`
            .estimateHeader .rs-panel-heading{
                padding : 0px 10px 0px 10px;
            }
            .estimateHeader .rs-panel-body{
                padding : 0px !important;
            }
            `}</style>
        <PanelGroup accordion bordered>
            <Panel header="예상견적서" defaultExpanded>
                <Container>
                    <List hover>
                        {newArr.map((item, index) => (
                            <Panel header={renderList(item,index)} collapsible className="estimateHeader" defaultExpanded>


                                {item.jobap.map((item, index) => (
                                    <List.Item key={item.id} index={index}>
                                        <FlexboxGrid justify="space-between">
                                            <FlexboxGrid.Item
                                                colspan={1}
                                                style={{
                                                    ...styleCenter,
                                                    flexDirection: 'column',
                                                }}
                                            >
                                
                                                {/*<Checkbox value={item.id} data-name={item.applied_username} ></Checkbox>*/}
                                            </FlexboxGrid.Item>
                                
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
                                                <div style={slimText}>지원자</div>
                                                <div style={titleStyle}><Icon icon="user-circle-o" />
                                                    {item.applied_username}
                                                </div>
                                                {/*<div style={slimText}>*/}
                                                {/*    <div>{birthFormat(item.applied_birth)}</div>*/}
                                                {/*    <div>{phoneFormat(item.applied_phone)}</div>*/}
                                                {/*    <div>{item.applied_at}</div>*/}
                                                {/*</div>*/}
                                            </FlexboxGrid.Item>
                                            <FlexboxGrid.Item
                                                colspan={3}
                                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                                <div style={slimText}>기업명</div>
                                                <div style={titleStyle}>
                                                    {item.hrprofile.custname}
                                                </div>
                                            </FlexboxGrid.Item>
                                            <FlexboxGrid.Item
                                                colspan={4}
                                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                                <div style={slimText}>접수일시</div>
                                                <div style={titleStyle}>{item.applied_at}</div>
                                            </FlexboxGrid.Item>
                                            <FlexboxGrid.Item
                                                colspan={3}
                                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                                <div style={slimText}>담당자 이메일</div>
                                                <div style={titleStyle}>{item.hrmanager.manager_email}</div>
                                            </FlexboxGrid.Item>
                                            <FlexboxGrid.Item
                                                colspan={3}
                                                style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>
                                                <div style={slimText}>담당자 연락처</div>
                                                <div style={titleStyle}>{item.hrprofile.manager_phone}</div>
                                            </FlexboxGrid.Item>
                                            {/*{*/}
                                            {/* <FlexboxGrid.Item colspan={3} style={{...styleCenter,flexDirection: 'column',alignItems: 'flex-start',overflow: 'hidden' }}>*/}
                                            {/*     <div style={{...slimText,color:'red'}}>면접일정</div>*/}
                                            {/*    <div style={titleStyle}>{item.interview_jobapp.length > 0 ? (moment(item.interview_jobapp[0].interview_dt).format('YYYY-MM-DD HH:mm'))*/}
                                            {/*    : ("미등록")}</div>*/}
                                
                                            {/*</FlexboxGrid.Item>*/}
                                            {/*     }*/}
                                            <FlexboxGrid.Item
                                                colspan={1}
                                                style={{
                                                    ...styleCenter,
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-end',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {/*<CustomWhisper item={item} >*/}
                                                {/*    <IconButton appearance="subtle" icon={<Icon icon="ellipsis-h" size="lg" />} />*/}
                                                {/*</CustomWhisper>*/}
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </List.Item>
                                ))}


                            </Panel>
                        ))}
                    </List>

                    {estimate.length === 0 && <Nothing/>}

                </Container>
            </Panel>
        </PanelGroup>
            </>
    ) : (<></>)
}

export default SugubEstimate