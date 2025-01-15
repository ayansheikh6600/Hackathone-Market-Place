import React from 'react';

interface BadgeProps {
  text: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ text, color = 'primary', size = 'medium', rounded = false }) => {
  const baseStyles = 'inline-block text-center font-semibold px-2 py-1';
  const colorStyles = {
    primary: 'bg-[#029FAE] text-white',
    secondary: 'bg-[#01AD5A] text-white',
    orange: 'bg-[#F5813F] text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-500 text-white',
  };
  const sizeStyles = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-lg px-4 py-2',
  };

  const borderRadius = rounded ? 'rounded-full' : 'rounded-md';

  return (
    <span className={`${baseStyles} ${colorStyles[color]} ${sizeStyles[size]} ${borderRadius}`}>
      {text}
    </span>
  );
};

export default Badge;
