import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';
import { reset } from '../../store/LoginSlice/Login.Slice';

const Layout = ({ children }) => {
  const error = useSelector(state => state.persistedReducer.error)
  const dispatch = useDispatch()
  const handleClose = ()=>{
    dispatch(reset())
  }
  return (
    <div sx={{ flex: 1, height: "100% !important" }}>
      <Navbar />
      {<Outlet /> || children}
      <Snackbar open={error} message={error} onClose={handleClose} autoHideDuration={5000} />

    </div>
  )
}

export default Layout