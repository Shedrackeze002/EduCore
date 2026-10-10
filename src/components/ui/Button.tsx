import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn.ts';
import { Spinner } from './Spinner.tsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'soft' | 'outline';
type Size = 'xs' | 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-[background,color,box-shadow,transform] duration-150 active:translate-y-px disabled:opacity-55 disabled:active:translate-y-0 select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-brand-ink shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_1px_2px_rgb(0_0_0/0.12)] hover:bg-brand-700',
  secondary: 'border border-line-strong bg-surface text-ink shadow-card hover:bg-surface-2',
  outline: 'border border-brand-300 bg-transparent text-brand-700 hover:bg-brand-50',
  ghost: 'text-ink-2 hover:bg-surface-2 hover:text-ink',
  soft: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  danger: 'bg-bad text-white hover:brightness-95',
};

const sizes: Record<Size, string> = {
  xs: 'h-7 px-2.5 text-xs rounded-lg',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-[15px]',
  lg: 'h-12 px-6 text-base',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  to?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, icon, className, children, to, disabled, type = 'button', ...rest },
  ref,
) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {loading ? <Spinner className="h-4 w-4" /> : icon}
      {children}
    </>
  );
  if (to && !disabled) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button ref={ref} type={type} className={cls} disabled={disabled || loading} {...rest}>
      {inner}
    </button>
  );
});

export function IconButton({ label, className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn('inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-2 transition hover:bg-surface-2 hover:text-ink', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
