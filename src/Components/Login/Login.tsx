import React, {useEffect} from 'react';
import styles from './Logon.module.css'
import {useAppDispatch, useAppSelector} from "../../Store/store";
import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from "@mui/material";
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
      navigate('/todolist')
    }
  }, [isLogged])

  return (
    <form className={styles.loginContainer} onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} className={styles.inputWrapper}>
          <TextField
            error={!!formik.errors.email && formik.touched.email}
            label={'email'}
            variant="filled"
            className={styles.input}
            {...formik.getFieldProps('email')}
          />

        </Grid>
        <Grid item xs={8} className={styles.inputWrapper}>
          <TextField
            error={!!formik.errors.password && formik.touched.password}
            label={'password'}
            variant="filled"
            type={'password'}
            className={styles.input}
            {...formik.getFieldProps('password')}
          />
        </Grid>
        {/*<button type="submit">Submit</button>*/}
        <Button variant="contained" type="submit">LOGIN</Button>
        <div className={styles.testLogin}>
          <span>TEST LOGIN - todolist-test@yandex.ru</span>
          <br />
          <span>PASSWORD - test-todolist</span>
        </div>
      </Grid>
    </form>
  );
};

export default Login;