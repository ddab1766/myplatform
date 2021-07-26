import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import LoaderSpinner from "../Etc/LoaderSpinner";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {FlexboxGrid, Icon, List} from "rsuite";
import {CommonTypes} from "../../constants/actionTypes";
import store from "store";

const styleCenter = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px'
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
        fontWeight: 500
    };

    const dataStyle = {
        fontSize: '1.2em',
        fontWeight: 500
    };

const HrSpecial = (props) => {
    const [hrProfile, setHrProfile] = useState(props.hrprofile);
    const {special} = props;
    const [specials, setSpecials] = useState(null);

    useEffect(()=>{
        if(!props.hrprofile || props.hrprofile === undefined) {
            setHrProfile(props.hr)
        }else{
            setHrProfile(props.hrprofile)
        }
    },[props.hr]);

    useEffect(()=>{
        store.dispatch({
            type: CommonTypes.GET_API_DATA,
            payload: special
        })
    },[]);

    const handleDeleteClick = (id) => {
        // deleteInterestSugub(id).then(()=>{
        //     setInterestSugubs(sugubs.filter(sugub => sugub.id !== id))
        // })
    }


    return hrProfile ? (
        <>
            {
                hrProfile.hrspecial ?
                    (
                        <>{hrProfile.hrspecial.length > 0 ? (
                            <>
                                <Card variant="outlined">

                                    <CardContent>
                                        <List hover>
                                            {special.map((item, index) => (
                                                <List.Item key={item['id']} index={index}>
                                                    <FlexboxGrid>
                                                        {/*icon*/}
                                                        <FlexboxGrid.Item colspan={2} style={styleCenter}>
                                                            <Icon
                                                                icon={'vcard-o'}
                                                                style={{
                                                                    color: 'darkgrey',
                                                                    fontSize: '1.5em'
                                                                }}
                                                            />
                                                        </FlexboxGrid.Item>
                                                        {/*base info*/}
                                                        <FlexboxGrid.Item
                                                            colspan={6}
                                                            style={{
                                                                ...styleCenter,
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-start',
                                                                overflow: 'hidden'
                                                            }}
                                                        >
                                                            <div style={titleStyle}>{item['hr_jikjong_top']['code_name']}</div>
                                                            <div style={slimText}>
                                                                <div>
                                                                    {/*<Icon icon="user-circle-o" />*/}
                                                                    {' ' + item['hr_jikjong_mid']['code_name']}
                                                                </div>
                                                                <div>{item['date']}</div>
                                                            </div>
                                                        </FlexboxGrid.Item>
                                                        {/*peak data*/}
                                                        <FlexboxGrid.Item colspan={6} style={styleCenter}>
                                                            <div style={{ textAlign: 'right' }}>
                                                                <div style={slimText}>수수료율(%)</div>
                                                                <div style={dataStyle}>
                                                                    {item['jikjong_tax_start']}
                                                                    ~
                                                                    {item['jikjong_tax_end']}
                                                                </div>
                                                            </div>
                                                            {/*{this.renderRaise(item['peakRaise'])}*/}
                                                        </FlexboxGrid.Item>
                                                        {/*uv data*/}
                                                        <FlexboxGrid.Item colspan={6} style={styleCenter}>
                                                            <div style={{ textAlign: 'right' }}>
                                                                {/*<div style={slimText}>진행(건)</div>*/}
                                                                {/*<div style={dataStyle}>{item['uv'].toLocaleString()}</div>*/}
                                                            </div>
                                                            {/*{this.renderRaise(item['uvRaise'])}*/}
                                                        </FlexboxGrid.Item>
                                                        {/*uv data*/}
                                                        <FlexboxGrid.Item
                                                            colspan={4}
                                                            style={{
                                                                ...styleCenter
                                                            }}
                                                        >
                                                            {/*<button className="btn btn-info btn-sm" onClick={()=>handleDeleteClick(item['id'])}>
                                                                <CloseIcon/>
                                                            </button>*/}
                                                        </FlexboxGrid.Item>
                                                    </FlexboxGrid>
                                                </List.Item>
                                            ))}
                                        </List>
                                        {/*<Table>
                                            <thead>
                                            <td>직종(대)</td>
                                            <td>직종(중)</td>
                                            <td>직종(소)</td>
                                            <td>수수료율</td>
                                            </thead>
                                            <tbody>
                                            {hrProfile.hrspecial.map( (v)=>{
                                                return (
                                                    <tr>
                                                        <td>{v.hr_jikjong_top && v.hr_jikjong_top.code_name}</td>
                                                        <td>{v.hr_jikjong_mid && v.hr_jikjong_mid.code_name}</td>
                                                        <td>
                                                            {v.hr_jikjong_low && v.hr_jikjong_low.map(low => {
                                                                return (<>{low.code_name}</>)
                                                            })
                                                            }
                                                        </td>
                                                        <td>{v.jikjong_tax_start} ~ {v.jikjong_tax_end} %</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </Table>*/}
                                    </CardContent>
                                </Card>
                            </>
                        ): (<></>)}
                        </>
                    )
                    : (<>등록된 전문직종이 없습니다.</>)
            }
        </>
    ) : (<LoaderSpinner/>)
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps)(HrSpecial)