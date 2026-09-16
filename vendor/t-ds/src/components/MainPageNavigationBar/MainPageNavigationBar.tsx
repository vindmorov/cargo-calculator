import React, { useState } from 'react';
import { Bell, Gift, Gear, ArrowRightOutgoingRectangleVertical, ChevronDown } from '../../assets/Icon/icons';
import { TochkaBankCyrTwoLines } from '../../assets/Logo';
import { SCINavigationButton } from './SCINavigationButton';
import './main-page-navigation-bar.css';

export type MainPageNavigationBarActiveItem = 'main' | 'payments' | 'services';

export interface MainPageNavigationBarProps {
  /** Активный пункт навигации */
  activeNavItem?: MainPageNavigationBarActiveItem;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Название компании клиента
   * @default "ООО Ромашка" */
  customer?: string;
  /** Показывает индикатор «В ЭФИРЕ» рядом с логотипом
   * @default false */
  hasLive?: boolean;
  /** Показывает индикатор новых уведомлений на кнопке колокольчика
   * @default true */
  hasNewPush?: boolean;
  /** Показывает кнопку переключения клиента (шеврон)
   * @default true */
  hasSelect?: boolean;
  /** Показывает логотип Tochka Plus во второй строке (требует `isSecondLine` и `tochkaPlusUrl`)
   * @default true */
  hasSubscription?: boolean;
  /** Показывает ИНН во второй строке (требует `isSecondLine`)
   * @default true */
  hasTin?: boolean;
  /** Показывает вторую строку с подпиской и ИНН
   * @default false */
  isSecondLine?: boolean;
  /** ИНН клиента
   * @default "ИНН 4827 1359 64" */
  tin?: string;
  /** URL логотипа банка (по умолчанию — встроенный SVG) */
  logoUrl?: string;
  /** URL логотипа Tochka Plus */
  tochkaPlusUrl?: string;
  /** URL изображения аватара клиента */
  avatarUrl?: string;
  /** Инициалы для аватара, если не передан `avatarUrl`
   * @default "НО" */
  avatarInitials?: string;
  /** Колбэк при клике на имя клиента */
  onCustomerClick?: () => void;
  /** Колбэк при клике на уведомления */
  onNotificationsClick?: () => void;
  /** Колбэк при клике на подарки */
  onGiftClick?: () => void;
  /** Колбэк при клике на настройки */
  onSettingsClick?: () => void;
  /** Колбэк при клике на выход */
  onLogoutClick?: () => void;
  /** Колбэк при клике на «Главная» */
  onNavMainClick?: () => void;
  /** Колбэк при клике на «Платежи» */
  onNavPaymentsClick?: () => void;
  /** Колбэк при клике на «Сервисы» */
  onNavServicesClick?: () => void;
}

const NotificationIndicator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`main-page-navigation-bar__notification-indicator ${className}`} aria-hidden="true">
    <div className="main-page-navigation-bar__notification-dot" />
  </div>
);

/**
 * Главная навигационная панель сайта.
 * Содержит логотип, навигацию по разделам, информацию о клиенте и кнопки быстрых действий.
 * Адаптивна: на мобильных скрывает навигацию и показывает упрощённый вид.
 */
export const MainPageNavigationBar: React.FC<MainPageNavigationBarProps> = ({
  activeNavItem,
  className = '',
  customer = 'ООО Ромашка',
  hasLive = false,
  hasNewPush = true,
  hasSelect = true,
  hasSubscription = true,
  hasTin = true,
  isSecondLine = false,
  tin = 'ИНН 4827 1359 64',
  logoUrl,
  tochkaPlusUrl,
  avatarUrl,
  avatarInitials = 'НО',
  onCustomerClick,
  onNotificationsClick,
  onGiftClick,
  onSettingsClick,
  onLogoutClick,
  onNavMainClick,
  onNavPaymentsClick,
  onNavServicesClick,
}) => {
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);

  const rootClasses = [
    'main-page-navigation-bar',
    className,
  ].filter(Boolean).join(' ');

  const handleCustomerClick = () => {
    setIsCustomerDropdownOpen(!isCustomerDropdownOpen);
    onCustomerClick?.();
  };

  return (
    <header className={rootClasses}>
      <div className="main-page-navigation-bar__desktop">
        <div className="main-page-navigation-bar__content">
          <div className="main-page-navigation-bar__logo-section">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Tochka Bank"
                className="main-page-navigation-bar__logo"
                aria-hidden="true"
              />
            ) : (
              <TochkaBankCyrTwoLines
                className="main-page-navigation-bar__logo"
                aria-hidden="true"
              />
            )}
            {hasLive && (
              <button
                className="main-page-navigation-bar__live-indicator ts-600-s"
                type="button"
                aria-label="Live indicator"
              >
                <NotificationIndicator className="main-page-navigation-bar__live-dot" />
                <span className="main-page-navigation-bar__live-text">В ЭФИРЕ</span>
              </button>
            )}
          </div>

          <nav className="main-page-navigation-bar__nav">
            <SCINavigationButton
              isActive={activeNavItem === 'main'}
              label="Главная"
              onClick={onNavMainClick}
            />
            <SCINavigationButton
              isActive={activeNavItem === 'payments'}
              label="Платежи"
              onClick={onNavPaymentsClick}
            />
            <SCINavigationButton
              isActive={activeNavItem === 'services'}
              label="Сервисы"
              onClick={onNavServicesClick}
            />
          </nav>

          <div className="main-page-navigation-bar__customer-section">
            <div className="main-page-navigation-bar__customer-info">
              <div className="main-page-navigation-bar__avatar">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={customer}
                    className="main-page-navigation-bar__avatar-image"
                  />
                ) : (
                  <div className="main-page-navigation-bar__avatar-initials ts-600-xs">
                    {avatarInitials}
                  </div>
                )}
              </div>

              <div className="main-page-navigation-bar__customer-details">
                <div className="main-page-navigation-bar__customer-name-wrapper">
                  <span className="main-page-navigation-bar__customer-name ts-500-m">{customer}</span>
                  {hasSelect && (
                    <button
                      className={`main-page-navigation-bar__customer-select hoverOpacity ${isCustomerDropdownOpen ? 'main-page-navigation-bar__customer-select--open' : ''}`}
                      type="button"
                      onClick={handleCustomerClick}
                      aria-label="Customer menu"
                      aria-expanded={isCustomerDropdownOpen}
                    >
                      <span className="ds-icon ds-icon--18" aria-hidden="true"><ChevronDown /></span>
                    </button>
                  )}
                </div>

                {isSecondLine && (
                  <div className="main-page-navigation-bar__customer-extra">
                    {hasSubscription && tochkaPlusUrl && (
                      <img
                        src={tochkaPlusUrl}
                        alt="Tochka Plus"
                        className="main-page-navigation-bar__tochka-plus"
                      />
                    )}
                    {hasTin && (
                      <span className="main-page-navigation-bar__tin ts-500-xs">{tin}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="main-page-navigation-bar__actions">
              <button
                className="main-page-navigation-bar__action-button hoverOpacity"
                type="button"
                aria-label="Notifications"
                onClick={onNotificationsClick}
              >
                <span className="ds-icon ds-icon--m" aria-hidden="true"><Bell /></span>
                {hasNewPush && <NotificationIndicator className="main-page-navigation-bar__notification-badge" />}
              </button>

              <button
                className="main-page-navigation-bar__action-button hoverOpacity"
                type="button"
                aria-label="Offers"
                onClick={onGiftClick}
              >
                <span className="ds-icon ds-icon--m" aria-hidden="true"><Gift /></span>
              </button>

              <button
                className="main-page-navigation-bar__action-button hoverOpacity"
                type="button"
                aria-label="Settings"
                onClick={onSettingsClick}
              >
                <span className="ds-icon ds-icon--m" aria-hidden="true"><Gear /></span>
              </button>

              <button
                className="main-page-navigation-bar__action-button hoverOpacity"
                type="button"
                aria-label="Logout"
                onClick={onLogoutClick}
              >
                <span className="ds-icon ds-icon--m" aria-hidden="true"><ArrowRightOutgoingRectangleVertical /></span>
              </button>
            </div>
          </div>
        </div>

        <div className="main-page-navigation-bar__separator" />
      </div>

      <div className="main-page-navigation-bar__adaptive">
        <div className="main-page-navigation-bar__content main-page-navigation-bar__content--adaptive">
          <div className="main-page-navigation-bar__customer-info">
              <div className="main-page-navigation-bar__avatar">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={customer}
                    className="main-page-navigation-bar__avatar-image"
                  />
                ) : (
                  <div className="main-page-navigation-bar__avatar-initials ts-600-xs">
                    {avatarInitials}
                  </div>
                )}
              </div>

              <div className="main-page-navigation-bar__customer-details">
                <div className="main-page-navigation-bar__customer-name-wrapper">
                  <span className="main-page-navigation-bar__customer-name ts-500-m">{customer}</span>
                  {hasSelect && (
                    <button
                      className={`main-page-navigation-bar__customer-select hoverOpacity ${isCustomerDropdownOpen ? 'main-page-navigation-bar__customer-select--open' : ''}`}
                      type="button"
                      onClick={handleCustomerClick}
                      aria-label="Customer menu"
                      aria-expanded={isCustomerDropdownOpen}
                    >
                      <span className="ds-icon ds-icon--18" aria-hidden="true"><ChevronDown /></span>
                    </button>
                  )}
                </div>

                {isSecondLine && (
                  <div className="main-page-navigation-bar__customer-extra">
                    {hasSubscription && tochkaPlusUrl && (
                      <img
                        src={tochkaPlusUrl}
                        alt="Tochka Plus"
                        className="main-page-navigation-bar__tochka-plus"
                      />
                    )}
                    {hasTin && (
                      <span className="main-page-navigation-bar__tin ts-500-xs">{tin}</span>
                    )}
                  </div>
                )}
              </div>
          </div>

          <div className="main-page-navigation-bar__actions main-page-navigation-bar__actions--adaptive">
              <button
                className="main-page-navigation-bar__action-button hoverOpacity"
                type="button"
                aria-label="Settings"
                onClick={onSettingsClick}
              >
                <span className="ds-icon ds-icon--m" aria-hidden="true"><Gear /></span>
              </button>

              <button
                className="main-page-navigation-bar__action-button hoverOpacity"
                type="button"
                aria-label="Notifications"
                onClick={onNotificationsClick}
              >
                <span className="ds-icon ds-icon--m" aria-hidden="true"><Bell /></span>
                {hasNewPush && <NotificationIndicator className="main-page-navigation-bar__notification-badge" />}
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};
