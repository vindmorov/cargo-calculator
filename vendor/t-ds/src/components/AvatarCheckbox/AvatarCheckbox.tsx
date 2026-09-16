import React from 'react';
import './avatar-checkbox.css';
import { Checkmark } from '../../assets/Icon/20/Stroked';

export type AvatarCheckboxSize = 'm' | 's';

interface AvatarCheckboxProps {
  /** Размер: m = 40px, s = 32px
   * @default "m" */
  size?: AvatarCheckboxSize;
  /** Состояние выбора
   * @default false */
  isChecked?: boolean;
  /** Недоступен для взаимодействия
   * @default false */
  isDisabled?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительный CSS-класс */
  className?: string;
}

export const AvatarCheckbox: React.FC<AvatarCheckboxProps> = ({
  size = 'm',
  isChecked = false,
  isDisabled = false,
  onClick,
  className = '',
}) => {
  const classes = [
    'ds-avatar-checkbox',
    `ds-avatar-checkbox--${size}`,
    isChecked ? 'is-checked' : '',
    isDisabled ? 'is-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  if (isDisabled) {
    return (
      <div className={classes} aria-checked={isChecked} aria-disabled role="checkbox">
        {isChecked && (
          <span className="ds-avatar-checkbox__icon" aria-hidden="true">
            <Checkmark />
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      role="checkbox"
      aria-checked={isChecked}
    >
      {isChecked && (
        <span className="ds-avatar-checkbox__icon" aria-hidden="true">
          <Checkmark />
        </span>
      )}
    </button>
  );
};
