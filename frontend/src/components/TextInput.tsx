import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  isRequire: boolean;
  helperText?: string;
  rules?: any;
  name: string;
  id: string;
  label: string;
};

const TextInput = (props: Props) => {
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
      <>
        <TextField
          size="small"
          fullWidth
          error={fieldState?.invalid}
          helperText={fieldState.error?.message}
          id={props.id}
          onChange={onChange}
          value={field.value || ""}
         
          label={`${props.label}${props.isRequire ? "*" : ""}`}
        />
      </>
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

export default TextInput;
