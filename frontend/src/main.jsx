import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from "next-theme"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider attribute='class'>
      <Theme appearance="dark">
        <main className="blue-dark text-foreground bg-background font-poppins">
          <App />
        </main>
      </Theme>
    </ThemeProvider>
  </React.StrictMode >,
)
