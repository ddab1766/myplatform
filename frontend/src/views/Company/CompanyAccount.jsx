import React, {useCallback, useEffect, useState} from "react";
// reactstrap components
import {Container} from "reactstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import Coworker from "../../components/Company/Coworker";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {deleteInvite, getCoworker, getInvite, inviteCoworker} from "../../actions/coworkerActions";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card/Card";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

const CompanyAccountView = (props) => {
    const [inviteAlert, setInviteAlert] = useState(false);
    const [invitedEmail, setInvitedEmail] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const {user, coworker} = useSelector(state => ({
            user: state.auth.user,
            coworker: state.coworker.coworker
        }),
    );
    const dispatch = useDispatch();
    const onGetCoworker = useCallback(() => dispatch(getCoworker()), []);
    const onDeleteCoworker = (id) => dispatch(deleteInvite(id));

    useEffect(() => {
        onGetCoworker();
    }, []);

    useEffect(()=>{
        getInvite().then((data)=>{
            setInvitedEmail(data)
        });
    },[]);


    const inputConfirmAlert = email => {
        inviteCoworker({'email': email}).then((data)=>{
            setInvitedEmail(...invitedEmail, [data])
        });
        setInviteAlert(false)
    };
    const hideAlert = () => setInviteAlert(null);

    return (
        <>
            <div className="content">
                <Container>
                    <div className="title">
                        <h5>
                            계정관리<br/>
                            <small>회사정보 / 진행중인 채용의뢰서를 공유합니다.</small>
                        </h5>
                    </div>
                    <div className="text-right">
                        <button
                            className="btn btn-signature"
                            onClick={() => setInviteAlert(true)}
                        >
                            새로운 계정 초대
                        </button>
                    </div>
                    {inviteAlert && (
                        <ReactBSAlert
                            input
                            showCancel
                            style={{display: "block", marginTop: "100px"}}
                            title="이메일 주소"
                            onConfirm={(e) => inputConfirmAlert(e)}
                            onCancel={() => hideAlert()}
                            confirmBtnBsStyle="info"
                            cancelBtnBsStyle="danger"
                        >* 초대하려는 관리자의 이메일 주소를 입력해 주십시오.
                        </ReactBSAlert>
                    )}

                    {<Coworker/>}

                    <hr/>

                    {invitedEmail.length > 0 && (
                        <>
                            <Card variant="outlined">
                                <CardContent>
                                    초대목록
                                    <List >
                                        {invitedEmail.map( item => {
                                            if(!item.accepted){
                                                return (
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar/>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item.email} secondary={!item.accepted && '수락 대기중'}/>
                                                        <IconButton aria-label="delete" >
                                                            <DeleteIcon fontSize="small" onClick={()=>{
                                                                onDeleteCoworker(item.id)
                                                                setInvitedEmail(invitedEmail.filter(v => v.id !== item.id))
                                                            }}/>
                                                        </IconButton>
                                                    </ListItem>
                                                )
                                            }
                                        })}
                                    </List>
                                </CardContent>
                            </Card>
                        </>
                    )}

                </Container>
            </div>

        </>
    )
};


// function mapStateToProps(state) {
//     return {
//         company: state.auth.company,
//         user: state.auth.user,
//         coworker: state.coworker.coworker
//     }
// }

export default CompanyAccountView;

// export default connect(mapStateToProps, {getCoworker})(CompanyAccountView);

