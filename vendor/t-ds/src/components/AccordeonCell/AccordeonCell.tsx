import React, { useState } from 'react';
import './accordeon-cell.css';
import { ChevronDown } from '../../assets/Icon/24/Stroked';
import { CellRightAccessory } from '../CellRightAccessory/CellRightAccessory';
import type { CellRightAccessoryVariant } from '../CellRightAccessory/CellRightAccessory';

export type AccordeonCellSize = 'xl' | '2xl';
export type AccordeonCellChevronPosition = 'title' | 'edge';
export type AccordeonCellSpacing = '0' | '0-5x' | '1x' | '2x' | '4x' | '6x';

export interface AccordeonCellProps {
  /** Заголовок секции */
  title: React.ReactNode;
  /** Подзаголовок под заголовком */
  description?: React.ReactNode;
  /** Контент, который показывается при раскрытии */
  children?: React.ReactNode;
  /** Размер заголовка
   * @default "xl" */
  size?: AccordeonCellSize;
  /** Положение иконки: рядом с заголовком или по правому краю
   * @default "title" */
  chevronPosition?: AccordeonCellChevronPosition;
  /** Показывает подзаголовок (только если передан `description`)
   * @default true */
  hasDescription?: boolean;
  /** Показывает правый аксессуар (только при `chevronPosition="title"`)
   * @default true */
  hasRightAccessory?: boolean;
  /** Произвольный элемент справа от заголовка */
  rightAccessory?: React.ReactNode;
  /** Вариант дефолтного правого аксессуара (используется если `rightAccessory` не передан)
   * @default "text-m" */
  rightAccessoryVariant?: CellRightAccessoryVariant;
  /** Текст дефолтного правого аксессуара
   * @default "Text M" */
  rightAccessoryText?: string;
  /** Начальное состояние при неуправляемом режиме
   * @default false */
  defaultOpen?: boolean;
  /** Управляемое состояние открытия. Если передан — компонент переходит в controlled mode */
  isOpen?: boolean;
  /** Колбэк при изменении состояния */
  onOpenChange?: (isOpen: boolean) => void;
  /** Отступ между заголовком и раскрытым контентом
   * @default "4x" */
  contentSpacing?: AccordeonCellSpacing;
  /** Отступы между элементами внутри раскрытого контента
   * @default "2x" */
  listSpacing?: AccordeonCellSpacing;
  /** Дополнительный CSS-класс на корневом элементе
   * @default "" */
  className?: string;
}

const titleClassMap: Record<AccordeonCellSize, string> = {
  xl: 'ts-500-xl',
  '2xl': 'ts-500-2xl',
};

const spacingClassByValue: Record<AccordeonCellSpacing, string> = {
  '0': 'accordeon-cell--content-spacing-0',
  '0-5x': 'accordeon-cell--content-spacing-0-5x',
  '1x': 'accordeon-cell--content-spacing-1x',
  '2x': 'accordeon-cell--content-spacing-2x',
  '4x': 'accordeon-cell--content-spacing-4x',
  '6x': 'accordeon-cell--content-spacing-6x',
};

const listSpacingClassByValue: Record<AccordeonCellSpacing, string> = {
  '0': 'accordeon-cell--list-spacing-0',
  '0-5x': 'accordeon-cell--list-spacing-0-5x',
  '1x': 'accordeon-cell--list-spacing-1x',
  '2x': 'accordeon-cell--list-spacing-2x',
  '4x': 'accordeon-cell--list-spacing-4x',
  '6x': 'accordeon-cell--list-spacing-6x',
};

/**
 * Секция с заголовком, которая разворачивается по клику и показывает скрытый контент.
 * Используется для организации списков, настроек и любого контента, который нужно скрыть по умолчанию.
 */
export const AccordeonCell: React.FC<AccordeonCellProps> = ({
  title,
  description,
  children,
  size = 'xl',
  chevronPosition = 'title',
  hasDescription = true,
  hasRightAccessory = true,
  rightAccessory,
  rightAccessoryVariant = 'text-m',
  rightAccessoryText = 'Text M',
  defaultOpen = false,
  isOpen,
  onOpenChange,
  contentSpacing = '4x',
  listSpacing = '2x',
  className = '',
}) => {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isExpanded = isOpen ?? innerOpen;
  const shouldRenderDescription = hasDescription && Boolean(description);
  const hasContent = Boolean(children);

  const handleToggle = () => {
    const nextOpen = !isExpanded;

    if (isOpen === undefined) {
      setInnerOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  const rootClassName = [
    'accordeon-cell',
    `accordeon-cell--${size}`,
    `accordeon-cell--chevron-${chevronPosition}`,
    spacingClassByValue[contentSpacing],
    listSpacingClassByValue[listSpacing],
    isExpanded ? 'is-open' : '',
    shouldRenderDescription ? 'accordeon-cell--with-description' : '',
    className,
  ].filter(Boolean).join(' ');

  const defaultRightAccessory = (
    <CellRightAccessory variant={rightAccessoryVariant} text={rightAccessoryText} />
  );

  return (
    <div className={rootClassName}>
      <button
        className="accordeon-cell__header"
        type="button"
        aria-expanded={isExpanded}
        onClick={handleToggle}
      >
        <span className="accordeon-cell__center">
          <span className="accordeon-cell__content-row">
            <span className={`accordeon-cell__title ${titleClassMap[size]}`}>{title}</span>
            <span className="accordeon-cell__chevron" aria-hidden="true">
              <ChevronDown />
            </span>
          </span>
          {shouldRenderDescription && (
            <span className="accordeon-cell__description ts-400-s">{description}</span>
          )}
        </span>
        {hasRightAccessory && chevronPosition === 'title' && (
          <span className="accordeon-cell__right-accessory">
            {rightAccessory ?? defaultRightAccessory}
          </span>
        )}
      </button>
      {hasContent && isExpanded && (
        <div className="accordeon-cell__body">
          <div className="accordeon-cell__list">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
