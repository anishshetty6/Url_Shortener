import { useState } from 'react'
import AppLayout from './layouts/AppLayout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Link from './pages/Link'
import RedirectLink from './pages/RedirectLink'
import UrlProvider from './context'
import RequireAuth from './components/require-auth'

const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dash',
        element:
        <RequireAuth>
        <Dashboard/>
        </RequireAuth>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/link/:id',
        element:
        <RequireAuth>
        <Link/>
        </RequireAuth>
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      },
    ]
  }
])

function App() {

  return (
    <UrlProvider>
      <RouterProvider router={router}/>
    </UrlProvider>
  )
}

export default App
