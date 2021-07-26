import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Redirect} from "react-router-dom";

class Logout extends Component {

    static propTypes = {
        logoutUser: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.logoutUser();
    }

    render() {
        if(this.props.location.pathname.match('/Hr')){
            return <Redirect to={'/Hr'}/>
        }else{
            return <Redirect to={'/'}/>
        }
    }
}

export default connect(null, { logoutUser })(Logout);