import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface TechButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'gradient' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const TechButton: React.FC<TechButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = `
    relative
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    font-medium
    transition-all
    duration-300
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-ring
    focus:ring-offset-2
    active:scale-95
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
    tech-focus
  `;

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-primary
      text-primary-foreground
      border border-primary
      hover:bg-primary/90
      hover:shadow-glow-blue
      hover:border-primary/70
    `,
    secondary: `
      bg-secondary
      text-secondary-foreground
      border border-secondary
      hover:bg-secondary/90
      hover:shadow-medium
    `,
    accent: `
      bg-accent
      text-accent-foreground
      border border-accent
      hover:bg-accent/90
      hover:shadow-glow-green
      hover:border-accent/70
    `,
    ghost: `
      bg-transparent
      text-foreground
      border border-border
      hover:bg-muted
      hover:shadow-soft
    `,
    gradient: `
      gradient-bg
      text-white
      border border-transparent
      hover:shadow-glow
      hover:scale-105
    `,
    glow: `
      bg-primary
      text-primary-foreground
      border border-primary/50
      shadow-glow
      hover:shadow-glow
      hover:shadow-primary/50
      animate-pulse-soft
    `,
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        isDisabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* 渐变背景动画 */}
      <div
        className="
        from-primary/20 via-accent/20 to-primary/20
        absolute inset-0 -z-10 rounded-xl
        bg-gradient-to-r opacity-0
        transition-opacity duration-300
        hover:opacity-100
      "
      />

      {/* 加载状态 */}
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}

      {/* 图标 */}
      {!loading && icon && (
        <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
      )}

      {/* 文字内容 */}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>

      {/* 发光效果 */}
      {variant === 'glow' && (
        <div
          className="
          bg-primary/20 absolute inset-0
          -z-20 animate-pulse
          rounded-xl
          blur-xl
        "
        />
      )}
    </button>
  );
};

export default TechButton;
