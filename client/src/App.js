import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import route from './router';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';

function App() {
  const user = useSelector((state) => state.persistedReducer)
  const content = useRoutes(route(user.token?true:false))
  return (
    <>
      <CssBaseline>
        {content}
      </CssBaseline>
    </>
  );
}

export default App;
