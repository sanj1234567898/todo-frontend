import { Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <Box>
      <Header />
      <Routes>
        <Route path="/todo-frontend" element={<Home />} />
        <Route path="/todo-frontend/register" element={<Registration />} />
        <Route path="/todo-frontend/login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;