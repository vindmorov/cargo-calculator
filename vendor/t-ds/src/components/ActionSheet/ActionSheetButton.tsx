import React from 'react';
import { Spinner } from '../Spinner/Spinner';

interface ActionSheetButtonProps {
  /** Текст кнопки */
  title: React.ReactNode;
  /** Дополнительный текст под заголовком */
  description?: React.ReactNode;
  /** Показывает `description` (только если он передан)
   * @default false */
  hasDescription?: boolean;
  /** Иконка 30px слева */
  icon?: React.ReactNode;
  /** Показывает иконку (только если она передана)
   * @default true */
  hasIcon?: boolean;
  /** Визуальный стиль: обычный или деструктивный
   * @default "default" */
  variant?: 'default' | 'danger';
  /** Блокирует кнопку
   * @default false */
  isDisabled?: boolean;
  /** Показывает спиннер и блокирует кнопку
   * @default false */
  isLoading?: boolean;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Кнопка действия внутри `ActionSheet`.
 * Поддерживает иконку, описание, варианты внешнего вида и состояние загрузки.
 */
export const ActionSheetButton: React.FC<ActionSheetButtonProps> = ({
  title,
  description,
  hasDescription = false,
  icon,
  hasIcon = true,
  variant = 'default',
  isDisabled = false,
  isLoading = false,
  onClick,
  className = '',
}) => {
  const shouldRenderDescription = hasDescription && typeof description !== 'undefined';
  const shouldRenderIcon = hasIcon && typeof icon !== 'undefined';
  const classNames = [
    'action-sheet-button',
    'hoverOpacity',
    `action-sheet-button--${variant}`,
    !shouldRenderDescription ? 'action-sheet-button--single-line' : '',
    isDisabled ? 'is-disabled' : '',
    isLoading ? 'is-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classNames}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      <div className="action-sheet-button__main">
        {shouldRenderIcon && (
          <span className="action-sheet-button__icon ds-icon ds-icon--30" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="action-sheet-button__text">
          <span className="action-sheet-button__title ts-500-l">{title}</span>
          {shouldRenderDescription && <span className="action-sheet-button__description ts-400-s">{description}</span>}
        </span>
      </div>
      {isLoading && <Spinner className="action-sheet-button__spinner" />}
    </button>
  );
};
