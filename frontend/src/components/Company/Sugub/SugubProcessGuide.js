import React from "react";
import {Icon, Steps} from "rsuite";
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {isMobile} from "react-device-detect"
import styled from "styled-components";
const useStyles = makeStyles((theme) => ({
    style: {
        width: '200px',
        display: 'inline-table',
        verticalAlign: 'top'
    }
}));

const styles = {
    // width: '500px',
    // display: 'inline-table',
    // verticalAlign: 'top'
};
const itemStyles = {
    // width: '400px',
    // color: '#575757',
};
const p = styled.div`
  
`;
const SugubProcessGuide = (props) => {
    const {authenticated, company, sugubs} = props
    return (
        <div>
            {isMobile ?
                <>
                <div><Icon icon="check" style={{color:'#4caf50'}} size="lg"/><strong> 채용의뢰서 작성</strong></div>
                    <div><strong>2. 검토중</strong><br/> - 의뢰서를 수정하거나 추가정보를 입력해주세요.</div>
                <div><strong>3. 진행중</strong><br/> - 이력서 접수가 시작됩니다. 파트너사에서 인재를 접수하면, 지원자들을 검토해보세요.</div>
                <div><strong>4. 종료</strong><br/>  - 모든 프로세스가 완료되었습니다. 리뷰를 작성 해주세요.</div>
                  </>
                :
                <Steps>
                    {sugubs.length > 0 ? (
                        <Steps.Item title="채용의뢰서 작성"
                                    description=''
                                    status={'finish'}
                        />
                    ) : (
                        <Steps.Item title="채용의뢰서 작성"
                                    description=''
                                    status={'process'}
                        />
                    )}
                    <Steps.Item title="검토중"
                                description={
                                    <>
                                        의뢰서를 수정하거나 추가정보를 <br/>입력해주세요.
                                    </>
                                }
                                status={'process'}
                    />
                    <Steps.Item title="진행중"
                                description={<>이력서 접수가 시작됩니다. <br/>파트너사에서 인재를 접수하면,<br/> 지원자들을 검토해보세요.</>}
                                status={'process'}
                    />
                    <Steps.Item style={itemStyles}
                                title={<>종료{' '}<Icon icon={'thumbs-o-up'}/></>}
                                description={<>모든 프로세스가 완료되었습니다. <br/>리뷰를 작성 해주세요.</>}
                                status={'process'}
                    />
                </Steps>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company
    }
}
export default connect(mapStateToProps, {})(SugubProcessGuide);