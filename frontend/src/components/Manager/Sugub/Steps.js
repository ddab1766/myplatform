import React from 'react';
import {Icon,Steps} from "rsuite";
import { useObserver } from 'mobx-react';
import useStore from './useStore';
import {isMobile} from "react-device-detect";
import {withStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from '@material-ui/core/AppBar';
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
const StepsPanel = () => {
    const { sugub } = useStore();
    const handleChange = (val) => {
        sugub.stepchange(val)
    }
    return useObserver(()=> (
        <>
           { isMobile ?
               <AppBar position="static" color="default">
                <CusTabs
                    style={{
                        marginLeft: '-16px', marginRight: '-16px',
                        // borderTop: '1px solid lightgray',
                        // backgroundColor: '#f2f6f9',
                        // borderBottom: '1px solid lightgray'
                    }}
                    value={sugub.step}
                    onChange={handleChange}
                    scrollButtons="off"
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    // scrollButtons="on"
                    aria-label="scrollable auto tabs example"
                >
                    <CusTab icon={<Icon icon="list-ul"/>} label={`전체지원자`} {...a11yProps(0)}
                            onClick={() => handleChange(0)}/>
                    <CusTab icon={<Icon icon="user-plus"/>} label={`신규지원자`} {...a11yProps(1)}
                            onClick={() => handleChange(1)}/>
                    <CusTab icon={<Icon icon="file-text"/>} label={`서류전형`} {...a11yProps(2)}
                            onClick={() => handleChange(2)}/>
                    <CusTab icon={<Icon icon="street-view"/>} label={`면접대기`} {...a11yProps(3)}
                            onClick={() => handleChange(3)}/>
                    <CusTab icon={<Icon icon="speaker"/>} label={`면접결과`} {...a11yProps(4)}
                            onClick={() => handleChange(4)}/>
                    <CusTab icon={<Icon icon="twinkle-star"/>} label={`최종합격`} {...a11yProps(5)}
                            onClick={() => handleChange(5)}/>
                </CusTabs>
                    </AppBar>
                :
                <Steps current={sugub.step}>
                    <Steps.Item title={`전체지원자`} icon={<Icon icon="list-ul" size="lg"/>}
                                onClick={() => handleChange(0)} style={{cursor: 'pointer'}}/>
                    <Steps.Item title={`신규지원자`} icon={<Icon icon="user-plus" size="lg"/>}
                                onClick={() => handleChange(1)} style={{cursor: 'pointer'}}/>
                    <Steps.Item title={`서류전형`} icon={<Icon icon="file-text" size="lg"/>}
                                onClick={() => handleChange(2)} style={{cursor: 'pointer'}}/>
                    <Steps.Item title={`면접대기`} icon={<Icon icon="street-view" size="lg"/>}
                                onClick={() => handleChange(3)} style={{cursor: 'pointer'}}/>
                    <Steps.Item title={`면접결과`} icon={<Icon icon="speaker" size="lg"/>}
                                onClick={() => handleChange(4)} style={{cursor: 'pointer'}}/>
                    <Steps.Item title={`최종합격`} icon={<Icon icon="twinkle-star" size="lg"/>}
                                onClick={() => handleChange(5)} style={{cursor: 'pointer'}}/>
                </Steps>
        }
        </>
    ));
};

export default StepsPanel;