import React from 'react';

interface SvgIconProps {
  iconName: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
}

const SvgIcon: React.FC<SvgIconProps> = ({ 
  iconName, 
  className = '', 
  width = 24, 
  height = 24,
  onClick
}) => {
  try {
    // 动态导入SVG
    const IconComponent = React.lazy(() => import(`@/assets/icons/${iconName}.svg`));
    
    return (
      <React.Suspense fallback={<div style={{ width, height }}></div>}>
        <IconComponent 
          className={className} 
          style={{ width, height }}
          onClick={onClick}
        />
      </React.Suspense>
    );
  } catch (error) {
    console.error(`Failed to load icon: ${iconName}`, error);
    return <div style={{ width, height }}></div>;
  }
};

export default SvgIcon;