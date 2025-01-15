import React from "react";
import Image from "next/image";
import sofa from "@/assets/sofa.png";
import DandyChair from "@/assets/DandyChair.png";
import DandyChair1 from "@/assets/DandyChair1.png";
import AboutUs from "@/widgets/About";
import FeaturesSection from "@/widgets/Feature";

const page = () => {
  return (
    <div className="bg-white py-12 flex flex-col gap-12  px-3">

<AboutUs/>
<FeaturesSection/>


      <div className="container mx-auto">
        {/* Popular Products Section */}
        <h2 className="text-2xl font-bold text-center mb-8">
          Our Popular Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 text-black gap-6">
          {/* Product 1: Sofa (Spanning 2 columns) */}
          <div className="md:col-span-2   overflow-hidden">
            <Image
              src={sofa} // Image source
              alt="The Poplar suede sofa"
              className="w-full h-64 object-cover"
              width={600} // Adjust width based on your layout
              height={256} // Adjust height based on your layout
              priority // Ensures better performance for the first image
            />
            <div className="py-4">
              <h3 className="text-lg ">The Poplar suede sofa</h3>
              <p className="">$99.00</p>
            </div>
          </div>

          {/* Product 2: Chair */}
          <div className="  overflow-hidden">
            <Image
              src={DandyChair} // Image source
              alt="The Dandy chair"
              className="w-full h-64 object-cover"
              width={300} // Adjust width based on your layout
              height={256} // Adjust height based on your layout
            />
            <div className="py-4">
              <h3 className="text-lg ">The Dandy chair</h3>
              <p className="">$99.00</p>
            </div>
          </div>

          {/* Product 3: Chair */}
          <div className=" overflow-hidden">
            <Image
              src={DandyChair1} // Image source
              alt="The Dandy chair"
              className="w-full h-64 object-cover"
              width={300} // Adjust width based on your layout
              height={256} // Adjust height based on your layout
            />
            <div className="py-4">
              <h3 className="text-lg ">The Dandy chair</h3>
              <p className="">$99.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
