import React, {Component} from "react";
// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, CardTitle,} from "reactstrap";
import {Link} from "react-router-dom";

class ChaeCard extends Component {

    static defaultPros = {
        info: {
            id : '',
        },
    };

    render() {
        const jobInfo = this.props.info;
        return (
            <>
                <Card className="card-pricing">
                    <CardHeader>
                        <h3 className="card-category">{jobInfo.company_name}</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="card-icon icon-primary">
                            <i className="nc-icon nc-spaceship"/>
                        </div>
                        <CardTitle tag="h3">{jobInfo.salary}</CardTitle>
                        <ul>
                            <li>{jobInfo.dpt_name}</li>
                            <li>{jobInfo.main_work}</li>
                        </ul>
                    </CardBody>
                    <CardFooter>
                        <button className="btn btn-primary">
                            <Link className="nav-link" to={`/User/List/${jobInfo.id}`}>상세보기</Link>
                        </button>
                    </CardFooter>
                </Card>
            </>
        )
    }
}

export default ChaeCard;



