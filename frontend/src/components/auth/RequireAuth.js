import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PopupLogin from "./PopupLogin";
import {Modal} from "reactstrap";

export default function(ComposedComponent) {
    class Authentication extends Component {
        constructor(props){
            super(props);
            // this.state = {
            //     loginModal: false
            // }
            // this.toggleModalLogin = this.toggleModalLogin.bind(this);
        }

        state = {
            loginModal: false
        };

        static propTypes = {
            history: PropTypes.object
        };

        componentDidMount() {
            this.checkAuthentication(this.props);
            if(!this.props.authenticated)
                this.setState({loginModal: !this.state.loginModal})
            console.log('Authentication')
        }

        componentDidUpdate(nextProps) {
            this.checkAuthentication(nextProps);
        }

        toggleModalLogin = () => {
            console.log('toggleModalLoing...')
            this.setState(()=>({loginModal: !this.state.loginModal}));
        };

        checkAuthentication(props) {
            if (!props.authenticated) {
                // if(props.location.pathname.match('/Company')){
                //     this.props.history.push('/Company')
                // }else if(props.location.pathname.match('/User')){
                //     this.props.history.push('/User')
                // }else if(props.location.pathname.match('/Hr')){
                //     this.props.history.push('/Hr')
                // }else if(props.location.pathname.match('/Mng')){
                //     this.props.history.push("/auth/login");
                //     // this.props.history.push('/Mng')
                // }
            }
        }

        render() {
            return (
                <>
                    {this.props.authenticated && (<ComposedComponent {...this.props} />)}
                    <Modal isOpen={this.state.loginModal} toggle={this.toggleModalLogin}>
                        <PopupLogin loginSubmit={this.toggleModalLogin}/>
                    </Modal>
                </>
            )
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated }
    }
    return withRouter(connect(mapStateToProps)(Authentication));
}
