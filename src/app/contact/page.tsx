import ContactForm from '@/widgets/Contact.tsx/Contact'
import React from 'react'

import { FaTrophy, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const features = [
  {
    id: 1,
    icon: <FaTrophy className="text-4xl text-gray-800" />,
    title: 'High Quality',
    description: 'Crafted from top materials',
  },
  {
    id: 2,
    icon: <FaShieldAlt className="text-4xl text-gray-800" />,
    title: 'Warranty Protection',
    description: 'Over 2 years',
  },
  {
    id: 3,
    icon: <FaHeadset className="text-4xl text-gray-800" />,
    title: '24 / 7 Support',
    description: 'Dedicated support',
  },
];



const page = () => {
  return (
    <div className='bg-white'>
      <ContactForm />
      <div className="bg-gray-100 container mx-auto py-10">
        <div className=" px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {features.map((feature) => (
              <div key={feature.id} className="flex gap-3 justify-center items-center">
                <div className="">{feature.icon}</div>
                <div>

                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default page
