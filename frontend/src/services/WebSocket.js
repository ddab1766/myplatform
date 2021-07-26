import {getUserToken} from "../utils/authUtils";
import store from "../store";


const CHAT_URL = (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'ws://localhost:8000/ws/chat'
    // return 'wss://chaegong.co.kr/ws/chat'
  }  else {
    // return 'wss://chaegong.co.kr/ws/chat'
    return 'wss://chaema.co.kr/ws/chat'
    // return 'wss://chaema.du.r.appspot.com/ws/chat'
    // return 'wss://chaema-312901.du.r.appspot.com/ws/chat'
  }
})();

const API_PATH = CHAT_URL;

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(data) {
    const path = API_PATH;
    const token = getUserToken(store.getState());
    console.log('connect data', data);
    if(data.receiver){
      this.socketRef = new WebSocket(path + '/' + data.receiver.id + '/' + data.sugub.id + '/?token=' + token);
    }else{
      // 상대방이 채팅방 나간 경우
      // this.socketRef = new WebSocket(path + '/' + '1' + '/' + data.sugub.id + '/?token=' + token);
      this.socketRef = new WebSocket(path + '/' + data + '/?token=' + token);
    }
    console.log('path', path)

    this.socketRef.onopen = () => {
      console.log('WebSocket open');
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      // this.connect();
      this.connect(data)
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    console.log('parsedData', parsedData)
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'init_chat') {
      this.callbacks[command](parsedData.room_number);
    }
    if (command === 'messages') {
      this.callbacks[command](parsedData.messages);
    }
    if (command === 'new_message') {
      this.callbacks[command](parsedData.message);
    }
  }

  initChatUser(chat) {
    console.log('initChatUser chat', chat)
    this.sendMessage({ command: 'init_chat', chat: chat });
  }

  // 채팅방 나가기
  exitChatRoom(room_number) {
    this.sendMessage({ command: 'exit_room', room_number: room_number });
  }

  fetchMessages(chat) {
    this.sendMessage({ command: 'fetch_messages', chat: chat });
  }

  newChatMessage(message) {
    // 채팅방이 종료되지 않은 경우
    this.sendMessage({ command: 'new_message', from: message.from, text: message.text });
    // 채팅방이 종료된 경우
  }

  addCallbacks(initChatCallback, messagesCallback, newMessageCallback) {
    this.callbacks['init_chat'] = initChatCallback;
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback){
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(
      function () {
        if (socket.readyState === 1) {
          console.log("Connection is made")
          if(callback != null){
            callback();
          }
          return;

        } else {
          console.log("wait for connection...")
          recursion(callback);
        }
      }, 1); // wait 5 milisecond for the connection...
  }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
