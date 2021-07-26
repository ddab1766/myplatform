import {Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import React from "react";


const UserCard = (props) => {
    const {info} = props
    console.log('info', info)
    return (
        <>
            <Card className="card card-profile card-user">
                <CardHeader>
                    {/*<h3 className="card-category">{chaeList.sugub.custid}</h3>*/}
                    <h3 className="card-category">
                        {info.username} ({info.status_nm})<br/>
                        <small>{info.email}</small><br/>
                        <small>{info.date_of_birth}</small><br/>
                    </h3>
                </CardHeader>
                <CardBody>
                    <div className="card-icon icon-primary">
                        <img
                            alt="..."
                            className="avatar border-gray"
                            src={require("assets/img/default-avatar.png")}
                        />
                        {/*<i className="nc-icon nc-spaceship"/>*/}
                    </div>
                    <div className="text-center">

                        {info.user_special && info.user_special.length > 0 &&
                            (
                                <>
                                    {info.user_special.map( v => (
                                        <>
                                            <p>{v.jikjong_top_id} > {v.jikjong_mid_id} ({v.career_gigan}년)</p>
                                        </>
                                    ))}
                                </>
                            )
                        }
                    </div>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        </>
    )
};

export default UserCard;