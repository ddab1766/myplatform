import React from "react";
import {Checkbox, ControlLabel, FormControl, FormGroup, Radio, RadioGroup} from "rsuite";

export class CheckField extends React.PureComponent {
    render() {
        const { filter, name, message, label, accepter, data, topidx, topcd, error, ...props } = this.props;
        const list = data.map((v,index) => {
            if (v.code_topidx === topidx && v.code_topcd === topcd) {
                return (
                    <Checkbox key={index} value={v.code_id}>{v.code_name}</Checkbox>
                )
            } else{
                return null;
            }
        }).filter(o => o);

        return (
            <FormGroup className={error ? 'has-error' : ''}>
                <ControlLabel>{label} </ControlLabel>
                <FormControl
                    name={name}
                    accepter={accepter}
                    errorMessage={error}
                    inline
                    onChange={v=>filter(name,v)}
                >{list}</FormControl>

                {/*<HelpBlock>{message}</HelpBlock>*/}
            </FormGroup>
        );
    }
}