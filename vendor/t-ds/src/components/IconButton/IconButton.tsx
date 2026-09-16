import React from 'react';
import './icon-button.css';

import { Spinner } from '../Spinner/Spinner';

export interface IconButtonProps {
  /** Иконка кнопки */
  icon: React.ReactNode;
  /** Aria-метка для доступности */
  ariaLabel: string;
  /** Визуальный стиль кнопки
   * @default "primary" */
  variant?: 'primary' | 'secondary' | 'transparent' | 'white';
  /** Размер кнопки
   * @default "m" */
  size?: 'xl' | 'l' | 'm' | 's' | 'xs';
  /** Показывает спиннер и блокирует кнопку
   * @default false */
  isLoading?: boolean;
  /** Блокирует кнопку
   * @default false */
  isDisabled?: boolean;
  /** Колбэк по клику */
  onClick?: () => void;
  /** HTML-тип кнопки
   * @default "button" */
  type?: 'button' | 'submit' | 'reset';
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Квадратная кнопка с одной иконкой без текста.
 * Используется там, где нужно компактное действие без подписи.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ariaLabel,
  variant = 'primary',
  size = 'm',
  isLoading = false,
  isDisabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const classNames = [
    'icon-button',
    `icon-button--${variant}`,
    `icon-button--${size}`,
    isLoading ? 'is-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
    >
      <span className="icon-button__icon">
        <span className="ds-icon ds-icon--m" aria-hidden="true">{icon}</span>
      </span>
      {isLoading && <Spinner />}
    </button>
  );
};
