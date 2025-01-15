import Image from 'next/image';
import chairImage from '@/assets/chair.png'; // Replace with the correct image path
import Badge from '@/shared/Badge';

const HeroSection = ()=> {
  return (
    <section className="flex items-center justify-center   bg-white">
      <div className="container bg-[#F0F2F3] py-14 items-center sm:flex justify-between  gap-12 px-6 lg:px-12 rounded-b-3xl">
        {/* Left Content */}
        <div className="text-left max-w-xl flex flex-col gap-3">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Welcome To Chary</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
            Best Furniture Collection For Your Interior.
          </h1>
          <div className="mt-6">
            <button className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition flex items-center">
              Shop Now
              <span className="ml-2 text-lg font-bold">→</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0">
          <Image 
            src={chairImage} 
            alt="Chair" 
            className="max-w-full h-auto "
            width={400} 
            height={400} 
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection
