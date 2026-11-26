// import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      {/* inside it all were children  */}
      <App />
    </AuthContextProvider>
  </BrowserRouter>
)


// BrowserRouter is provided by React Router.
// It enables your React application to use browser URLs for navigation.

// if we use instead of AuthContextProvider(react component)
// But this will not work:
// <AuthContext>
//     <App />
// </AuthContext>


// Why? :- Because AuthContext is not a React component. It is a Context object created by:createContext();
// To use it as a wrapper, you would need its .Provider(it use to share data among all children without any props)

// However, there is another issue: you must supply value yourself.
// For example:
// <AuthContext.Provider value={{ some value need to be share  }}>
//     <App />
// </AuthContext.Provider> 



// Remember this simple rule:
// AuthContext is the shared context object. 
// AuthContextProvider is the component you created to manage authentication state 
// and provide that context to your application.

