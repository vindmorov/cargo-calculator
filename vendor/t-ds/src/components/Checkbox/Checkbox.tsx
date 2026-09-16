import React from 'react';
import { Minus as Minus16 } from '../../assets/Icon/16/Stroked';
import { Checkmark as Checkmark16 } from '../../assets/Icon/16/Stroked';
import './checkbox.css';

interface CheckboxProps {
  /** Отмечен ли чекбокс
   * @default false */
  isChecked?: boolean;
  /** Промежуточное состояние (частичный выбор)
   * @default false */
  isIndeterminate?: boolean;
  /** Блокирует чекбокс
   * @default false */
  isDisabled?: boolean;
  /** Колбэк при изменении состояния */
  onChange?: (checked: boolean) => void;
  /** Aria-метка для доступности */
  label?: string;
  /** Инлайн-стили */
  style?: React.CSSProperties;
}

/**
 * Элемент выбора, который позволяет отметить один или несколько вариантов из списка.
 * Используется в формах, фильтрах и настройках, а также для подтверждения согласия с условиями.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
    isChecked = false,
    isIndeterminate = false,
    isDisabled = false,
    onChange,
    label,
    style,
}) => {
    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isDisabled && onChange) {
            onChange(!isChecked);
        }
    };

    const classNames = [
        'checkbox',
        isChecked ? 'is-checked' : '',
        isIndeterminate ? 'is-indeterminate' : '',
        isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classNames}
            type="button"
            role="checkbox"
            aria-checked={isIndeterminate ? 'mixed' : isChecked}
            aria-label={label}
            disabled={isDisabled}
            onClick={handleToggle}
            style={style}
        >
            <span className="checkbox__icon checkbox__icon--check" aria-hidden="true">
                <Checkmark16 />
            </span>
            <span className="checkbox__icon checkbox__icon--minus" aria-hidden="true">
                <Minus16 />
            </span>
        </button>
    );
};
