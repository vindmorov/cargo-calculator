import React from 'react';
import { Cross } from '../../assets/Icon/icons';
import { Spinner } from '../Spinner/Spinner';
import './contextual-notification.css';

export interface ContextualNotificationProps {
  /** Текст сообщения */
  text: React.ReactNode;
  /** Заголовок */
  title?: React.ReactNode;
  /** Показывать заголовок
   * @default true */
  hasTitle?: boolean;
  /** Показывать иконку закрытия
   * @default true */
  hasCloseIcon?: boolean;
  /** Колбэк по клику на крестик */
  onClose?: () => void;
  /** Показывать блок действия
   * @default false */
  hasAction?: boolean;
  /** Текст кнопки действия */
  actionLabel?: React.ReactNode;
  /** Показывать спиннер рядом с действием
   * @default false */
  hasSpinner?: boolean;
  /** Колбэк по клику на действие */
  onActionClick?: () => void;
  /** Тип левого аксессуара
   * @default 'icon' */
  accessory?: 'icon' | 'avatar';
  /** Иконка (когда accessory='icon') */
  icon?: React.ReactNode;
  /** Аватар (когда accessory='avatar') */
  avatar?: React.ReactNode;
  /** Размер компонента
   * @default 's' */
  size?: 's' | 'm';
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Контекстное уведомление — компактный блок с иконкой или аватаром,
 * текстом, опциональным заголовком, кнопкой закрытия и действием.
 */
export const ContextualNotification: React.FC<ContextualNotificationProps> = ({
  text,
  title,
  hasTitle = true,
  hasCloseIcon = true,
  onClose,
  hasAction = false,
  actionLabel,
  hasSpinner = false,
  onActionClick,
  accessory = 'icon',
  icon,
  avatar,
  size = 's',
  className = '',
}) => {
  const hasExtendedContent = (hasTitle && Boolean(title)) || hasAction;

  const rootClassName = [
    'contextual-notification',
    `contextual-notification--${size}`,
    hasExtendedContent ? 'contextual-notification--extended' : '',
    className,
  ].filter(Boolean).join(' ');

  const titleClass = size === 'm' ? 'ts-500-m' : 'ts-500-s';
  const textClass = size === 'm' ? 'ts-400-m' : 'ts-400-s';
  const actionLabelClass = size === 'm' ? 'ts-500-m' : 'ts-500-s';
  const spinnerPx = size === 'm' ? 20 : 16;

  return (
    <div className={rootClassName}>
      <div className="contextual-notification__accessory">
        {accessory === 'avatar' ? (
          avatar
        ) : (
          <span className="ds-icon ds-icon--18" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      <div className="contextual-notification__body">
        <div className="contextual-notification__header">
          <div className="contextual-notification__texts">
            {hasTitle && title && (
              <p className={`contextual-notification__title ${titleClass}`}>{title}</p>
            )}
            <p className={`contextual-notification__text ${textClass}`}>{text}</p>
          </div>

          {hasCloseIcon && (
            <button
              className="contextual-notification__close hoverOpacity"
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
            >
              <span className="ds-icon ds-icon--18" aria-hidden="true">
                <Cross />
              </span>
            </button>
          )}
        </div>

        {hasAction && (
          <div className="contextual-notification__action">
            <button
              className={`contextual-notification__action-label ${actionLabelClass} hoverOpacity`}
              type="button"
              onClick={onActionClick}
            >
              {actionLabel}
            </button>
            {hasSpinner && (
              <Spinner
                className="contextual-notification__spinner"
                style={{ width: `${spinnerPx}px`, height: `${spinnerPx}px` }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
