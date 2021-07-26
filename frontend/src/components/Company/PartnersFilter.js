import React, {useEffect, useState} from "react";
import store from "../../store";
import {withStyles} from '@material-ui/core/styles';
import {Checkbox} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {COMPANY_JIKJONG} from "../../variables/frequency_jikjong";


const PartnersFilter = (props) => {
    const { partners, searchLists, setSearchLists  } = props;
    const [activeFilter, setActiveFilter] = useState([]);
    const [activeAddressFilter, setActiveAddressFilter] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [partnerFilterList, setPartnerFilterList] = useState([]);
    const [addressFilterList, setAddressFilterList] = useState([]);

    useEffect(() => {
        let comcode = store.getState().comcode.comcode;
        setAddressFilterList(comcode.filter(v => v.code_topidx === 'BE' && v.code_topcd === null)); // 지역
        setFilterList(COMPANY_JIKJONG) // 자주 쓰는 직종
    }, []);

    // 전문직종
    const filterLists = filterList.map((v,index) => {
        return(
            <>
                <label>
                    <GreenCheckbox
                        // checked={state.checkedB}
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        onChange={e => onFilterChange(e)}
                        value={v.jikjong_mid_cd}
                    />
                    {v.jikjong_mid_name}
                </label>
                <br/>
            </>
        )
    })
    // 입점여부
    const partnerFilterLists = () => {
        return (
            <>
                {/*<label>
                    <GreenCheckbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        onChange={e => onFilterChange(e)}
                        value={true}
                    />
                    입점
                </label>
                <label>
                    <GreenCheckbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        onChange={e => onFilterChange(e)}
                        value={false}
                    />
                    미입점
                </label>*/}
            </>
        )
    }

    // 지역
    const addressFilterLists = addressFilterList.map((v,index) => {
        return(
            <>
                <label>
                    <GreenCheckbox
                        // checked={state.checkedB}
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        onChange={e => onAddressFilterChange(e)}
                        value={v.code_id}
                    />
                    {v.code_name}
                </label>
                <br/>
            </>
        )
    })

    const onFilterChange = (e) => {
        if(activeFilter.includes(e.target.value)){
            setActiveFilter(activeFilter.filter(v => e.target.value !== v));
        } else{
            setActiveFilter(activeFilter.concat(e.target.value))
        }
    }
    const onAddressFilterChange = (e) => {
        if(activeAddressFilter.includes(e.target.value)){
            setActiveAddressFilter(activeAddressFilter.filter(v => e.target.value !== v));
        } else{
            setActiveAddressFilter(activeAddressFilter.concat(e.target.value))
        }
    }
    useEffect(() => {
        let filteredList;
        if (activeFilter.length === 0 && activeAddressFilter.length === 0) { // 둘다 미선택
            filteredList = partners;
        } else if (activeFilter.length !== 0 && activeAddressFilter.length === 0){ // 전문직종만 선택
            filteredList = partners.filter(partner =>{
                const temp = partner.hrspecial.map(v => v.hr_jikjong_mid.code_id).map(v=>{
                    return activeFilter.includes(v)
                });
                if(temp.includes(true)) return true;
            });
        } else if(activeFilter.length === 0 && activeAddressFilter.length !== 0){ // 지역만 선택
            filteredList = partners.filter(partner =>{
                return (
                    activeAddressFilter.includes(partner.address && partner.address.code_id)
                )
            });
        } else if(activeFilter.length !== 0 && activeAddressFilter.length !== 0){ // 둘다 선택
            filteredList = partners.filter(partner =>{
                const temp = partner.hrspecial.map(v => v.hr_jikjong_mid.code_id).map(v=>{
                    return activeFilter.includes(v)
                });
                if(temp.includes(true)) return true;
            });
            filteredList = filteredList.filter(partner =>{
                return (
                    activeAddressFilter.includes(partner.address.code_id)
                )
            });

        } else {
            filteredList = partners;
        }
        setSearchLists(filteredList);
    }, [activeFilter, activeAddressFilter]);

    return (
        <>
            <p>파트너스</p>
            {partnerFilterLists()}
            <p>전문직종</p>
            {filterLists}
            {/*<p>지역</p>
            {addressFilterLists}*/}
        </>
    )
};

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



export default PartnersFilter;

