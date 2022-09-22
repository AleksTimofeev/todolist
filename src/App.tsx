import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch,} from "./Store/store";
import {authMeTC} from "./Store/authReducer";
import {Route, Routes, useNavigate} from "react-router-dom";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Login from "./Components/Login/Login";
import PageLoader from "./Components/Loaders/PageLoader";


function App() {

  const navigate = useNavigate()
  const authDataLoading = useSelector((state: AppStateType) => state.authReducer.authDataLoading)
  const isLogged = useSelector((state: AppStateType) => state.authReducer.isLogged)

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(authMeTC())
    if (!isLogged) {
      navigate('/login')
    }
  }, [isLogged])


  return (
    <div>
      {authDataLoading ?
        <PageLoader/> :
        <>
          <Header/>
          <Routes>

            <Route path={'/'} element={<>
              <Body/>
            </>}/>
            <Route path={'login'} element={<Login/>}/>
          </Routes>
        </>}
    </div>
  );
}

export default App;
