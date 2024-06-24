import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <main className='min-h-screen mx-auto container'>
        <Header />
        <Outlet />
      </main>
      <div className='p-8 text-center bg-gray-300 mt-10'>
        Made by <a href="https://github.com/anishshetty6">anishshetty6</a>
      </div>
    </div>
  )
}

export default AppLayout