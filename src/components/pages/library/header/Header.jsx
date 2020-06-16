import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { BookContext } from 'App';
import Login from 'components/login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './Header.scss'


export default ({history})=>{
  const { user, setUser } = useContext(BookContext);

  return (
    <AppBar position='static' className='library-header'>
      <Toolbar>
        <Button className='library-header-title' onClick={()=>history.go(0)}>Library</Button>
        <Login {...{ user, setUser }}/>
      </Toolbar>
    </AppBar>
  )
}
