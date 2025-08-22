import React from 'react';
import { cn } from '../../lib/utils';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  loading?: boolean;
}

const TechCard: React.FC<TechCardProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  hoverable = true,
  loading = false,
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    default: `
      bg-card 
      border border-border 
      shadow-soft
    `,
    glass: `
      glass-effect 
      border border-border/20
    `,
    gradient: `
      gradient-border 
      shadow-medium
    `,
    glow: `
      bg-card 
      border border-primary/20 
      shadow-glow
    `,
  };

  const baseClasses = `
    rounded-xl
    transition-all 
    duration-300 
    ease-in-out
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${hoverable ? 'hover:shadow-medium hover:-translate-y-1 cursor-pointer' : ''}
    ${loading ? 'tech-loading' : ''}
  `;

  return <div className={cn(baseClasses, className)}>{children}</div>;
};

export default TechCard;
