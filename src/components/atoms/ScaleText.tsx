import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ScaleTextProps {
  children: ReactNode;
  className?: string;
  scale?: '110' | '125' | '150';
  duration?: '100' | '200' | '300' | '500';
}

/**
 * ScaleText 组件 - 在鼠标悬停时按比例放大文字
 *
 * @param {ReactNode} children - 子元素
 * @param {string} className - 额外的类名
 * @param {string} scale - 放大比例，默认为 110 (110%)
 * @param {string} duration - 动画持续时间（毫秒），默认为 300
 */
const ScaleText: React.FC<ScaleTextProps> = ({
  children,
  className = '',
  scale = '110',
  duration = '300',
}) => {
  // 将字符串转换为数字
  const scaleValue = parseInt(scale) / 100;
  const durationValue = parseInt(duration);
  const [isHovered, setIsHovered] = React.useState(false);

  // 计算元素样式
  const getElementStyle = () => {
    return {
      transition: `transform ${durationValue}ms ease`,
      transform: isHovered ? `scale(${scaleValue})` : 'scale(1)',
    };
  };

  return (
    <span
      className={cn('inline-block cursor-pointer', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={getElementStyle()}
    >
      {children}
    </span>
  );
};

export default ScaleText;
