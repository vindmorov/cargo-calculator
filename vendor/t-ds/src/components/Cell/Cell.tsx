import React from 'react';
import './cell.css';


interface CellProps {
  /** Заголовок ячейки */
  title: React.ReactNode;
  /** Подзаголовок над заголовком */
  subtitle?: React.ReactNode;
  /** Описание под заголовком */
  description?: React.ReactNode;
  /** Элемент слева */
  leftAccessory?: React.ReactNode;
  /** Элемент справа */
  rightAccessory?: React.ReactNode;
  /** Верхний и нижний паддинг ячейки
   * @default "none" */
  verticalPadding?: 'none' | '2x' | '3x' | '4x';
  /** CSS-класс заголовка. Принимает классы типографики DS: `ts-500-m`, `ts-400-s` и т.д.
   * @default "ts-500-m" */
  titleClassName?: string;
  /** CSS-класс подзаголовка
   * @default "ts-400-s" */
  subtitleClassName?: string;
  /** CSS-класс описания
   * @default "ts-400-s" */
  descriptionClassName?: string;
  /** Цвет заголовка
   * @default "var(--primitive-primary)" */
  titleColor?: string;
  /** Цвет подзаголовка
   * @default "var(--primitive-secondary)" */
  subtitleColor?: string;
  /** Цвет описания
   * @default "var(--primitive-secondary)" */
  descriptionColor?: string;
  /** Дополнительный CSS-класс корневого элемента
   * @default "" */
  className?: string;
  /** Колбэк по клику. При наличии ячейка становится интерактивной */
  onClick?: () => void;
  /** Колбэк по клику на зону левый аксессуар + контент.
   * Hover-эффект ограничивается этой зоной, правый аксессуар остаётся вне зоны hover */
  leftAreaOnClick?: () => void;
}

/**
 * Универсальная строка списка с заголовком, опциональным описанием, левым и правым аксессуарами.
 * Используется для отображения данных, настроек, навигации и любых структурированных списков.
 *
 * Для стандартных паттернов рекомендуется использовать `CellLeftAccessory` и `CellRightAccessory`.
 */
export const Cell: React.FC<CellProps> = ({
  title,
  subtitle,
  description,
  leftAccessory,
  rightAccessory,
  verticalPadding = 'none',
  titleClassName = 'ts-500-m',
  subtitleClassName = 'ts-400-s',
  descriptionClassName = 'ts-400-s',
  titleColor = 'var(--primitive-primary)',
  subtitleColor = 'var(--primitive-secondary)',
  descriptionColor = 'var(--primitive-secondary)',
  className = '',
  onClick,
  leftAreaOnClick,
}) => {
  const rootClass = ['ds-cell', verticalPadding !== 'none' ? `ds-cell--padding-${verticalPadding}` : '', className].filter(Boolean).join(' ');

  const content = (
    <>
      {subtitle && (
        <div className={`ds-cell__subtitle ${subtitleClassName}`} style={{ color: subtitleColor }}>
          {subtitle}
        </div>
      )}
      <div className={`ds-cell__title ${titleClassName}`} style={{ color: titleColor }}>
        {title}
      </div>
      {description && (
        <div className={`ds-cell__description ${descriptionClassName}`} style={{ color: descriptionColor }}>
          {description}
        </div>
      )}
    </>
  );

  if (leftAreaOnClick) {
    return (
      <div className={rootClass}>
        <div
          className="ds-cell__left-area"
          onClick={leftAreaOnClick}
          role="button"
          tabIndex={0}
        >
          {leftAccessory && (
            <div className="ds-cell__left-accessory">
              {leftAccessory}
            </div>
          )}
          <div className="ds-cell__content">{content}</div>
        </div>
        {rightAccessory && (
          <div className="ds-cell__right-accessory">
            {rightAccessory}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={rootClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {leftAccessory && (
        <div className="ds-cell__left-accessory">
          {leftAccessory}
        </div>
      )}
      <div className="ds-cell__content">{content}</div>
      {rightAccessory && (
        <div className="ds-cell__right-accessory">
          {rightAccessory}
        </div>
      )}
    </div>
  );
};
