import React from 'react';
import { ReactSVG } from 'react-svg';
import { cn } from '../../lib/utils';

interface LogoWithTextProps {
  iconName: string;
  text: string;
  className?: string;
  scale?: '110' | '125' | '150';
  duration?: '100' | '200' | '300' | '500';
  onClick?: () => void;
}

/**
 * LogoWithText 组件 - 显示 Logo 图标和文字，并在鼠标悬停时同步缩放
 *
 * @param {string} iconName - 图标名称或路径
 * @param {string} text - Logo 文字
 * @param {string} className - 额外的类名
 * @param {string} scale - 放大比例，默认为 110 (110%)
 * @param {string} duration - 动画持续时间（毫秒），默认为 300
 * @param {function} onClick - 点击事件回调函数
 */
const LogoWithText: React.FC<LogoWithTextProps> = ({
  iconName,
  text,
  className = '',
  scale = '110',
  duration = '300',
  onClick,
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
    <div
      className={cn('flex cursor-pointer items-center', className)}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo 图标 */}
      <div className="rounded-full" style={getElementStyle()}>
        <ReactSVG
          src={`/${iconName}`}
          className="h-full w-full"
          loading={() => <span>Loading</span>}
          fallback={() => <div className="h-min">Error!</div>}
          onError={error => {
            console.error(error);
          }}
          beforeInjection={svg => {
            svg.setAttribute('style', 'width: 24px; height: 24px;');
          }}
        />
      </div>

      {/* Logo 文字 */}
      <div className="ml-3">
        <span className="text-foreground inline-block text-xl font-bold" style={getElementStyle()}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default LogoWithText;
