import React from 'react';
import './feedback-banner.css';

export interface FeedbackBannerAction {
  /** Текст кнопки */
  label: React.ReactNode;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Блокирует кнопку */
  isDisabled?: boolean;
}

export interface FeedbackBannerProps {
  /** Текст баннера */
  children: React.ReactNode;
  /** Основная кнопка действия */
  primaryAction?: FeedbackBannerAction;
  /** Дополнительная кнопка действия */
  secondaryAction?: FeedbackBannerAction;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

const renderAction = (action: FeedbackBannerAction, key: 'primary' | 'secondary') => (
  <button
    key={key}
    className="feedback-banner__action"
    type="button"
    onClick={action.onClick}
    disabled={action.isDisabled}
  >
    <span className="feedback-banner__action-label ts-500-m">{action.label}</span>
  </button>
);

/**
 * Компонент для сбора расширенной обратной связи.
 * По клику на кнопку может открываться модальное окно.
 */
export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  children,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  const actions = [primaryAction, secondaryAction].filter(Boolean) as FeedbackBannerAction[];

  return (
    <section className={['feedback-banner', className].filter(Boolean).join(' ')}>
      <p className="feedback-banner__content ts-500-m">{children}</p>
      {actions.length > 0 && (
        <div className="feedback-banner__actions" aria-label="Действия баннера">
          {primaryAction && renderAction(primaryAction, 'primary')}
          {secondaryAction && renderAction(secondaryAction, 'secondary')}
        </div>
      )}
    </section>
  );
};
