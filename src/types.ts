export type Todo = {
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean,
}

export type TodoList = {
    list: Todo[]
    selectTodo: Todo | null
}

export type RootState = {
    todos: TodoList
}


