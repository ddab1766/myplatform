import React, {useState} from "react";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import LoaderSpinner from "../Etc/LoaderSpinner";
import ReactBSAlert from "react-bootstrap-sweetalert";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {deleteCoworker, getCoworker, updateCoworker} from "../../actions/coworkerActions";
import {makeStyles} from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Nothing from "../Common/Nothing";
import {getPermission} from "../../function/common";
import {Badge} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
    },
}));

const Coworker = (props) => {
    const [removeAlert, setRemoveAlert] = useState(false);
    const [permissionAlert, setPermissionAlert] = useState(null);
    const { user, company, coworker } = props;
    const classes = useStyles();

    console.log('Coworker.js', coworker)


    const warningWithConfirmMessage = (id) => {
        setRemoveAlert(
            (
                <ReactBSAlert
                    warning
                    style={{display: "block", marginTop: "100px"}}
                    title="권한을 삭제하시겠습니까?"
                    onConfirm={() => {
                        props.deleteCoworker(id);
                        setRemoveAlert(
                            <ReactBSAlert
                                success
                                style={{display: "block", marginTop: "100px"}}
                                title="삭제되었습니다!"
                                onConfirm={() => hideAlert()}
                                onCancel={() => hideAlert()}
                                confirmBtnBsStyle="info"
                            >
                            </ReactBSAlert>
                        )
                    }}
                    onCancel={() => hideAlert()}
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="삭제"
                    cancelBtnText="취소"
                    showCancel
                >
                    {/*You will not be able to recover this imaginary file!*/}
                </ReactBSAlert>
            )
        );
    };

    const permissionMessage = (id, permission) => {
        setPermissionAlert(
            <ReactBSAlert
                warning
                style={{display: "block", marginTop: "100px"}}
                title="권한을 변경하시겠습니까?"
                onConfirm={() => {
                    props.updateCoworker(id, permission);
                    setRemoveAlert(
                        <ReactBSAlert
                            success
                            style={{display: "block", marginTop: "100px"}}
                            title="변경되었습니다!"
                            onConfirm={() => hideAlert()}
                            onCancel={() => hideAlert()}
                            confirmBtnBsStyle="info"
                        >
                        </ReactBSAlert>
                    )
                }}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
                confirmBtnText="변경"
                cancelBtnText="취소"
                showCancel
            >
                {permission === 'CG0100000' ? <>[관리자권한] -> [기본권한]</> : <>[기본권한] -> [관리자권한] </>}

            </ReactBSAlert>
        )
    }

    const hideAlert = () => {
        setRemoveAlert(false);
        setPermissionAlert(false);
    };

    return coworker ? (
        <>
            {permissionAlert}
            {removeAlert}
            <Card variant="outlined">
                <CardContent>
                    관리자 권한
                    <List className={classes.root}>
                        { coworker.map( (v, index) => {
                            if(v.companyprofile_auth && v.companyprofile_auth.code_id === 'CG0200000') {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            {v.user.id === user.id ? (
                                                <Badge badgeContent={"me"} color="primary">
                                                    <Avatar alt={"profile-image"} src={user.profile_image}/>
                                                </Badge>
                                            ) : (
                                                <Avatar/>
                                            )}
                                        </ListItemAvatar>
                                        <ListItemText primary={v.user && v.user.email} secondary={v.created_time}/>
                                        {getPermission(user, coworker, 'company') === 'CG0200000' && (
                                            <>
                                                {v.user.id !== user.id && ( // 본인권한 변경 불가
                                                    <>
                                                        <Button
                                                            className="btn-neutral"
                                                            color="default"
                                                            data-placement="left"
                                                            onClick={() => permissionMessage(v.id, 'CG0100000')}
                                                            // id="tooltip848814788"
                                                            title=""
                                                            type="button"
                                                        >
                                                            권한설정
                                                        </Button>
                                                        <Button
                                                            className="btn-neutral"
                                                            color="default"
                                                            data-placement="left"
                                                            onClick={() => warningWithConfirmMessage(v.id)}
                                                            title=""
                                                            type="button"
                                                        >
                                                            권한삭제
                                                        </Button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </ListItem>
                                )
                            }
                        })
                        }
                    </List>
                </CardContent>
            </Card>
            <hr/>
            <Card variant="outlined">
                <CardContent>
                    기본 권한
                    <List className={classes.root}>
                        { coworker.map( (v, index) => {

                            if(v.companyprofile_auth && v.companyprofile_auth.code_id === 'CG0100000') {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            {v.user.id === user.id ? (
                                                <Badge badgeContent={"me"} color="primary">
                                                    <Avatar alt={"profile-image"} src={user.profile_image}/>
                                                </Badge>
                                            ) : (
                                                <Avatar/>
                                            )}
                                        </ListItemAvatar>
                                        <ListItemText primary={v.user && v.user.email} secondary={v.created_time}/>
                                        {getPermission(user, coworker, 'company') === 'CG0200000' && (
                                            <>
                                                <Button
                                                    className="btn-neutral"
                                                    color="default"
                                                    data-placement="left"
                                                    onClick={() => permissionMessage(v.id, 'CG0200000')}
                                                    title=""
                                                    type="button"
                                                >
                                                    권한설정
                                                </Button>
                                                <Button
                                                    className="btn-neutral"
                                                    color="default"
                                                    data-placement="left"
                                                    onClick={() => warningWithConfirmMessage(v.id)}
                                                    title=""
                                                    type="button"
                                                >
                                                    권한삭제
                                                </Button>
                                            </>
                                        )}
                                    </ListItem>
                                )
                            }
                        })
                        }
                        {
                            coworker.filter(v => v.companyprofile_auth && v.companyprofile_auth.code_id === 'CG0100000').length === 0 &&
                            (<Nothing/>)
                        }
                    </List>
                </CardContent>
            </Card>
        </>
    ) : <LoaderSpinner/>
};

function mapStateToProps(state) {
    return {
        company: state.auth.company,
        user: state.auth.user,
        coworker: state.coworker.coworker
    }
}

export default connect(mapStateToProps, {getCoworker, deleteCoworker, updateCoworker})(Coworker);

// export default Coworker;