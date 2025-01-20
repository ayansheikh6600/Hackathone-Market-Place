import React, { useEffect } from "react";
import category1 from "@/assets/categoryChar.png"
import category2 from "@/assets/categoryChar1.png"
import category3 from "@/assets/categoryChar2.png"
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCategories } from "@/redux/slices/categoriesSlice";
import Category from "@/types/category";



const LoadingCategory = () => {
  return (
    <div

      className="relative rounded-lg overflow-hidden shadow-md bg-gray-200 animate-pulse"
    >
      {/* Image Skeleton */}
      <div className="w-full h-80 bg-gray-300"></div>

      {/* Content Skeleton */}
      <div className="absolute bottom-0 p-2 py-3 w-full bg-gray-200">
        {/* Background Overlay Skeleton */}
        <div className="absolute inset-0 bg-gray-400 opacity-60"></div>

        {/* Title Skeleton */}
        <div className="relative w-3/4 h-6 bg-gray-400 rounded mb-2"></div>

        {/* Subtitle Skeleton */}
        <div className="relative w-1/2 h-4 bg-gray-400 rounded"></div>
      </div>
    </div>
  )
}

const TopCategories: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: any) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="w-full container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">



      {loading || !categories?.length
        ? Array.from({ length: 3 }).map((_, index) => (
            <LoadingCategory key={index} />
          ))
        : categories.map((category: Category) => (
            <div
              key={category._id}
              className="relative rounded-lg overflow-hidden shadow-md group"
            >
              {/* Category Image */}
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={1200}
                height={300}
                className="w-full h-80 object-fill"
              />
              {/* Overlay and Text */}
              <div className="absolute bottom-0 p-2 py-3 text-white w-full">
                <div className="absolute inset-0 bg-black opacity-60 transition duration-300"></div>
                <h3 className="font-semibold text-white relative text-lg">
                  {category.name}
                </h3>
                {/* Uncomment if you need product count */}
                {/* <p className="text-xs text-white relative">{category.products} Products</p> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopCategories;
