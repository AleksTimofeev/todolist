import React, {useEffect} from 'react';
import styles from './Logon.module.scss'
import {useAppDispatch, useAppSelector} from "../../Store/store";
import {useNavigate} from "react-router-dom";
import {Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {login} from "../../Store/authReducer";

type ValuesFormType = {email?: string, password?: string}

const validate = (values: ValuesFormType) => {
  const errors: ValuesFormType = {}
if (!values.email) {
  errors.email = 'required'
}
  if (!values.password) {
    errors.password = 'required'
  }
return errors
}

const Login = () => {

  const dispatch = useAppDispatch()
  const isLogged = useAppSelector(state => state.authReducer.isLogged)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate,
    onSubmit: (values) => {
      dispatch(login(values))
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
            error={!!formik.errors.email && formik.touched.email}
            label={'email'}
            variant="filled"
            {...formik.getFieldProps('email')}
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