import React, {useEffect} from "react";
// reactstrap components
import {Breadcrumb, BreadcrumbItem, Container} from "reactstrap";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import {Link, Route} from "react-router-dom";
import RecommendList from "../../components/User/RecommendList";
import SectionRecommend from "./SectionRecommend";


const RecommendView = (props) => {
    const { match } = props;
    const user = props.user;

    useEffect( ()=>{
        if(!user) props.getUserProfile();
    },[user]);

    console.log('recomanedView user', user)

    const menuList = () => {
        return (
            <div>
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a">
                        <Link to={`${match.url}/refer`}>내가 추천한 사람</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag="a">
                        <Link to={`${match.url}/advUrl`}>나의 광고URL</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag="a">
                        <Link to={`${match.url}/custrefer`}>내가 추천한 기업</Link>
                    </BreadcrumbItem>
                    {/*<BreadcrumbItem active tag="a">*/}
                    {/*    <Link to={`${match.url}/received`}>추천 받은 공고</Link>*/}
                    {/*</BreadcrumbItem>*/}
                </Breadcrumb>
            </div>
        );
    };

    return (
        <div className="content">
            <Container>
                { user && (
                    <>
                        <div className="title">
                            <h5>추천현황<br/>
                                <small>채용성공시... 보상금제도란? <br/>
                                    채용보상금 / 소개보상금 / 광고보상금 </small>
                            </h5>
                        </div>

                        {menuList()}
                    </>
                )}
                <Route exact path={match.url}
                       render={() => (
                           <>
                               {user ? (
                                   <h4>
                                       추천<br/>
                                       채용 전문가들의 조언을 얻어, 이력서를 잘 쓸 수 있는 도구를 만들었습니다.<br/>
                                       서류 통과가 잘 되는 이력서를 쉽고 빠르게 작성해 보세요.<br/>
                                       <small>아주 간단한 정보만 입력하세요</small>
                                       <br/>
                                   </h4>
                               ) : (<SectionRecommend/>)}
                           </>
                       )}
                />
                <Route path={`${match.url}/:type`} component={RecommendList}/>
            </Container>
            {/*</div>*/}
        </div>
    )
};


function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {getUserProfile})(RecommendView);
