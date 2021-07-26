import React, {useEffect, useState} from "react";
import ApplicantTable from "./ApplicantTable";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {appliedStatusFilter} from "../../../function/common"
import {FlexboxGrid, Icon, Loader, Panel, SelectPicker, Steps} from "rsuite"
// import InterviewScheduleModal from "./InterviewScheduleModal";
import Nothing from "../../Common/Nothing";
import Filter from "./Filter";

const selectData = [
    {
        "label": "최신 등록 순",
        "value": 1,
    },
    // {
    //     "label": "마감 임박 순",
    //     "value": 2,
    // },
    // {
    //     "label": "지원자 순",
    //     "value": 3,
    // },
]
const JobAppContainer = (props) => {
    const {jobap,loading,filter,setFilter,paginate} = props;
    const [step, setStep] = React.useState(0);


    const handleChange = (newValue) => {
        if(newValue === 0){
            delete filter.applied_status
            setFilter({...filter})
        } else if(newValue === 1){
            setFilter({...filter,['applied_status']:'BW0100000',page : 1})
        }else if(newValue === 2){
            setFilter({...filter,['applied_status']:['BW0200000','BW0302000'],page : 1})
        }else if(newValue === 3){
            setFilter({...filter,['applied_status']:'BW0301000',page : 1})
        }else if(newValue === 4){
            setFilter({...filter,['applied_status']:['BW0401000','BW0402000'],page : 1})
        }else if(newValue === 5){
            setFilter({...filter,['applied_status']:'BW0801000',page : 1})
        }

        paginate(1)
        setStep(newValue)
    };

    const handleSortChange = (v) => {
        // setFilter({...filter,['ordering']:v});
    }
    return (
        <>
            <style jsx>{`
                  .rs-steps-item-status-process .rs-steps-item-content .rs-steps-item-title{
                        font-weight:bold;
                        // font-size:17px;
                  }
            `}</style>
            <hr/>
            <Steps current={step} >
                <Steps.Item title={`전체지원자`} icon={<Icon icon="list-ul" size="lg"/>}
                            onClick={() => handleChange(0)} style={{cursor: 'pointer'}}/>
                <Steps.Item title={`신규지원자`} icon={<Icon icon="user-plus" size="lg"/>}
                            onClick={() => handleChange(1)} style={{cursor: 'pointer'}}/>
                <Steps.Item title={`서류전형`} icon={<Icon icon="file-text" size="lg"/>}
                            onClick={() => handleChange(2)} style={{cursor: 'pointer'}}/>
                <Steps.Item title={`면접대기`} icon={<Icon icon="street-view" size="lg" />}
                            onClick={() => handleChange(3)} style={{cursor: 'pointer'}}/>
                <Steps.Item title={`면접결과`} icon={<Icon icon="speaker" size="lg" />}
                            onClick={() => handleChange(4)} style={{cursor: 'pointer'}}/>
                <Steps.Item title={`최종합격`} icon={<Icon icon="twinkle-star" size="lg" />}
                            onClick={() => handleChange(5)} style={{cursor: 'pointer'}}/>
            </Steps>
            <hr />
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
            <div style={{textAlign:'center'}}>
                {!loading ?
                    jobap && jobap.length > 0 ?
                        (<>
                            <ApplicantTable jobap={jobap} step={step} />
                        </>) : (<Nothing text={'해당'}/>)
                    : <Loader content="로딩중..." vertical />}
            </div>
            <hr />
        </>
    )
}

export default JobAppContainer;