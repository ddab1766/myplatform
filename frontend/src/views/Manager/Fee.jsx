import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getEmployeeList, getFee} from "../../actions/employeeActions"
import {FlexboxGrid, Loader, Panel, SelectPicker} from "rsuite";
import Filter from "../../components/Manager/Fee/Filter";
import FeeContainer from "../../components/Manager/Fee/FeeContainer";
import Nothing from "../../components/Common/Nothing";
import Paginations from "../../components/Manager/Jobap/Paginations";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
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
const Fee = (props) => {
    const [fees, setFees] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [tabValue, setTabValue] = useState(0);
    // 관련 공고 받아오기
    useEffect(() => {
        setLoading(true);
        getFee().then((data) => {
            document.getElementsByClassName('main-panel')[0].scrollTop = 0
            console.log(data);
            setFees(data)
            setTotalPosts(data.count)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })


    }, [reload]);
    const handleTabChange = (e,v) =>{
        setTabValue(v)
    }
    //상태변환시 리로드
    const handleReload = () => {
        setReload(!reload);
    }
    const handleSortChange = (v) => {
        // setFilter({...filter,['ordering']:v});
    }
    return (
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={20}>
                <Panel style={{background:'white'}}>

                    <Filter setEmployees={setFees} setFilter={setFilter} filter={filter} paginate={setCurrentPage}/>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example" indicatorColor="primary" style={{borderTop: '1px solid lightgray',
                        borderBottom: '1px solid lightgray'}}>
                        <Tab label={`파견건`} {...a11yProps(0)} />
                        <Tab label={`채용대행건`} {...a11yProps(1)} />
                    </Tabs>

                    <FlexboxGrid justify="end">
                        <FlexboxGrid.Item >
                            <SelectPicker
                                data={selectData}
                                defaultValue={1}
                                appearance="subtle"
                                searchable={false}
                                style={{ width: 150 }}
                                cleanable={false}
                                onChange={handleSortChange}
                            />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <TabPanel>
                        <div style={{textAlign:'center',padding: '0 20px 0 20px'}}>
                            {!loading ?
                                fees && fees.length > 0 ?
                                    (<>
                                        <FeeContainer tabValue={tabValue} employees={fees} loading={loading} handleReload={handleReload}/>
                                    </>) : (<Nothing text={'해당'}/>)
                                : <Loader content="로딩중..." vertical />}
                        </div>
                        <Paginations totalPosts = {totalPosts} postsPerPage={postsPerPage}
                                     current={currentPage} paginate={setCurrentPage}
                                     setFilter={setFilter} filter={filter} ></Paginations>
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

export default connect(mapStateToProps)(Fee);