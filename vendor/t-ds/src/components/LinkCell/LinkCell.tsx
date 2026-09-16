import React from 'react';
import './link-cell.css';
import { Circle } from '../../assets/Icon/icons';
import { Spinner } from '../Spinner/Spinner';

export interface LinkCellProps {
  /** Заголовок ячейки */
  title: string;
  /** Описание под заголовком */
  description?: string;
  /** Иконка слева. По умолчанию — Circle */
  icon?: React.ReactNode;
  /** Размер: L — иконка 30px, текст ts-500-l; M — иконка 24px, текст ts-500-m
   * @default "l" */
  size?: 'l' | 'm';
  /** Показывает спиннер справа */
  isLoading?: boolean;
  /** Колбэк по клику. При наличии ячейка становится интерактивной */
  onClick?: () => void;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Навигационная строка с иконкой и заголовком в brand-цвете.
 * Используется для дополнительных действий на экране результата флоу.
 */
export const LinkCell: React.FC<LinkCellProps> = ({
  title,
  description,
  icon,
  size = 'l',
  isLoading = false,
  onClick,
  className = '',
}) => {
  const rootClassName = [
    'link-cell',
    `link-cell--${size}`,
    description ? 'link-cell--has-description' : '',
    onClick ? 'link-cell--interactive' : '',
    className,
  ].filter(Boolean).join(' ');

  const iconSizeClass = size === 'l' ? 'ds-icon--30' : 'ds-icon--24';
  const titleClass = size === 'l' ? 'ts-500-l' : 'ts-500-m';

  return (
    <div
      className={rootClassName}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className={`link-cell__icon ds-icon ${iconSizeClass}`} aria-hidden="true">
        {icon ?? <Circle />}
      </span>

      <div className="link-cell__text">
        <span className={`link-cell__title ${titleClass}`}>{title}</span>
        {description && (
          <span className="link-cell__description ts-400-s">{description}</span>
        )}
      </div>

      {isLoading && (
        <Spinner className="link-cell__spinner" />
      )}
    </div>
  );
};
