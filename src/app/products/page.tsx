"use client";
import ProductCard from '@/shared/ProductCard';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterByCategory, searchProducts } from '@/redux/slices/productSlice';
import { AppDispatch } from '@/redux/store';
import Product from '@/types/product';
import LoadingCard from '@/shared/LoadingCard';
import SearchBar from '@/shared/SearchBar';
import CategoryFilter from '@/shared/CategoryFilter';

const ProductsPage = () => {
  const { products, loading, filteredProducts } = useSelector((state: any) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<any[]>([]);
  const [squesy, setSQuery] = useState<any>();

  useEffect(() => {
    (async () => {
      const res: any = await dispatch(fetchProducts());
      const uniqueCategories = Array.from(new Set(res?.payload?.map((p: Product) => p.category))); // Extract unique categories
      setCategories(uniqueCategories);
    })();
  }, []);

  const handleCategoryChange = (category: string) => {
    dispatch(filterByCategory(category));
  };

  const handleSearch = (query: string) => {
    dispatch(searchProducts(query)); // Dispatch search action with query
    setSQuery(query)
  };

  const productsToDisplay = !filteredProducts.length && squesy ? [] : filteredProducts;

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="sm:flex p-2 sm:p-0 items-center justify-between">
          <h2 className="text-3xl font-bold text-start text-black mb-3 sm:mb-8">All Products</h2>
          <div className="flex sm:flex-row flex-col p-2 sm:p-0 gap-2">
            <SearchBar onSearch={handleSearch} />
            <CategoryFilter categories={[...categories]} onCategoryChange={handleCategoryChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 p-2 sm:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => <LoadingCard key={index} />)
          ) : productsToDisplay.length ? (
            productsToDisplay.map((product: Product, index: number) => (
            
                <ProductCard {...product} key={index}/>
              
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl">
              No Products Found
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-gray-50 p-8 text-center mt-5">
        <h2 className="text-3xl font-semibold mb-">Or Subscribe To The Newsletter</h2>
        <div className="max-w-md mx-auto flex sm:flex-row flex-col gap-2 mt-4 items-center">
          <input
            type="email"
            placeholder="Email Address..."
            className="flex-1 py-2 px-4 bg-transparent outline-none border-b border-gray-400"
          />
          <button className="px-4 py-2 border-b border-gray-400 text-black font-medium">
            SUBMIT
          </button>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="w-full container mx-auto flex flex-col gap-8 p-8 text-center">
          <h2 className="text-3xl font-semibold mb-">Follow products and discounts on Instagram</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {!products?.length
              ? Array.from({ length: 6 }).map((_, index) => <LoadingCard key={index} />)
              : products.map((product: Product, index: number) => index <= 3 && (
                  <ProductCard key={index} {...product} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
