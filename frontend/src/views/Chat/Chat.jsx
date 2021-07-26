import React, {useEffect, useState} from "react";
// reactstrap components
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Col, Container, Row} from "reactstrap";
import {getChat} from "../../actions/ChatActions";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import {Link} from "react-router-dom";
import Nothing from "../../components/Common/Nothing";

const ChatView = (props) => {
    const {user, match} = props;
    const [chat, setChat] = useState(null);


    useEffect(()=>{
        getChat().then((res)=>{
            console.log('chat res', res);
            setChat(res)
        })
    },[]);

    function getRecipients(chat){
        if(chat.participants.length === 3){
            if(chat.chatroom_messages){
                console.log('?', chat.participants.filter(participant => participant.id !== user.id && participant.id !== 1 )[0])
                return chat.participants.filter(participant => participant.id !== user.id && participant.id !== 1 )[0]
            }
        }else if(chat.participants.length === 2){ //상대방 나간경우
            return chat.exit_participants[0]
            // if(chat.chatroom_messages){
            //     return chat.participants.filter(participant => participant.id !== user.id)[0]
            // }
        }else{
            return null
        }
    }

    function getMessages(chat){
        if(chat.chatroom_messages){
            return chat.chatroom_messages[0] ? chat.chatroom_messages[0].content : null
        }
    }

    function getChatStatus(chat){
        let status;
        if(chat.is_end){ return '종료' }
        if(chat.chatroom_messages[0]){
            if(chat.chatroom_messages[0].author.id === user.id){
                status = '답변대기중'
            }else{
                status =  '답변안함'
            }
        }else{
            status = '대기중'
        }
        return status
    }

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>
                        채팅{' '}
                        <small>
                            <i className="fa fa-refresh" style={{cursor:"pointer"}}
                               onClick={() => {
                                   setChat(null);
                                   getChat().then((res)=>setChat(res))
                               }}
                            />
                        </small>
                    </h3>
                </div>
                {chat ? (
                    <>
                        {chat.length > 0 ? (
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardContent>
                                            {
                                                chat.map( (v)=>{
                                                    if(v.sugub===null) return ;
                                                    return (
                                                        <div className="box box-chat" key={v.id}>
                                                            <Link className="nav-link"
                                                                  to={{
                                                                      pathname: `${match.url}/${getRecipients(v).id}/${v.sugub.id}`,
                                                                      state: {
                                                                          receiver: getRecipients(v),
                                                                          sugub: v.sugub,
                                                                          chat: v
                                                                      }
                                                                  }}>
                                                                <Row>
                                                                    <Col>
                                                                        <span style={{background:'#007bff',color: 'white',padding: '3px 10px 3px',borderRadius: '15px'}}>
                                                                            {getChatStatus(v)}
                                                                        </span>
                                                                        <dd>{getRecipients(v) && getRecipients(v).nickname}</dd>
                                                                    </Col>
                                                                    <Col>
                                                                        <pre className="text-right">{v.created_at}</pre>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={4}>
                                                                        <dl>
                                                                            <dt>채용구분</dt>
                                                                            <dd>{v.sugub && v.sugub.chae_cd.code_name}</dd>
                                                                        </dl>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <dl>
                                                                            <dt>채용마감일</dt>
                                                                            <dd>{v.sugub && v.sugub.sugub_end_dt}</dd>
                                                                        </dl>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={4}>
                                                                        <dl>
                                                                            <dt>TITLE</dt>
                                                                            <dd>{v.sugub && v.sugub.sugub_title}</dd>
                                                                        </dl>
                                                                    </Col>
                                                                </Row>
                                                                <hr/>
                                                                <dd><strong>{getMessages(v)}</strong></dd>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col md={4}>

                                </Col>
                            </Row>
                        ):(<><Nothing/></>)}
                    </>
                ):( <LoaderSpinner/>)}
                <hr/>
            </Container>

        </div>
    )
};


function mapStateToProps(state) {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(ChatView);