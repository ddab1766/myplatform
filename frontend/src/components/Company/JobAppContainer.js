import React, {useEffect, useState} from "react";
import ApplicantTable from "./ApplicantTable";
import ApplicantTable_Mobile from "./ApplicantTable_Mobile"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {appliedStatusFilter} from "../../function/common"
import {Icon, Panel, Steps,Popover} from "rsuite"
import InterviewScheduleModal from "./InterviewScheduleModal";
import Nothing from "../Common/Nothing";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {isMobile} from "react-device-detect"
import { makeStyles, withStyles } from '@material-ui/core/styles';
const CusTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);
const CusTab = withStyles((theme) => ({
  root: {
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
const groupEstimate = (sugub,jobap) => {
    const a = sugub.estimate_sugub.reduce((b,val) => {
            if(!b[val.hrprofile.id]) b[val.hrprofile.id] = [];
            b[val.hrprofile.id] = val;
            return b;
        },{});
        Object.keys(a).map(v=>a[v]).map(v1=>{
            jobap.map((val,index) => {
                if(v1.hrprofile.id === val.hrprofile.id) {
                    console.log(val)
                    if(!a[v1.hrprofile.id].jobap){
                        a[v1.hrprofile.id] = {...a[v1.hrprofile.id], jobap: [] }
                    }
                    a[v1.hrprofile.id].jobap.push(val)
                }
                console.log(a)
            })
        })
        return Object.keys(a).map(v=>a[v]).filter(v=>v.jobap);
}
const JobAppContainer = (props) => {
    const {modal, toggle,sugub} = props;
    const [applicants, setApplicants] = useState([]);
    const [jobap, setJobap] = useState(props.jobap);
    const [filterList, setFilterList] = useState([]);
    const [value, setValue] = useState(0);
    const [val, setVal] = useState(0);
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);
    const [val3, setVal3] = useState(0);
    const [val4, setVal4] = useState(0);
    const [val5, setVal5] = useState(0);
    const [step, setStep] = React.useState(0);

    const getJobApCount = (data) => {
        setVal(appliedStatusFilter(data,0).length)
        setVal1(appliedStatusFilter(data,1).length)
        setVal2(appliedStatusFilter(data,2).length)
        setVal3(appliedStatusFilter(data,3).length)
        setVal4(appliedStatusFilter(data,4).length)
        setVal5(appliedStatusFilter(data,5).length)
    }
    useEffect(() => {
        console.log(jobap)
        setApplicants(jobap);
        getJobApCount(jobap);
        // setFilterList(appliedStatusFilter(jobap,step));
        var filterdJobap = appliedStatusFilter(jobap,step);

        setFilterList(groupEstimate(sugub,filterdJobap));
    },[jobap])

    const handleChange = (newValue) => {
        setValue(newValue);
        setStep(newValue);
        if(newValue === 0){ //신규지원자
            // setFilterList(appliedStatusFilter(applicants,0));
            setFilterList(groupEstimate(sugub,appliedStatusFilter(applicants,0)));
        } else if(newValue === 1){  //서류전형
            // setFilterList(appliedStatusFilter(applicants,1));
            setFilterList(groupEstimate(sugub,appliedStatusFilter(applicants,1)));
        } else if(newValue === 2){  //면접대기
            // setFilterList(appliedStatusFilter(applicants,2));
            setFilterList(groupEstimate(sugub,appliedStatusFilter(applicants,2)));
        } else if(newValue === 3){ //면접결과
            // setFilterList(appliedStatusFilter(applicants,3));
            setFilterList(groupEstimate(sugub,appliedStatusFilter(applicants,3)));
        }else if(newValue === 4){ //최종결과
            // setFilterList(appliedStatusFilter(applicants,4));
            setFilterList(groupEstimate(sugub,appliedStatusFilter(applicants,4)));
        }else if(newValue === 5){ //전체지원자
            // setFilterList(appliedStatusFilter(applicants,5));
            setFilterList(groupEstimate(sugub,appliedStatusFilter(applicants,5)));
        }
    };


    return (
        <>
            <style jsx>{`
                  .rs-steps-item-status-process .rs-steps-item-content .rs-steps-item-title{
                        font-weight:bold;
                        // font-size:17px;
                  }
            `}</style>
            <div>
                {isMobile ?
                    <CusTabs
                        style={{marginLeft: '-16px', marginRight: '-16px' ,
                            borderTop: '1px solid lightgray',
                            // backgroundColor: '#f2f6f9',
                            // borderBottom: '1px solid lightgray'
                        }}
                        value={step}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="on"
                        aria-label="scrollable auto tabs example"
                    >
                        <CusTab icon={<Icon icon="list-ul"/>} label={`전체지원자(${val})`} {...a11yProps(0)} onClick={() => handleChange(0)}/>
                        <CusTab icon={<Icon icon="user-plus" />} label={`신규지원자(${val1})`} {...a11yProps(1)} onClick={() => handleChange(1)}/>
                        <CusTab icon={<Icon icon="file-text" />} label={`서류전형(${val2})`} {...a11yProps(2)} onClick={() => handleChange(2)}/>
                        <CusTab icon={<Icon icon="street-view" />} label={`면접대기(${val3})`} {...a11yProps(3)} onClick={() => handleChange(3)}/>
                        <CusTab icon={<Icon icon="speaker" />} label={`면접결과(${val4})`} {...a11yProps(4)} onClick={() => handleChange(4)}/>
                        <CusTab icon={<Icon icon="twinkle-star" />} label={`최종합격(${val5})`} {...a11yProps(5)} onClick={() => handleChange(5)}/>
                    </CusTabs>
                    :
                    <>
                    <hr/>
                    <Steps current={step}>
                        <Steps.Item title={`전체지원자(${val})`} icon={<Icon icon="list-ul" size="lg"/>}
                                    onClick={() => handleChange(0)} style={{cursor: 'pointer'}}/>
                        <Steps.Item title={`신규지원자(${val1})`} icon={<Icon icon="user-plus" size="lg"/>}
                                    onClick={() => handleChange(1)} style={{cursor: 'pointer'}}/>
                        <Steps.Item title={`서류전형(${val2})`} icon={<Icon icon="file-text" size="lg"/>}
                                    onClick={() => handleChange(2)} style={{cursor: 'pointer'}}/>
                        <Steps.Item title={`면접대기(${val3})`} icon={<Icon icon="street-view" size="lg"/>}
                                    onClick={() => handleChange(3)} style={{cursor: 'pointer'}}></Steps.Item>
                        <Steps.Item title={`면접결과(${val4})`} icon={<Icon icon="speaker" size="lg"/>}
                                    onClick={() => handleChange(4)} style={{cursor: 'pointer'}}/>
                        <Steps.Item title={`최종합격(${val5})`} icon={<Icon icon="twinkle-star" size="lg"/>}
                                    onClick={() => handleChange(5)} style={{cursor: 'pointer'}}/>
                    </Steps>
                     <hr />
                     </>
                }

                {filterList.length > 0 ? (
                    !isMobile ? <ApplicantTable sugub={sugub} applicant={filterList} step={step} setJobap={setJobap} jobap={jobap}/>
                    : <ApplicantTable_Mobile sugub={sugub} applicant={filterList} step={step} setJobap={setJobap} jobap={jobap}/>
                    )
                    : (<Nothing text={'대상자'}/>)}

                <hr />

                {modal && <InterviewScheduleModal modal={modal} toggle={toggle} jobap={jobap} setJobap={setJobap}/>}

            </div>
        </>
    )
}

export default JobAppContainer;