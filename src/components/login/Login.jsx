import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { signIn, signOut } from 'services/firebase/firebase';
import './Login.scss'

export default ({user, setUser, className})=>{

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = ()=>{
    setAnchorEl(null);
  }

  return (
    <div className={`login ${className}`}>
      {user ? (
        <Button variant='contained' onClick={(e)=>{
          setAnchorEl(e.currentTarget);}
        }>{user.displayName}</Button>
      )
        : (
          <Button variant='contained' onClick={()=>{
          signIn(setUser)}
          }>
            <span>Login with Google</span>
          </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem
          onClick={()=>{
          signOut(setUser);
          handleClose();
        }}>Sign out</MenuItem>

      </Menu>

    </div>
  );
}
