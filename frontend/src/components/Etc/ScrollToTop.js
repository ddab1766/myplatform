import React, { Component } from 'react';
import { withRouter } from 'react-router';
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            document.getElementsByClassName('wrapper')[0].scrollTop = 0;
        } }
            render() {
        return this.props.children
    } }
        export default withRouter(ScrollToTop)

