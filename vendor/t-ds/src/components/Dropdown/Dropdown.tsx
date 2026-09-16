import React, { useRef, useState } from 'react';
import { QuestionCircle } from '../../assets/Icon/icons';
import { Tooltip } from '../Tooltip/Tooltip';
import { ChevronDown } from '../../assets/Icon/12/Filled';
import { DropdownPopup } from './DropdownPopup';
import './dropdown.css';

interface DropdownProps {
  /** Подпись над полем */
  label?: string;
  /** Вспомогательный текст под полем */
  description?: string;
  /** Текст ошибки (заменяет `description` при `isError=true`) */
  errorMessage?: string;
  /** Управляемое значение. Если передан — компонент переходит в controlled mode */
  value?: string;
  /** Колбэк при выборе значения */
  onChange?: (value: string) => void;
  /** Блокирует поле
   * @default false */
  isDisabled?: boolean;
  /** Переводит поле в состояние ошибки
   * @default false */
  isError?: boolean;
  /** Текст-заглушка до выбора значения
   * @default "Выберите вариант" */
  placeholder?: string;
  /** Произвольный элемент справа, перед шевроном */
  right?: React.ReactNode;
  /** Показывает иконку ChevronDown справа
   * @default true */
  hasChevron?: boolean;
  /** Показывает иконку подсказки рядом с `label`
   * @default false */
  hasHelpIcon?: boolean;
  /** Текст тултипа при наведении на иконку-подсказку */
  helpText?: React.ReactNode;
  /** Список вариантов, обычно компоненты `Cell` */
  children?: React.ReactNode;
  /** Включает поле поиска в попапе
   * @default false */
  hasSearch?: boolean;
  /** Плейсхолдер поля поиска
   * @default "Поиск" */
  searchPlaceholder?: string;
  /** Колбэк при изменении поискового запроса */
  onSearchChange?: (q: string) => void;
  /** Показывает спиннер в попапе
   * @default false */
  isLoading?: boolean;
  /** Показывает пустое состояние в попапе
   * @default false */
  isEmpty?: boolean;
  /** Текст пустого состояния
   * @default "Ничего не найдено" */
  emptyText?: string;
}

/**
 * Поле выбора из раскрывающегося списка.
 * Используется в формах, когда нужно выбрать одно значение из заранее заданного набора вариантов.
 */
export const Dropdown: React.FC<DropdownProps> = ({
    label,
    description,
    errorMessage,
    value,
    onChange: _onChange,
    isDisabled = false,
    isError = false,
    placeholder = 'Выберите вариант',
    right,
    hasChevron = true,
    hasHelpIcon = false,
    helpText,
    children,
    hasSearch = false,
    searchPlaceholder = 'Поиск',
    onSearchChange,
    isLoading = false,
    isEmpty = false,
    emptyText = 'Ничего не найдено',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const metaText = isError ? errorMessage ?? description : description;

    const classNames = [
        'dropdown',
        isDisabled ? 'dropdown--disabled' : '',
        isError ? 'dropdown--error' : '',
        isOpen ? 'dropdown--open' : '',
    ].filter(Boolean).join(' ');

    const handleClick = () => {
        if (!isDisabled) setIsOpen(prev => !prev);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isDisabled) setIsOpen(prev => !prev);
        }
    };

    return (
        <>
            <div
                ref={triggerRef}
                className={classNames}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                tabIndex={isDisabled ? -1 : 0}
            >
                <div className="dropdown__content">
                    <div className="dropdown__main">
                        <div className="dropdown__header">
                            {label && <p className="dropdown__title ts-500-s">{label}</p>}
                            {label && hasHelpIcon && (helpText
                                ? <span onClick={e => e.stopPropagation()} onMouseDown={e => e.preventDefault()}>
                                    <Tooltip title={label} trigger={
                                      <span className="dropdown__help ds-icon" aria-hidden="true">
                                          <QuestionCircle />
                                      </span>
                                    }>{helpText}</Tooltip>
                                  </span>
                                : <span className="dropdown__help ds-icon hoverOpacity" aria-hidden="true">
                                    <QuestionCircle />
                                  </span>
                            )}
                        </div>
                        <p className={`dropdown__value ts-400-m${!value ? ' is-placeholder' : ''}`}>
                            {value || placeholder}
                        </p>
                    </div>
                    <div className="dropdown__accessory">
                        <span className="dropdown__accessory-stack">
                            {right}
                            {hasChevron && (
                                <span className="dropdown__chevron" aria-hidden="true">
                                    <ChevronDown />
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                {metaText && (
                    <div className="dropdown__meta">
                        <div className="dropdown__divider" />
                        <p className="dropdown__description ts-400-s">{metaText}</p>
                    </div>
                )}
            </div>
            <DropdownPopup
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                triggerRef={triggerRef}
                label={label}
                value={value}
                hasSearch={hasSearch}
                searchPlaceholder={searchPlaceholder}
                onSearchChange={onSearchChange}
                isLoading={isLoading}
                isEmpty={isEmpty}
                emptyText={emptyText}
            >
                {children}
            </DropdownPopup>
        </>
    );
};
