import React from "react";
import {TodoForm} from "./TodoForm";
import {TodoList} from "./TodoList";
import styles from "./Todos.module.scss"


export const Todos: React.FC = () => {

    return (
        <section className={styles.todos}>
            <TodoForm/>
            <TodoList/>
        </section>
    )
}
