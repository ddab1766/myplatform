import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import {getFAQ} from "../../actions/userActions";

const CommentView = ( props ) => {
    const [comments, setComments] = useState(null);
    useEffect(()=>{
        if(props.location.state){
            setComments(props.location.state.faq)
        }else{
            getFAQ().then(({data})=>{
                setComments(data.filter(v=> v.id === Number(props.match.params.id))[0])
            })
        }
    },[]);
    console.log('comment', comments)
    return comments ? (
        <div className="content">
            <Container>
                <div className="title">
                    <h5>{comments.faq_title}</h5>
                </div>
                <div className="description">
                    {comments.faq_text && comments.faq_text.split('\n').map( line => {
                        return (<span>{line}<br/></span>)
                    })}
                </div>
                {/*<div className="map">
                    {' '}
                </div>*/}
            </Container>
        </div>
    ) : (<></>)
}

export default CommentView;

