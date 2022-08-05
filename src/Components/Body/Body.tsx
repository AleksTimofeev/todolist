import React from 'react';
import {Route, Routes} from "react-router-dom";
import TodolistContainer from "../Todolist/TodolistContainer";
import styles from './Body.module.scss'

const Body = () => {
  return (
    <div className={styles.body}>
      <div className={'container'}>
        <h2>Body</h2>
        <Routes>
          <Route path={'/'} element={<TodolistContainer/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Body;