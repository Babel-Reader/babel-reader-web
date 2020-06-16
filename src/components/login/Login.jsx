import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { signIn, signOut } from 'services/firebase/firebase';

export default ({user, setUser, className})=>{

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = ()=>{
    setAnchorEl(null);
  }

  return (
    <div className={`login ${className}`}>
      <Button variant='contained' onClick={(event) => {
        user ? setAnchorEl(event.currentTarget) : signIn(setUser)
      }}>{user ? user.displayName : 'Login'}</Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{
          signOut(setUser);
          handleClose();
        }}>Sign out</MenuItem>

      </Menu>

    </div>
  );
}
