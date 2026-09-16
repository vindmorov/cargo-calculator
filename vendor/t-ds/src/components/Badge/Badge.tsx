import React from 'react';
import './badge.css';

export interface BadgeProps {
  /** Числовое значение. Значения больше 99 отображаются как `99+` */
  value: number;
  /** Цвет фона
   * @default "var(--primitive-neutral-4)" */
  color?: string;
  /** Цвет текста
   * @default "var(--primitive-default)" */
  textColor?: string;
  /** Размер бейджа
   * @default "m" */
  size?: 'm' | 's' | 'xs';
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Компонент, показывающий индикатор или счётчик.
 * Обычно используется для отображения статуса или уведомления о новых событиях.
 * Используется поверх иконок, в списках и аксессуарах.
 */
export const Badge: React.FC<BadgeProps> = ({
  value,
  color = 'var(--primitive-neutral-4)',
  textColor = 'var(--primitive-default)',
  size = 'm',
  className = '',
}) => {
  const displayValue = value > 99 ? '99+' : value.toString();

  return (
    <div
      className={`ds-badge ds-badge--${size} ${className}`}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {displayValue}
    </div>
  );
};
