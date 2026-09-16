import React, { useRef } from 'react';
import './table-cell.css';
import { InformationCircle } from '../../assets/Icon/20/Filled';
import { NumericInput } from '../Input/NumericInput';

const FORMAT_DEFAULTS: Record<string, { suffix?: string; decimalScale: number }> = {
  number: { decimalScale: 0 },
  currency: { suffix: ' ₽', decimalScale: 2 },
  percent: { suffix: ' %', decimalScale: 2 },
};

export interface TableCellProps {
  /** Показать заголовок @default true */
  hasTitle?: boolean;
  /** Основной текст (в режиме isEdit — value для input) */
  title?: string;
  /** Показать описание @default false */
  hasDescription?: boolean;
  /** Текст под заголовком */
  description?: React.ReactNode;
  /** Показать тег @default false */
  hasTag?: boolean;
  /** Содержимое тега */
  tag?: React.ReactNode;
  /** Показать левый аксессуар @default false */
  hasLeftAccessory?: boolean;
  /** Avatar или Icon 24 */
  leftAccessory?: React.ReactNode;
  /** Показать правый аксессуар (скрывается при isError) @default false */
  hasRightAccessory?: boolean;
  /** Icon 24 или другой элемент */
  rightAccessory?: React.ReactNode;
  /** Стиль шрифта заголовка @default '400' */
  titleStyle?: '400' | '500' | '600';
  /** Редактируемый заголовок: title рендерится как input, клик по всей ячейке фокусирует поле @default false */
  isEdit?: boolean;
  /** Плейсхолдер для input (только при isEdit=true) */
  placeholder?: string;
  /** Колбэк при изменении значения input (только при isEdit=true) */
  onTitleChange?: (value: string) => void;
  /** Включает числовой режим в isEdit */
  editFormat?: 'number' | 'currency' | 'percent';
  /** Суффикс для числового режима (переопределяет дефолт формата) */
  editSuffix?: string;
  /** Количество знаков после запятой (переопределяет дефолт формата) */
  editDecimalScale?: number;
  /** Колбэк с числовым значением без суффикса */
  onEditValueChange?: (value: number | null) => void;
  /** Задизейбленное состояние @default false */
  isDisabled?: boolean;
  /** Ошибка — правый слот заменяется иконкой Info Circle 20px @default false */
  isError?: boolean;
  /** CSS-значение для переопределения цвета фона */
  backgroundColor?: string;
  /** Инлайн-стили корневого элемента (width, minWidth, maxWidth и т.д.) */
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const TableCell: React.FC<TableCellProps> = ({
  hasTitle = true,
  title,
  hasDescription = false,
  description,
  hasTag = false,
  tag,
  hasLeftAccessory = false,
  leftAccessory,
  hasRightAccessory = false,
  rightAccessory,
  titleStyle = '400',
  isEdit = false,
  placeholder,
  onTitleChange,
  editFormat,
  editSuffix,
  editDecimalScale,
  onEditValueChange,
  isDisabled = false,
  isError = false,
  backgroundColor,
  style,
  className = '',
  onClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const effectiveIsEdit = isEdit && hasTitle;
  const isInteractive = Boolean(onClick) || effectiveIsEdit;

  const rootClassName = [
    'table-cell',
    isDisabled ? 'table-cell--disabled' : '',
    isError ? 'table-cell--error' : '',
    isInteractive ? 'table-cell--interactive' : '',
    effectiveIsEdit ? 'table-cell--edit' : '',
    className,
  ].filter(Boolean).join(' ');

  const willRenderTitle = hasTitle && (isEdit || title !== undefined);
  const willRenderDescription = hasDescription && description !== undefined;
  const willRenderTag = hasTag && tag !== undefined;
  const hasContent = willRenderTitle || willRenderDescription || willRenderTag;
  const showRightError = isError;
  const showRightAccessory = !isError && hasRightAccessory && rightAccessory;

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) return;
    if (effectiveIsEdit && e.target !== inputRef.current) {
      inputRef.current?.focus();
    }
    onClick?.();
  };

  return (
    <div
      className={rootClassName}
      style={backgroundColor ? { '--table-cell-bg': backgroundColor, ...style } as React.CSSProperties : style}
      onClick={handleClick}
      role={onClick && !effectiveIsEdit ? 'button' : undefined}
      tabIndex={onClick && !effectiveIsEdit && !isDisabled ? 0 : undefined}
    >
      {hasLeftAccessory && leftAccessory && (
        <div className="table-cell__left">{leftAccessory}</div>
      )}

      {hasContent && (
        <div className="table-cell__content">
          {hasTitle && (
            effectiveIsEdit ? (
              editFormat ? (
                <NumericInput
                  inputRef={inputRef}
                  className={`table-cell__title-input ts-${titleStyle}-m`}
                  value={title !== undefined ? Number(title) : null}
                  onValueChange={onEditValueChange}
                  suffix={editSuffix ?? FORMAT_DEFAULTS[editFormat].suffix}
                  decimalScale={editDecimalScale ?? FORMAT_DEFAULTS[editFormat].decimalScale}
                  placeholder={placeholder}
                  disabled={isDisabled}
                />
              ) : (
                <input
                  ref={inputRef}
                  className={`table-cell__title-input ts-${titleStyle}-m`}
                  value={title ?? ''}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  onChange={e => onTitleChange?.(e.target.value)}
                />
              )
            ) : (
              title !== undefined && (
                <p className={`table-cell__title ts-${titleStyle}-m`}>{title}</p>
              )
            )
          )}
          {hasDescription && description !== undefined && (
            <p className="table-cell__description ts-400-s">{description}</p>
          )}
          {hasTag && tag !== undefined && (
            <div className="table-cell__tag">{tag}</div>
          )}
        </div>
      )}

      {(showRightAccessory || showRightError) && (
        <div className="table-cell__right">
          {showRightError ? (
            <span className="ds-icon ds-icon--s">
              <InformationCircle />
            </span>
          ) : (
            rightAccessory
          )}
        </div>
      )}
    </div>
  );
};
