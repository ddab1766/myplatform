import React, {useEffect, useRef, useState} from 'react'
import {change, Field, formValueSelector, reduxForm, reset} from 'redux-form'
import {renderSelectField} from "utils/renderUtils";
import {connect, useSelector, shallowEqual} from "react-redux";
import store from "../../../store";
import {renderField} from "../../../utils/renderUtils";
import {Card, CardBody} from "reactstrap";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import {isMobile} from "react-device-detect";
import SugubValidate from "./SugubValidate";

const SugubFormStep1 = props => {
    const {handleSubmit, sugub_jikjong_top, sugub_jikjong_mid, sugub_jikjong_low} = props;
    const [jikjongLow, setJikjongLow] = useState([]);
    const [jikjongMid, setJikjongMid] = useState([]);
    const [lowData, setLowData] = useState(sugub_jikjong_low ? sugub_jikjong_low : []);
    const inputRef = useRef(null)

    useEffect(() => {
        if(sugub_jikjong_mid) setJikjongLow(props.comcode.filter(v=> v.code_topcd === sugub_jikjong_mid))
        // props.change('sugub_jikjong_top', sugub_jikjong_top);
        if( props.sec === 'mid' ) {
            // props.change('sugub_jikjong_mid', sugub_jikjong_mid);
            if(props.comcode) setJikjongLow(props.comcode.filter(v=> v.code_topcd === props.code_id))
        }else if(props.sec === 'top'){
            if(props.comcode) setJikjongMid(props.comcode.filter(v=> v.code_topcd === props.code_topcd))
        }
    }, []);

    const onChangeMid = (value) => {
        props.change('sugub_jikjong_low', [])
        setLowData([]);
        let matches = document.getElementsByClassName('MuiChip-primary')
        console.log('matches .length', matches.length)
        while (matches.length > 0) {
            matches.item(0).classList.add('MuiChip-outlined');
            matches[0].classList.remove('MuiChip-primary');
        }
        if(props.comcode) setJikjongLow(props.comcode.filter(v=> v.code_topcd === value))
    };

    const handleClick = (e,data, selected) => {
        if(selected){
            setLowData(lowData.concat(data))
            e.currentTarget.classList.add('MuiChip-primary')
            e.currentTarget.classList.remove('MuiChip-outlined')
        }else{
            setLowData(lowData.filter(v => v != data))
            e.currentTarget.classList.add('MuiChip-outlined')
            e.currentTarget.classList.remove('MuiChip-primary')
        }
    };

    useEffect(()=>{
        if(lowData && lowData.length >=0 ) store.dispatch(change('sugub_wizard', 'sugub_jikjong_low', lowData));
    },[lowData])

    useEffect(()=> {
        console.log('inputRef:', inputRef.current && inputRef.current.children)
        if(inputRef.current && inputRef.current.children){
            console.log('value', inputRef.current.children[0].value)
        }

    }, [jikjongLow])

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    {/* 직종(중) */}
                    {jikjongMid.length > 0 && (
                        <fieldset className="form-group">
                            <Field name="sugub_jikjong_mid" label="해당 직군의 중분류를 선택해주세요" component={renderSelectField}
                                   code_topidx="AA"
                                   code_topcd={props.code_id}
                                   type="text"
                                   options={jikjongMid}
                                   onChange={(e)=>onChangeMid(e.target.value)}
                                   disableOption="중분류"
                                   required={true}
                                //validate={[required({message: "필수 입력사항입니다."})]}
                            />
                        </fieldset>
                    )}
                    {/* 직종(소) 없는경우 */}
                    {jikjongLow.length > 0 && (
                        <>
                            <div style={{marginBottom: '20px',fontSize: '1.1em'}}>해당 직군의 소분류를 선택해주세요(중복가능)</div>
                            <fieldset className="form-group" ref={inputRef}>
                                {jikjongLow.map(data => {
                                    if(lowData.length > 0){
                                        if(lowData.filter(v=> v.code_id === data.code_id).length > 0){
                                            return (
                                                <Chip label={data.code_name}
                                                      value={data.code_id}
                                                      // onDelete={(e)=>console.log('e', e)}
                                                      // deleteIcon={<DoneIcon />}
                                                      onClick={(e) => {handleClick(e,data, false)}}
                                                      color="secondary"
                                                      variant="outlined"
                                                />
                                            )
                                        }else{
                                            return (
                                                <Chip label={data.code_name}
                                                      value={data.code_id}
                                                      onClick={(e) => handleClick(e,data, true)}
                                                      variant="outlined"
                                                />
                                            )
                                        }
                                    } else {
                                        return (
                                            <>
                                                <Chip label={data.code_name}
                                                      value={data.code_id}
                                                      onClick={(e) => handleClick(e,data,true)}
                                                      variant="outlined"
                                                />
                                            </>
                                        )
                                    }
                                })
                                }
                            </fieldset>
                        </>
                    )}
                    <br/>
                    <fieldset className="form-group">
                        <Field name="work_position" label="포지션명이 무엇인가요?" component={renderField}
                               required={true}
                               type="text"
                               placeholder="(예) 수행기사"
                        />
                    </fieldset>
                </CardBody>
            </Card>

            <hr/>
            <div className="ml-auto text-center">
                <button type="submit" className="btn btn-info btn-lg">
                    다음
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-right" />*/}
                    </span>
                </button>
            </div>
        </form>
    )
}

function mapStateToProps(state, props) {
    const selector = formValueSelector('sugub_wizard');
    const sugub_jikjong_low = selector(state, 'sugub_jikjong_low')
    const sugub_jikjong_mid = selector(state, 'sugub_jikjong_mid')
    const sugub_jikjong_top = selector(state, 'sugub_jikjong_top')
    const work_position = selector(state, 'work_position')

    return {
        initialValues: {
            sugub_jikjong_top: props.code_topcd,
            sugub_jikjong_mid: sugub_jikjong_mid ? sugub_jikjong_mid : props.code_id,
            sugub_jikjong_low: sugub_jikjong_low ? sugub_jikjong_low : [],
            work_position: work_position ? work_position : null,
            recuser: state.auth.recuser
        },
        sugub_jikjong_top: sugub_jikjong_top,
        sugub_jikjong_mid: sugub_jikjong_mid,
        sugub_jikjong_low: sugub_jikjong_low,
        comcode: state.comcode.comcode
    }
}
export default connect(mapStateToProps)(reduxForm({
    form: 'sugub_wizard',
    onSubmitSuccess: () => {
        window.scrollTo(0, 0)
    },
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: SugubValidate
})(SugubFormStep1))
