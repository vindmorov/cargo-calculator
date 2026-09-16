import React from 'react';
import './spinner.css';

interface SpinnerProps {
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Инлайн-стили для кастомизации размера и цвета */
  style?: React.CSSProperties;
}

/**
 * Анимированный индикатор, отображающий процесс загрузки или выполнения действия.
 */
export const Spinner: React.FC<SpinnerProps> = ({ className = '', style }) => {
    return (
        <span className={`ds-spinner ${className}`} style={style} aria-hidden="true">
            <span className="ds-spinner__ring"></span>
        </span>
    );
};
