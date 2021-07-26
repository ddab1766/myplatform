import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card/Card";
import React from "react";
export default function CPPage(){
return (
<Card variant="outlined">
                    <CardContent>
                        <div className="centered">
                            <img
                                alt="..."
                                className="avatar border-gray centered"
                                width={"300px"}
                                src={require("assets/img/undraw_access_denied_re_awnf.svg")}
                            />
                        </div>
                        <br/>
                        <br/>
                        <div className="centered">
                            <h5>인사담당자 전용 페이지 입니다</h5>
                        </div>
                        <div className="centered">
                            <Link to={'/Hr'} className="btn btn-info">파트너 페이지로 이동</Link>
                            {/*<button className="btn btn-info"></button>*/}
                        </div>

                    </CardContent>
                </Card>
    )
    }