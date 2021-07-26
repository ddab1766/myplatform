import React from "react";
import {ButtonToolbar, Drawer} from "rsuite";
import CompanyMainSearch from "../CompanyMainSearch";

class SugubDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            label: props.label ? props.label : null,
            btnSize: props.btnSize ? props.btnSize : 'btn-lg',
            newComponent: props.newComponent ? props.newComponent : null
        };
        this.close = this.close.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    close() {
        this.setState({
            show: false
        });
    }
    toggleDrawer(placement) {
        this.setState({
            placement,
            show: true
        });
    }

    render() {
        const { placement, show, label, btnSize, newComponent } = this.state;

        return (
            <>
                <ButtonToolbar>
                    {newComponent ?
                        (
                            <button
                                className={`btn btn-signature ${btnSize}`}
                                onClick={() => this.toggleDrawer('top')}
                            >
                                {label}
                            </button>
                        ) :
                        (
                            <button
                                className={`btn btn-signature ${btnSize}`}
                                onClick={() => this.toggleDrawer('top')}
                            >
                                채용의뢰 시작하기
                            </button>
                        )}

                    {/*<IconButton*/}
                    {/*    icon={<Icon icon="angle-down" />}*/}
                    {/*    onClick={() => this.toggleDrawer('top')}*/}
                    {/*>*/}
                    {/*    Top*/}
                    {/*</IconButton>*/}

                </ButtonToolbar>

                <Drawer placement={placement} show={show} onHide={this.close}>
                    <CompanyMainSearch/>
                </Drawer>
            </>
        );
    }
}

export default SugubDrawer
