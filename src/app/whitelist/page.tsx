"use client";
import { clearWhiteList, removeFromWhiteList } from "@/redux/slices/whiteListSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Whitelist: React.FC = () => {
  const { items } = useSelector((state: any) => state.whiteList);
  const dispatch = useDispatch();

  const handleRemoveFromWhiteList = (id: any) => {
    dispatch(removeFromWhiteList(id));
  };

  const handleClearWhiteList = () => {
    dispatch(clearWhiteList());
  };

  // Check if whitelist is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Your Whitelist is Empty</h2>
          <p className="text-gray-500 mb-6">Add items to your whitelist to see them here.</p>
          <Link href="/products">
            <button className="bg-[#029FAE] text-white py-2 px-4 rounded hover:bg-[#02a0aec9]">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Whitelist</h2>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleClearWhiteList}
          >
            Clear Whitelist
          </button>
        </div>
        <div className="space-y-6">
          {items.map((item: any) => (
            <div key={item.id} className="sm:flex items-start sm:space-x-4 border-b pb-4 justify-between">
              <div className="flex items-center space-x-4 pb-4">
                <Image
                  width={1200}
                  height={200}
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 flex flex-col gap-1 text-[#272343]">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-[#757575]">Price: ${item.price.toFixed(2)}</p>
                  <button
                    className="text-red-500 hover:underline mt-2"
                    onClick={() => handleRemoveFromWhiteList(item.id)}
                  >
                    Remove from Whitelist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
