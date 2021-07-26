import React, {Component} from 'react';
import NotificationAlert from "react-notification-alert";


class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            active: false,
            message:''
        }
    }

    componentDidMount() {
        window.notify = this;
    }

    onChange = (message) => {
        var options = {};
        options = {
            place: 'tc',
            message: (
                <div>
                    <div>
                        {/*정상적으로 처리되었습니다.*/}
                        {message}
                    </div>
                </div>
            ),
            type: "info",
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 2
        }
        if(message){
            this.setState({
                progress: 1,
                active: true
            })
            if(this.state.active != false && document.getElementsByClassName('alert-with-icon').length < 1){
                this.refs.notify.notificationAlert(options)
            }
        }
        // if (value === 100) {
        //     // 응답완료 시, initProgress 콜백 호출
        //     this.setState({
        //         active: false,
        //         progress: 0,
        //         message:message
        //     })
        // } else {
        //     // progress 가 변할때마다 state 갱신
        //     this.setState({
        //         progress: value,
        //         active: true
        //     })
        //     if(this.state.active != false && document.getElementsByClassName('alert-with-icon').length < 1){
        //         this.refs.notify.notificationAlert(options)
        //     }
        // }
        // setTimeout(() => {
        //     this.setState({
        //         active: false,
        //         progress: 0
        //     })
        // }, 2000)
    }


    render() {
    return this.state.active  && (
      <div>
          <NotificationAlert ref="notify" zIndex={9999} />
      </div>
    )
  }
}

export default Notifications;