import React, {useEffect, useState} from "react";
import store from "../../store";
import {withStyles} from '@material-ui/core/styles';
import {Checkbox} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const GreenCheckbox = withStyles({
  root: {
    color: 'rgba(0,0,0,0.17)',
      padding:'5px',
    '&$checked': {
      color:'#00a2df',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const SugubFilter = (props) => {
    const { sugubs, setSearchLists } = props;
    const [activeFilter, setActiveFilter] = useState([]);
    const [filterList, setFilterList] = useState([]);

    useEffect(() => {
        let comcodes = store.getState().comcode.comcode;
        let filters = comcodes.filter(v => v.code_topidx === 'AA' && v.code_topcd === null)
        setFilterList(filters)
    }, []);

    const filterLists = filterList.map((v,index) => {
       // return <label><input type="checkbox" value={v.code_name} onChange={e => onFilterChange(e)} /> {v.code_name}</label>
        return(
        <label>
          <GreenCheckbox
            // checked={state.checkedB}
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            onChange={e => onFilterChange(e)}
            value={v.code_name}
          />
        {v.code_name}
        </label>
      )

    })


    const onFilterChange = (e) => {
        if(activeFilter.includes(e.target.value)){
            setActiveFilter(activeFilter.filter(v => e.target.value !== v));
        } else{
            setActiveFilter(activeFilter.concat(e.target.value))
        }
    }
    useEffect(() => {
        let filteredList;
        if (activeFilter.length === 0) {
            filteredList = sugubs;
        } else {
            filteredList = sugubs.filter(item =>activeFilter.includes(item.sugub_jikjong_top.code_name))
        }
        setSearchLists(filteredList);
    }, [activeFilter]);

    return (
        <>
        {filterLists}
        </>
    )

};

export default SugubFilter;

