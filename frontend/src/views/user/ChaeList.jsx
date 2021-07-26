import React, {useEffect, useState} from "react";
import ChaeCard from "components/User/ChaeCard"
// reactstrap components
import {Col, Container, Row} from "reactstrap";
import Chip from "@material-ui/core/Chip";
import {JIKJONGTOP_ALL} from "../../variables/common"
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import {getJobAdvertise} from "../../actions/userActions";
import moment from "moment";

function ChaeListView() {
    const [jobAds, setJobAds] = useState(null);
    const [jikjongTop, setJikjongTop] = useState(JIKJONGTOP_ALL);
    const [selected, setSelected] = useState(
        {'code_id': '', 'code_name': '전체'}
    );

    useEffect(() => {
        // moment(formValues.sugub_end_dt).format('YYYY-MM-DD');
        setJobAds(null); // 상태초기화
        let params = {}
        params.sugub_jikjong_top = selected.code_id;
        params.status = 'CA0300000'; // 공고게시중
        params.jobadvertise_end_dt = moment().format('YYYY-MM-DD');
        getJobAdvertise(params).then((data)=>setJobAds(data));
    }, [selected]);

    return (
        <div className="content">

            <Container>
                <div className="title">
                    <h5>
                        맞춤채용공고<br/>
                        <small>혹시 이런 직종을 찾고 계신가요?</small><br/>
                    </h5>
                    {
                        jikjongTop.map((value, index) => (
                            <>
                                <Chip
                                    key={index}
                                    icon={value.icon}
                                    label={value.code_name}
                                    clickable={true}
                                    color={value.code_id === selected.code_id ? 'primary': 'default'}
                                    // clickableColorSecondary="red"
                                    // classes={{ backgroundColor: 'green' }}
                                    onClick={(e) => {
                                        setSelected({
                                            code_id: value.code_id,
                                            code_name: value.code_name
                                        })
                                    }}
                                    onDelete={value.code_id === selected.code_id ? true: false}
                                    // deleteIcon={<DoneIcon/>}
                                    variant="outlined"
                                />
                            </>
                        ))
                    }
                </div>
                <div className="title">
                    <h4><small>{selected.code_name}</small></h4>
                </div>
                {jobAds ? (
                <Row>
                    {jobAds.map((jobAd, index) => (
                        <Col md="3">
                            <ChaeCard key={index} chaeList={jobAd}/>
                        </Col>
                    ))}
                </Row>
                ):( <LoaderSpinner/>)}
            </Container>
            {/*<Container>
                <div className="title">
                    <h3>추천채용공고</h3>
                </div>
                <Row>
                    {jobAds.map((jobAd) => (
                        <Col md="3">
                            <RecomandChaeCard info={jobAd}/>
                        </Col>
                    ))}
                </Row>
            </Container>*/}
        </div>
    );
}

export default ChaeListView;

