"use client"

import React from 'react'
import { Provider } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import store, { persistor } from '@/redux/store'
import { ToastContainer, toast } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react'

const Layout = ({children}:any) => {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>

      <div className='text-black'>


        <Header/>
        {children}
        <ToastContainer />
        <Footer />
      </div>
      </PersistGate>

      </Provider>
  )
}

export default Layout
