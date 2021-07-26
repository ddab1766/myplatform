import React, {useCallback, useEffect, useState} from "react";
import {Col, Container, Row} from "reactstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import Paginations from "../../components/Hr/Paginations"
import SearchField from "react-search-field";
import SugubCard from "./SugubCard"
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card/Card";
import Box from "@material-ui/core/Box";
import {getSugub} from "../../actions/sugubActions";
import CardContent from "@material-ui/core/CardContent";
import Nothing from "../../components/Common/Nothing";
import SugubProcessGuide from "../../components/Company/Sugub/SugubProcessGuide";
import InfoBox from "../../components/Common/InfoBox";
import {getCoworker} from "../../actions/coworkerActions";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <span>{children}</span>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const SugubList = (props) => {
    const [sugubs, setSugubs] = useState([]);
    const [searchLists, setSearchLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    const [sString, setSString] = useState();
    const [value, setValue] = useState(0);
    const [val, setVal] = useState(0);
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);
    const [val3, setVal3] = useState(0);
    const [loader, setLoader] = useState(false);

    const {authenticated, user, company} = useSelector(state => ({
            authenticated: state.auth.authenticated,
            user: state.auth.user,
            company: state.auth.company
        }),
    );

    // tab value
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue == 1){
            setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0100000'));
        } else if(newValue == 2){
            setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0200000'));
        } else if(newValue == 3){
            setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0300000'));
        } else{
            setSearchLists(sugubs)
        }
    };

    const getJobApCount = (data) => {
        setVal(data.length)
        setVal1(data.filter(v => v.sugub_status.code_id === 'CC0100000').length)
        setVal2(data.filter(v => v.sugub_status.code_id === 'CC0200000').length)
        setVal3(data.filter(v => v.sugub_status.code_id === 'CC0300000').length)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchLists]);

    useEffect(() => {
        if(!authenticated) return;
        getSugub().then(data => {
            setLoader(true);
            setSugubs(data.results);
            setSearchLists(data.results);
            getJobApCount(data.results)
        })
        setLoader(false)
    }, []);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

    const handleChangeSearchField = (sString) => {
        const filtered = sugubs.filter(data => {
            return data.sugub_title.toLowerCase().includes(sString.toLowerCase())
        })
        setSString(sString);
        setSearchLists(filtered);
    }
    const noAdvertise = () => {
        return props.sugub.filter(v => v.jobadvertise.length === 0)
    }
    // console.log('state sugub', props.sugub)
    // console.log('noAdvertise', noAdvertise)
    console.log('sugubs', sugubs)

    return (
        <>
            <style jsx>{`
            .searchField { width: 100%; }
            `}</style>
            <div className="content">
                {sugubs && sugubs.map(v => {
                    if(v.jobadvertise && v.jobadvertise.length === 0) {
                        return (<InfoBox text={`채용의뢰서 [${v.sugub_title}] 에 대한 접수요청을 해주세요.`} url={`/Company/ReqJobAd/${v.id}`}/>)
                    }
                })}

                    <Card >
                        <CardContent>
                            <SugubProcessGuide sugubs={sugubs}/>
                        </CardContent>
                    </Card>

                    <br/>

                    <Card>
                        <CardContent>
                            <div >
                                <Row>
                                    {/*<Col  className="col-md-7 col-auto">*/}
                                    {/*    <h5>나의 의뢰내역<small> {searchLists.length}건</small></h5>*/}
                                    {/*</Col>*/}
                                    <Col className="col-md-5">
                                        <div className="text-right">
                                            <SearchField
                                                placeholder="키워드를 입력해주세요"
                                                onChange={handleChangeSearchField}
                                                classNames="searchField"
                                                style={{width:'100px'}}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <hr/>
                            {/*<div>*/}
                            {/*    <SugubFilter sugubs={sugubs} setSearchLists={setSearchLists}/>*/}
                            {/*</div>*/}
                            {/*<hr/>*/}


                            <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary">
                                <Tab label={`전체(${val})`} {...a11yProps(0)} />
                                <Tab label={`검토중(${val1})`} {...a11yProps(1)} disabled={!loader}/>
                                <Tab label={`진행중(${val2})`} {...a11yProps(2)} disabled={!loader}/>
                                <Tab label={`종료(${val3})`} {...a11yProps(3)} disabled={!loader}/>
                            </Tabs>
                            <br/>
                            <TabPanel value={value} index={value}>
                                {loader ?
                                    (searchLists.length > 0 ?
                                    (
                                        <Row>
                                            <Col>
                                                <SugubCard sugubs={currentPosts(searchLists)}
                                                           setSugubs={setSugubs}
                                                           setSearchLists={setSearchLists}
                                                />
                                                <Paginations current={currentPage} postsPerPage={postsPerPage} totalPosts={searchLists.length} paginate={setCurrentPage}></Paginations>
                                            </Col>
                                        </Row>

                                    ):(<Nothing/>)
                                    ) : (<LoaderSpinner/>)}
                            </TabPanel>
                        </CardContent>
                    </Card>
            </div>
        </>
    )
};
//
// function mapStateToProps(state) {
//     return {
//         authenticated: state.auth.authenticated,
//         company: state.auth.company,
//         user: state.auth.user,
//         sugub: state.common
//     }
// }

export default connect()(SugubList);

