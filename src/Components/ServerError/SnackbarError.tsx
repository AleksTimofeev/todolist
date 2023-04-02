import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../Store/store";
import {useEffect} from "react";
import {setAppError} from "../../Store/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarError = () => {

  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);

  const appError = useAppSelector(state => state.app.appError)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    appError && setOpen(true)
  }, [appError])
  useEffect(() => {
    if(!open){
      dispatch(setAppError(null))
    }
  },[open])

  return (
    <Stack spacing={2} sx={{ width: 'fit-content' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {appError}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
