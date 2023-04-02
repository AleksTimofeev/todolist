import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../Store/store";
import {useEffect} from "react";
import {setAppError, setAppInfo} from "../../Store/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarInfo = () => {

  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);

  const appInfo = useAppSelector(state => state.app.appInfo)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    appInfo && setOpen(true)
  }, [appInfo])
  useEffect(() => {
    if(!open){
      dispatch(setAppInfo(null))
    }
  },[open])

  return (
    <Stack spacing={2} sx={{ width: 'fit-content' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {appInfo}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
