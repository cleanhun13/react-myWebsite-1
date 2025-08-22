import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface TechInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'glass' | 'glow';
  size?: 'sm' | 'md' | 'lg';
}

const TechInput = forwardRef<HTMLInputElement, TechInputProps>(
  (
    { className, label, error, helperText, icon, variant = 'default', size = 'md', type, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-5 text-base',
    };

    const variantClasses = {
      default: `
        bg-input
        border border-border
        focus:border-ring
        focus:ring-2
        focus:ring-ring/20
      `,
      glass: `
        glass-effect
        border border-border/30
        focus:border-primary/50
        focus:ring-2
        focus:ring-primary/20
      `,
      glow: `
        bg-input
        border border-primary/30
        focus:border-primary
        focus:ring-2
        focus:ring-primary/30
        focus:shadow-glow
      `,
    };

    const baseClasses = `
      w-full
      rounded-xl
      text-foreground
      placeholder:text-muted-foreground
      transition-all
      duration-300
      ease-in-out
      focus:outline-none
      disabled:opacity-50
      disabled:cursor-not-allowed
      tech-focus
      ${icon ? 'pl-10' : ''}
      ${isPassword ? 'pr-10' : ''}
    `;

    return (
      <div className="space-y-2">
        {/* 标签 */}
        {label && <label className="text-foreground block text-sm font-medium">{label}</label>}

        {/* 输入框容器 */}
        <div className="relative">
          {/* 左侧图标 */}
          {icon && (
            <div className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}

          {/* 输入框 */}
          <input
            type={inputType}
            className={cn(
              baseClasses,
              sizeClasses[size],
              variantClasses[variant],
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              className
            )}
            ref={ref}
            {...props}
          />

          {/* 密码显示/隐藏按钮 */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                text-muted-foreground hover:text-foreground absolute right-3
                top-1/2 -translate-y-1/2
                transition-colors duration-200
                focus:outline-none
              "
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}

          {/* 发光效果 */}
          {variant === 'glow' && (
            <div
              className="
              bg-primary/10 pointer-events-none absolute
              inset-0 -z-10
              rounded-xl opacity-0
              blur-sm transition-opacity
              duration-300
              focus-within:opacity-100
            "
            />
          )}
        </div>

        {/* 错误信息或帮助文本 */}
        {(error || helperText) && (
          <p className={cn('text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TechInput.displayName = 'TechInput';

export default TechInput;
