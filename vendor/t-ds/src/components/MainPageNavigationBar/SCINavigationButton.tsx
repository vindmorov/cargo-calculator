import React from 'react';

export interface SCINavigationButtonProps {
  /** Активное состояние — подсвечивает пункт навигации
   * @default false */
  isActive?: boolean;
  /** Текст пункта навигации */
  label: string;
  /** Колбэк по клику */
  onClick?: () => void;
}

/**
 * Кнопка пункта навигации для `MainPageNavigationBar`.
 */
export const SCINavigationButton: React.FC<SCINavigationButtonProps> = ({
  isActive = false,
  label,
  onClick,
}) => {
  const className = [
    'sci-navigation-button',
    isActive ? 'sci-navigation-button--selected' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={className}
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      <span className="sci-navigation-button__label ts-500-m">{label}</span>
    </button>
  );
};
