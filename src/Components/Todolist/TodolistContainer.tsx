import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {getTodolists} from "../../Store/todolistsReducer";

const TodolistContainer = () => {

  const dispatch = useAppDispatch()
  const todolists = useSelector((state: AppStateType) => state.todolists)
  console.log(todolists)

  useEffect(() => {
    dispatch(getTodolists())
  },[])

  return (
    <div>
      <h3>TodolistContainer</h3>
    </div>
  );
};

export default TodolistContainer;