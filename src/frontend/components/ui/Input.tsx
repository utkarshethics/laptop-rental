import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, fullWidth = true, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={cn('w-full', fullWidth ? '' : '')}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 mb-1.5">
            {label}
            {props.required && <span className="text-error-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-secondary-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-secondary-900 placeholder:text-secondary-400 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              error
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
                : 'border-secondary-300 hover:border-secondary-400 focus:border-primary-500',
              props.disabled && 'bg-secondary-50 text-secondary-500 cursor-not-allowed',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-secondary-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-secondary-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, fullWidth = true, className, id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className={cn('w-full', fullWidth ? '' : '')}>
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-secondary-700 mb-1.5">
            {label}
            {props.required && <span className="text-error-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-secondary-900 placeholder:text-secondary-400 transition-all duration-200 resize-y min-h-[100px]',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            error
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
              : 'border-secondary-300 hover:border-secondary-400 focus:border-primary-500',
            props.disabled && 'bg-secondary-50 text-secondary-500 cursor-not-allowed',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-error-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-1.5 text-sm text-secondary-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, fullWidth = true, className, id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className={cn('w-full', fullWidth ? '' : '')}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-secondary-700 mb-1.5">
            {label}
            {props.required && <span className="text-error-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-secondary-900 appearance-none transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")] bg-[right_0.75rem_center] bg-no-repeat pr-10',
              error
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
                : 'border-secondary-300 hover:border-secondary-400 focus:border-primary-500',
              props.disabled && 'bg-secondary-50 text-secondary-500 cursor-not-allowed',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled selected hidden>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-error-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1.5 text-sm text-secondary-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';