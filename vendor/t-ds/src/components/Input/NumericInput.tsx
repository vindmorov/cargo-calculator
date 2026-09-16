import React from 'react';
import { NumericFormat } from 'react-number-format';

interface NumericInputProps {
  className: string;
  value?: number | null;
  onValueChange?: (value: number | null) => void;
  suffix?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  placeholder?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  className,
  value,
  onValueChange,
  suffix,
  decimalScale = 0,
  allowNegative = false,
  placeholder,
  disabled,
  inputRef,
}) => (
  <NumericFormat
    getInputRef={inputRef}
    className={className}
    value={value ?? ''}
    onValueChange={({ floatValue }) => onValueChange?.(floatValue ?? null)}
    suffix={suffix}
    thousandSeparator=" "
    decimalSeparator=","
    decimalScale={decimalScale}
    allowNegative={allowNegative}
    placeholder={placeholder}
    disabled={disabled}
  />
);
