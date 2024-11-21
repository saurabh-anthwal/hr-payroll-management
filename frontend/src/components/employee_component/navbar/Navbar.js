import React from 'react';
import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between', // Ensures space between logo and menu items
    alignItems: 'center', // Vertically centers the items
  },
  logo: {
    width: '40px', // Adjust logo size
    height: 'auto',
  },
  button: {
    fontWeight: 600,
    textTransform: 'uppercase',
    color: 'white',
    marginLeft: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Hover effect
    },
  },
}));

const EmployeeNavbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png" alt="Logo" style={{width:"100px"}} />
          </IconButton>
    
          <div>
            <Button color="inherit" className={classes.button}>Home</Button>
            <Button color="inherit" className={classes.button}>Salary</Button>
            <Button color="inherit" className={classes.button}><HiOutlineUser/></Button>
            <Button color="inherit" className={classes.button}><IoLogOutOutline/></Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default EmployeeNavbar;
