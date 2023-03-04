import { Container, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Todo } from "../../components/Todo";
import { fetchTodo } from "../../redux/slices/todo";
import CreateModal from "../../components/CreateModal";
import { selectAuth } from "../../redux/slices/auth";

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
        <>
          {todos.length > 0
            ? todos.map(({ text, _id: id, completed }) => (
                <Todo key={id} text={text} completed={completed} id={id} />
              ))
            : ""}
        </>
      ) : (
        <Navigate to={"/todo-frontend/login"} />
      )}
    </Container>
  );
};

export default Home;
