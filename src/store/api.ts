import {createAsyncThunk} from "@reduxjs/toolkit";
import {Todo, TodoList} from "../types";

const api = 'https://jsonplaceholder.typicode.com/todos'
export const getTodos = createAsyncThunk<Todo[], undefined>(
    'todos/getTodos',
    async () => {
        const response = await fetch(`${api}?_limit=10`)
        return await response.json()
    })

export const deleteTodo = createAsyncThunk<number, number>(
    'todos/deleteTodo',
    async (id) => {
        const response = await fetch(`${api}/${id}`, {
            method: 'DELETE',
        })
        return id
    }
)
export const editTodoText = createAsyncThunk<Todo, { id: number, value: string }, {
    state: { todos: TodoList }
}>(
    'todos/editTodoText',
    async function (data, {getState}) {
        const todo = getState().todos.list.find(todo => todo.id === data.id)


        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...todo,
                title: data.value
            })
        });
        return (await response.json()) as Todo;
    }
);
export const addNewTodo = createAsyncThunk<Todo, string>(
    'todos/addNewTodo',
    async (text) => {
        const todo = {
            title: text,
            userId: 1,
            completed: false
        }
        const response = await fetch(`${api}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });
        return (await response.json()) as Todo;
    }
);
export const toggleComplete = createAsyncThunk<Todo, number, {
    state: { todos: TodoList }
}>(
    'todos/toggleComplete',
    async (id, {getState}) => {
        const todo = getState().todos.list.find(todo => todo.id === id)
        const response = await fetch(`${api}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...todo,
                completed: !todo?.completed
            })
        });
        return (await response.json()) as Todo;
    }
);
