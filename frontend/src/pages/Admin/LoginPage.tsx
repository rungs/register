import { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
type Props = {};
const MySwal = withReactContent(Swal);

const Login = (props: Props) => {
  const { handleSubmit, control, reset, getValues, watch } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const onSubmit = (obj: any) => {
    setLoading(true);
    if (obj.username === "admin" && obj.password === "admin") {
      localStorage.setItem("isAuth", "T");
      setLoading(false);
      navigate("/dashboard");
    } else {
      setLoading(false);
      MySwal.fire({
        title: "Username or password incorrect.",
        icon: "error",
      })
    }
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
          <LoginIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="username"
              rules={{
                required: "Please enter username.",
              }}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  id="username"
                  label="Username*"
                  {...field}
                  error={fieldState?.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              rules={{
                required: "Please enter password.",
              }}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  id="password"
                  label="Password*"
                  type="password"
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
              {!loading && "Log In"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
