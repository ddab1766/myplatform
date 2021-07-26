import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap"
import ReactDatetime from "react-datetime";
import Select from "react-select";
import MuiSelect from "@material-ui/core/Select"
import TagsInput from "react-tagsinput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import AsyncSelect from "react-select/async/dist/react-select.esm";
import AsyncCreatableSelect from 'react-select/async-creatable';
import store from "../store";
import {change, Field} from "redux-form";
import axios from "axios";
import {AuthUrls} from "../constants/urls";
import Rating from "@material-ui/lab/Rating/Rating";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import moment from "moment";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/ko'
import NumberFormat from 'react-number-format';
import InputMask from "react-input-mask";

export const addrRenderField = ({ labelSize, colSize, input, label, type, disabled, meta: { touched, invalid, error } }) => (
    <>
        <Label className="col-sm-2 col-form-label">{label}</Label>
        <Col sm="2" >
            <Input className="form-control" {...input} type={type} disabled={disabled}/>
        </Col>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </>
);
export const rowRenderField = ({ labelSize, colSize, input, label, type, disabled, meta: { touched, invalid, error } }) => (
    <FormGroup row>
        <Label className="" sm="2" sm={labelSize}>{label}</Label>
        <Col sm="10" sm={colSize}>
            <Input className="form-control" {...input} type={type} disabled={disabled}/>
        </Col>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </FormGroup>
);
export const multiSelectField = ({code_topidx, code_topcd, input, label, options, selectLabel, name, disabled, meta: {touched, error}}) => {
    if (!options) return null;
    let ix = [];

    const list = options.map((value, index) => {
        //초기값 세팅
        if(input.value.includes(value.code_id)){
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
                    <Label sm={2}>{label}</Label>
                )}
                <Col sm={8}>
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
                        //className="form-control"
                    />
                </Col>
                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </FormGroup>
        </>
    )
}
export const SelectField = ({input, label, options, selectLabel, name, disabled, meta: {touched, error}}) => {
    if (!options) return null;
    let ix;

    const list = options.map((value, index) => {

        //초기값 세팅
        if(value.id == input.value){
            ix = { 'label': value[selectLabel], 'value': value.id };
            //if (input.value.label === undefined) {
            input.value = ix;
            //}
        }
        //목록세팅
        return {
            value:value.id,
            label:value[selectLabel]
        }
    });
    return (
        <>
            <FormGroup row>
                {label && (
                    <Label sm={2}>{label}</Label>
                )}
                <Col sm={8}>
                    <Select
                        {...input}
                        options={list}
                        value={input.value}
                        onChange={(value) => input.onChange(value)}
                        onBlur={() => input.onBlur()}
                        //className="form-control"
                        isDisabled={disabled}
                    />

                    {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
                </Col>
            </FormGroup>
        </>
    )
}
// Elastic Cloud
// const filterJikjong = (inputValue) => {
//     let value = '';
//     return axios.get(AuthUrls.JIKJONG_INFO, {
//         headers: {
//             "Content-Type": 'application/json',
//             // "Authorization": 'Bearer ' + 'search-6t936jo8phghiwrg4ymhehbt'
//             // "Authorization": 'Bearer ' + 'search-wkazoidctvjstbwpcqk7q8tu'
//             "Authorization": 'Bearer ' + 'search-7edrmm2tjm8wityuvt4hsv8k'
//         },
//         params: {
//             query: inputValue
//         }
//     }).then(({data})=>{
//         if(data.results.length > 0) {
//             value = data.results.map( v => {
//                     console.log('v:', v);
//                     return {
//                         jikjong_low_cd: v.jikjong_low_cd.raw,
//                         jikjong_low_name: v.jikjong_low_name.raw,
//                         pagyeon_code: v.pagyeon_code.raw,
//                         jikjong_mid_cd: v.jikjong_mid_cd.raw,
//                         jikjong_mid_name: v.jikjong_mid_name.raw,
//                         label: v.jikjong_low_name.raw
//                     }
//                 }
//             )
//         }
//         return value
//     })
// };
const filterCompany = (inputValue) => {
    let value = '';

    return axios.get(AuthUrls.COMPANY_INFO, {
        headers: {
            "Content-Type": 'application/json',
        },
        params: {
            search: inputValue,
            index: 'company'
        }
    }).then( ({data}) => {
        // 자체
        if(data.data.length > 0){
            value = data.data.map( v => {
                return {
                    custid: v.custid,
                    label: v.label + ' / ' + v.custid,
                    custname1: v.label,
                    // custname: v.label,
                    emp_count: v.emp_count,
                    gross_total: v.gross_total,
                    load_addr: v.address,
                    homepage: v.website
                }
            })
        }
        // ES Cloud
        // if(data.results.length > 0) {
        //     value = data.results.map( v => {
        //             console.log('v:', v);
        //             return {
        //                 custid: v.custid.raw,
        //                 label: v.label.raw,
        //                 emp_count: v.emp_count.raw,
        //                 gross_total: v.gross_total.raw
        //             }
        //         }
        //     )
        // }
        return value
    }).then(value1 => {
        return value1
    }).catch((err)=>{
        return inputValue
    })
};

const promiseOptions = inputValue =>
    // const timeoutRef =useRef(null);
    new Promise(resolve => {
        // todo CompanyProfile에 존재하면
        // todo 존재하지 않으면
        if (inputValue.length >= 2) {
            setTimeout(() => {
                console.log('inputValues..:', inputValue)
                resolve(filterCompany(inputValue));
                // value = filterCompany(inputValue);
            }, 1500);
        }
        console.log('resolve:', resolve)
        // return value
    })


export const renderMuiField = ({input, label, type, placeholder, meta: {touched, error}}) => (
    <FormControl>
        <FormLabel component="legend">{label}</FormLabel>
        <TextField
            {...input}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
        />
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </FormControl>
);

const customInput = props => <input {...props} className="form-control"/>
export const renderNumberField = ({ input, placeholder, inputAddonText, meta: {asyncValidating, touched, error} }) => {
    return (
        <InputGroup>
            <NumberFormat
                {...input}
                isNumericString={true}
                customInput={customInput}
                thousandSeparator={true}
                placeholder={placeholder}
            />
            <InputGroupAddon addonType="append">
                <InputGroupText>
                    {inputAddonText}
                </InputGroupText>
            </InputGroupAddon>
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </InputGroup>
    )
}

// value 제거
export const renderField = ({input, label, type, placeholder, disabled, required, inputAddon, inputAddonText,
                                meta: {asyncValidating, touched, error}}) => {
    if(input.value===null) input.value = "";
    if(type === 'number'){
        if(input.value < 0) input.value = 0
    }
    return (
        <div>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            {inputAddon ? (
                <InputGroup>
                    <input className="form-control" {...input} type={type} placeholder={placeholder} disabled={disabled} />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            {inputAddonText}
                        </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            ):(
                <div className={asyncValidating ? 'async-validating' : ''}>
                    <input className="form-control" {...input} type={type} placeholder={placeholder} disabled={disabled} />
                </div>
            )}
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </div>
    )
};

export const renderPhoneNumberField = ({input, label, required, placeholder, meta: {touched, error}}) => {
    return (
        <>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            <InputMask
                {...input}
                mask="999-9999-9999"
            >
                {inputProps => <input className="form-control" placeholder={placeholder} {...inputProps}/>}
            </InputMask>
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </>
    )
};

export const renderFileField = ({input, label, type, placeholder, disabled, meta: {asyncValidating, touched, error}}) => {
    const handleChange = (event, input) => {
        event.preventDefault();
        let imageFile = event.target.files[0];
        if (imageFile) {
            const localImageUrl = URL.createObjectURL(imageFile);
            const imageObject = new window.Image();

            imageObject.onload = () => {
                imageFile.width = imageObject.naturalWidth;
                imageFile.height = imageObject.naturalHeight;
                input.onChange(imageFile);
                URL.revokeObjectURL(imageFile);
            };
            imageObject.src = localImageUrl;
        }
    };
    return (
        <div>
            테스트 FileFields
            <input
                name={input.name}
                type={type}
                onChange={event => handleChange(event, input)}
            />
        </div>
    );
};


export const renderArrayFields = ({ fields, meta: { error } }) => (
    <ul>
        {fields.map((option, index) => (
            <li key={index}>
                <div className="input-group">

                    <Field
                        name={option}
                        type="text"
                        component={renderField}
                        // label={`Option #${index + 1}`}
                    /><button
                    type="button" className="btn"
                    title="삭제"
                    onClick={() => fields.remove(index)}
                ><i className="nc-icon nc-simple-delete"/></button>
                </div>

            </li>
        ))}
        <li>
            <button type="button" className="btn" onClick={() => fields.push()}>
                <i className="nc-icon nc-simple-add"/>
                옵션추가
            </button>
        </li>
        {error && <li className="error">{error}</li>}
    </ul>
)


export const renderAsyncCreatableSelectField = ({input, label, disabled, required, meta: {form, touched, error}}) => {
    return (
        <div>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>) }
                </label>
            )}
            <AsyncCreatableSelect
                {...input}
                isClearable
                isDisabled={disabled}
                placeholder={''}
                // loadingPlaceholder='load...'
                cacheOptions
                defaultOptions
                loadOptions={promiseOptions}
                value={input.value}
                onBlur={() => {
                    input.onBlur()
                }}
                onChange={(value) => {
                    store.dispatch(change(form, 'custid', null));
                    store.dispatch(change(form, 'custname', null));
                    store.dispatch(change(form, 'emp_count', null));
                    store.dispatch(change(form, 'gross_total', null));
                    store.dispatch(change(form, 'load_addr', null));
                    store.dispatch(change(form, 'homepage', null));
                    if(value){
                        input.onChange({custid: value.custid, custname1: value.custname1, label:value.label});
                        // input.onChange({custid: value.custid, label:value.label});
                        Object.keys(value).map((v) => {
                            store.dispatch(change(form, v.toLowerCase(), value[v]))
                        })
                    } else{
                        input.onChange(null);
                    }
                }}
            />
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </div>
    )
}

export const renderAsyncSelectField = ({input, label, disabled, meta: {asyncValidating, touched, error}}) => {
    return (
        <div>
            <label>{label}</label>
            <div className={asyncValidating ? 'async-validating' : ''}>
                <AsyncSelect
                    {...input}
                    isDisabled={disabled}
                    value={input.value}
                    onBlur={() => {
                        input.onBlur()
                    }}
                    onChange={(value) => {
                        input.onChange(value);
                        Object.keys(value).map((v) => {
                            store.dispatch(change('companyupdate', v.toLowerCase(), value[v]))
                        });
                    }}
                    // onKeyPress={(e)=>{e.key === 'Enter' && e.preventDefault()}}
                    // cacheOptions
                    defaultOptions loadOptions={promiseOptions}/>
            </div>

            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </div>
    );

};

export const renderRatingField = ({input, label}) => {
    return (
        <Rating {...input} size="large"/>
    )
}

export const renderMuiCheckbox = ({input, label}) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}
        />
    </div>
)

export const renderMuiSelectField = ({input, label, options, code_topidx, code_topcd, meta: {touched, error}}) => {
    const list = options.map((value, index) => {
        if (value.code_topidx === code_topidx && value.code_topcd === code_topcd) {
            return (
                <MenuItem value={value.code_id}>{value.code_name}</MenuItem>
            )
        }
        return null;
    });
    return (
        <FormControl variant="outlined" /*className={classes.formControl}*/>
            <FormLabel component="legend">{label}</FormLabel>
            {/*<InputLabel>{label}</InputLabel>*/}
            <MuiSelect
                {...input}
                onChange={input.onChange}
            >
                {list}
            </MuiSelect>
        </FormControl>
    )
}

export const renderMuiRadioField = ({input, label, options, code_topidx, code_topcd, defaultValue, meta: {touched, error}}) => {
    let list;
    if (code_topidx) {
        list = options.map((option, index) => {
            if (option.code_topidx === code_topidx && option.code_topcd === code_topcd) {
                return (
                    <FormControlLabel key={index}
                                      value={option.code_id}
                                      control={<Radio/>}
                                      label={option.code_name}/>
                )
            }
            return null;
        });
    } else {
        return (
            <FormControlLabel value={options.answer_comment}
                              control={<Radio/>}
                              label={options.answer_comment}/>
        )
    }
    return (
        <div>
            <FormControl>
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup row {...input}
                            defaultValue={defaultValue}
                            valueSelected={input.value}
                            onChange={(e) => input.onChange(e.target.value)}
                >
                    {list}
                </RadioGroup>
                <span className="form-check-sign">{''}</span>
                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </FormControl>
        </div>
    )
};
export const renderCheckbox = ({ input, label, id }) => (
    <div className="checkbox form-group">
        <label htmlFor={input.name} >{label}&nbsp;</label>
        <input type="checkbox" id={input.name} {...input} checked={input.value ? true : false}/>
    </div>
)
export const renderCheckboxField = ({input, label, required, type, meta: {touched, error}}) => {
    // console.log('input value', input.value)
    if(input.value === ''){
        console.log('null!')
    }
    return (
        <FormGroup check>
            <Label check>
                <Input {...input}
                       type={type}
                       checked={this}
                       defaultChecked={input.value === '' ? true : input.value }
                />
                {label}
                {/*{required && (<small style={{color:"red"}}> 필수</small>)}*/}
                <span className="form-check-sign">{''}</span>
            </Label>
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </FormGroup>
    )
};

export const renderRadioField = ({input, label, options, defaultChecked, type, code_topidx, code_topcd, selectValue, required, meta: {touched, error}}) => {
    console.log('renderRadioField input', input)
    console.log('renderRadioField selectValue', selectValue)
    if (options) {
        const list = options.map((option, index) => {
            if (option.code_topidx === code_topidx && option.code_topcd === code_topcd) {
                if(option.code_id === selectValue){
                    return (
                        //<li>
                        <div className="form-check-radio">
                            <Label check >
                                <Input {...input} type={type}
                                       value={option.code_id}
                                    // value={input.value}
                                       onChange={(e) => input.onChange(e.target.value)}
                                       checked={true}
                                /> {option.code_name} <span className="form-check-sign" />
                                <span className="form-check-sign">{''}</span>
                            </Label>
                        </div>
                        // </li>
                    )
                }else{
                    return (
                        //<li>
                        <div className="form-check-radio">
                            <Label check >
                                <Input {...input} type={type}
                                       value={option.code_id}
                                    // value={input.value}
                                       onChange={(e) => input.onChange(e.target.value)}
                                       checked={false}
                                /> {option.code_name} <span className="form-check-sign" />
                                <span className="form-check-sign">{''}</span>
                            </Label>
                        </div>
                        // </li>
                    )
                }

            }
            return null;
        });
        return (
            <>
                {label && (
                    <label>
                        {label}
                        {required && (<small style={{color:"red"}}> 필수</small>)}
                    </label>
                )}
                {list}

                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </>
        )
    } else {
        return (
            <div className="form-check-radio">
                <Label check>
                    <Input {...input}
                           type={type}
                           checked={this}
                           defaultChecked={defaultChecked}
                    />
                    {label}
                    <span className="form-check-sign">{''}</span>
                </Label>
                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </div>
        )
    }
};

export const renderTagField = (props) => {
    let {onChange, value, addTag, ...other} = props;
    console.log('renderTagField: ', props);
    return (
        <TagsInput
            value={value}
            onChange={onChange}
            tagProps={{className: "react-tagsinput-tag"}}
            inputProps={{placeholder: 'Tag 입력'}}
        />
        /* <input type='text' onChange={onChange} value={value} {...input} />*/
    )
}


export const renderMultiSelectField = ({input, label, options, code_topidx, code_topcd, disabled, multi, className, meta: {touched, error}}) => {
    let list = options.map(value => {

        // ComCode 테이블 사용 X
        if (code_topcd === undefined && code_topidx === undefined ){
            return {...value, 'label': value.code_name, 'value': value.code_id}
        }
        // ComCode 테이블 사용 O
        if (value.code_topidx === code_topidx && value.code_topcd === code_topcd) {
            return {...value, 'label': value.code_name, 'value': value.code_id}
        }
        return null;
    }).filter(o => o);

    // 직종(소) ["AA0103000", ... ] 형태 => [ {label: '', value: ''}, ...]
    // if (input.value && typeof input.value[0] !== 'object' ){
    //     input.value = input.value.map( (value) => {
    //         return list.filter( v => v.code_id === value )[0]
    //     })
    // }
    // console.log('renderMultiSelectField input.value 1', input.value);
    if (input.value){
        input.value = input.value.map( (value) => {
            // console.log('value?', value)
            return {...value, 'label': value.code_name, 'value': value.code_id}
        })
    }
    // console.log('renderMultiSelectField input.value 2', input.value);

    return (
        <>
            <label>{label}</label>
            <Select {...input}
                    className="react-select"
                    classNamePrefix="react-select"
                    onChange={(value) => {
                        input.onChange(value)
                    }}
                    onBlur={() => {
                        input.onBlur()
                    }}
                    isMulti={multi && true}
                    options={list}
            />
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </>
    )
};
export const renderRowSelectField = ({input, label, options, code_topidx, code_topcd, disableOption, disabled, meta: {touched, error}}) => {
    if (!options) return null;
    const list = options.map((value, index) => {
        // ComCode 테이블 사용 O
        if (value.code_topidx === code_topidx && value.code_topcd === code_topcd) {
            return (
                <>
                    <option key={index} value={value.code_id}>{value.code_name}</option>
                </>
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
                    <Label sm={2}>{label}</Label>
                )}
                <Col sm={10}>
                    <select
                        className="form-control" {...input}
                        // defaultValue=''
                        onChange={value => {
                            input.onChange(value);
                        }}
                        disabled={disabled}
                    >
                        {disableOption}
                        {list}
                    </select>
                </Col>
                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </FormGroup>
        </>
    )
};
export const renderSelectField = ({input, label, options, code_topidx, code_topcd, disableOption, disabled, required, meta: {touched, error}}) => {
    if (!options) return null;
    const list = options.map((value, index) => {

        // ComCode 테이블 사용 X
        if ( code_topidx === undefined && code_topcd === undefined ) {
            return <option value={value.value}>{value.label}</option>
        }
        // ComCode 테이블 사용 O
        if (value.code_topidx === code_topidx ) {
            if(value.code_id === input.value)
                return <option key={index} value={value.code_id} selected={true}>{value.code_name}</option>
            else{
                return <option key={index} value={value.code_id}>{value.code_name}</option>
            }
        }
        return null;
    });
    if (disableOption) {
        disableOption =
            (
                <option value='' selected={true}>{disableOption}</option>
            )
    }

    return (
        <>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            <select
                className="form-control" {...input}
                value={input.value ? input.value.code_id : input.value}
                // defaultValue={input.value && input.value.code_id}
                onChange={value => {
                    input.onChange(value)
                }}
                disabled={disabled}
            >
                {disableOption}
                {list}
            </select>

            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </>
    )
};

export const renderMuiDateField = ({input, label, required, meta: {touched, error}}) => {
    const currentDate = moment().format('YYYY-MM-DD');
    console.log('mul date: ', currentDate)
    return (
        <div>
            <FormControl>
                {label && (
                    <label>
                        {label}
                        {required && (<small style={{color:"red"}}> 필수</small>)}
                    </label>
                )}
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                    <KeyboardDatePicker
                        autoOk
                        disablePast={true}
                        disableToolbar
                        variant="inline"
                        format="yyyy-MM-dd"
                        maskChar="yyyy-MM-dd"
                        margin="normal"
                        value={input.value ? input.value : null}
                        onChange={(value) => input.onChange(moment(value).format('YYYY-MM-DD'))}
                        onBlur={() => input.onBlur()}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                {/* <TextField {...input}
                           // id="date"
                    //label="채용마감일"
                           type="date"

                           // defaultValue={currentDate}
                    // className={classes.textField}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />*/}
                {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
            </FormControl>
        </div>
    );
};

export const renderMuiMonthPicker = ({input, meta:{touched, error}}) => (
    <form  noValidate>
        <TextField
            id="date"
            label="Birthday"
            type="date"
            // defaultValue="2017-05-24"
            // className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />
    </form>
)

export const renderDatePicker = ({input, label, placeholder, defaultValue, meta: {touched, error}}) => (
    <FormGroup>
        <div>{label}</div>
        <InputGroup className="date" id="datepicker">
            <ReactDatetime
                {...input}
                closeOnSelect={true}
                dateFormat="YYYY-MM-DD"
                inputProps={{
                    placeholder: ""
                }}
                timeFormat={false}
            />
            <InputGroupAddon addonType="append">
                <InputGroupText>
            <span className="glyphicon glyphicon-calendar">
              <i aria-hidden={true} className="fa fa-calendar"/>
            </span>
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    </FormGroup>
);




export const renderMonthPicker = ({input, label, placeholder, defaultValue, meta: {touched, error}}) => (
    /*<div> {label} <br/>
          <DatePicker {...input} dateForm="YYYY/MM/DD" />
          {touched && error && <span>{error}</span>}
    </div>*/
    <FormGroup>
        <div>{label}</div>
        <InputGroup className="date">
            <ReactDatetime
                {...input}
                closeOnSelect={true}
                dateFormat="YYYY-MM"
                inputProps={{
                    readOnly: true,
                    placeholder: ""
                }}
                locale="ko-kr"
                timeFormat={false}
            />
            <InputGroupAddon addonType="append">
                {/*<InputGroupText>*/}
                {/*    <span className="glyphicon glyphicon-calendar">*/}
                {/*      <i aria-hidden={true} className="fa fa-calendar"/>*/}
                {/*    </span>*/}
                {/*</InputGroupText>*/}
            </InputGroupAddon>
        </InputGroup>
    </FormGroup>
);

export const renderDateTimePicker = ({input, label, placeholder, defaultValue, meta: {touched, error}}) => (
    /*<div> {label} <br/>
          <DatePicker {...input} dateForm="YYYY/MM/DD" />
          {touched && error && <span>{error}</span>}
    </div>*/
    <FormGroup>
        <div>{label}</div>
        <InputGroup className="date" id="datetimepicker">
            <ReactDatetime
                inputProps={{
                    placeholder: ""
                }}
            />
            <InputGroupAddon addonType="append">
                <InputGroupText>
            <span className="glyphicon glyphicon-calendar">
              <i aria-hidden={true} className="fa fa-calendar"/>
            </span>
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    </FormGroup>
);

export const renderJsonField = ({input, label, type, meta: {touched, error}}) => {
    // console.log('input value:', input.value)
    // const obj = JSON.stringify(input.value)
    // const questions = Object.keys(input.value).map((q) => {
    //     console.log('value:', q)
    //     return q
    // }).filter(o => o)
    const obj = Object.entries(input.value).map( ([key, value]) => {
            return key + value + '\n'
        }
    );

    return (
        <div>
            <label>{label}</label>
            <div>
                <textarea className="form-control" {...input} type={type} value={obj} disabled={true}/>
            </div>
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </div>
    )
};

export const renderTextAreaField = ({input, label, type, placeholder, disabled, required, meta: {touched, error}}) => (
    <div>
        {label && (
            <label>
                {label}
                {required && (<small style={{color:"red"}}> 필수</small>)}
            </label>
        )}
        <div>
            <TextareaAutosize className="form-control" style={{'max-height': '100%'}} rowsMin={5} {...input} type={type} placeholder={placeholder} disabled={disabled}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);
export const renderErpTextAreaField = ({ input, label, type, rows, placeholder, cols, meta: { touched, error } }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <Input type="textarea" style={{maxHeight:'none', resize:'auto'}} placeholder={placeholder} className="form-control" {...input} rows={rows} cols={cols} />
            {/*<textarea style={{maxHeight:'none', resize:'auto'}} placeholder={placeholder} className="form-control" {...input} type={type} rows={rows} cols={cols} />*/}
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);
export const renderError = (errorMessages) => {
    if (errorMessages) {
        return (
            <div className="alert" style={{color:'red'}}>
                {errorMessages}
            </div>
        )
    }
};
export const renderDateField = ({ input, label, type, placeholder, required, defaultValue, meta: { touched, error } }) => {
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
                    type="date"
                    name="date"
                />
            </Col>
        </FormGroup>
    )
};
