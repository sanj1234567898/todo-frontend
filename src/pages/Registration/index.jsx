import React from "react";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import styles from "./Registration.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/auth";
import { fetchRegister } from "../../redux/slices/auth";

const Registration = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to={"/todo-frontend/"} />;
  }

  return (
    <Container component={"div"} maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={errors.email?.message}
            error={Boolean(errors.email?.message)}
            {...register("email", {
              required: "Укажите почту",
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="FullName"
            name="fullName"
            autoComplete="fullName"
            helperText={errors.fullName?.message}
            error={Boolean(errors.fullName?.message)}
            {...register("fullName", {
              required: "Укажите имя",
            })}
          />
          <TextField
            id="outlined-password-input"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            helperText={errors.password?.message}
            error={Boolean(errors.password?.message)}
            {...register("password", {
              required: "Укажите пароль",
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container>
            <Grid item>
              <Link
                className={styles.link}
                to="/todo-frontend/login"
                variant="body2"
              >
                {"Уже есть аккаунт?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
