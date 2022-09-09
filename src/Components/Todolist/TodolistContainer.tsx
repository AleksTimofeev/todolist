import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {addTodolist, FullTodolistType, getTodolists} from "../../Store/todolistsReducer";
import Todolist from "./Todolist";
import styles from './Todolist.module.scss'
import AddItem from "./AddItem";

const TodolistContainer = () => {

  const dispatch = useAppDispatch()
  const todolists = useSelector((state: AppStateType):FullTodolistType => state.todolists)

  const callbackAddTodolist = (title: string) => {
    dispatch(addTodolist(title))
  }

  useEffect(() => {
    dispatch(getTodolists())
  }, [])

  return (
    <div className={styles.todolistContainer}>
      <div className={styles.headerTodolistContainer}>
        <AddItem callbackAddItem={callbackAddTodolist} title={'Add Todolist'} />
      </div>
      {todolists.length > 0 && todolists.map(item => (
        <Todolist key={item.id}
                  data={item}
                  statusGetTaskForTodolist={item.statusGetTaskForTodolist}
                  statusRemoveTodolist={item.statusRemoveTodolist}
                  statusRemoveTask={item.statusRemoveTask}
        />
      ))}
    </div>
  );
};

export default TodolistContainer;