import React from 'react';
import styles from './Header.module.scss'
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {RequestStatusType} from "../../Store/appReducer";
import {logoutTC} from "../../Store/authReducer";

const Header = () => {

  const statusTodolistLoading = useSelector((state: AppStateType): RequestStatusType => state.app.statusTodolists)
  const login = useSelector((state: AppStateType) => state.authReducer.login)
  const dispatch = useAppDispatch()


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


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

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              variant={'contained'}
            >
              {login}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Button color={'inherit'}
                        onClick={handleLogout}
                >Logout</Button>
              </MenuItem>
            </Menu>

            {/*<Typography variant="h6" component="div" sx={{flexGrow: 0.2}}>*/}
            {/*  {login}*/}
            {/*</Typography>*/}
            {/*<Button color={'inherit'}*/}
            {/*        onClick={handleLogout}*/}
            {/*>Logout</Button>*/}
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