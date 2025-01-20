import React from 'react'

const LoadingCard = () => {
    return (
        <div

            className="relative bg-gray-200 animate-pulse rounded-lg overflow-hidden"
        >
            {/* Image Skeleton */}
            <div className="w-full h-72 bg-gray-300"></div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-2">
                {/* Title */}
                <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                {/* Price */}
                <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
            </div>

            {/* Cart Button Skeleton */}
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
    )
}

export default LoadingCard