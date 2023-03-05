import { Remove } from "@mui/icons-material";
import {
  Box,
  Container,
  Fab,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { patchTodoComplete, removeTodo } from "../../redux/slices/todo";
import EditModal from "../EditModal";

export const Todo = ({ text, id, completed }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(completed);

  const handleChange = () => {
    setChecked(!checked);
  };

  const onSubmit = async () => {
    try {
      const field = {
        id,
        completed: checked,
      };

      dispatch(patchTodoComplete(field));
    } catch (err) {
      console.log(err);
      alert("Не удалось изменить запись");
    }
  };
  const onSubmitRemove = async (id) => {
    try {
      dispatch(removeTodo(id));
    } catch (err) {
      console.log(err);
      alert("Не удалось добавить запись");
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: checked ? "#A5A5A5" : "#474A51",
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography
            textAlign={"justify"}
            variant="p"
            textTransform={"uppercase"}
            sx={{ color: "#ffff", wordBreak: "break-all" }}
          >
            {text}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "2px",
              alignItems: "center",
            }}
          >
            <Tooltip
              title={checked ? "Задача выполнена" : "Задача не выполнена"}
            >
              <Switch
                onClick={onSubmit}
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Tooltip>
            {checked ? "" : <EditModal id={id} />}
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <Fab
                onClick={() => onSubmitRemove(id)}
                size="small"
                color="secondary"
                aria-label="delete"
              >
                <Tooltip title={"Удалить задачу"}>
                  <Remove />
                </Tooltip>
              </Fab>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
