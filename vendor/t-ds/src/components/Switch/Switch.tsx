import React from 'react';
import './switch.css';

interface SwitchProps {
  /** Переводит переключатель во включённое состояние
   * @default false */
  isSelected?: boolean;
  /** Блокирует переключатель
   * @default false */
  isDisabled?: boolean;
  /** Колбэк при переключении, передаёт новое значение */
  onChange?: (isSelected: boolean) => void;
  /** Aria-метка для доступности */
  label?: string;
  /** Инлайн-стили для кастомизации */
  style?: React.CSSProperties;
}

/**
 * Компонент для быстрого переключения между двумя возможными состояниями.
 */
export const Switch: React.FC<SwitchProps> = ({
    isSelected = false,
    isDisabled = false,
    onChange,
    label,
    style,
}) => {
    const handleToggle = () => {
        if (!isDisabled && onChange) {
            onChange(!isSelected);
        }
    };

    const classNames = [
        'switch',
        isSelected ? 'is-selected' : '',
        isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classNames}
            type="button"
            role="switch"
            aria-checked={isSelected}
            aria-label={label}
            disabled={isDisabled}
            onClick={handleToggle}
            style={style}
        />
    );
};
