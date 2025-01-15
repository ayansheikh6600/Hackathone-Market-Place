import HeroSection from "@/widgets/Hero";
import Image from "next/image";

import ProductCard from "@/shared/ProductCard";
import TopCategories from "@/widgets/Category";
import zapier from "@/assets/zapier.png"
import moz from "@/assets/moz.png"
import panda from "@/assets/panda.png"
import pipedrive from "@/assets/pipedrive.png"
import z from "@/assets/z.png"
import bank from "@/assets/bank.png"
import burnt from "@/assets/burnt.png"
import ChairGallery from "@/widgets/Gallery";
import products from "@/Data"


const CampaniesLogo: any = [zapier,
  moz,
  panda,
  pipedrive,
  z,
  bank,
  burnt]



export default function Home() {
  return (
    <div className="bg-white sm:px-0 px-3">
      {/* hero Section */}
      <HeroSection />

      {/* Companeis Logo */}
      <div className="flex flex-wrap container mx-auto gap-4 justify-between">
        {CampaniesLogo?.map((item:any, key:number)=>(<Image className="w-32 h-32" key={key} src={item} alt="CompanyLogo" height={1000} width={1200} />))}
      </div>

      {/* Featured Products       */}
      <div className="w-full container mx-auto flex flex-col gap-8   py-8 text-center">
        <h2 className="text-3xl font-semibold text-start">Featured Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product, index) => index <= 3 && (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>

      {/* Top Category's */}
      <TopCategories />

      {/* Chair Gallery's */}
      <ChairGallery/>


      <div className="w-full container mx-auto flex flex-col gap-8   py-8 text-center">
        <h2 className="text-3xl font-semibold ">Our Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product, index) => index <= 7 && (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>


    </div>
  );
}
