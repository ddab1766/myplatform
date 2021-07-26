import React, {useState} from "react";
import {Col, Modal, Row} from "reactstrap";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import PopupLogin from "../auth/PopupLogin";
import Chip from "@material-ui/core/Chip";
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import tap from "../../assets/img/tap.svg";
import CardMedia from '@material-ui/core/CardMedia';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
    img:{
      float: 'right',marginRight: '2rem',opacity:'0.7'
    },
    media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));
const SugubCard = (props) => {
    const {authenticated, hr, company} = props;
    const [loginModal, setLoginModal] = useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal);
    const classes = useStyles();

    return  hr && (
        <>
            <Card className="card" key={hr.id} variant="outlined"
                  style={{
                      minHeight: "320px"
                  }}
            >
                <CardContent className="pb-2">
                    <div  style={{fontSize:'1.2em'}}  >
                        <Row>
                            <Col>
                                {/*<div className={classes.root}>*/}
                                {/*    <Avatar alt="Remy Sharp" src={hr.company_logo} style={{width:'30px',height:'30px',margin:'0 0.5rem 0 0'}}/>*/}
                                     <CardMedia
                                        className={classes.media}
                                        image={hr.company_logo ? hr.company_logo : require("assets/img/default-logo.jpg")}
                                        title="Paella dish"
                                      />
                                {/*</div>*/}
                                {/*{sugub.sugub_title.length >= 18 ? sugub.sugub_title.substr(0,18) + '...' : sugub.sugub_title}*/}
                            </Col>
                        </Row>
                    </div>

                    <Row style={{maxHeight:'182px',overflow:'hidden'}}>
                        <Col>
                            <strong>{hr.custname}</strong>
                            <dl>
                                <dt>등록된 이력서</dt>
                                <dd><strong>{hr.resume_count} 개</strong></dd>
                            </dl>
                            <dl>
                                <dt>진행건수</dt>
                                <dd><strong>{hr.jobad_count} 건</strong></dd>
                            </dl>
                            <dl>
                                <dt>리뷰</dt>
                                <dd>
                                    <strong>
                                        {hr.hr_sugub_reviews.length} 건
                                        {hr.hr_sugub_reviews.length > 0 && (
                                            <>
                                                (평점:
                                                {
                                                    hr.hr_sugub_reviews.map(v=> {
                                                        return v.point_avg
                                                    }).reduce(function add(sum, cur) {
                                                        return sum + cur
                                                    })
                                                    / hr.hr_sugub_reviews.length
                                                } 점 )
                                            </>
                                        )}
                                    </strong>
                                </dd>
                            </dl>
                             {/*<p>전문직종</p>*/}
                             <hr/>
                            {/*{hr.hrspecial && hr.hrspecial.map(v2=>{*/}
                            {/*    return (*/}
                            {/*        <Chip variant="outlined" size="small" label={v2.hr_jikjong_mid.code_name} style={{margin:'2px'}}/>*/}
                            {/*    )*/}
                            {/*})}*/}
                        </Col>
                        {/*<Col className="col-auto col-md-3">
                            <dl>
                                <dt>연봉</dt>
                                <dd><strong>{sugub.salary_start} ~ {sugub.salary_end}</strong></dd>
                            </dl>
                            <dl>
                                <dt>성별</dt>
                                <dd><strong>성별무관</strong></dd>
                            </dl>
                        </Col>*/}
                        {/*<Col className="col-auto col-md-3">
                            <dl>
                                <dt>휴학생</dt>
                                <dd><strong>불가능</strong></dd>
                            </dl>
                            <dl>
                                <dt>병역사항</dt>
                                <dd><strong>필</strong></dd>
                            </dl>
                        </Col>
                        <Col className="col-auto col-md-3">
                            <dl>
                                <dt>외국어</dt>
                                <dd><strong>무관</strong></dd>
                            </dl>
                            <dl>
                                <dt>근무부서</dt>
                                <dd><strong>말레이시아 사라왁 PJT</strong></dd>
                            </dl>
                        </Col>*/}
                    </Row>
                    {/*<div className="">
                        <div>연봉 : {sugub.salary_start} ~ {sugub.salary_end}</div>
                        <div>포지션 : {sugub.work_position}</div>
                        <div>계약기간 : {sugub.chae_gigan}개월</div>
                        <dl>
                            <dt>실근무지</dt>
                            <dd>본사 상일동 GEC타워(서울)</dd>
                        </dl>
                        <dl>
                            <dt>담당업무</dt>
                            <dd><strong>{sugub.work_role.split('\n').map(line=>{
                                return ( <>{line}<br/></> )})}</strong></dd>
                        </dl>

                    </div>*/}
                    <br/>
                    
                    <div style={{bottom:'1rem',position:'absolute',width:'100%'}}>
                            <div>
                                {authenticated ? (
                                    <>
                                        {/* Hr 기업 정보 등록 되어 있을 경우*/}
                                        {company ? (
                                            <Link to={{
                                                pathname:`/Company/ProfileDetail/${hr.id}`,
                                                state:{
                                                    hrprofile: hr
                                                }
                                            }} >
                                                {/*<button className="btn btn-danger btn-sm">자세히 보기</button>*/}
                                                <img className={classes.img} src={tap} width="30px" title="자세히 보기" />
                                            </Link>
                                        ):(
                                            <Link to={'/Company/Profile'} onClick={()=>alert('먼저 기업정보를 등록해주세요!')}>
                                                {/*<button className="btn btn-danger btn-sm">자세히 보기</button>*/}
                                                <img className={classes.img} src={tap} width="30px" title="자세히 보기"/>
                                            </Link>

                                        )}
                                    </>
                                ):(
                                    <Link to={'#'} onClick={()=>toggleModalLogin()}>
                                        {/*<button className="btn btn-danger btn-sm" onClick={()=>toggleModalLogin()}>자세히 보기</button>*/}
                                                <img className={classes.img} src={tap} width="30px" title="자세히 보기" />
                                    </Link>
                                )}
                                <Modal isOpen={loginModal} toggle={toggleModalLogin}>
                                    <PopupLogin loginSubmit={toggleModalLogin}/>
                                </Modal>
                            </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
};


function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, {getUserProfile})(SugubCard);

