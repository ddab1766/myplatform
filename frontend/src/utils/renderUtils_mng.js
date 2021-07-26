import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {Col, FormGroup, Input, Label} from "reactstrap"
import Rating from "@material-ui/lab/Rating/Rating";
import styled from "styled-components";

export const renderRatingField = ({input, label, size}) => {
    return (
        <Rating {...input} size={size}/>
    )
}

export const renderReadOnlyField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} type={type} disabled/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const NotRowRenderField = ({ labelSize, colSize, input, label, type, disabled, meta: { touched, invalid, error } }) => (
    <>
        <Label className="col-form-label">{label}</Label>
        <Input className="form-control" {...input} type={type} disabled={disabled}/>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </>
);

export const addrRenderField = ({ labelSize, colSize, input, label, type, disabled, meta: { touched, invalid, error } }) => (
    <>
        <Label className="col-sm-3 col-form-label">{label}</Label>
        <Col sm="3" >
            <Input className="form-control" {...input} type={type} disabled={disabled}/>
        </Col>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </>
);

export const renderField = ({ labelSize, colSize, input, label, type, required, disabled, defaultValue, placeholder, meta: { touched, invalid, error } }) => {
    let valiText;
    if (required) valiText = '필수';
    return (
        <FormGroup row>
            {label && <Label className="" sm="2" sm={labelSize}>{label}<small style={{color:"red"}}> {valiText}</small></Label>}
            <Col md="10" md={colSize} sm="10" sm={colSize}>
                <Input className="form-control" {...input} type={type} disabled={disabled} placeholder={placeholder} defaultValue={defaultValue}/>
                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </Col>

        </FormGroup>
    )
};

export const renderTextAreaField = ({ input, label, type, rows, required, placeholder, defaultValue, disabled, cols, meta: { touched, error } }) => {
    let valiText;
    if (required) valiText = '필수';
    return (
        <FormGroup row>
            <Label sm="3">{label}<small style={{color:"red"}}> {valiText}</small></Label>
            <Col sm="9">
                <Input type="textarea" style={{maxHeight:'none', resize:'auto'}}
                       placeholder={placeholder} className="form-control" {...input} rows={rows} cols={cols}
                       defaultValue={defaultValue}
                       disabled={disabled}
                />
            </Col>
            {/*<textarea style={{maxHeight:'none', resize:'auto'}} placeholder={placeholder} className="form-control" {...input} type={type} rows={rows} cols={cols} />*/}
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </FormGroup>
    )
};
export const renderCheckbox = ({ input, label, id }) => (
    <FormGroup row>
        <Label sm="3">{label}</Label>
        <Col sm="9">
            <input type="checkbox" id={input.name} {...input} checked={input.value ? true : false}/>
        </Col>
    </FormGroup>
)
export const renderError = (errorMessages) => {
    if ( errorMessages) {
        return (
            <div className="alert alert-danger">
                {errorMessages}
            </div>
        )
    }
};
export const test = ({input, label, selectLabel, options, disableOption, disabled, meta: {touched, error}}) => {
    if (!options) return null;
    const list = options.map((value, index) => {
        return(
            <option key={value.id} value={value.id}>{value[selectLabel]}</option>
        )
    });
    if (disableOption) {
        disableOption =
            (
                <option value='0'>{disableOption}</option>
                // <option value='' disabled>{disableOption}</option>
            )
    }
    return(
        <>
            <FormGroup>
                {label && (
                    <label>{label}</label>
                )}
                <select
                    className="form-control" {...input}
                    onChange={value => {
                        input.onChange(value)
                    }}
                    disabled={disabled}
                >
                    {disableOption}
                    {list}
                </select>

                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </FormGroup>
        </>
    )
};
export const SelectField = ({input, label, options, selectLabel, required, name, disabled, meta: {touched, error}}) => {
    if (!options) return null;
    let ix, valiText;
    if(required) valiText = '필수'
    const list = options.map((value, index) => {

        //초기값 세팅
        if(value.id == input.value.id){
            ix = { 'label': value[selectLabel], 'value': value.id };
            //if (input.value.label === undefined) {
            input.value = ix;
            //}
        }
        //목록세팅
        return {
            value:value.id,
            label:value[selectLabel],
            custid:value.custid
        }
    });
    return (
        <>
            <FormGroup row>
                {label && (
                    <Label sm={3}>{label}<small style={{color:"red"}}> {valiText}</small></Label>
                )}
                <Col sm={9}>
                    <Select
                        {...input}
                        options={list}
                        value={input.value}
                        onChange={(value) => input.onChange(value)}
                        onBlur={() => input.onBlur()}
                        isDisabled={disabled}
                        //className="form-control"
                    />

                    {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
                </Col>
            </FormGroup>
        </>
    )
}
export const multiSelectField = ({code_topidx, code_topcd, input, label, required, options, selectLabel, name, disabled, meta: {touched, error}}) => {
    if (!options) return null;
    //초기값 관련
    let ix = [];
    let data = Array.from(input.value);
    let temp = [];
    data.map(v => {
        if(v != null){
            temp.push(v.code_id);
        }
    })

    const list = options.map((value, index) => {

        //초기값 세팅
        if(temp.includes(value.code_id)){
            ix = ix.concat({ label: value.code_name, value: value.code_id});
            //input.value[index] = ix;
        }
        //목룍 세팅
        if (value.code_topidx === code_topidx && value.code_topcd === code_topcd) {
            return {'label': value.code_name, 'value': value.code_id}
        }
    }).filter(o => o);

    // if (input.value) {
    //     input.value = input.value.filter(v => v.value);
    // }
    if (ix.length > 0) {
        input.value = ix;
    }

    return (
        <>
            <FormGroup row>
                {label && (
                    <Label sm={3}>{label}</Label>
                )}
                <Col sm={9}>
                    <Select
                        key={input.value}
                        {...input}
                        isMulti
                        options={list}
                        // defaultValue={list[0]}
                        value={input.value}
                        onChange={(value) => input.onChange(value)}
                        onBlur={() => input.onBlur()}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isDisabled={disabled}
                        //className="form-control"
                    />

                </Col>
                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </FormGroup>
        </>
    )
}

export const renderSelectField = ({input, label, options, code_topidx, code_topcd, disableOption, required, disabled, meta: {touched, error}}) => {
    if (!options) return null;
    let valiText;
    if(required) valiText = '필수'
    const list = options.map((value, index) => {
        // ComCode 테이블 사용 O
        if (value.code_topidx === code_topidx && value.code_topcd === code_topcd) {
            return (
                <option key={index} value={value.code_id}>{value.code_name}</option>
            )
        } else{
            return null;
        }
    }).filter(o => o);
    if (disableOption) {
        disableOption =
            (
                <option value='' >{disableOption}</option>
                // <option value='' disabled>{disableOption}</option>
            )
    }
    return (
        <>
            <FormGroup row>
                {label && (
                    <Label sm={3}>{label}<small style={{color:"red"}}> {valiText}</small></Label>
                )}
                <Col sm={9}>
                    <select
                        className="form-control" {...input}
                        value={input.value.code_id}
                        // defaultValue=''
                        onChange={value => {
                            input.onChange(value);
                        }}
                        disabled={disabled}
                    >
                        {disableOption}
                        {list}
                    </select>
                    {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
                </Col>
            </FormGroup>
        </>
    )
};

export const renderDateField = ({ labelSize, colSize, input, label, type, placeholder, required, defaultValue, disabled, meta: { touched, error } }) => {
    let valiText;
    if(required) valiText = '필수'
    return (
        <FormGroup row>
            {label && (
                <Label sm={3}>{label}<small style={{color:"red"}}> {valiText}</small></Label>
            )}
            <Col sm={4} sm={colSize}>
                <Input
                    {...input}
                    type="date"
                    name="date"
                    disabled={disabled}
                />
                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </Col>
        </FormGroup>
    )
};
export const renderTimeField = ({ input, label, type, placeholder, required, defaultValue, meta: { touched, error } }) => {
    let valiText;
    if(required) valiText = '필수'
    return (

        <FormGroup row>
            {label && (
                <Label sm={3}>{label}<small style={{color:"red"}}> {valiText}</small></Label>
            )}
            <Col sm={4}>
                <Input
                    {...input}
                    type="time"
                    name="time"
                />
            </Col>
        </FormGroup>

    )
};
export const infoField = ({ comp,labelSize, colSize, input, label, type, required, disabled, defaultValue, placeholder, meta: { touched, invalid, error } }) => {
    let valiText;
    if (required) valiText = '필수';
    return (
        <FormGroup row>
            {label && <Label className="" sm="2" sm={labelSize}>{label}<small style={{color:"red"}}> {valiText}</small></Label>}
            <Col sm="10" sm={colSize}>
                <div style={{background:'#f5f5f5',padding:'10px'}}>
                    <dl>
                        <dt>담당자</dt>
                        <dd>이준상</dd>
                    </dl>
                    <dl>
                        <dt>전화번호</dt>
                        <dd>010-8785-1766</dd>
                    </dl>
                    <dl>
                        <dt>이메일</dt>
                        <dd>ddab1766@gmail.com</dd>
                    </dl>
                </div>
            </Col>

        </FormGroup>
    )
};
export const test1 = ({ input, label, name, type, options, code_topidx, code_topcd,placeholder, required,
                          defaultValue, meta: { touched, error }, ...rest }) => {
    const Style_ul = styled.ul`
  display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
                
`;
    const Style_li = styled.li`
  list-style: none;
    display: flex;
    margin: 0 5px 5px 0;
`;

    const SelectLabel = styled.label`
    margin: 0;
      padding: 5px 15px;
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      border: solid 1px #DDD;
      background-color: #FFF;
      line-height: 140%;
      text-align: center;
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
      transition: border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out;
      cursor: pointer;
`
    const RadioLabel = styled.label`
   margin: 0;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    border: solid 1px #DDD;
    background-color: #FFF;
    line-height: 28px;
    text-align: center;
    box-shadow: 0 0 0 rgb(255 255 255 / 0%);
    transition: border-color .15s ease-out, color .25s ease-out, background-color .15s ease-out, box-shadow .15s ease-out;
    cursor: pointer;
    border-radius: 24px;
    height: 30px;
    font-size: 14px;
`
    const RadioInput = styled.input`
    width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
  &:checked + ${SelectLabel}{
        background-color: #4B9DEA;
      color: #FFF !important;
      box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
      border-color: #4B9DEA;
      z-index: 1;
  }
  &:checked + ${RadioLabel}{
        background-color: #4B9DEA;
      color: #FFF !important;
      box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
      border-color: #4B9DEA;
      z-index: 1;
  }
`
    if (!options) return null;
     //초기값 세팅
     //    if(temp.includes(value.code_id)){
     //        ix = ix.concat({ label: value.code_name, value: value.code_id});
     //        //input.value[index] = ix;
     //    }
     //    //목룍 세팅
     //    if (value.code_topidx === code_topidx && value.code_topcd === code_topcd) {
     //        return {'label': value.code_name, 'value': value.code_id}
     //    }
    const list = options.filter(v=>v.code_topidx === code_topidx && v.code_topcd === code_topcd).map((value, index) => {
        return (
            <li >
                <input type="radio" id={value.code_id} name={code_topidx}
                            value={value.code_id} />
                <label htmlFor={value.code_id}>{value.code_name}</label>
            </li>
        )
    })
    return (
        <>
            <FormGroup row>
                {label && (
                    <Label sm={3}>{label}<small style={{color:"red"}}>{required ? '필수' : ''}</small></Label>
                )}
                <Col sm={9}>
                     <ul  {...input} {...rest}  value={input.value.code_id}
                                onChange={(event, value) => input.onChange(value)} >
                         {list}
                     </ul>
                    {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
                </Col>
            </FormGroup>
        </>
    )
};