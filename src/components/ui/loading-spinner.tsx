import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
  variant?: 'default' | 'overlay' | 'inline'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

export function LoadingSpinner({ 
  size = 'md', 
  className, 
  text,
  variant = 'default'
}: LoadingSpinnerProps) {
  const spinner = (
    <Loader2 
      className={cn(
        'animate-spin text-primary',
        sizeClasses[size],
        className
      )} 
    />
  )

  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-2">
          {spinner}
          {text && (
            <p className="text-sm text-muted-foreground">{text}</p>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center space-x-2">
        {spinner}
        {text && (
          <span className="text-sm text-muted-foreground">{text}</span>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {spinner}
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
}

// Loading button component
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function LoadingButton({
  isLoading = false,
  loadingText,
  children,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'h-10 px-4 py-2',
        className
      )}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {isLoading ? loadingText || 'Loading...' : children}
    </button>
  )
}

// Loading skeleton component
interface LoadingSkeletonProps {
  className?: string
  lines?: number
  variant?: 'text' | 'circular' | 'rectangular'
}

export function LoadingSkeleton({ 
  className, 
  lines = 1, 
  variant = 'text' 
}: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-muted'
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  }

  if (lines === 1) {
    return (
      <div 
        className={cn(
          baseClasses,
          variantClasses[variant],
          variant === 'text' && 'w-full',
          className
        )} 
      />
    )
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            baseClasses,
            variantClasses[variant],
            variant === 'text' && 'w-full h-4',
            index === lines - 1 && variant === 'text' && 'w-3/4', // Last line shorter
            className
          )}
        />
      ))}
    </div>
  )
}

// Loading state wrapper
interface LoadingWrapperProps {
  isLoading: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export function LoadingWrapper({ 
  isLoading, 
  children, 
  fallback,
  className 
}: LoadingWrapperProps) {
  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center p-4', className)}>
        {fallback || <LoadingSpinner />}
      </div>
    )
  }

  return <>{children}</>
}