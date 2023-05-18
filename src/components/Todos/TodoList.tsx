import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getTodos} from "../../store/api";
import {TodoItem} from "./Todoitem";
import styles from  "./Todos.module.scss"
export const TodoList = () => {

    const todos = useAppSelector(state => state.todos.list)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    return (
        <ul className={styles.list}>
            {todos.map((todo) => {
                return <TodoItem key={todo.id} todoItem={todo}/>
            })}
        </ul>


    )
}
