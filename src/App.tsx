import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch,} from "./Store/store";
import {authMe} from "./Store/authReducer";
import {Route, Routes, useNavigate} from "react-router-dom";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Login from "./Components/Login/Login";
import PageLoader from "./Components/Loaders/PageLoader";
import {SnackbarError} from "./Components/ServerError/SnackbarError";
import styles from './App.module.scss'


function App() {

  const navigate = useNavigate()
  const authDataLoading = useSelector((state: AppStateType) => state.authReducer.authDataLoading)
  const isLogged = useSelector((state: AppStateType) => state.authReducer.isLogged)

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(authMe())
    if (!isLogged) {
      navigate('/login')
    }
  }, [isLogged])


  return (
    <div className={styles.appWrapper}>
      {authDataLoading ?
        <PageLoader/> :
        <>
          <Header/>
          <Routes>

            <Route path={'/todolist'} element={<>
              <Body/>
            </>}/>
            <Route path={'/login'} element={<Login/>}/>
          </Routes>
        </>}
      <SnackbarError/>
    </div>
  );
}

export default App;
