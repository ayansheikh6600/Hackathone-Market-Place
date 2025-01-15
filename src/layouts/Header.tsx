"use client"
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '@/assets/Logo.png';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { items, totalQuantity, totalAmount } = useSelector((state:any) => state.cart);

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-[#272343] text-white text-xs sm:text-sm py-2">
                <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 text-opacity-70">
                    <p>✓ Free Shipping On All Orders Over $50</p>
                    <div className="hidden sm:flex items-center space-x-4">
                        <span>Eng</span>
                        <Link href="/faq" className="hover:underline">
                            FAQs
                        </Link>
                        <Link href="#" className="hover:underline">
                            Need Help
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="bg-[#F0F2F3] py-4 shadow-sm">
                <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <Image width={160} height={40} src={logo} alt="Comforty Logo" />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-teal-600 text-2xl"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        ☰
                    </button>

                    {/* Cart and Contact */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/cart" className="flex items-center space-x-2">
                            <button className="bg-white text-teal-600 border border-teal-600 px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white flex items-center">
                                <FaShoppingCart />
                                <span className="ml-2">Cart</span>
                                <span className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                                 {items?.length ? items?.length : "0"}
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Links for Desktop and Mobile */}
            <div className={`bg-white border-b py-3 shadow-sm ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
                <div className={`container mx-auto px-4 sm:px-6   ${isMobileMenuOpen ? 'justify-normal' : 'flex  items-center justify-between'}`}>
                    {/* Navigation Links */}
                    <nav className="flex flex-col md:flex-row md:space-x-6">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 py-2 md:py-0">
                            Home
                        </Link>
                        <Link href="/cart" className="text-gray-600 hover:text-gray-900 py-2 md:py-0">
                            Shop
                        </Link>
                        <Link href="/products" className="text-gray-600 hover:text-gray-900 py-2 md:py-0">
                            Product
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900 py-2 md:py-0">
                            Contact
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-gray-900 py-2 md:py-0">
                            About
                        </Link>
                    </nav>

                    {/* Contact Info */}
                    <p className="text-gray-500 text-sm mt-4 md:mt-0">
                        Contact: <span className="font-medium">(808) 555-0111</span>
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
