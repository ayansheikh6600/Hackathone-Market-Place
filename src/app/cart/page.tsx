"use client"
import { clearCart, removeFromCart } from "@/redux/slices/cartSlice";
import React, { useState } from "react";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

interface BagItem {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

const Bag: React.FC = () => {
 


  const { items, totalQuantity, totalAmount } = useSelector((state:any) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id:any) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
 

  const calculateSubtotal = () =>
    items.reduce((total:any, item:any) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Bag Items Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Bag</h2>
          <div className="space-y-6">
            {items.map((item:any) => (
              <div key={item.id} className="sm:flex items-start sm:space-x-4 border-b pb-4 justify-between">
                <div className="flex items-center space-x-4  pb-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 flex flex-col gap-1 text-[#272343]">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-[#757575]">Ashen Slate/Cobalt Bliss</p>
                  <div className="sm:flex items-center text-sm text-gray-500 sm:space-x-4">
                    <p>
                      Size:{" "}
                      <input
                        type="text"
                        value={"L"}
                       
                        className="w-12 bg-transparent border-b text-center"
                      />
                    </p>
                    <p>
                      Quantity:{" "}
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                       
                        className="w-12 bg-transparent border-b text-center"
                      />
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className="text-gray-500 hover:text-red-500">
                      <FaHeart />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                  
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">MRP: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Summary</h2>
          <div className="rounded p-6 space-y-4 ">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-semibold">${calculateSubtotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Estimated Delivery & Handling</p>
              <p className="font-semibold">Free</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Total</p>
              <p className="font-bold text-lg">${calculateSubtotal().toFixed(2)}</p>
            </div>
            <hr />
            <button className="w-full bg-[#029FAE] text-white py-3 rounded-full px-4 hover:bg-[#02a0aec9] focus:outline-none">
              Member Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
