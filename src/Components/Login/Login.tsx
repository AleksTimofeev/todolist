import React, {useEffect} from 'react';
import styles from './Logon.module.scss'
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {useNavigate} from "react-router-dom";
import {Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {loginTC} from "../../Store/authReducer";

type ValuesFormType = {login: string, password: string, rememberMe: Boolean}

const validate = (values: ValuesFormType) => {
  const errors: ValuesFormType = {login: '', password: '', rememberMe: false}
if (!values.login.length) {
  errors.login = 'required'
}
  if (!values.password.length) {
    errors.login = 'required'
  }
return errors
}

const Login = () => {

  const dispatch = useAppDispatch()
  const isLogged = useSelector((state: AppStateType) => state.authReducer.isLogged)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      rememberMe: false
    },
    onSubmit: (values) => {
      dispatch(loginTC(values.login, values.password, values.rememberMe))
    },

  })


  useEffect(() => {
    if (isLogged) {
      formik.resetForm()
      navigate('/')
    }
  }, [isLogged])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <TextField
            error={!!formik.errors.login && formik.touched.login}
            label={'login'}
            variant="filled"
            {...formik.getFieldProps('login')}
          />

        </Grid>
        <Grid item xs={8}>
          <TextField
            error={!!formik.errors.password && formik.touched.password}
            label={'password'}
            variant="filled"
            type={'password'}
            {...formik.getFieldProps('password')}
          />
        </Grid>
        <button type="submit">Submit</button>

      </Grid>
    </form>
  );
};

export default Login;