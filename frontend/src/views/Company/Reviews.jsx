import React, {useEffect, useState} from "react";
// reactstrap components
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SugubReviewForm from "../../components/Manager/SugubReivewForm";
import {Container} from "reactstrap";

const ReviewsView = (props) => {
    const {user} = props;
    const [comCode, setComCode] = useState([]);
    const {sugubid} = props.match.params;
    useEffect(()=>{
        if(props.comcode) setComCode(props.comcode.filter(v=> (v.code_topidx === 'ZD' && v.code_topcd === null)))
    },[]);

    console.log('props.comcode', props.comcode)
    console.log('comCode', comCode)

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>해당 채용건에 대한 리뷰를 남겨주세요<br/></h3>
                </div>
                <Card>
                    <CardContent>
                        <b>좋았던 점을 말해주세요</b><br/>
                        서비스 퀄리티는 어땠나요? 전문성이 돋보이는 서비스를 받으셨나요? <br/><br/>
                        <b>개선점을 말해주세요</b><br/>
                        어떤점이 아쉬웠나요? 만약 있다면 어떻게 그 점을 개선할 수 있을까요? <br/>
                    </CardContent>
                </Card>
                <hr/>
                <SugubReviewForm user={user} sugubid={sugubid} comCode={comCode}/>
            </Container>
        </div>
    )
};


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        comcode: state.comcode.comcode
    }
}

export default connect(mapStateToProps)(ReviewsView);