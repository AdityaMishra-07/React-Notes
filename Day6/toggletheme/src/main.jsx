import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import ThemeProvider from './context/Theme.jsx'
import AuthProvider from './context/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>
)
