import React from 'react';
import './button.css';

import { Spinner } from '../Spinner/Spinner';

interface ButtonProps {
  /** Текст или содержимое кнопки */
  children: React.ReactNode;
  /** Визуальный стиль кнопки
   * @default "primary" */
  variant?: 'primary' | 'secondary' | 'transparent' | 'white';
  /** Размер кнопки
   * @default "m" */
  size?: 'xl' | 'l' | 'm' | 's' | 'xs';
  /** Ширина по содержимому вместо фиксированной
   * @default false */
  isHugWidth?: boolean;
  /** Иконка или элемент слева от текста */
  leftAccessory?: React.ReactNode;
  /** Иконка или элемент справа от текста */
  rightAccessory?: React.ReactNode;
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

const labelClassMap: Record<NonNullable<ButtonProps['size']>, string> = {
  xl: 'ts-500-xl',
  l: 'ts-500-l',
  m: 'ts-500-m',
  s: 'ts-500-s',
  xs: 'ts-500-s',
};

/**
 * Кнопка — основной интерактивный элемент для запуска действий.
 * Используется во всех сценариях, где пользователю нужно совершить действие:
 * отправить форму, подтвердить операцию, перейти к следующему шагу.
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'm',
    isHugWidth = false,
    leftAccessory,
    rightAccessory,
    isLoading = false,
    isDisabled = false,
    onClick,
    type = 'button',
    className = '',
}) => {
    const classNames = [
        'button',
        `button--${variant}`,
        `button--${size}`,
        isHugWidth ? 'button--hug' : '',
        isLoading ? 'is-loading' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classNames}
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            aria-busy={isLoading || undefined}
        >
            <div className="button__content">
                {leftAccessory && (
                    <span className="button__accessory">{leftAccessory}</span>
                )}
                <span className={`button__label ${labelClassMap[size]}`}>{children}</span>
                {rightAccessory && (
                    <span className="button__accessory">{rightAccessory}</span>
                )}
            </div>
            {isLoading && <Spinner />}
        </button>
    );
};
