import React from "react";
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const StyleTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'grey'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#1976D2'
    },   
    '&& .MuiInput-underline:hover:before': {
      borderBottomColor: '#1976D2'
    }
  },
})(TextField);
export const TextBox = ({
  id,
  name,
  type,
  onChange,
  value,
  label,
  validationErrors,
  maxChar = 50,
  width = '100%',
  disabled,
  maxLengthCheck
}) => {  
  return (
    <div>
      <StyleTextField
        id={id}
        label={label}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        style={{ borderBottom: validationErrors ? 'solid 1px red' : 'none', width: width }}
        autoComplete="off"
        inputProps={{ maxLength: maxChar}}
        disabled={disabled}
        onInput={maxLengthCheck}
      >
      </StyleTextField>
    </div>
  );
}
TextBox.defaultProps = {
  type: "text",
}

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  // type: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number']),
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired

}


