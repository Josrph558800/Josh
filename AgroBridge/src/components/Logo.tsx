import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} bg-white rounded-full p-1 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden relative`}>
      {/* Original logo as background */}
      <div 
        className="w-full h-full rounded-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/logo.jpg)',
          backgroundPosition: 'center 20%' // This crops to show only the top circular logo portion
        }}
      >
        {/* Subtle overlay to enhance visibility if needed */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-transparent via-transparent to-black/5"></div>
      </div>
    </div>
  );
};

export default Logo;