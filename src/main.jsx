import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
<<<<<<< HEAD
    <HashRouter>
=======
        <BrowserRouter basename="/nana_/">
>>>>>>> 72e7148 (fix: audio control launcher bugs, CSS 500 error, and expand language support)
            <App />
    </HashRouter>
    </React.StrictMode >,
)
