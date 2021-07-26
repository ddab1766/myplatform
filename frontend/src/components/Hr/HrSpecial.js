import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {FlexboxGrid, Icon, List} from "rsuite";
import {deleteHrSpecial} from "../../actions/userActions";
import Nothing from "../Common/Nothing";
import CloseIcon from '@material-ui/icons/Close';

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

const HrSpecial = () => {
    const {authenticated, company, hr} = useSelector(state => ({
            authenticated: state.auth.authenticated,
            company: state.auth.company,
            hr: state.auth.hr
        }),
        // shallowEqual
    );
    const dispatch = useDispatch();
    const onDeleteHrSpecial = useCallback(id => dispatch(deleteHrSpecial(id)), [dispatch]);

    return (
        <>
            {hr.hrspecial && hr.hrspecial.length > 0 ? (
                <Card variant="outlined">

                    <CardContent>
                        <List hover>
                            {hr.hrspecial.map((item, index) => (
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
                                            <button className="btn btn-info btn-sm"
                                                    onClick={()=>onDeleteHrSpecial(item['id'])}
                                            >
                                                <CloseIcon/>
                                            </button>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </List.Item>
                            ))}
                        </List>

                    </CardContent>
                </Card>
            ): (<Nothing text={'전문직종'}/>)}
        </>
    )
}

export default HrSpecial
