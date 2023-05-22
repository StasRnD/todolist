import React from "react";
import {useAppDispatch} from "../../store/hooks";
import {changeSelectTodo} from "../../store/todosReducer";
import {deleteTodo, toggleComplete} from '../../store/api'
import {Todo} from "../../types";
import styles from './Todos.module.scss'
import classNames from "classnames";

type TodoProps = {
    todoItem: Todo
}

enum buttonValue {
    EDIT = 'Редактировать',
    DELETE = 'Удалить'
}

export const TodoItem: React.FC<TodoProps> = ({todoItem}) => {
    const dispatch = useAppDispatch()

    /* удаление todo и удаление выбранного todo.
       Когда пользователь решил удалить todo который выбран
    */
    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id))
        dispatch(changeSelectTodo(null))
    }

    const handleEdit = (todoItem: Todo) => {
        dispatch(changeSelectTodo(todoItem))
    }

    const handleToggleComplete = (id: number) => {
        dispatch(toggleComplete(id))
    }

    return (
        <li className={styles.listItem}>
            <input type='checkbox' checked={todoItem.completed} onChange={() => handleToggleComplete(todoItem.id)}/>
            <span className={classNames(todoItem.completed && styles.completedTodo)}>{todoItem.title}</span>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => handleEdit(todoItem)}>{buttonValue.EDIT}</button>
                <button className={styles.button} onClick={() => handleDelete(todoItem.id)}>{buttonValue.DELETE}</button>
            </div>
        </li>
    )

}
