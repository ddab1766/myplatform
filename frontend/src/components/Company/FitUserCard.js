import {CardBody, CardHeader} from "reactstrap";
import React from "react";


const FitUserCard = (props) => {
    const {fituser} = props;
    // console.log('props user', fituser)
    return (
        <>
            <div className="box">
                <CardHeader>
                    <div className="card-category">{fituser.jikjong_top.code_name} > {fituser.jikjong_mid.code_name}</div>
                </CardHeader>
                <CardBody>
                    <div className="card-icon icon-primary">
                        <img
                            alt="..."
                            className="avatar border-gray"
                            src={require("assets/img/default-avatar.png")}
                        />
                        <p></p>
                        {/*<p>경력 {fituser.career_gigan}년</p>*/}
                        {/*<p>희망연봉 {fituser.hope_salary}만원</p>*/}
                        {/*<i className="nc-icon nc-spaceship"/>*/}
                    </div>
                    <div className="text-center">

                        {/*{info.user_email}<br/>*/}
                        {/*{'구직상태?'}<br/>*/}
                    </div>
                </CardBody>
            </div>
        </>
    )
};

export default FitUserCard;