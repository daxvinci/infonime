import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import ThemeContextProvider from './ThemeContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeContextProvider>
  </StrictMode>,
)
