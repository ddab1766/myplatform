import React from "react";
import {Drawer} from "rsuite";
import HrMainSearchModal from "./HrMainSearchModal";

class HrSpecialDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            btnSize: props.btnSize ? props.btnSize : 'btn-lg'
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
        const { placement, show, btnSize } = this.state;

        return (
            <div>
                <button
                    className={`btn btn-info ${btnSize}`}
                    color="danger"
                    onClick={() => this.toggleDrawer('top')}
                >
                    전문직종 등록
                </button>
                <Drawer placement={placement} show={show} onHide={this.close}>
                    <HrMainSearchModal toggle={this.close}/>
                    {/*<Drawer.Header>
                        <Drawer.Title>Drawer Title</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>

                    </Drawer.Body>*/}
                    {/*
                    <Drawer.Footer>
                        <Button onClick={this.close} appearance="primary">
                            Confirm
                        </Button>
                        <Button onClick={this.close} appearance="subtle">
                            Cancel
                        </Button>
                    </Drawer.Footer>*/}
                </Drawer>
            </div>
        );
    }
}

export default HrSpecialDrawer