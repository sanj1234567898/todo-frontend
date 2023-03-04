import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Fab, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { postTodo } from "../../redux/slices/todo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#040404",
  border: "2px solid #ab47bc",
  boxShadow: 24,
  p: 4,
};

export default function CreateModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [text, setText] = React.useState("");

  const onSubmit = async () => {
    try {
      const field = {
        text,
      };

      dispatch(postTodo(field));
      handleClose();
    } catch (err) {
      console.log(err);
      alert("Не удалось добавить запись");
    }
  };

  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          onClick={handleOpen}
          size="large"
          color="secondary"
          aria-label="add"
        >
          <Add />
        </Fab>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box borderRadius={2} sx={style}>
            <Box
              component="form"
              noValidate
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                sx={{
                  backgroundColor: "#ffff",
                  border: "2px solid #ab47bc",
                }}
                autoFocus={true}
                color="primary"
                fullWidth={true}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                onClick={onSubmit}
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Добаваить
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
