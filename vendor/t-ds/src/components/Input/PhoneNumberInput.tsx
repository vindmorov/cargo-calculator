import React, { useRef } from 'react';
import { PatternFormat } from 'react-number-format';

const RU_PHONE_PLACEHOLDER = '+7 999 123-45-67';

interface PhoneNumberInputProps {
  className: string;
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  className,
  value,
  onChange,
  placeholder = RU_PHONE_PLACEHOLDER,
  disabled,
  inputRef,
}) => {
  const digits = (value ?? '').replace(/\D/g, '');
  const inputElementRef = useRef<HTMLInputElement | null>(null);

  const setInputRef = (node: HTMLInputElement | null) => {
    inputElementRef.current = node;

    if (typeof inputRef === 'function') inputRef(node);
    else if (inputRef) (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
  };

  const moveCaretToNumberStart = () => {
    requestAnimationFrame(() => {
      // PatternFormat also корректирует каретку после изменения значения.
      // Ставим её после этой внутренней обработки.
      setTimeout(() => inputElementRef.current?.setSelectionRange(3, 3), 0);
    });
  };

  return (
    <PatternFormat
      getInputRef={setInputRef}
      className={className}
      type="tel"
      value={digits}
      valueIsNumericString
      format="+# ### ###-##-##"
      mask="_"
      onValueChange={({ value: rawDigits }) => {
        if (!digits && rawDigits.length === 1 && (rawDigits === '7' || rawDigits === '8')) {
          onChange?.('+7');
          moveCaretToNumberStart();
          return;
        }

        const normalizedDigits = rawDigits.startsWith('8')
          ? `7${rawDigits.slice(1)}`
          : rawDigits.startsWith('7')
            ? rawDigits
            : `7${rawDigits}`;

        onChange?.(rawDigits ? `+${normalizedDigits}` : '');
      }}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
