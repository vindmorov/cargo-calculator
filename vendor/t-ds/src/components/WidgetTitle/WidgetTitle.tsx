import React from 'react';
import {
  ChevronRight,
  Circle,
  LinesThreeHorizontalWide,
  MinusCircle,
} from '../../assets/Icon/icons';
import { Badge } from '../Badge/Badge';
import './widget-title.css';

export type WidgetTitleAccessoryVariant =
  | 'icon'
  | 'link'
  | 'link-icon'
  | 'icon-icon'
  | 'description'
  | 'editing-mode'
  | 'none'
  | 'custom';

export interface WidgetTitleAccessoryProps {
  /** Вариант аксессуара
   * @default "icon" */
  variant?: WidgetTitleAccessoryVariant;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Произвольный контент (имеет приоритет над `variant`) */
  content?: React.ReactNode;
  /** Текст аксессуара (для `link`, `link-icon`, `description`) */
  text?: React.ReactNode;
  /** Иконка аксессуара
   * @default Circle */
  icon?: React.ReactNode;
  /** Вторая иконка (для `icon-icon`, `editing-mode`)
   * @default MinusCircle */
  secondaryIcon?: React.ReactNode;
  /** Колбэк по клику (для интерактивных вариантов) */
  onClick?: () => void;
}

export interface WidgetTitleProps {
  /** Заголовок */
  title: React.ReactNode;
  /** Описание под заголовком */
  description?: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Показывает описание под заголовком
   * @default true */
  hasDescription?: boolean;
  /** Показывает шеврон рядом с заголовком
   * @default true */
  hasChevron?: boolean;
  /** Показывает правый аксессуар
   * @default true */
  hasRightAccessory?: boolean;
  /** Иконка шеврона рядом с заголовком
   * @default ChevronRight */
  chevron?: React.ReactNode;
  /** Произвольный правый аксессуар (заменяет `rightAccessoryVariant`) */
  rightAccessory?: React.ReactNode;
  /** Вариант правого аксессуара
   * @default "icon" */
  rightAccessoryVariant?: WidgetTitleAccessoryVariant;
  /** Текст аксессуара (для `link`, `link-icon`, `description`) */
  rightAccessoryText?: React.ReactNode;
  /** Иконка аксессуара
   * @default Circle */
  rightAccessoryIcon?: React.ReactNode;
  /** Вторая иконка (для `icon-icon`, `editing-mode`)
   * @default MinusCircle */
  rightAccessorySecondaryIcon?: React.ReactNode;
  /** Колбэк при клике на правый аксессуар */
  onRightAccessoryClick?: () => void;
}

const renderWidgetTitleAccessoryIcon = (
  icon: React.ReactNode,
  sizeClass = 'ds-icon--m'
) => (
  <span className={`ds-icon ${sizeClass} widget-title-accessory__icon`} aria-hidden="true">
    {icon}
  </span>
);

/**
 * Правый аксессуар для `WidgetTitle`. Поддерживает несколько вариантов отображения:
 * иконки, текстовые ссылки, описания и режим редактирования.
 */
export const WidgetTitleAccessory: React.FC<WidgetTitleAccessoryProps> = ({
  variant = 'icon',
  className = '',
  content,
  text = variant === 'description' ? 'Text S' : 'Text M',
  icon = <Circle />,
  secondaryIcon = <MinusCircle />,
  onClick,
}) => {
  const classNames = ['widget-title-accessory', `widget-title-accessory--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  if (content) {
    return <div className={classNames}>{content}</div>;
  }

  if (variant === 'custom') {
    return null;
  }

  const isInteractive =
    variant === 'icon' ||
    variant === 'link' ||
    variant === 'link-icon' ||
    variant === 'icon-icon' ||
    variant === 'editing-mode';

  const Component = isInteractive ? 'button' : 'div';

  return (
    <Component
      className={`${classNames} ${isInteractive ? 'hoverOpacity' : ''}`.trim()}
      type={Component === 'button' ? 'button' : undefined}
      onClick={isInteractive ? onClick : undefined}
    >
      {(variant === 'link' || variant === 'link-icon' || variant === 'description') && (
        <span
          className={
            variant === 'description'
              ? 'widget-title-accessory__description ts-400-s'
              : 'widget-title-accessory__link ts-500-m'
          }
        >
          {text}
        </span>
      )}

      {(variant === 'icon' || variant === 'link-icon' || variant === 'icon-icon') && (
        renderWidgetTitleAccessoryIcon(icon)
      )}

      {variant === 'icon-icon' && renderWidgetTitleAccessoryIcon(secondaryIcon)}

      {variant === 'editing-mode' && (
        <>
          {renderWidgetTitleAccessoryIcon(<LinesThreeHorizontalWide />, 'ds-icon--18')}
          {renderWidgetTitleAccessoryIcon(secondaryIcon)}
        </>
      )}

      {variant === 'none' && (
        <Badge value={0} color="transparent" textColor="transparent" className="widget-title-accessory__none" />
      )}
    </Component>
  );
};

/**
 * Шапка виджета с кликабельным заголовком и правым аксессуаром.
 * Используется внутри `Widget`, но может применяться самостоятельно.
 */
export const WidgetTitle: React.FC<WidgetTitleProps> = ({
  title,
  description,
  className = '',
  hasDescription = true,
  hasChevron = true,
  hasRightAccessory = true,
  chevron = <ChevronRight />,
  rightAccessory,
  rightAccessoryVariant = 'icon',
  rightAccessoryText,
  rightAccessoryIcon,
  rightAccessorySecondaryIcon,
  onRightAccessoryClick,
}) => {
  const shouldRenderDescription = Boolean(description) && hasDescription;

  return (
    <div className={`widget-title ${className}`}>
      <div className="widget-title__header">
        <div className="widget-title__main hoverOpacity">
          <h3 className="widget-title__title ts-600-xl">{title}</h3>
          {hasChevron && (
            <span className="ds-icon ds-icon--18 widget-title__chevron" aria-hidden="true">
              {chevron}
            </span>
          )}
        </div>

        {hasRightAccessory && (
          rightAccessory ?? (
            <WidgetTitleAccessory
              variant={rightAccessoryVariant}
              text={rightAccessoryText}
              icon={rightAccessoryIcon}
              secondaryIcon={rightAccessorySecondaryIcon}
              onClick={onRightAccessoryClick}
            />
          )
        )}
      </div>

      {shouldRenderDescription && <p className="widget-title__description ts-400-s">{description}</p>}
    </div>
  );
};
