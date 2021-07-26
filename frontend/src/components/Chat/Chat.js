import React, {Component, useState} from 'react';
import './Chat.scss';
import WebSocketInstance from '../../services/WebSocket'
import {connect} from "react-redux";
import {Button, Col, Container, Modal, ModalBody, ModalFooter, Row} from "reactstrap";
import TextareaAutosize from "@material-ui/core/TextareaAutosize/TextareaAutosize";
import Avatar from "@material-ui/core/Avatar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as common from "../../function/common";

// import TabPanel from "@material-ui/lab/TabPanel";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMini: false,
      receiver: this.props.location.state ? this.props.location.state.receiver : {id: null, email: null, nickname: null},
      chat: this.props.location.state? this.props.location.state.chat : {participants: [], is_end: false},
      sugub: this.props.location.state ? this.props.location.state.sugub : null,
    };
    this.toggleModalMini = this.toggleModalMini.bind(this);
    // 신규채팅
    if(this.state.chat.participants.length === 0){
      WebSocketInstance.connect(this.props.location.state);
    }
    // 기존채팅
    else{
      WebSocketInstance.connect(this.state.chat.id);
    }

    this.waitForSocketConnection(() => {
      if(this.props.location.state){
        WebSocketInstance.initChatUser(this.state.receiver.id);
        WebSocketInstance.addCallbacks(
            this.initChat.bind(this),
            this.setMessages.bind(this),
            this.addMessage.bind(this)
        )
        WebSocketInstance.fetchMessages(this.state.receiver.id);
      }
    });
  }
  toggleModalMini(){
    this.setState({
      modalMini: !this.state.modalMini
    });
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(
        function () {
          // Check if websocket state is OPEN
          if (WebSocketInstance.state() === 1) {
            console.log("Connection is made")
            callback();
            return;
          } else {
            console.log("wait for connection...")
            // return;
            component.waitForSocketConnection(callback);
          }
        }, 100); // wait 100 milisecond for the connection...
  }

  componentDidMount() {
    // console.log('DidMount')
    this.scrollToBottom();
  }

  componentDidUpdate() {
    // console.log('DidUpdate')
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const chat = this.messagesEnd;
    const scrollHeight = chat.scrollHeight;
    const height = chat.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  initChat(room_number){
    this.setState({
      room_number: room_number
    });
  }

  addMessage(message) {
    // 뒤로가기 후 재입장 시 중복 메시지id 제거
    let uniqMessage = [...this.state.messages, message] ;
    uniqMessage = uniqMessage.filter((arr, index, callback) => index === callback.findIndex(t => t.id === arr.id))
    this.setState({ messages: uniqMessage});
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse()});
  }

  messageChangeHandler = (event) =>  {
    this.setState({
      message: event.target.value
    })
  }


  sendMessageHandler = (e, message) => {
    const messageObject = {
      from: this.props.user.id,
      text: message
    };

    // 채팅방이 종료되지 않은 경우만 메시지 전송
    if(!this.state.chat.is_end) {
      WebSocketInstance.newChatMessage(messageObject);
    }else{
      alert('채팅방이 종료되었습니다.')
    }
    // WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      message: ''
    });
    e.preventDefault();
  };

  renderMessages = (messages) => {
    // const currentUser = this.props.user.email;
    const currentUser = this.props.user.nickname;
    console.log('currentUser?', currentUser)
    console.log('messages?', messages)
    return messages.map((message, i) =>
        <>
          <li key={message.id} className={message.author.nickname === currentUser ? 'me' : 'him'}>
            <h4 className='author'>{ message.author.nickname } </h4>
            {message.author.nickname === currentUser ? (
                <Row>
                  <span>{message.created_at}</span>
                  <p>{message.content}</p>
                  <Avatar alt="me"
                          src={message.author.profile_image ?
                              message.author.profile_image :require("assets/img/default-avatar.png")}
                          style={{width:'30px',height:'30px',margin:'0 0.5rem 0 0'}}/>
                </Row>
            ) : (
                <Row>
                  {/*<div className='form-row'>*/}
                  <Avatar alt="him"
                          src={message.author.profile_image ?
                              message.author.profile_image : require("assets/img/default-avatar.png")}
                          style={{width:'30px',height:'30px'}}/>
                  <p>{message.content}</p>
                  <span>{message.created_at}</span>
                  {/*</div>*/}
                </Row>
            )
            }
          </li>

        </>
    );
  };

  exitChatRoom = (e, id) => {
    WebSocketInstance.exitChatRoom(id);
    this.props.history.goBack();
    e.preventDefault()
  };

  render() {
    const messages = this.state.messages;
    // const chat = this.state.chat;
    const {receiver, chat, sugub} = this.state;
    // const {room_number} = this.props.match.params;
    // todo chat이 null인지 아닌지에 따라 신규채팅, 기존채팅.
    console.log('receiver', receiver)
    return (
        <div className="content">
          <Container>
            <Row>
              <Col md={8}>
                <br/>
                <Card>
                  <CardContent>
                    <div className='chat'>
                      <div className='container'>
                        <div className="header">
                          <Row>
                        <span className="btn-label" style={{cursor:"pointer", position: "relative", fontSize: "1.2em"}}
                              onClick={() => this.props.history.goBack()}>
                          <i className="nc-icon nc-minimal-left" />{' '}{
                          chat && chat.is_end ? chat.exit_participants[0].email : receiver.nickname
                        }
                        </span>
                            <span style={{padding: '5px'}}>{'  '}</span>
                            <span className="btn-label" style={{cursor:"pointer", position: "relative", fontSize: "1.2em"}}
                                  onClick={(e) => this.toggleModalMini()
                                    //this.exitChatRoom(e, room_number)
                                  }>
                          <i className="nc-icon nc-minimal-left" />{' '}방나가기
                      </span>
                            <Modal isOpen={this.state.modalMini} toggle={this.toggleModalMini} size="sm">
                              <div className="modal-header justify-content-center">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModalMini}>
                                  <span aria-hidden="true">×</span>
                                </button>
                                <h5 className="modal-title">채팅방 나가기</h5>
                              </div>
                              <ModalBody>
                                <p>나가기를 하면 대화내용이 모두 삭제되고 채팅목록에서도 삭제됩니다.</p>
                              </ModalBody>
                              <ModalFooter>
                                <div className="left-side">
                                  <Button
                                      className="btn-link"
                                      color="default"
                                      type="button"
                                      onClick={this.toggleModalMini}
                                  >
                                    취소하기
                                  </Button>
                                </div>
                                <div className="divider"/>
                                <div className="right-side">
                                  <Button
                                      className="btn-link"
                                      color="danger"
                                      type="button"
                                      onClick={(e) => {this.exitChatRoom(e, this.state.room_number)}}
                                  >
                                    나가기
                                  </Button>
                                </div>
                              </ModalFooter>
                            </Modal>
                          </Row>
                        </div>
                        <ul ref={(el) => { this.messagesEnd = el; }}>
                          {
                            messages &&
                            this.renderMessages(messages)
                          }
                          { messages &&
                          chat && chat.is_end && (<li className={'admin'}>채팅방이 종료되었습니다.</li>)
                          }
                        </ul>
                      </div>
                      <div className='container message-form'>
                        <form onSubmit={(e) => this.sendMessageHandler(e, this.state.message)} className='form'>
                          {/*<input*/}
                          <div className='input-group'>
                            <TextareaAutosize className="form-control" rowsMin={5}
                                              type='text'
                                              onChange={this.messageChangeHandler}
                                              value={this.state.message}
                                              placeholder='메시지를 입력해주세요.'
                                              required />
                            <button className='submit' type='submit' value='Submit'>
                              Send
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Col>
              <Col md={4}>
                <br/>
                <Card>
                  <CardContent>
                    {
                      sugub &&
                      (<ChatInfoView receiver={receiver} sugub={sugub}/>)
                    }
                  </CardContent>
                </Card>
              </Col>
            </Row>

          </Container>
        </div>
    );
  }
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <span>{children}</span>
            </Box>
        )}
      </div>
  );
}

const ChatInfoView = (props) => {
  const [value, setValue] = useState(0);
  const {sugub, receiver} = props;
  const handleChange = (event, newValue) => setValue(newValue);
  return (
      <>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary">
          <Tab label={`채용정보`} {...a11yProps(0)} />
          {/*<Tab label={`회사정보`} {...a11yProps(1)} />*/}
          {/*<Tab label={`리뷰`} {...a11yProps(2)} />*/}
        </Tabs>
        <TabPanel value={value} index={value}>
          <br/>
          <dl>
            <dt>직종(대)</dt>
            <dd><strong>{sugub.sugub_jikjong_top.code_name}</strong></dd>
          </dl>
          <dl>
            <dt>직종(중)</dt>
            <dd><strong>{sugub.sugub_jikjong_mid.code_name}</strong></dd>
          </dl>
          <dl>
            {sugub.sugub_jikjong_low && (<dt>직종(소)</dt>)}
            {sugub.sugub_jikjong_low && sugub.sugub_jikjong_low.length > 0 && sugub.sugub_jikjong_low.map(value=>{
              return(
                  <dd><strong>{value.code_name}</strong></dd>
              )
            })}
          </dl>

          {sugub.work_position &&
          (
              <dl>
                <dt>포지션</dt>
                <dd><strong>{common.limitedText(sugub.work_position)}</strong></dd>
              </dl>
          )}

          <hr/>

          {sugub.chae_cd &&
          (
              <dl>
                <dt>채용형태</dt>
                <dd>
                  {sugub.chae_cd.code_name}
                  {sugub.chae_gigan && (
                      <strong>
                        ( {sugub.chae_gigan}
                        {sugub.chae_gigan_type && (
                            <>{sugub.chae_gigan_type.code_name}</>
                        )} )
                      </strong>
                  )}
                </dd>

              </dl>
          )}

          <hr/>

          {sugub.work_role &&
          (
              <dl>
                <dt>담당업무</dt>
                <dd><strong>{common.limitedText(sugub.work_role)}</strong></dd>
              </dl>
          )}
          {sugub.spec &&
          (
              <dl>
                <dt>필수/우대</dt>
                <dd><strong>{common.limitedText(sugub.spec)}</strong></dd>
              </dl>
          )}

          <hr/>

          {sugub.sugub_career_gb &&
          (
              <dl>
                <dt>경력</dt>
                <dd>
                  {sugub.sugub_career_gb.code_name} {' '}
                  {sugub.career_start && (
                      <><strong>
                        ( {sugub.career_start} 년 ~ {sugub.career_end} 년 )
                      </strong></>
                  )}
                </dd>
              </dl>
          )}
          {sugub.education_cd &&
          (
              <dl>
                <dt>학력</dt>
                <dd>{sugub.education_cd.code_name}</dd>
              </dl>
          )}
          {sugub.hire_count &&
          (
              <dl>
                <dt>채용인원</dt>
                <dd><strong>{sugub.hire_count}</strong></dd>
              </dl>
          )}

          <hr/>

          {sugub.age_start &&
          (
              <dl>
                <dt>연령</dt>
                <dd><strong>{sugub.age_start} 세 ~ {sugub.age_end} 세</strong></dd>
              </dl>
          )}
          {sugub.salary_gubun &&
          (
              <dl>
                <dt>급여형태</dt>
                <dd>{sugub.salary_gubun.code_name}</dd>
                {sugub.salary_end ? (
                    <dd><strong>
                      ( {sugub.salary_start} 만원 ~ {sugub.salary_end} 만원 )
                    </strong></dd>
                ) : (
                    <dd><strong>
                      ( {sugub.salary_start} 원 )
                    </strong></dd>
                )}

              </dl>
          )}
          {sugub.sugub_salary_adjust &&
          (
              <dl>
                <dt>급여협의</dt>
                <dd><strong>{sugub.sugub_salary_adjust ? '가능' : '불가능'}</strong></dd>
              </dl>
          )
          }

          <hr/>

          {sugub.work_load_addr &&
          (
              <dl>
                <dt>실근무지</dt>
                <dd><strong>{sugub.work_load_addr}</strong></dd>
              </dl>
          )}
          {sugub.work_load_addr_detail &&
          (
              <dl>
                <dt>나머지주소</dt>
                <dd><strong>{sugub.work_load_addr_detail}</strong></dd>
              </dl>
          )}

          {sugub.sugub_end_dt &&
          (
              <dl>
                <dt>채용마감일</dt>
                <dd><strong>{sugub.sugub_end_dt}</strong></dd>
              </dl>
          )}
        </TabPanel>
      </>
  )
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  }
}
export default connect(mapStateToProps, {})(Chat)