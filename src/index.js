import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './styles/tokens.css';
import './styles/base.css';
import App from './App';

// GitHub Pages serves 404.html for deep links. That page stashes the requested
// URL and redirects here, where it is put back before the router reads it.
const REDIRECT_KEY = 'spa-redirect';
const redirect = sessionStorage.getItem(REDIRECT_KEY);
if (redirect) {
    sessionStorage.removeItem(REDIRECT_KEY);
    window.history.replaceState(null, '', redirect);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
