import React, {useCallback} from "react";
import {FlexboxGrid, List} from 'rsuite'
import {deleteInterestSugub} from "../../actions/userActions";
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch, useSelector} from "react-redux";

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

const InterestSugub = () =>{
    const {user} = useSelector(state => ({
            user: state.auth.user,
        }),
    );
    const dispatch = useDispatch();
    const onDeleteInterestSugub = useCallback(id => dispatch(deleteInterestSugub(id)), [dispatch]);

    return user.interestsugub_user && (
        <List hover>
            {user.interestsugub_user.map((item, index) => (
                <List.Item key={item['sugub'].title} index={index}>
                    <FlexboxGrid>
                        {/*icon*/}
                        <FlexboxGrid.Item colspan={2} style={styleCenter}>
                            {/*<Icon
                                icon={'file-text-o'}
                                style={{
                                    color: 'darkgrey',
                                    fontSize: '1.5em'
                                }}
                            />*/}
                            {item['sugub']['sugub_status']['code_name']}
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
                            <div style={titleStyle}>
                                [{item['sugub']['chae_cd'].code_name}] {item['sugub']['sugub_title']}
                            </div>
                            <div style={slimText}>
                                <div>

                                    {/*<Icon icon="calendar-o" />*/}
                                    {'의뢰등록일: ' + item['sugub']['sugub_end_dt']}
                                </div>
                                <div>{item['sugub']['created_time']}</div>
                            </div>
                        </FlexboxGrid.Item>
                        {/*peak data*/}
                        <FlexboxGrid.Item colspan={6} style={styleCenter}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={slimText}>모집인원</div>
                                <div style={dataStyle}>{item['sugub']['hire_count']}명</div>
                            </div>
                            {/*{this.renderRaise(item['peakRaise'])}*/}
                        </FlexboxGrid.Item>
                        {/*uv data*/}
                        <FlexboxGrid.Item colspan={6} style={styleCenter}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={slimText}>접수마감일</div>
                                <div style={dataStyle}>{item['sugub']['sugub_end_dt']}</div>
                            </div>
                            {/* {this.renderRaise(item['uvRaise'])}*/}
                        </FlexboxGrid.Item>
                        {/*uv data*/}
                        <FlexboxGrid.Item
                            colspan={4}
                            style={{
                                ...styleCenter
                            }}
                        >
                            <button className="btn btn-info btn-sm" onClick={()=>onDeleteInterestSugub(item['id'])}>
                                <CloseIcon/>
                            </button>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </List.Item>
            ))}
        </List>
    );
}

export default InterestSugub;