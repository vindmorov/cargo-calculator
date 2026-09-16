import React from 'react';
import './radio.css';

interface RadioProps {
  /** Переводит кнопку в выбранное состояние
   * @default false */
  isSelected?: boolean;
  /** Блокирует кнопку
   * @default false */
  isDisabled?: boolean;
  /** Колбэк при выборе */
  onChange?: () => void;
  /** Aria-метка для доступности */
  label?: string;
}

/**
 * Компонент для единичного выбора из множества вариантов.
 * Используется в группах, где нужно выбрать ровно один вариант.
 */
export const Radio: React.FC<RadioProps> = ({
    isSelected = false,
    isDisabled = false,
    onChange,
    label,
}) => {
    const classNames = [
        'radio',
        isSelected ? 'is-selected' : '',
        isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classNames}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={label}
            disabled={isDisabled}
            onClick={!isDisabled ? onChange : undefined}
        />
    );
};
