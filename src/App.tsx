import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./Store/store";
import {authMeTC} from "./Store/authReducer";


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

    </div>
  );
}

export default App;
