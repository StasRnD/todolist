import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {changeSelectTodo} from "../../store/todosReducer";
import {editTodoText, addNewTodo} from "../../store/api";
import styles from './Todos.module.scss'


enum buttonFormText {
    ADD = 'Добавить',
    SAVE = 'Сохранить',
    CANCEL = 'Отменить редактирование'
}

export const TodoForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const selectTodo = useAppSelector(state => state.todos.selectTodo)
    const [value, setValue] = useState<string>('')
    
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        /* если есть выбранный Todo, значит происходит редактирование имеющегося Todo
           если нет, то поисходит создание нового Todo
        */
        if (selectTodo) {
            dispatch(editTodoText({id: selectTodo.id, value}))
            dispatch(changeSelectTodo(null))
        } else {
            dispatch(addNewTodo(value))
        }

        setValue('')
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    /* Валидация. Кнопка отключена если в инпуте менне 2 символов,
       и если выбран Todo, и не изменен его текст
    */
    const isDisabled = () => value.trim().length < 2 || selectTodo?.title === value

    // При отмене редактирование очистить инпут и убрать выбранный Todo
    const handleClear = () => {
        dispatch(changeSelectTodo(null))
        setValue('')
    }

    /* При выборе todo, записываем его текст в форму.
        Если todo выбран и происходит его удаление инпут формы очищается
    */
    useEffect(() => {
        if (selectTodo) {
            setValue(selectTodo.title)
        } else {
            setValue('')
        }

    }, [selectTodo])

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input className={styles.input} value={value} onChange={handleChange}/>
            <div className={styles.buttonContainer}>
                <button className={styles.button} disabled={isDisabled()}>{selectTodo ? buttonFormText.SAVE : buttonFormText.ADD}</button>
                <button type={'button'} disabled={!selectTodo} className={styles.button} onClick={handleClear}>{buttonFormText.CANCEL}</button>
            </div>
        </form>
    )

}
