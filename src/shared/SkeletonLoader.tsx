const SkeletonLoader = ({ width = "w-full", height = "h-4", className = "" }: any) => (
    <div
      className={`${width} ${height} bg-gray-200 animate-pulse rounded-md ${className}`}
    />
  );
  
  export default SkeletonLoader;
  