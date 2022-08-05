import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./Store/store";
import {authMeTC} from "./Store/authReducer";
import {BrowserRouter} from "react-router-dom";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";


function App() {

  const authUserId = useSelector((state: AppStateType) => state.authReducer.id)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!authUserId){
      dispatch(authMeTC())
    }
  },[])

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Body />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
