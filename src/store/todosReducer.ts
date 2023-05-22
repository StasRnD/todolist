import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo, TodoList} from "../types";
import {getTodos, editTodoText, deleteTodo, addNewTodo, toggleComplete} from "./api";


const defaultState: TodoList = {
    list: [],
    selectTodo: null,
}

export const TodosSlice = createSlice({
    name: 'todos',
    initialState: defaultState,
    reducers: {
        changeSelectTodo(state, action: PayloadAction<Todo | null>) {
            state.selectTodo = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.fulfilled, (state, action) => {
                state.list = action.payload
            })
            .addCase(editTodoText.fulfilled, (state, action) => {
                const editTodo = state.list.find(el => el.id === action.payload.id)

                if (editTodo) {
                    editTodo.title = action.payload.title
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.list = state.list.filter(todoItem => todoItem.id !== action.payload);
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.list.push(action.payload)
            })
            .addCase(toggleComplete.fulfilled, (state,action) => {
                const editTodo = state.list.find(el => el.id === action.payload.id)
                if (editTodo) {
                    editTodo.completed = action.payload.completed
                }
            })
    }
})

export const {changeSelectTodo} = TodosSlice.actions;
