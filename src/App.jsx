import { useState } from 'react'
import AppLayout from './layouts/AppLayout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Link from './pages/Link'
import RedirectLink from './pages/RedirectLink'

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
        element:<Dashboard/>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/link/:id',
        element:<Link/>
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
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
