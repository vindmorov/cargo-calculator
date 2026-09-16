import React from 'react';
import { Spinner } from '../Spinner/Spinner';
import './header-button.css';

interface HeaderButtonProps {
  /** Текст кнопки */
  children: React.ReactNode;
  /** Иконка слева от текста */
  icon?: React.ReactNode;
  /** Визуальный стиль: основное, второстепенное или деструктивное действие
   * @default "primary" */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Блокирует кнопку
   * @default false */
  isDisabled?: boolean;
  /** Показывает спиннер и блокирует кнопку
   * @default false */
  isLoading?: boolean;
  /** Колбэк при нажатии */
  onClick?: () => void;
}

/**
 * Кнопка или группа кнопок, располагается в верхней части экрана под заголовком.
 * Используется для совершения основных или востребованных в контексте экрана действий.
 */
export const HeaderButton: React.FC<HeaderButtonProps> = ({
    children,
    icon,
    variant = 'primary',
    isDisabled = false,
    isLoading = false,
    onClick,
}) => {
    const classNames = [
        'header-button',
        `header-button--${variant}`,
        isDisabled ? 'is-disabled' : '',
        isLoading ? 'is-loading' : '',
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classNames}
            type="button"
            disabled={isDisabled || isLoading}
            onClick={onClick}
        >
            {isLoading && <Spinner className="header-button__spinner" />}
            {icon && <span className="ds-icon ds-icon--m header-button__icon">{icon}</span>}
            <span className="header-button__label ts-500-s">{children}</span>
        </button>
    );
};
