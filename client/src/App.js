import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import route from './router';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';

function App() {
  const user = useSelector((state) => state.persistedReducer)
  const content = useRoutes(route(user.isLogedin))
  return (
    <>
      <CssBaseline>
        {content}
      </CssBaseline>
    </>
  );
  // return (
  //   <div className="App">
  //      <BrowserRouter>
  //     <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/signup" element={<Singup />} />
  //       <Route path="/"  element={<Home />} />
  //       <Route path="/in" element={<Profile/>} />
  //       {/* <Route path="/mynetwork" element={<MyNetwork />} /> */}
  //       {/* <Route path="/" element={<Login />} /> */}
  //       {/* <Route path="/chat" element={<Chat/>} /> */}
  //     </Routes>
  //      </BrowserRouter>
  //   </div>
  // );
}

export default App;
