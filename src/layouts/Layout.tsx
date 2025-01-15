"use client"

import React from 'react'
import { Provider } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import store from '@/redux/store'

const Layout = ({children}:any) => {
  return (
    <Provider store={store} >
      <div className='text-black'>


        <Header/>
        {children}
        <Footer />
      </div>
      </Provider>
  )
}

export default Layout
