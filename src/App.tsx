import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./Store/store";
import {authMeTC} from "./Store/authReducer";
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import PageLoader from "./Components/Loaders/PageLoader";


function App() {

  const authDataLoading = useSelector((state: AppStateType) => state.authReducer.authDataLoading)

  const dispatch = useAppDispatch()


  useEffect(() => {
      dispatch(authMeTC())
  }, [])


  return (
    <div>
      {authDataLoading ?
        <PageLoader/> :
        <>
          <Routes>
            <Route path={'/'} element={<>
              <Header/>
              <Body/>
              <Footer/>
            </>}/>
            <Route path={'login'} element={<Login/>}/>
          </Routes>
        </>}
    </div>
  );
}

export default App;
