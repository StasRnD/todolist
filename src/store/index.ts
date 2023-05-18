import {configureStore} from "@reduxjs/toolkit";
import {TodosSlice} from "./todosReducer";


export const store = configureStore({
    reducer: {
        todos: TodosSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
