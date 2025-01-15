"use client"
import ProductCard from '@/shared/ProductCard';
import React, { useEffect } from 'react'

import Link from 'next/link';
// import products from "@/Data"
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/slices/productSlice';
import { AppDispatch } from '@/redux/store';
import Product from '@/types/product';




const ProductsPage  = () => {

  const {products,loading} = useSelector((state:any)=>state.products)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    (async()=>{

      const res = await dispatch(fetchProducts())
      console.log(res)
    })()
  },[])

  return (
    <div className="py-12 bg-white">
      <div className='container mx-auto '>

        <h2 className="text-3xl font-bold text-start text-black mb-8">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product:any, index:number) => (
            <Link href={`/products/${product?._id}`} key={index}>
              <ProductCard  {...product} />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full  bg-gray-50 p-8 text-center  mt-5">
        <h2 className="text-3xl font-semibold mb-">Or Subscribe To The Newsletter</h2>
        <div className="max-w-md mx-auto flex gap-2 mt-4 items-center ">
          <input
            type="email"
            placeholder="Email Address..."
            className="flex-1 py-2 px-4 bg-transparent outline-none border-b border-gray-400"
          />
          <button className="px-4 py-2 border-b border-gray-400  text-black font-medium">
            SUBMIT
          </button>
        </div>
      </div>


      <div className='bg-gray-50'>

        <div className="w-full container mx-auto flex flex-col gap-8  p-8 text-center">
          <h2 className="text-3xl font-semibold mb-">Follow products and discounts on Instagram</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product:Product, index:number) => index <= 3 && (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>

    </div>

  )
}


export default ProductsPage 