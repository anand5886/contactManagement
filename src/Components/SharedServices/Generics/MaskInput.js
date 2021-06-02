import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputMask from "react-input-mask";
const StyleTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "grey",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1976D2",
    },
    "&& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1976D2",
    },
  },
})(TextField);
export const MaskInput = ({
  id,
  name,
  type,
  onChange,
  value,
  label,
  validationErrors,
  maxChar = 50,
  width = "100%",
  disabled,
  mask,
}) => {
  return (
    <div>
      <InputMask
        mask={mask}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {() => (
          <StyleTextField
            id={id}
            label={label}
            name={name}
            margin="normal"
            type={type}
            style={{
              borderBottom: validationErrors ? "solid 1px red" : "none",
              width: width,
            }}
            disabled={disabled}
          />
        )}
      </InputMask>
    </div>
  );
};
