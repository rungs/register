import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
type Props = {
  control: any;
  isRequire: boolean;
  helperText?: string;
  rules?: any;
  name: string;
  id: string;
  label: string;
  mask: string;

};

const TextInputMask = (props: Props) => {
  function RenderControl({
    field,
    formState,
    fieldState,
  }: {
    field: any;
    formState: any;
    fieldState: any;
  }) {
    function onChange(e: any) {
      field.onChange(e.target.value);
    }

    return (
      <InputMask
        mask={props.mask}
        maskChar=" "
        onChange={onChange}
        value={field.value || ""}
      >
        {(inputProps: any) => (
          <TextField
            {...inputProps}
            size="small"
            fullWidth
            error={fieldState?.invalid}
            helperText={fieldState.error?.message}
            id={props.id}
           
           
            label={`${props.label}${props.isRequire ? "*" : ""}`}
          />
        )}
      </InputMask>
    );
  }

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{
        required: props.isRequire ? props.helperText : "",
        ...props.rules,
      }}
      render={RenderControl}
    />
  );
};

export default TextInputMask;
