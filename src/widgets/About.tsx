import Image from "next/image";
import chair1 from '@/assets/AboutHero.png'

const AboutUs: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-white ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto">
        {/* Text Section */}
        <div className="bg-[#007580] p-12 text-white flex flex-col justify-between">
          <div className="">
          <h2 className="text-2xl font-bold mb-4">About Us - Comforty</h2>
          <p className="text-base mb-6">
            At Comforty, we believe that the right chair can transform your
            space and elevate your comfort. Specializing in ergonomic design,
            premium materials, and modern aesthetics, we craft chairs that
            seamlessly blend style with functionality.
          </p>
          </div>
          <button className="bg-[#F9F9F9] bg-opacity-15 text-white py-2 px-4 rounded w-fit">
            View collection
          </button>
        </div>

        {/* Image Section */}
        <div className="bg-gray-100 flex items-center justify-center">
          <Image
            src={chair1}// Update with your image path
            alt="Chair"
            width={400}
            height={400}
            className="object-cover w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
