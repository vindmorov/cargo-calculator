import React, { useRef, useState } from 'react';
import { Circle } from '../../assets/Icon/icons';
import { ChevronDown } from '../../assets/Icon/12/Filled';
import { Badge } from '../Badge/Badge';
import { DropdownPopup } from '../Dropdown/DropdownPopup';
import './chip.css';

interface ChipProps {
  /** Текст чипа */
  children: React.ReactNode;
  /** Тип чипа: базовый выбор, таб, дропдаун или действие
   * @default "chip" */
  variant?: 'chip' | 'tab' | 'dropdown' | 'action';
  /** Выбранное состояние
   * @default false */
  isSelected?: boolean;
  /** Блокирует чип
   * @default false */
  isDisabled?: boolean;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Колбэк при удалении для варианта `action` */
  onClose?: (e: React.MouseEvent) => void;
  /** Левый аксессуар */
  leftAccessory?: 'icon' | 'logo' | 'logo-stack';
  /** Иконка для варианта `leftAccessory="icon"`
   * @default Circle */
  leftIcon?: React.ReactNode;
  /** Бейдж справа (только для варианта `tab`) */
  badge?: number | string;
  /** Открытое состояние для варианта `dropdown`
   * @default false */
  isOpen?: boolean;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Контент выпадающего попапа для варианта `dropdown` */
  popupContent?: React.ReactNode;
  /** Выбранное значение, отображаемое в тексте дропдауна */
  value?: string;
  /** Включает поле поиска в попапе дропдауна
   * @default false */
  hasSearch?: boolean;
  /** Плейсхолдер поля поиска в попапе
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
  /** Текст пустого состояния в попапе
   * @default "Ничего не найдено" */
  emptyText?: string;
}

/**
 * Компонент для одиночного или множественного выбора.
 * Часто применяется для фильтрации контента в списках. Обычно используется в виде группы.
 *
 * - `chip` — базовый вариант для множественного выбора
 * - `tab` — для переключения контента на странице
 * - `dropdown` — для фильтрации с выбором из списка
 * - `action` — для вызова действия в списке чипов
 */
export const Chip: React.FC<ChipProps> = ({
    children,
    variant = 'chip',
    isSelected = false,
    isDisabled = false,
    onClick,
    onClose,
    leftAccessory,
    leftIcon,
    badge,
    isOpen: isOpenProp = false,
    className = '',
    popupContent,
    value,
    hasSearch = false,
    searchPlaceholder = 'Поиск',
    onSearchChange,
    isLoading = false,
    isEmpty = false,
    emptyText = 'Ничего не найдено',
}) => {
    const [isOpenInternal, setIsOpenInternal] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const hasPopup = variant === 'dropdown' && popupContent !== undefined;
    const isOpen = hasPopup ? isOpenInternal : isOpenProp;
    const classNames = [
        'chip',
        `chip--${variant}`,
        isSelected ? 'is-selected' : '',
        isDisabled ? 'is-disabled' : '',
        isOpen ? 'is-pressed' : '',
        className
    ].filter(Boolean).join(' ');

    const renderLeftAccessory = () => {
        if (!leftAccessory) return null;

        if (leftAccessory === 'icon') {
            return (
                <span className="chip__accessory chip__accessory--left ds-icon ds-icon--xs" aria-hidden="true">
                    {leftIcon ?? <Circle />}
                </span>
            );
        }

        if (leftAccessory === 'logo') {
            return (
                <span className="chip__accessory chip__accessory--left" aria-hidden="true">
                    <span className="chip__logo"></span>
                </span>
            );
        }

        if (leftAccessory === 'logo-stack') {
            return (
                <span className="chip__accessory chip__accessory--left chip__logo-stack" aria-hidden="true">
                    <span className="chip__logo"></span>
                    <span className="chip__logo"></span>
                </span>
            );
        }

        return null;
    };

    const handleClick = () => {
        if (hasPopup) {
            setIsOpenInternal(prev => !prev);
        } else {
            onClick?.();
        }
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onClose) onClose(e);
    };

    const content = (
        <>
            {renderLeftAccessory()}
            <span className="chip__label ts-500-s">{children}</span>
            {variant === 'tab' && badge !== undefined && (
                <span className="chip__accessory chip__accessory--right chip__badge" aria-hidden="true">
                    <Badge value={Number(badge)} size="s" />
                </span>
            )}
            {variant === 'dropdown' && (
                <span className={`chip__accessory chip__caret ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                    <ChevronDown />
                </span>
            )}
            {variant === 'action' && isSelected && (
                <span className="chip__accessory chip__cross" aria-hidden="true" onClick={handleClose} />
            )}
        </>
    );

    if (variant === 'dropdown') {
        return (
            <>
                <button
                    ref={triggerRef}
                    className={classNames}
                    type="button"
                    disabled={isDisabled}
                    onClick={handleClick}
                >
                    <span className="chip__dropdown">
                        {content}
                    </span>
                </button>
                {hasPopup && (
                    <DropdownPopup
                        isOpen={isOpenInternal}
                        onClose={() => setIsOpenInternal(false)}
                        triggerRef={triggerRef}
                        value={value}
                        hasSearch={hasSearch}
                        searchPlaceholder={searchPlaceholder}
                        onSearchChange={onSearchChange}
                        isLoading={isLoading}
                        isEmpty={isEmpty}
                        emptyText={emptyText}
                    >
                        {popupContent}
                    </DropdownPopup>
                )}
            </>
        );
    }

    return (
        <button
            className={classNames}
            type="button"
            disabled={isDisabled}
            onClick={onClick}
        >
            {content}
        </button>
    );
};
