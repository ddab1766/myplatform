import React from "react";
import {Button, Col, Container, Row} from "reactstrap";
import history from "../../utils/historyUtils";
import {connect} from "react-redux";
import {ThemeProvider} from 'styled-components';
import {theme} from '../../components/Hr/Section/styles';
import Feature from "../../components/Hr/Section/pages/Home/components/Feature";

function SectionNoInfo(props) {
    const {authenticated} = props;
    const handleClick = () => {
        if(authenticated) {
            history.push('/Hr/Profile');
        }else {
            history.push('/Hr/Signup')
        }

    }
    console.log('SectionNoInfo props', props)
    return (
        <div>
            <div className="section">
                {/*<ThemeProvider theme={theme}>
                    <Works/>
                </ThemeProvider>*/}
                <Container className="text-center">
                    <div className="content">
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="8">
                                <h4>
                                    HR기업 담당자 이신가요?
                                </h4>
                                {authenticated ? (
                                    <p className="description">먼저 기업 정보를 입력해주세요!</p>
                                    ):(
                                    <p className="description">
                                        회원가입 후 진행중인 모든 의뢰리스트를 확인하세요!
                                    </p>
                                )}
                            </Col>

                            <Col className="ml-auto mr-auto download-area" md="5">
                                <Button
                                    className="btn-round btn-outline-primary"
                                    color="danger"
                                    onClick={()=>handleClick()}
                                >
                                    지금 등록하기
                                </Button>
                            </Col>

                            <ThemeProvider theme={theme}>
                                <Feature/>
                            </ThemeProvider>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default connect((state)=>{
    return {
        authenticated: state.auth.authenticated
    }
}, null)(SectionNoInfo);
