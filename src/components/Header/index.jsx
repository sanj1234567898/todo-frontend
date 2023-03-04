import React from "react";
import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../../redux/slices/auth";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#040404",
});

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectAuth);
  const userName = useSelector((state) => state.auth.data?.fullName);

  const onClickLogOut = () => {
    if (window.confirm("Действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <AppBar sx={{ position: "initial" }}>
      <StyledToolBar>
        <Link className={styles.logo} to="/todo-frontend/">
          TODO-LIST
        </Link>

        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          {isAuth ? (
            <>
              <Typography>{userName}</Typography>
              <Link onClick={onClickLogOut}>
                <Button variant="contained" color="secondary">
                  Выйти
                </Button>
              </Link>
            </>
          ) : (
            <Link to={"/todo-frontend/login"}>
              <Button variant="contained" color="error">
                Войти
              </Button>
            </Link>
          )}
        </Stack>
      </StyledToolBar>
    </AppBar>
  );
};
