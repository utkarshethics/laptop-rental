import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  className?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  hint,
  disabled = false,
  searchable = false,
  multiple = false,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    onChange(option.value);
    if (!multiple) setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const displayValue = multiple
    ? options.filter(o => value?.split(',').includes(o.value)).map(o => o.label).join(', ')
    : options.find(o => o.value === value)?.label;

  return (
    <div className={cn('w-full', className)} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700 mb-1.5">
          {label}
          {propsRequired && <span className="text-error-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          ref={inputRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'w-full flex items-center justify-between px-4 py-2.5 rounded-lg border bg-white text-sm text-left transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            disabled
              ? 'bg-secondary-50 text-secondary-500 cursor-not-allowed border-secondary-200'
              : error
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
                : 'border-secondary-300 hover:border-secondary-400 focus:border-primary-500'
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={label}
        >
          <span className={cn('flex-1 truncate', displayValue ? 'text-secondary-900' : 'text-secondary-400')}>
            {displayValue || placeholder}
          </span>
          <ChevronDown className={cn('w-4 h-4 text-secondary-400 flex-shrink-0 ml-2 transition-transform', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-white rounded-lg border shadow-elevated animate-slide-down">
            {searchable && (
              <div className="p-2 border-b border-secondary-100 sticky top-0 bg-white">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  autoFocus
                />
              </div>
            )}
            <ul role="listbox" className="py-1">
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-3 text-center text-secondary-500 text-sm">No options found</li>
              ) : (
                filteredOptions.map(option => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={value === option.value}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-3',
                      option.disabled ? 'text-secondary-300 cursor-not-allowed' : '',
                      value === option.value ? 'bg-primary-50 text-primary-700' : 'text-secondary-700 hover:bg-secondary-50'
                    )}
                  >
                    {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <span className="truncate block">{option.label}</span>
                      {option.description && (
                        <span className="text-caption text-secondary-500 block truncate">{option.description}</span>
                      )}
                    </div>
                    {value === option.value && <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-error-600" role="alert">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-sm text-secondary-500">{hint}</p>
      )}
    </div>
  );
}

// Helper to make the label required prop work
const propsRequired = false;