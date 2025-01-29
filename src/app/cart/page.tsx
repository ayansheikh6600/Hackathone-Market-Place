"use client";
import { clearCart, removeFromCart } from "@/redux/slices/cartSlice";
import { fetchShippingOptions, setAddress, setSelectedShippingOption } from "@/redux/slices/shippingSlice";
import { AppDispatch } from "@/redux/store";
import PaymentPage from "@/widgets/Checkout";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Bag: React.FC = () => {
  const { items } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.auth);
  const { address, shippingDetails, selectedShippingOption, loading, error } = useSelector((state: any) => state.shipping);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkPage, setCheckPage] = useState(false);

  console.log(selectedShippingOption)

  const handleRemoveFromCart = (id: any) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };;


  const calculateSubtotal = () =>
    items.reduce((total: any, item: any) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {


    
    if (!user) {
      toast.error("Please First Login");
      return navigate.replace("/login");
    }

    if (!showCheckout) {
      setShowCheckout(true);
    } else if (!address.addressLine1 || !address.cityLocality || !address.stateProvince || !address.postalCode || !address.name || !address.phone) {
      return toast.error("Please Fill All The Fields");
    } else {
      dispatch(fetchShippingOptions());
    }
  };

  // If cart is empty, display a message
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Add items to your cart to see them here.</p>
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
    <div>
      <div className="bg-gray-50 p-6 flex justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bag Items Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Bag</h2>
            <div className="space-y-6">
              {items.map((item: any) => (
                <div key={item.id} className="sm:flex items-start sm:space-x-4 border-b pb-4 justify-between">
                  <div className="flex items-center space-x-4 pb-4">
                    <Image
                      width={1200}
                      height={200}
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1 flex flex-col gap-1 text-[#272343]">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <div className="sm:flex items-center text-sm text-gray-500 sm:space-x-4">
                        <p>Quantity: {item.quantity}</p>
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
                    <p className="text-lg font-semibold">Price: ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Summary</h2>
            <div className="rounded p-6 space-y-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-semibold">${calculateSubtotal().toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Cost</p>
                <p className="font-semibold">
                  {/* {loading ? "Calculating..." : shippingDetails ? `$${shippingDetails.total}` : "Not calculated"} */}
                  {selectedShippingOption ? `$${selectedShippingOption.shippingAmount.amount}` : "Not selected"}
                </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Total</p>
                <p className="font-bold text-lg">
                   ${(calculateSubtotal() + (selectedShippingOption?.shippingAmount.amount || 0)).toFixed(2)}
                </p>
              </div>
              <hr />
              <button
                className="w-full bg-[#029FAE] text-white py-3 rounded-full px-4 hover:bg-[#02a0aec9]"
                onClick={handleCheckout}
              >
                Member Checkout
              </button>
            </div>
          </div>
        </div>
      </div>


<div className="bg-gray-50 w-full">
{
  console.log(user)
}
      {/* Checkout Form */}
      {(showCheckout && !shippingDetails) && (
        <div className="bg-gray-50 p-6 w-full max-w-7xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
          <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            value={user?.name} // Use name directly from user state
            disabled // Make it non-editable if needed
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
          <form className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {["name", "phone", "addressLine1", "addressLine2", "cityLocality", "stateProvince", "postalCode"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600">{field}</label>
                  <input
                    type="text"
                    value={address[field as keyof typeof address]}
                    onChange={(e) => dispatch(setAddress({ [field]: e.target.value }))}
                    className="w-full border rounded p-2"
                  />
                </div>
              )
            )}
            <div className="flex items-end justify-end">

            <button
              type="button"
              onClick={handleCheckout}
              className={`bg-[#029FAE] text-white py-2 px-4 rounded hover:bg-[#02a0aec9] ${loading && "animate-pulse"}`}
              >
              {loading? "Calculating..." : "Calculate Shipping"}
            </button>
              </div>
          </form>
        </div>
      )}

      {!checkPage && shippingDetails?.length > 0 && (
        <div className="bg-gray-50 p-6 w-full  mx-auto">
          <h3 className="text-lg font-bold mb-4">Select a Shipping Option</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {shippingDetails.map((option: any, key:number) => (
              <div
                key={key}
                className={`border p-4 rounded cursor-pointer ${selectedShippingOption?.rateId === option.rateId ? "border-blue-500" : "border-gray-300"
                  }`}
                onClick={() => {dispatch(setSelectedShippingOption(option)), setCheckPage(true)}}
              >
                <h4 className="text-lg font-semibold">{option.serviceType}</h4>
                <p className="text-gray-600">Delivery Time: {option.deliveryDays} Day</p>
                <p className="font-bold">${option.shippingAmount.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}


      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}



{
  checkPage && <PaymentPage/>
}

    </div>
</div>

  );
};

export default Bag;
