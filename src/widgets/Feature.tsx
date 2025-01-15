import { FC } from "react";
import { FiTruck, FiCheckCircle, FiTag, FiPackage } from "react-icons/fi";

const FeaturesSection: FC = () => {
  const features = [
    {
      icon: <FiTruck className="text-teal-700 w-8 h-8" />,
      title: "Next day as standard",
      description: "Order before 3pm and get your order the next day as standard.",
    },
    {
      icon: <FiCheckCircle className="text-teal-700 w-8 h-8" />,
      title: "Made by true artisans",
      description: "Handmade crafted goods made with real passion and craftsmanship.",
    },
    {
      icon: <FiTag className="text-teal-700 w-8 h-8" />,
      title: "Unbeatable prices",
      description: "For our materials and quality, you won't find better prices anywhere.",
    },
    {
      icon: <FiPackage className="text-teal-700 w-8 h-8" />,
      title: "Recycled packaging",
      description: "We use 100% recycled to ensure our footprint is more manageable.",
    },
  ];

  return (
    <section className=" bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          What Makes Our Brand Different
        </h2>
        <div className="grid text-[#007580]  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#F9F9F9] p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold  mb-2">
                {feature.title}
              </h3>
              <p className=" text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
