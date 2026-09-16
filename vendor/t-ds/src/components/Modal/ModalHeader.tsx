import React from 'react';
import './modal-header.css';
import { ArrowLeft, Cross } from '../../assets/Icon/icons';

interface ModalHeaderProps {
  /** Заголовок окна */
  title?: React.ReactNode;
  /** Произвольный элемент слева (заменяет стрелку назад) */
  leftAccessory?: React.ReactNode;
  /** Показывает стрелку «назад» слева, если не передан `leftAccessory`
   * @default false */
  hasDefaultBackArrow?: boolean;
  /** Колбэк при клике на левый элемент */
  onLeftAccessoryClick?: () => void;
  /** Колбэк при клике на кнопку закрытия (×) */
  onClose?: () => void;
  /** Вариант шапки:
   * - `default` — стандартная шапка с навигацией и кнопкой закрытия
   * - `empty` — пустой спейсер (десктоп 30px, адаптив 64px)
   * @default "default" */
  variant?: 'default' | 'empty';
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Шапка `Modal` с заголовком, левым аксессуаром и кнопкой закрытия.
 * При скролле контента переключается в компактный режим.
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  leftAccessory,
  hasDefaultBackArrow = false,
  onLeftAccessoryClick,
  onClose,
  variant = 'default',
  className = '',
}) => {
  if (variant === 'empty') {
    return <div className={['modal-header', 'modal-header--empty', className].filter(Boolean).join(' ')} />;
  }

  const classNames = ['modal-header', className].filter(Boolean).join(' ');
  const resolvedLeftAccessory = leftAccessory ?? (
    hasDefaultBackArrow ? (
      <span className="modal-header__icon ds-icon ds-icon--24" aria-hidden="true">
        <ArrowLeft />
      </span>
    ) : null
  );

  const renderSideSlot = (
    content: React.ReactNode,
    onClick?: () => void,
    ariaLabel?: string,
  ) => {
    if (!content) {
      return <div className="modal-header__side modal-header__side--empty" />;
    }

    if (onClick) {
      return (
        <button
          type="button"
          className="modal-header__side modal-header__control hoverOpacity"
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {content}
        </button>
      );
    }

    return <div className="modal-header__side">{content}</div>;
  };

  return (
    <div className={classNames}>
      <div className="modal-header__navigation">
        {renderSideSlot(resolvedLeftAccessory, onLeftAccessoryClick, 'Открыть предыдущее действие')}

        <div className="modal-header__center">
          {typeof title === 'undefined' ? null : (
            <div className="modal-header__title modal-header__title--compact ts-500-m">{title}</div>
          )}
        </div>

        {renderSideSlot(
          <span className="modal-header__icon ds-icon ds-icon--24" aria-hidden="true">
            <Cross />
          </span>,
          onClose,
          'Закрыть модальное окно',
        )}
      </div>
    </div>
  );
};
