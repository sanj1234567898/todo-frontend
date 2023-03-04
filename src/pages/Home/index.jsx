import { Container, Tooltip, Typography, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Todo } from "../../components/Todo";
import { fetchTodo } from "../../redux/slices/todo";
import CreateModal from "../../components/CreateModal";
import { selectAuth } from "../../redux/slices/auth";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const { data: todos } = useSelector((state) => state.todo.todos);
  const isAuth = useSelector(selectAuth);

  const userId = window.localStorage.getItem("token");

  React.useEffect(() => {
    dispatch(fetchTodo(userId));
  }, [userId, dispatch]);

  return (
    <Container maxWidth={"lg"}>
      <CreateModal />
      {isAuth || userId ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          {todos.length > 0 ? (
            todos.map(({ text, _id: id, completed }) => (
              <Todo key={id} text={text} completed={completed} id={id} />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                className={styles.gif}
                src="https://pa1.narvii.com/7106/f7c48ac27bd664d46d5cc8f3f0513c7ad7864dacr1-320-320_hq.gif"
                width="273"
                height="273"
                alt="img"
              ></img>
              <Typography
                variant="h1"
                textTransform={"uppercase"}
                sx={{ fontSize: 30 }}
              >
                Ищу твои задачи
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Navigate to={"/todo-frontend/login"} />
      )}
    </Container>
  );
};

export default Home;
