import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store, persistor} from './store';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'; 
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
         
            <App />
          {/* </BrowserRouter> */}
          </PersistGate>
        </Provider>
      </ThemeProvider>
  //  </React.StrictMode>
);

