import React from 'react';
import './footer.css';

import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Circle, Minus, Plus } from '../../icons';

export type FooterLayout =
  | '1-button'
  | '2-buttons-in-line'
  | '3-buttons'
  | 'page-control-button'
  | 'stepper-button';

export interface FooterAction {
  /** Текст кнопки */
  label: string;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Блокирует кнопку */
  isDisabled?: boolean;
  /** Показывает спиннер */
  isLoading?: boolean;
}

export interface FooterIconAction {
  /** Иконка кнопки
   * @default Circle */
  icon?: React.ReactNode;
  /** Aria-метка для доступности */
  ariaLabel: string;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Блокирует кнопку */
  isDisabled?: boolean;
}

export interface FooterProps {
  /** Вариант компоновки футера
   * @default "1-button" */
  layout?: FooterLayout;
  /** Текст над кнопками (только для `1-button`, `2-buttons-in-line`, `3-buttons`) */
  description?: React.ReactNode;
  /** Основная кнопка
   * @default { label: 'Действие' } */
  primaryAction?: FooterAction;
  /** Вторичная кнопка (для `2-buttons-in-line` и `3-buttons`)
   * @default { label: 'Действие' } */
  secondaryAction?: FooterAction;
  /** Иконочная кнопка слева (только для `3-buttons`) */
  iconAction?: FooterIconAction;
  /** Значение степпера (только для `stepper-button`)
   * @default "00" */
  stepperValue?: React.ReactNode;
  /** Колбэк при нажатии кнопки уменьшения степпера */
  onStepperDecrease?: () => void;
  /** Колбэк при нажатии кнопки увеличения степпера */
  onStepperIncrease?: () => void;
  /** Блокирует кнопку уменьшения степпера
   * @default false */
  isStepperDecreaseDisabled?: boolean;
  /** Блокирует кнопку увеличения степпера
   * @default false */
  isStepperIncreaseDisabled?: boolean;
  /** Количество точек пагинации (только для `page-control-button`)
   * @default 3 */
  pageControlCount?: number;
  /** Активная точка пагинации (только для `page-control-button`)
   * @default 0 */
  pageControlValue?: number;
  /** Колбэк при переключении страницы пагинации */
  onPageControlChange?: (index: number) => void;
  /** Управляет показом футера и запускает анимацию подъёма/скрытия
   * @default undefined — футер отображается без анимации */
  isVisible?: boolean;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

export interface FooterIconButtonProps {
  /** Иконка кнопки
   * @default Circle */
  icon?: React.ReactNode;
  /** Aria-метка для доступности */
  ariaLabel: string;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Блокирует кнопку
   * @default false */
  isDisabled?: boolean;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

const defaultPrimaryAction: FooterAction = { label: 'Действие' };
const defaultSecondaryAction: FooterAction = { label: 'Действие' };

const renderFooterButton = (
  action: FooterAction,
  variant: 'primary' | 'secondary',
  className = '',
) => (
  <Button
    variant={variant}
    isDisabled={action.isDisabled}
    isLoading={action.isLoading}
    onClick={action.onClick}
    className={['footer__button', className].filter(Boolean).join(' ')}
  >
    {action.label}
  </Button>
);

/**
 * Иконочная кнопка для использования в `Footer` с вариантом `3-buttons`.
 */
export const FooterIconButton: React.FC<FooterIconButtonProps> = ({
  icon = <Circle />,
  ariaLabel,
  onClick,
  isDisabled = false,
  className = '',
}) => (
  <IconButton
    variant="secondary"
    size="m"
    icon={icon}
    ariaLabel={ariaLabel}
    isDisabled={isDisabled}
    onClick={onClick}
    className={['footer-icon-button', className].filter(Boolean).join(' ')}
  />
);

/**
 * Фиксированный подвал страницы с кнопками основного действия.
 * Поддерживает варианты с одной или двумя кнопками, иконочной кнопкой, степпером или пагинацией.
 */
export const Footer: React.FC<FooterProps> = ({
  layout = '1-button',
  description,
  primaryAction = defaultPrimaryAction,
  secondaryAction = defaultSecondaryAction,
  iconAction,
  stepperValue = '00',
  onStepperDecrease,
  onStepperIncrease,
  isStepperDecreaseDisabled = false,
  isStepperIncreaseDisabled = false,
  pageControlCount = 3,
  pageControlValue = 0,
  onPageControlChange,
  isVisible,
  className = '',
}) => {
  const rootClassName = [
    'footer',
    `footer--${layout}`,
    description ? 'footer--with-description-slot' : '',
    isVisible === undefined ? '' : 'footer--visibility-controlled',
    isVisible === undefined ? '' : isVisible ? 'animate-footer-in' : 'animate-footer-out',
    className,
  ].filter(Boolean).join(' ');

  const shouldShowDescription = Boolean(description);

  return (
    <footer className={rootClassName} aria-hidden={isVisible === false}>
      {shouldShowDescription && (
        <div className="footer__description ts-400-s">{description}</div>
      )}

      {layout === '1-button' && (
        <div className="footer__buttons footer__buttons--single">
          {renderFooterButton(primaryAction, 'primary')}
        </div>
      )}

      {layout === '2-buttons-in-line' && (
        <div className="footer__buttons footer__buttons--inline">
          {renderFooterButton(secondaryAction, 'secondary')}
          {renderFooterButton(primaryAction, 'primary')}
        </div>
      )}

      {layout === '3-buttons' && (
        <div className="footer__buttons footer__buttons--triple">
          <FooterIconButton
            ariaLabel={iconAction?.ariaLabel ?? 'Действие'}
            icon={iconAction?.icon}
            isDisabled={iconAction?.isDisabled}
            onClick={iconAction?.onClick}
          />
          {renderFooterButton(secondaryAction, 'secondary')}
          {renderFooterButton(primaryAction, 'primary')}
        </div>
      )}

      {layout === 'page-control-button' && (
        <>
          <div className="footer__page-control" role="tablist" aria-label="Страницы">
            {Array.from({ length: pageControlCount }, (_, index) => {
              const isSelected = index === pageControlValue;

              return (
                <button
                  className={[
                    'footer__page-dot',
                    isSelected ? 'footer__page-dot--selected' : '',
                  ].filter(Boolean).join(' ')}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Страница ${index + 1}`}
                  key={index}
                  onClick={() => onPageControlChange?.(index)}
                />
              );
            })}
          </div>
          <div className="footer__buttons footer__buttons--single">
            {renderFooterButton(primaryAction, 'primary')}
          </div>
        </>
      )}

      {layout === 'stepper-button' && (
        <div className="footer__buttons footer__buttons--stepper">
          <div className="footer__stepper" role="group" aria-label="Количество">
            <button
              className="footer__stepper-button"
              type="button"
              aria-label="Уменьшить"
              disabled={isStepperDecreaseDisabled}
              onClick={onStepperDecrease}
            >
              <span className="ds-icon ds-icon--m" aria-hidden="true">
                <Minus />
              </span>
            </button>
            <div className="footer__stepper-value ts-500-m">{stepperValue}</div>
            <button
              className="footer__stepper-button"
              type="button"
              aria-label="Увеличить"
              disabled={isStepperIncreaseDisabled}
              onClick={onStepperIncrease}
            >
              <span className="ds-icon ds-icon--m" aria-hidden="true">
                <Plus />
              </span>
            </button>
          </div>
          {renderFooterButton(primaryAction, 'primary')}
        </div>
      )}
    </footer>
  );
};
