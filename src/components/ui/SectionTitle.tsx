
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const SectionTitle = ({ children, className, as = 'h2', ...props }: SectionTitleProps) => {
  const Tag = as;
  return (
    <Tag
      className={cn(
        'mb-6 font-headline text-3xl font-semibold tracking-tight text-foreground',
        {
          'text-4xl': as === 'h1',
          'text-3xl': as === 'h2',
          'text-2xl': as === 'h3',
          'text-xl': as === 'h4',
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default SectionTitle;
