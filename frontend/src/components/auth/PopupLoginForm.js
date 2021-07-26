import React, {useState} from "react";
import {Container} from "reactstrap";
import PopupLogin from "./PopupLogin";
import PopupSignup from "./PopupSignup";

const PopupLoginForm = (props) => {
    const [page, setPage] = useState(1);
    const {handleSubmit, error, submitting, onSubmit, jobInfo} = props;
    const onNextPage = () => setPage(page + 1);
    const onPreviousPage = () => setPage(page - 1);
    console.log('jobInfo:', jobInfo)
    return (
        <Container>
            {page === 1 && (
                <>
                    <PopupLogin onSubmit={handleSubmit} />
                    <p>아직 회원이 아니세요? 간단한 정보입력만으로 지원할 수 있습니다.
                        <button onClick={onNextPage} className="btn">
                            간편 지원하기
                        </button>
                    </p>
                </>
            )}
            {page === 2 && (
                <PopupSignup jobInfo={jobInfo}/>
            )}

            {/*<p>아직 회원이 아니세요? <Link to="/User/signup">회원가입</Link></p>*/}
            {/*<Link to="/User/reset_password">비밀번호 찾기</Link>*/}
        </Container>
    )
}

export default PopupLoginForm;
