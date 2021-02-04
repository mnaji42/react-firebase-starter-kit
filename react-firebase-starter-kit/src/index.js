import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CurrentUserProvider } from './context/CurrentUserContext'
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);