import { forwardRef } from 'react';
import { classNames } from '../../utils/helpers';

const Button = forwardRef(({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500',
    danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;