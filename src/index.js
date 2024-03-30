import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

if (navigator.serviceWorker) {
  // Register the SW
  navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration){
  }).catch(console.log);
}

serviceWorkerRegistration.register();