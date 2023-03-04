import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async (params) => {
  const { data } = await axios.get(`/todos/${params}`);
  return data;
});
export const postTodo = createAsyncThunk("todo/postTodo", async (params) => {
  const { data } = await axios.post(`/todos`, params);
  return data;
});
export const patchTodo = createAsyncThunk("todo/patchTodo", async (params) => {
  const { data } = await axios.patch(`/todos`, params);
  return data;
});
export const patchTodoComplete = createAsyncThunk(
  "todo/patchTodoComplete",
  async (params) => {
    const { data } = await axios.patch(`/todos/complete`, params);
    return data;
  }
);
export const removeTodo = createAsyncThunk("todo/removeTodo", async (id) => {
  const { data } = await axios.delete(`/todos/${id}`);

  return data;
});

const initialState = {
  todos: {
    data: [],
    status: "loading",
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTodo.pending]: (state) => {
      state.todos.data = [];
      state.todos.status = "loading";
    },
    [fetchTodo.fulfilled]: (state, action) => {
      state.todos.data = action.payload;
      state.todos.status = "loaded";
    },
    [fetchTodo.rejected]: (state) => {
      state.todos.data = [];
      state.todos.status = "error";
    },
    [removeTodo.pending]: (state) => {
      state.todos.status = "loading";
    },
    [removeTodo.fulfilled]: (state, action) => {
      state.todos.data = state.todos.data.filter(
        (todo) => todo._id !== action.payload._id
      );
      state.todos.status = "loaded";
    },
    [removeTodo.rejected]: (state) => {
      state.todos.data = [];
      state.todos.status = "error";
    },
    [patchTodoComplete.pending]: (state) => {
      state.todos.status = "loading";
    },
    [patchTodoComplete.fulfilled]: (state, action) => {
      const toggledTodo = state.todos.data.find(
        (todo) => todo._id === action.payload._id
      );
      toggledTodo.completed = !toggledTodo.completed;
      state.todos.status = "loaded";
    },
    [patchTodoComplete.rejected]: (state) => {
      state.todos.data = [];
      state.todos.status = "error";
    },
    [patchTodo.pending]: (state) => {
      state.todos.status = "loading";
    },
    [patchTodo.fulfilled]: (state, action) => {
      const findTodo = state.todos.data.find(
        (todo) => todo._id === action.payload._id
      );
      findTodo.text = action.payload.text;
      state.todos.status = "loaded";
    },
    [patchTodo.rejected]: (state) => {
      state.todos.data = [];
      state.todos.status = "error";
    },
    [postTodo.pending]: (state) => {
      state.todos.status = "loading";
    },
    [postTodo.fulfilled]: (state, action) => {
      state.todos.data.unshift(action.payload);
      state.todos.status = "loaded";
    },
    [postTodo.rejected]: (state) => {
      state.todos.data = [];
      state.todos.status = "error";
    },
  },
});

export const todoReducer = todoSlice.reducer;
