import React from 'react';
import { Spinner } from '../Spinner/Spinner';

interface ActionSheetFooterProps {
  /** Колбэк по клику на «Отмена» */
  onClick?: () => void;
  /** Блокирует кнопку «Отмена»
   * @default false */
  isDisabled?: boolean;
  /** Показывает спиннер и блокирует кнопку
   * @default false */
  isLoading?: boolean;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Подвал `ActionSheet` с кнопкой «Отмена».
 * Поддерживает состояния загрузки и блокировки.
 */
export const ActionSheetFooter: React.FC<ActionSheetFooterProps> = ({
  onClick,
  isDisabled = false,
  isLoading = false,
  className = '',
}) => {
  const classNames = [
    'action-sheet-footer',
    'hoverOpacity',
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
      {isLoading && <Spinner className="action-sheet-footer__spinner" />}
      <span className="action-sheet-footer__label ts-500-l">Отмена</span>
    </button>
  );
};
