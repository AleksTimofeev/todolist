import React from 'react';
import styles from './Header.module.scss'
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useAppDispatch, useAppSelector} from "../../Store/store";
import {logout} from "../../Store/authReducer";
import {NavLink} from "react-router-dom";

const Header = () => {

  const appStatus = useAppSelector(state => state.app.appStatus)
  const login = useAppSelector(state => state.authReducer.authData.login)
  const dispatch = useAppDispatch()


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorNavigation, setAnchorNavigation] = React.useState<null | HTMLElement>(null);
  const openNavigation = Boolean(anchorNavigation);
  const handleClickNavigation = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNavigation(event.currentTarget);
  };
  const handleCloseNavigation = () => {
    setAnchorNavigation(null);
  };


  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Button
              id="navigation-button"
              aria-controls={open ? 'navigation-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickNavigation}
              variant={'outlined'}
            >
              <MenuIcon style={{color: 'white'}} />
            </Button>
            <Menu
              id="navigation-menu"
              anchorEl={anchorNavigation}
              open={openNavigation}
              onClose={handleCloseNavigation}
              MenuListProps={{
                'aria-labelledby': 'navigation-button',
              }}
              className={styles.navigationMenu}
            >
              <MenuItem
                onClick={handleCloseNavigation}
              >
                <NavLink to={'todolist'}>Todolist</NavLink>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavigation}
              >
                <NavLink to={'profile'}>Profile</NavLink>
              </MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Todolist
            </Typography>

            {!!login && <>
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
            </>}

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
        {appStatus === 'loading' && <LinearProgress/>}
      </div>

    </div>
  );
};

export default Header;