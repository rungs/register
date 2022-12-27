import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TextInput, TextInputMask } from "../components";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Register } from "../services/registerApi";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
type Props = {};
const MySwal = withReactContent(Swal);
const isValidEmail = (email: any) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
const isValidPhone = (phone: string) =>
  /^[0-9]{3}?\s?[0-9]{3}?\s?[0-9]{4}$/.test(phone);
const isValidCardId = (cardId: string) =>
  /^[0-9]{1}?\s?[0-9]{4}?\s?[0-9]{5}?\s?[0-9]{2}?\s?[0-9]{1}$/.test(cardId);

function RegisterPage({}: Props) {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      registerType: "company",
      address: "",
      birthDate: null,
    },
  });
  const watchRegisterTypeFields = watch("registerType");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    renderFieldByRegisterType();
  }, [watchRegisterTypeFields]);

  function renderFieldByRegisterType() {
    let val = getValues("registerType");
    if (val == "company") {
      return (
        <>
          <Grid item xs={12} md={6}>
            <TextInputMask
              control={control}
              id="taxId"
              name="taxId"
              label="Tax ID"
              isRequire={true}
              helperText="Please enter tax id."
              mask="9 9999 99999 99 9"
              rules={{
                validate: (value: any) =>
                  isValidCardId(value) || "Please enter a valid card id.",
              }}
            ></TextInputMask>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              control={control}
              id="contactPerson"
              name="contactPerson"
              label="Contact Person"
              isRequire={true}
              helperText="Please enter contact person."
            ></TextInput>
          </Grid>
        </>
      );
    }
    if (val == "person") {
      return (
        <>
          <Grid item xs={12} md={6}>
            <TextInputMask
              control={control}
              id="cardId"
              name="cardId"
              label="Card ID"
              isRequire={true}
              helperText="Please enter card id."
              mask="9 9999 99999 99 9"
              rules={{
                validate: (value: any) =>
                  isValidCardId(value) || "Enter a valid card od.",
              }}
            ></TextInputMask>
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="birthDate"
              control={control}
              rules={{
                required: "Please enter birth date.",
              }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label="Birth date*"
                    onChange={(e: any) => {
                      if (e !== null) field.onChange(e.format("YYYY-MM-DD"));
                      else field.onChange(null);
                    }}
                    value={field.value}
                    inputFormat="DD/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={fieldState?.invalid}
                        helperText={fieldState.error?.message}
                        sx={{ width: "100%" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
        </>
      );
    }
  }

  const onSubmit = (obj: any) => {
    setLoading(true);
    Register(obj)
      .then(() => {
        setLoading(false);
        MySwal.fire({
          title: "Register success.",
          icon: "success",
        }).then(() => {
          reset();
        });
      })
      .catch((e) => {
        setLoading(!loading);
        MySwal.fire({
          title: e.response.data,
          icon: "error",
        });
      });
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="registerType"
              control={control}
              rules={{
                required: "Please select register type.",
              }}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="lbRegisterType">Register type</InputLabel>
                  <Select
                    labelId="lbRegisterType"
                    id="registerType"
                    label="Register type"
                    onChange={(e: any) => {
                      field.onChange(e.target.value);
                    }}
                    value={field.value}
                  >
                    <MenuItem value={"company"}>Company</MenuItem>
                    <MenuItem value={"person"}>Person</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          {renderFieldByRegisterType()}

          <Grid item xs={12} sm={6}>
            <TextInput
              control={control}
              id="firstName"
              name="firstName"
              label="First Name"
              isRequire={true}
              helperText="Please enter first name."
            ></TextInput>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              control={control}
              id="lastName"
              name="lastName"
              label="Last Name"
              isRequire={true}
              helperText="Please enter last name."
            ></TextInput>
          </Grid>
          <Grid item xs={12}>
            <TextInput
              control={control}
              id="email"
              name="email"
              label="Email Address"
              isRequire={true}
              helperText="Please enter email address."
              rules={{
                validate: (value: any) =>
                  isValidEmail(value) || "Enter a valid email.",
              }}
            ></TextInput>
          </Grid>
          <Grid item xs={12}>
            <TextInputMask
              control={control}
              id="mobilePhone"
              name="mobilePhone"
              label="Mobile Phone"
              isRequire={true}
              helperText="Please enter mobile phone."
              mask="999 999 9999"
              rules={{
                validate: (value: any) =>
                  isValidPhone(value) || "Enter a valid phone.",
              }}
            ></TextInputMask>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address"
              rules={{
                required: "Please enter address.",
              }}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  id="address"
                  label="Address*"
                  multiline
                  maxRows={4}
                  {...field}
                  error={fieldState?.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading && <CircularProgress size={14} />}
              {!loading && "Register"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default RegisterPage;
