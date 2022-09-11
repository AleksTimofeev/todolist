import React from 'react';
import styles from './Header.module.scss'
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {RequestStatusType} from "../../Store/appReducer";
import {logoutTC} from "../../Store/authReducer";

const Header = () => {

  const statusTodolistLoading: RequestStatusType = useSelector((state: AppStateType) => state.app.statusTodolists)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutTC())
  }

  return (
    <div>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Todolist
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color={'inherit'}
                    onClick={handleLogout}
            >Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={styles.loadingLinear}>
        {statusTodolistLoading === 'loading' && <LinearProgress/>}
      </div>

    </div>
  );
};

export default Header;