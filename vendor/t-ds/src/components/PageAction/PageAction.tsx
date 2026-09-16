import React from 'react';
import './page-action.css';

interface PageActionProps {
  /** Основной текст */
  title: React.ReactNode;
  /** Дополнительный текст под заголовком */
  description?: React.ReactNode;
  /** Левый аксессуар, ожидается иконка 30px */
  leftAccessory?: React.ReactNode;
  /** Визуальный стиль: стандартный или деструктивный
   * @default "default" */
  variant?: 'default' | 'danger';
  /** Скрывает описание, даже если `description` передан
   * @default true */
  hasDescription?: boolean;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Колбэк при нажатии */
  onClick?: () => void;
  /** Блокирует кнопку
   * @default false */
  isDisabled?: boolean;
}

/**
 * Компонент предназначен для совершения действий, переходов во внутренние разделы,
 * получения дополнительной информации.
 */
export const PageAction: React.FC<PageActionProps> = ({
  title,
  description,
  leftAccessory,
  variant = 'default',
  hasDescription = true,
  className = '',
  onClick,
  isDisabled = false,
}) => {
  const classNames = [
    'page-action',
    `page-action--${variant}`,
    !description || !hasDescription ? 'page-action--single-line' : '',
    isDisabled ? 'is-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {leftAccessory && (
        <div className="page-action__left" aria-hidden="true">
          {leftAccessory}
        </div>
      )}
      <div className="page-action__text">
        <p className="page-action__title ts-500-l">{title}</p>
        {description && hasDescription && (
          <p className="page-action__description ts-400-s">{description}</p>
        )}
      </div>
    </button>
  );
};
