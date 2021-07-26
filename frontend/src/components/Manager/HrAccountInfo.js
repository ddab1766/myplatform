import React from "react";
import {connect, useSelector, shallowEqual} from "react-redux";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List";
import Nothing from "../Common/Nothing";

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


const HrAccountInfo = (props) => {
    const {authenticated, hr} = useSelector(state => ({
            authenticated: state.auth.authenticated,
            hr: state.auth.hr
        }),
        shallowEqual
    );
    console.log('hr', hr)

    return hr && (
        <>
            <Card variant={"outlined"}>
                <CardContent>
                    <h6>세금계산서 담당자</h6>
                    <hr/>
                    <List>
                        {hr.hraccountinfo && hr.hraccountinfo.length > 0 ?
                            hr.hraccountinfo.map((item, index) => (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.account_name + '(' + item.account_email + ')'} secondary={item.account_phone}/>
                                </ListItem>

                            )) : (<Nothing/>)
                        }
                    </List>
                    <div className="text-center">
                        <Link className="btn btn-info"
                              to={{
                                  pathname: `/Mng/account_edit`,
                                  state: {
                                      hr: hr,
                                  }
                              }}
                        >정보 수정
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default HrAccountInfo;


