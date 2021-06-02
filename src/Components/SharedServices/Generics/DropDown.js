import React from "react";
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const DropDown = ({
    id,
    name,
    value,
    optionsList,
    optionItem,
    onChange,
    onInputChange,
    label,
    disabled,
    validationErrors
}) => {
    const CssTextField = withStyles({
        root: {
            '& label.Mui-focused': {
                color: 'grey',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#1976D2'
            },
            '&& .MuiInput-underline:hover:before': {
                borderBottomColor: '#1976D2'
            }
        },
    })(TextField);
    return (
        <div>
            <Autocomplete
                id={id}
                name={name}
                value={value}
                options={optionsList}
                getOptionLabel={optionItem}
                getOptionSelected={(
                    option,
                    value,
                ) => value === option.value}
                onChange={onChange}
                onInputChange={onInputChange}
                disabled={disabled}
                renderInput={params => <CssTextField {...params} label={label} margin="normal"
                    style={validationErrors && { borderBottom: 'solid 1px red' }} />}
                autoComplete={false}
            />
        </div>
    );
}


