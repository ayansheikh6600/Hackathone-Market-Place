"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchProductById } from "@/redux/slices/productSlice";
import SkeletonLoader from "@/shared/SkeletonLoader"; // Import the skeleton loader
import { addToCart } from "@/redux/slices/cartSlice";

const Page = () => {
  const params = useParams();
  const { product, loading } = useSelector((state: any) => state.products); // Add loading state
  const dispatch = useDispatch<AppDispatch>();
  const { id }:any = params;

  const item = { imageUrl:product?.imageUrl, title:product?.name, price:product?.orignalPrice, orignalPrice:product?.orignalPrice, badge:product?.badge, id:id }

  console.log(item)
  useEffect(() => {
    (async () => {
      await dispatch(fetchProductById(id));
    })();
  }, [id]);

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-6 px-3 md:px-0">
          {/* Product Image */}
          <div>
            {!product ? (
              <SkeletonLoader className="h-[500px]" />
            ) : (
              <Image
                className="rounded-lg h-[500px]"
                src={product?.imageUrl}
                alt={"Product Image"}
                height={300}
                width={1200}
              />
            )}
          </div>
          {/* Product Details */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-3 md:w-[80%]">
              {!product ? (
                <>
                  <SkeletonLoader width="w-3/4" height="h-8" />
                  <SkeletonLoader width="w-1/4" height="h-6" />
                  <SkeletonLoader width="w-1/4" height="h-6" />
                  <SkeletonLoader width="w-full" height="h-20" />
                  <SkeletonLoader width="w-1/3" height="h-8" />
                </>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-5xl font-semibold text-[#272343]">
                    {product?.name}
                  </h1>
                  <div className="p-1 bg-[#029FAE] w-fit text-white rounded-2xl text-sm px-2">
                    {product?.orignalPrice + " :USD"}
                  </div>
                  <div className="p-1 bg-[#029FAE] w-fit text-white rounded-2xl text-sm px-2">
                    Available Stock: {product?.stock}
                  </div>
                  <hr />
                  <p className="text-[#272343]">
                    {product?.description 
                     }
                  </p>
                  <div onClick={()=>dispatch(addToCart(item))} className="p-1 px-3 w-fit cursor-pointer text-white bg-[#029FAE] rounded flex gap-2 items-center text-lg">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="hover:stroke-white"
                    >
                      <path
                        d="M2.52081 2.97916L4.42748 3.30916L5.31023 13.8261C5.34414 14.2399 5.53284 14.6258 5.83867 14.9066C6.14451 15.1875 6.545 15.3427 6.96023 15.3413H16.9611C17.3586 15.3418 17.743 15.1986 18.0435 14.9383C18.344 14.6779 18.5403 14.3178 18.5964 13.9242L19.4672 7.91266C19.4904 7.75278 19.4819 7.5899 19.4421 7.43332C19.4023 7.27674 19.3321 7.12954 19.2354 7.00014C19.1387 6.87073 19.0174 6.76166 18.8785 6.67916C18.7396 6.59666 18.5858 6.54234 18.4259 6.51932C18.3672 6.51291 4.73365 6.50832 4.73365 6.50832"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.9479 9.89539H15.4898"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.5578 18.5194C6.62502 18.5165 6.69213 18.5273 6.75509 18.551C6.81805 18.5748 6.87556 18.611 6.92414 18.6575C6.97273 18.7041 7.01139 18.76 7.03781 18.8219C7.06422 18.8837 7.07784 18.9503 7.07784 19.0176C7.07784 19.0849 7.06422 19.1515 7.03781 19.2134C7.01139 19.2753 6.97273 19.3312 6.92414 19.3777C6.87556 19.4243 6.81805 19.4605 6.75509 19.4842C6.69213 19.508 6.62502 19.5187 6.5578 19.5158C6.42936 19.5103 6.30801 19.4554 6.21908 19.3626C6.13015 19.2698 6.08051 19.1462 6.08051 19.0176C6.08051 18.8891 6.13015 18.7655 6.21908 18.6726C6.30801 18.5798 6.42936 18.5249 6.5578 18.5194Z"
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.8988 18.5194C17.0312 18.5194 17.1583 18.572 17.252 18.6657C17.3457 18.7594 17.3983 18.8865 17.3983 19.019C17.3983 19.1515 17.3457 19.2786 17.252 19.3723C17.1583 19.4659 17.0312 19.5186 16.8988 19.5186C16.7663 19.5186 16.6392 19.4659 16.5455 19.3723C16.4518 19.2786 16.3992 19.1515 16.3992 19.019C16.3992 18.8865 16.4518 18.7594 16.5455 18.6657C16.6392 18.572 16.7663 18.5194 16.8988 18.5194Z"
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Add to Cart
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
