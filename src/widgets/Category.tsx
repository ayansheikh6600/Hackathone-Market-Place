import React from "react";
import category1 from "@/assets/categoryChar.png"
import category2 from "@/assets/categoryChar1.png"
import category3 from "@/assets/categoryChar2.png"
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  products: number;
  image: any;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Wing Chair",
    products: 3584,
    image: category1,
  },
  {
    id: 2,
    name: "Wooden Chair",
    products: 157,
    image: category2,
  },
  {
    id: 3,
    name: "Desk Chair",
    products: 154,
    image: category3,
  },
];

const TopCategories: React.FC = () => {
  return (
    <div className="w-full container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative rounded-lg overflow-hidden shadow-md group"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={1200}
              height={300}
              className="w-full h-80 object-fill"
            />
            <div className="absolute bottom-0 p-2 py-3 text-white w-full">
            <div className="absolute inset-0 bg-black  opacity-60  transition duration-300"></div>
              <h3 className="font-semibold text-white relative  text-lg">{category.name}</h3>
              <p className="text-xs  text-white relative">{category.products} Products</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
