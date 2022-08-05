import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./Store/store";
import {authMeTC} from "./Store/authReducer";
import {BrowserRouter} from "react-router-dom";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Logon/Login";
import PageLoader from "./Components/Loaders/PageLoader";


function App() {

  const authUserId = useSelector((state: AppStateType) => state.authReducer.id)
  const authDataLoading = useSelector((state: AppStateType) => state.authReducer.authDataLoading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!authUserId) {
      dispatch(authMeTC())
    }
  }, [])

  return (
    <div>
      {authDataLoading ?
        <PageLoader /> :
        <BrowserRouter>
        {authUserId ?
          <>
            <Header/>
            <Body/>
            <Footer/>
          </> :
          <Login/>}
      </BrowserRouter>}
    </div>
  );
}

export default App;
