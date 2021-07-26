import React from "react";
import {Icon, Steps} from "rsuite";
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    style: {
        width: '200px',
        display: 'inline-table',
        verticalAlign: 'top'
    }
}));

const styles = {
    width: '100%',
    // display: 'inline-table',
    verticalAlign: 'top'
};
const itemStyles = {
    width: '400px',
    color: '#575757',
};

const SugubGuide = (props) => {
    const {authenticated, company} = props
    return (
        <div>

            <Steps vertical style={styles}>
                {authenticated ? (
                        <Steps.Item style={itemStyles}
                                    title="회원가입"
                                    description={<>이메일 또는 SNS 계정으로 10초만에 가입하세요.</>}
                                    status={'finish'}
                        />
                    ) :
                    (
                        <Steps.Item title="채용의뢰서 작성 및 회원가입"
                                    description={<>간략한 정보들을 입력하여 작성합니다. <br/>
                                                   입력하신 정보를 검토 후, 담당자가 연락드립니다.</>}
                                    status={'process'}
                        />
                    )
                }
                {authenticated && (
                    <Steps.Item title="채용의뢰서 작성"
                                description={<>간략한 정보들을 입력하여 작성합니다. <br/>해당 내역을 바탕으로 내부 담당자가 연락드립니다.</>}
                                status={'process'}
                    />
                )}
                {/*<Steps.Item title="공고 요청"
                            description={<>채용에 있어 민감한 정보(회사명/급여 등)를 <br/> 비공개로 진행하도록 요청할 수 있습니다.</>}
                            status={'process'}
                />*/}
                <Steps.Item title="채용 진행"
                            description={<>파트너사에서 해당 채용건에 맞는 인재를 접수합니다.</>}
                            status={'process'}
                />
                <Steps.Item title="지원자 검토 및 합격자 선정"
                            description={<>지원된 이력서를 검토하고 합격자를 선정합니다.</>}
                            status={'process'}
                />
                <Steps.Item style={itemStyles}
                            title={<>완료{' '}<Icon icon={'thumbs-o-up'}/></>}
                            description={<>모든 프로세스가 완료되었습니다. <br/>파트너사와 계약을 진행해주세요.</>}
                            status={'process'}
                />
            </Steps>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company
    }
}
export default connect(mapStateToProps, {})(SugubGuide);