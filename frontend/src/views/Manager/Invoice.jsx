import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getEmployeeList, getFee} from "../../actions/employeeActions"
import {FlexboxGrid, Loader, Panel, SelectPicker,Divider} from "rsuite";
import Filter from "../../components/Manager/Invoice/Filter";
import InvoiceContainer from "../../components/Manager/Invoice/InvoiceContainer";
import Nothing from "../../components/Common/Nothing";
// import Paginations from "../../components/Manager/Jobap/Paginations"; api에 적용된버전
import Paginations from "../../components/Hr/Paginations"
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import {Row, Col,Modal, ModalBody} from "reactstrap"
import {thousands} from "../../function/common";
import moment from "moment";
const selectData = [
    {
        "label": "최신 등록 순",
        "value": 1,
    },
    {
        "label": "마감 임박 순",
        "value": 2,
    },
    {
        "label": "지원자 순",
        "value": 3,
    },
]
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
const Invoice = (props) => {
    const [fees, setFees] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        ['created_time_min']:moment(new Date(new Date().setMonth(new Date().getMonth(),1))).format('YYYY-MM-DD'),
        ['created_time_max']:moment(new Date(new Date().setMonth(new Date().getMonth()))).format('YYYY-MM-DD'),
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [tabValue, setTabValue] = useState(0);
    const [modal, setModal] = useState(false);
    const [totalFee, setTotalFee] = useState(0);
    const [pagyeon, setPagyeon] = useState([]);
    const [chaede, setChaede] = useState([]);
    const [searchLists, setSearchLists] = useState([]);
    const toggle = (data) => {
        // setData(data);
        setModal(!modal);
    }
    const sumTotalFee = (data) => {
        var sum = 0;
        data.map(v => {
            sum += parseInt(v.fee);
        });
        return sum;
    }
    // 관련 공고 받아오기
    useEffect(() => {
        setLoading(true);
        getFee(filter).then((data) => {
            console.log(data)
            document.getElementsByClassName('main-panel')[0].scrollTop = 0
            setPagyeon(data.filter(v=>v.contract.chae_cd.code_id === 'AC0100000'));
            setChaede(data.filter(v=>v.contract.chae_cd.code_id === 'AC0300000'));
            if(tabValue === 0){
                setFees(data.filter(v=>v.contract.chae_cd.code_id === 'AC0100000'));
            } else{
                setFees(data.filter(v=>v.contract.chae_cd.code_id === 'AC0300000'));
            }
            setSearchLists(data.filter(v=>v.contract.chae_cd.code_id === 'AC0100000'))
            setTotalPosts(data.count);
            setLoading(false);
            setTotalFee(sumTotalFee(data));
            setCurrentPage(1)
        }).catch(err => {
            setLoading(false);
        })

    }, [reload,filter]);

    const handleTabChange = (e,v) =>{
        setTabValue(v)
        if(v === 0){
            setFees(pagyeon)
            setSearchLists(pagyeon)
        } else{
            setFees(chaede)
            setSearchLists(chaede)
        }
    }
    //상태변환시 리로드
    const handleReload = () => {
        setReload(!reload);
    }
    const handleSortChange = (v) => {
        // setFilter({...filter,['ordering']:v});
    }
     const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
    return (
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={20}>
                <Panel style={{background:'white'}}>
                    <Filter setEmployees={setFees} employees={fees} searchLists={searchLists}
                            setFilter={setFilter} filter={filter} paginate={setCurrentPage}/>
                    <Panel header={`${filter.created_time_max.split('-')[1]}월 총 청구금액`}
                           style={{border:'solid 1px lightgray',fontWeight:'bold'}}>
                        <Row>
                            <Col md={2}>
                                <h3 style={{color:'#1675e0'}}> {thousands(totalFee)}원</h3>
                            </Col>
                            <Col md={2}>
                                <h6>파견건:{pagyeon.length}건  {thousands(sumTotalFee(pagyeon))}원</h6>
                                <h6>채용대행건:{chaede.length}건  {thousands(sumTotalFee(chaede))}원</h6>
                            </Col>
                            {/*<Col>*/}
                            {/*    <h6 style={{color:'red'}}>미정산</h6>*/}
                            {/*</Col>*/}
                        </Row>

                    </Panel>
                    <br/>
                    {/*<Divider>청구내역</Divider>*/}
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example" indicatorColor="primary" style={{borderTop: '1px solid lightgray',
                        borderBottom: '1px solid lightgray'}}>
                        <Tab label={`파견건(${pagyeon.length})`} {...a11yProps(0)} disabled={loading}/>
                        <Tab label={`채용대행건(${chaede.length})`} {...a11yProps(1)} disabled={loading}/>
                    </Tabs>


                    <TabPanel>
                        <div style={{textAlign:'center',padding: '0 20px 0 20px'}}>
                            {!loading ?
                                fees && fees.length > 0 ?
                                    (<>
                                        <InvoiceContainer tabValue={tabValue} employees={currentPosts(fees)}
                                                          loading={loading} handleReload={handleReload}/>
                                    </>) : (<Nothing text={'해당'}/>)
                                : <Loader content="로딩중..." vertical />}
                        </div>

                        <hr/>
                        <Paginations current={currentPage} postsPerPage={postsPerPage}
                                     totalPosts={fees.length} paginate={setCurrentPage}></Paginations>
                    </TabPanel>
                </Panel>

            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
};


function mapStateToProps(state) {
    return {
        // user: state.auth.user,
        // company: state.auth.company
    }
}

export default connect(mapStateToProps)(Invoice);