import React from "react";
// reactstrap components
import {Card, CardBody, CardFooter, CardHeader,} from "reactstrap";
import {Link} from "react-router-dom";

const ChaeCard = props => {

    const {chaeList, linkInvisible, externelLink} = props;
    console.log('chaeList:', chaeList)

    return (
        <>
            {/*<Link to={`/User/List/${chaeList.id}`}>*/}
                <Card className="card card-chae">
                    <CardHeader>
                        <img
                            className="company-img"
                            alt="..."
                            // src={chaeList.job_image === null ? require("assets/img/logo.jpg") : chaeList.job_image}
                            src={require("assets/img/logo.jpg")}
                            style={{width:220, height:200}}
                        />
                        {/*<h3 className="card-category">{chaeList.sugub.custid}</h3>*/}
                        {/*<h3 className="card-category">*/}

                        {/*    /!*<small>{chaeList.sugub.sugub_jikjong_top_nm}</small>*!/*/}
                        {/*</h3>*/}
                    </CardHeader>
                    <CardBody>

                        {/*<div className="card-icon icon-primary">*/}
                        {/*    <i className="nc-icon nc-spaceship"/>*/}
                        {/*</div>*/}
                        <p className="text-left"><b>{chaeList.jobadvertise_title}</b></p>
                        <div className="description text-left">
                            <b>{chaeList.company_name_yn ? chaeList.company_name : '비공개'}</b>
                        </div>
                        <div className="description text-left">
                            {chaeList.job_reward_type_nm} {chaeList.job_reward_amt1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원[{chaeList.job_reward_way_nm}]
                        </div>
                        {/*<CardTitle tag="h4">*/}
                        {/*{chaeList.salary}*/}
                        {/*{chaeList.sugub.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
                        {/*~*/}
                        {/*{chaeList.sugub.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
                        {/*</CardTitle>*/}
                        {/*<ul>*/}
                        {/*<li>{chaeList.sugub[0].career_codenm}</li>*/}
                        {/*<li>{chaeList.sugub.work_position}</li>*/}
                        {/*<li>{chaeList.sugub.work_load_addr_code}</li>*/}
                        {/*<li>{chaeList.sugub[0].education_codenm}</li>*/}
                        {/*</ul>*/}
                    </CardBody>
                    <CardFooter>
                        {/*이탈율 줄이기 위해 링크 없앰*/}
                        {!linkInvisible &&
                        <Link className="nav-link" to={`/User/List/${chaeList.id}`} target={externelLink &&'_blank'}><p className="text-center">상세보기</p></Link>
                        }
                    </CardFooter>
                </Card>
            {/*</Link>*/}
        </>
    )
}

export default ChaeCard;



