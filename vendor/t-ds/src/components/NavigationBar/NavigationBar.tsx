import React from 'react';
import { ArrowLeft, Broom, ChevronRight } from '../../assets/Icon/icons';
import { Badge } from '../Badge/Badge';
import { LinearProgress } from '../LinearProgress/LinearProgress';
import './navigation-bar.css';

type NavigationBarItemKey = string | number;

interface NavigationBarBaseItem {
  key?: NavigationBarItemKey;
  label: React.ReactNode;
}

export interface NavigationBarLinkItem extends NavigationBarBaseItem {
  kind: 'link';
  /** URL для перехода */
  href?: string;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Блокирует элемент */
  isDisabled?: boolean;
}

export interface NavigationBarStepItem extends NavigationBarBaseItem {
  kind: 'step';
  /** Состояние шага */
  state?: 'current' | 'upcoming' | 'completed';
  /** Колбэк по клику (доступен только для завершённых шагов) */
  onClick?: () => void;
}

export type NavigationBarItem = NavigationBarLinkItem | NavigationBarStepItem;

export interface NavigationBarAdaptiveProgress {
  /** Текущее значение прогресса */
  value: number;
  /** Общее количество шагов (для `step-progress`) */
  maxSteps?: number;
  /** Aria-метка для доступности */
  ariaLabel?: string;
}

export interface NavigationBarProps {
  // ---- Десктопные пропсы ----
  /** Основной заголовок панели */
  title?: React.ReactNode;
  /** Вспомогательный текст под заголовком */
  description?: React.ReactNode;
  /** Текст верхней breadcrumb-ссылки */
  rootLinkLabel?: React.ReactNode;
  /** Массив элементов навигации: ссылки (`link`) или шаги (`step`)
   * @default [] */
  items?: NavigationBarItem[];
  /** Показывает кнопку «Назад»
   * @default true */
  hasBackButton?: boolean;
  /** Показывает кнопку действия
   * @default true */
  hasActionButton?: boolean;
  /** Показывает breadcrumb-ссылку
   * @default true */
  hasRootLink?: boolean;
  /** Показывает описание
   * @default true */
  hasDescription?: boolean;
  /** Aria-метка кнопки «Назад»
   * @default "Go back" */
  backButtonLabel?: string;
  /** Aria-метка кнопки действия
   * @default "Clear" */
  actionButtonLabel?: string;
  /** Иконка кнопки «Назад»
   * @default ArrowLeft */
  backButtonIcon?: React.ReactNode;
  /** Иконка кнопки действия
   * @default Broom */
  actionButtonIcon?: React.ReactNode;
  /** Колбэк при клике на кнопку «Назад» */
  onBackClick?: () => void;
  /** Колбэк при клике на кнопку действия */
  onActionClick?: () => void;
  /** Колбэк при клике на breadcrumb-ссылку */
  onRootLinkClick?: () => void;

  // ---- Адаптивные пропсы ----
  /** Инвертирует цвета: текст и иконки становятся белыми
   * @default false */
  isInverted?: boolean;
  /** Вариант центральной зоны в адаптивном режиме
   * @default "title" */
  titleVariant?: 'none' | 'title' | 'title-description' | 'step-progress' | 'percent-progress' | 'image';
  /** Логотип (для варианта `image`) */
  logo?: React.ReactNode;
  /** Настройки прогресса (для `step-progress` и `percent-progress`) */
  progress?: NavigationBarAdaptiveProgress;
  /** Иконка левой кнопки в адаптивном режиме
   * @default ArrowLeft */
  leftIcon?: React.ReactNode;
  /** Aria-метка левой кнопки в адаптивном режиме
   * @default "Go back" */
  leftAriaLabel?: string;
  /** Колбэк при клике на левую кнопку в адаптивном режиме */
  onLeftClick?: () => void;
  /** Вариант правой зоны в адаптивном режиме
   * @default "icon" */
  rightAccessoryVariant?: 'none' | 'icon' | 'icon-icon' | 'icon-badge' | 'action';
  /** Иконка правой кнопки в адаптивном режиме
   * @default Broom */
  rightIcon?: React.ReactNode;
  /** Иконка второй правой кнопки (для варианта `icon-icon`) */
  secondaryRightIcon?: React.ReactNode;
  /** Aria-метка правой кнопки
   * @default "Action" */
  rightAriaLabel?: string;
  /** Aria-метка второй правой кнопки
   * @default "Secondary action" */
  secondaryRightAriaLabel?: string;
  /** Колбэк при клике на правую кнопку */
  onRightClick?: () => void;
  /** Колбэк при клике на вторую правую кнопку */
  onSecondaryRightClick?: () => void;
  /** Текст кнопки-ссылки (для варианта `action`)
   * @default "Text M" */
  actionLabel?: React.ReactNode;
  /** Значение бейджа (для варианта `icon-badge`)
   * @default 0 */
  badgeValue?: number;

  // ---- Общие пропсы ----
  /** Дополнительный CSS-класс (применяется к обоим вариантам)
   * @default "" */
  className?: string;
  /** Фиксирует панель при скролле (`position: sticky; top: 0`)
   * @default false */
  isSticky?: boolean;
}

const renderDesktopActionButton = (
  icon: React.ReactNode,
  ariaLabel: string,
  onClick?: () => void
) => (
  <button
    className="navigation-bar__button hoverOpacity"
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
  >
    <span className="ds-icon ds-icon--m" aria-hidden="true">
      {icon}
    </span>
  </button>
);

const isStepItem = (item: NavigationBarItem): item is NavigationBarStepItem => item.kind === 'step';

const renderAdaptiveIconButton = (
  icon: React.ReactNode,
  ariaLabel: string,
  onClick?: () => void,
  className = ''
) => (
  <button
    className={`navigation-bar-adaptive__icon-button hoverOpacity ${className}`}
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
  >
    <span className="ds-icon ds-icon--m" aria-hidden="true">
      {icon}
    </span>
  </button>
);

const renderAdaptiveTitle = (props: NavigationBarProps) => {
  const { titleVariant = 'title', title, description, logo, progress } = props;

  if (titleVariant === 'none') {
    return <div className="navigation-bar-adaptive__title navigation-bar-adaptive__title--empty" aria-hidden="true" />;
  }

  if (titleVariant === 'image') {
    return (
      <div className="navigation-bar-adaptive__title navigation-bar-adaptive__title--image">
        {logo}
      </div>
    );
  }

  if (titleVariant === 'step-progress' || titleVariant === 'percent-progress') {
    const progressValue = progress?.value ?? 0;

    return (
      <div className="navigation-bar-adaptive__title navigation-bar-adaptive__title--progress">
        <LinearProgress
          variant={titleVariant === 'step-progress' ? 'steps' : 'percent'}
          value={progressValue}
          maxSteps={progress?.maxSteps}
          ariaLabel={progress?.ariaLabel}
        />
      </div>
    );
  }

  return (
    <div className={`navigation-bar-adaptive__title ${titleVariant === 'title-description' ? 'navigation-bar-adaptive__title--description' : ''}`}>
      {title && <div className="navigation-bar-adaptive__title-text ts-500-m">{title}</div>}
      {titleVariant === 'title-description' && description && (
        <div className="navigation-bar-adaptive__description ts-500-xs">{description}</div>
      )}
    </div>
  );
};

const renderAdaptiveRightAccessories = (props: NavigationBarProps) => {
  const {
    rightAccessoryVariant = 'icon',
    rightIcon = <Broom />,
    secondaryRightIcon,
    rightAriaLabel = 'Action',
    secondaryRightAriaLabel = 'Secondary action',
    onRightClick,
    onSecondaryRightClick,
    actionLabel = 'Text M',
    badgeValue = 0,
  } = props;

  if (rightAccessoryVariant === 'none') {
    return <div className="navigation-bar-adaptive__right navigation-bar-adaptive__right--empty" aria-hidden="true" />;
  }

  if (rightAccessoryVariant === 'action') {
    return (
      <button
        className="navigation-bar-adaptive__action ts-500-m hoverOpacity"
        type="button"
        onClick={onRightClick}
      >
        {actionLabel}
      </button>
    );
  }

  if (rightAccessoryVariant === 'icon-icon') {
    return (
      <div className="navigation-bar-adaptive__right">
        {renderAdaptiveIconButton(rightIcon, rightAriaLabel, onRightClick)}
        {renderAdaptiveIconButton(secondaryRightIcon ?? rightIcon, secondaryRightAriaLabel, onSecondaryRightClick)}
      </div>
    );
  }

  if (rightAccessoryVariant === 'icon-badge') {
    return (
      <div className="navigation-bar-adaptive__right navigation-bar-adaptive__right--badge">
        <Badge value={badgeValue} size="s" />
        {renderAdaptiveIconButton(rightIcon, rightAriaLabel, onRightClick)}
      </div>
    );
  }

  return (
    <div className="navigation-bar-adaptive__right">
      {renderAdaptiveIconButton(rightIcon, rightAriaLabel, onRightClick)}
    </div>
  );
};

/**
 * Навигационная панель страницы с заголовком.
 * Автоматически переключается между десктопным и адаптивным вариантом по брейкпоинту:
 * **> 1023px** — десктоп, **≤ 1023px** — адаптив.
 */
export const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const {
    title,
    description,
    rootLinkLabel,
    items = [],
    className = '',
    hasBackButton = true,
    hasActionButton = true,
    hasRootLink = true,
    hasDescription = true,
    backButtonLabel = 'Go back',
    actionButtonLabel = 'Clear',
    backButtonIcon = <ArrowLeft />,
    actionButtonIcon = <Broom />,
    onBackClick,
    onActionClick,
    onRootLinkClick,
    isInverted,
    isSticky,
  } = props;

  const hasItems = items.length > 0;
  const shouldRenderDescription = Boolean(description) && hasDescription;
  const shouldRenderRootLink = Boolean(rootLinkLabel) && hasRootLink;
  const isStepsMode = hasItems && items.every(isStepItem);

  const desktopClassName = [
    'navigation-bar',
    isSticky ? 'navigation-bar--sticky' : '',
    className,
  ].filter(Boolean).join(' ');

  const adaptiveClassName = [
    'navigation-bar-adaptive',
    isInverted ? 'navigation-bar-adaptive--inverted' : '',
    isSticky ? 'navigation-bar-adaptive--sticky' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <>
      <section className={desktopClassName}>
        {(hasBackButton || hasActionButton) && (
          <div className="navigation-bar__buttons">
            {hasBackButton && renderDesktopActionButton(backButtonIcon, backButtonLabel, onBackClick)}
            {hasActionButton && renderDesktopActionButton(actionButtonIcon, actionButtonLabel, onActionClick)}
          </div>
        )}

        <div className="navigation-bar__header">
          {shouldRenderRootLink && (
            <button
              className="navigation-bar__root-link hoverOpacity"
              type="button"
              onClick={onRootLinkClick}
            >
              <span className="navigation-bar__root-link-label ts-500-s">{rootLinkLabel}</span>
              <span className="ds-icon ds-icon--xs navigation-bar__root-link-icon" aria-hidden="true">
                <ChevronRight />
              </span>
            </button>
          )}

          <div className="navigation-bar__title-block">
            <h2 className="navigation-bar__title ts-600-2xl">{title}</h2>
            {shouldRenderDescription && (
              <p className="navigation-bar__description ts-500-xs">{description}</p>
            )}
          </div>
        </div>

        {hasItems && (
          <div className="navigation-bar__items" role={isStepsMode ? 'list' : undefined}>
            {items.map((item, index) => {
              const itemKey = item.key ?? index;

              if (item.kind === 'step') {
                const isCurrent = item.state === 'current';
                const isCompleted = item.state === 'completed';
                const isClickable = isCompleted && Boolean(item.onClick);

                const stepClassName = [
                  'navigation-bar__step',
                  isCurrent ? 'navigation-bar__step--current' : '',
                  isCompleted ? 'navigation-bar__step--completed' : '',
                  isClickable ? 'hoverOpacity' : '',
                ].filter(Boolean).join(' ');

                const stepContent = (
                  <>
                    <span className="navigation-bar__step-indicator" aria-hidden="true" />
                    <span className="navigation-bar__step-label ts-500-m">{item.label}</span>
                  </>
                );

                if (isClickable) {
                  return (
                    <button
                      key={itemKey}
                      className={stepClassName}
                      type="button"
                      role="listitem"
                      onClick={item.onClick}
                    >
                      {stepContent}
                    </button>
                  );
                }

                return (
                  <div
                    key={itemKey}
                    className={stepClassName}
                    role="listitem"
                  >
                    {stepContent}
                  </div>
                );
              }

              return (
                item.href ? (
                  <a
                    key={itemKey}
                    className="navigation-bar__link hoverOpacity"
                    href={item.isDisabled ? undefined : item.href}
                    onClick={item.onClick}
                    aria-disabled={item.isDisabled || undefined}
                  >
                    <span className="navigation-bar__link-label ts-500-s">{item.label}</span>
                  </a>
                ) : (
                  <button
                    key={itemKey}
                    className="navigation-bar__link hoverOpacity"
                    type="button"
                    onClick={item.onClick}
                    disabled={item.isDisabled}
                  >
                    <span className="navigation-bar__link-label ts-500-s">{item.label}</span>
                  </button>
                )
              );
            })}
          </div>
        )}
      </section>

      <section className={adaptiveClassName}>
        <div className="navigation-bar-adaptive__left">
          {renderAdaptiveIconButton(
            props.leftIcon ?? <ArrowLeft />,
            props.leftAriaLabel ?? 'Go back',
            props.onLeftClick ?? props.onBackClick
          )}
        </div>

        {renderAdaptiveTitle(props)}
        {renderAdaptiveRightAccessories(props)}
      </section>
    </>
  );
};
