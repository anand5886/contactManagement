import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#1976D2',
    },
    '&& .MuiInput-underline:hover:before': {
      borderBottomColor: '#1976D2'
    }
  },
})(TextField);

//getting the current date
var tempDate = new Date();
var year = tempDate.getFullYear();
var month = (tempDate.getMonth()+1).toString().length == 1 ? '0' + (tempDate.getMonth()+1).toString() : (tempDate.getMonth()+1).toString();
var date = tempDate.getDate().toString().length == 1 ? '0'+tempDate.getDate().toString() : tempDate.getDate().toString();
const todayDate = year + '-' +  month + '-' + date;

export const DatePicker = ({
  id,
  label,
  width = '100%',
  name,
  value,
  onChange,
  validationErrors,
  disabled,
  disableFutureDate = false
}) => {
  return (    
    <CssTextField
      id={id}
      label={label}
      value={value}
      name={name}
      type="date"
      onChange={onChange}
      disabled={disabled}
      style={{ borderBottom: validationErrors ? 'solid 1px red' : 'none', width: width }}
      InputLabelProps={{
        shrink: true,        
      }}
      InputProps={{ inputProps: { max: disableFutureDate ? todayDate : '' } }}        
    />
  );
}