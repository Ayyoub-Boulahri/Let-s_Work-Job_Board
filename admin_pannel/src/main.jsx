import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from "next-themes"
import "./index.css"
import { Theme } from '@radix-ui/themes';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider attribute='class'>
      <Theme appearance="dark">
          <App />
      </Theme>
    </ThemeProvider>
  </React.StrictMode >,
)