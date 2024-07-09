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
      <div className='p-2 text-center bg-red-500 mt-10 '>
        Made by <a href="https://github.com/anishshetty6" className='hover:underline cursor-pointer' target='_blank'>anishshetty6</a>
      </div>
    </div>
  )
}

export default AppLayout