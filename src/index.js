import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StrictMode } from 'react'

// Create a root
const root = createRoot(document.getElementById('root'));

// Render your app wrapped in StrictMode
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();