import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Checkmark, Magnifier } from '../../assets/Icon/24/Stroked';
import { Spinner } from '../Spinner/Spinner';
import { BottomSheet } from '../BottomSheet/BottomSheet';
import { BottomSheetHeader } from '../BottomSheet/BottomSheetHeader';
import { BottomSheetSearch } from '../BottomSheet/BottomSheetSearch';
import { BREAKPOINT_MOBILE } from '../../breakpoints';
import './dropdown-popup.css';

interface DropdownPopupProps {
  /** Управляет видимостью попапа */
  isOpen: boolean;
  /** Колбэк при закрытии (клик вне или Escape) */
  onClose: () => void;
  /** Ref на триггер — используется для позиционирования в десктопном режиме */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Заголовок, отображаемый в мобильном шите */
  label?: string;
  /** Текущее выбранное значение — отмечается галочкой */
  value?: string;
  /** Включает поле поиска
   * @default false */
  hasSearch?: boolean;
  /** Плейсхолдер поля поиска
   * @default "Поиск" */
  searchPlaceholder?: string;
  /** Колбэк при изменении поискового запроса */
  onSearchChange?: (q: string) => void;
  /** Показывает спиннер вместо списка
   * @default false */
  isLoading?: boolean;
  /** Показывает пустое состояние вместо списка
   * @default false */
  isEmpty?: boolean;
  /** Текст пустого состояния
   * @default "Ничего не найдено" */
  emptyText?: string;
  /** Список вариантов */
  children?: React.ReactNode;
}

type DesktopPosition = { top?: number; bottom?: number; left: number; width: number };

const ADAPTIVE_BREAKPOINT = BREAKPOINT_MOBILE;
const DESKTOP_MAX_HEIGHT = 280;
const DESKTOP_MIN_WIDTH = 320;

/**
 * Внутренний попап для `Dropdown` и `Chip` с вариантом `dropdown`.
 * На мобильных устройствах отображается как `BottomSheet`, на десктопе — как позиционированная панель.
 * Рендерится через портал в `document.body`.
 */
export const DropdownPopup: React.FC<DropdownPopupProps> = ({
    isOpen,
    onClose,
    triggerRef,
    label,
    value,
    hasSearch = false,
    searchPlaceholder = 'Поиск',
    onSearchChange,
    isLoading = false,
    isEmpty = false,
    emptyText = 'Ничего не найдено',
    children,
}) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isAdaptive, setIsAdaptive] = useState(() => window.innerWidth < ADAPTIVE_BREAKPOINT);
    const [position, setPosition] = useState<DesktopPosition>({ left: 0, width: DESKTOP_MIN_WIDTH });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleResize = () => setIsAdaptive(window.innerWidth < ADAPTIVE_BREAKPOINT);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const updatePosition = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const width = Math.max(rect.width, DESKTOP_MIN_WIDTH);
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow >= DESKTOP_MAX_HEIGHT) {
            setPosition({ top: rect.bottom + 4, left: rect.left, width });
        } else {
            setPosition({ bottom: window.innerHeight - rect.top + 4, left: rect.left, width });
        }
    };

    // Desktop lifecycle — BottomSheet управляет своим состоянием сам
    useEffect(() => {
        if (isAdaptive) return;
        if (isOpen) {
            setIsExiting(false);
            setShouldRender(true);
        } else if (shouldRender) {
            setIsExiting(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsExiting(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, isAdaptive]);

    // Пересчёт позиции при открытии, скролле и ресайзе
    useEffect(() => {
        if (!isOpen || isAdaptive) return;
        updatePosition();
        window.addEventListener('scroll', updatePosition, { capture: true });
        window.addEventListener('resize', updatePosition);
        return () => {
            window.removeEventListener('scroll', updatePosition, { capture: true });
            window.removeEventListener('resize', updatePosition);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, isAdaptive]);

    // Escape — только для десктопа, BottomSheet обрабатывает сам
    useEffect(() => {
        if (!isOpen || isAdaptive) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isAdaptive, onClose]);

    // Сброс поиска при закрытии
    useEffect(() => {
        if (!isOpen) setSearchQuery('');
    }, [isOpen]);

    const checkmarkIcon = (
        <span className="dropdown-popup__checkmark" aria-hidden="true">
            <Checkmark />
        </span>
    );

    const emptySlot = <span className="dropdown-popup__checkmark" aria-hidden="true" />;

    const enhancedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement<{ title?: React.ReactNode; rightAccessory?: React.ReactNode; verticalPadding?: string; titleClassName?: string; onClick?: () => void }>(child)) {
            return child;
        }
        const isSelected = value !== undefined && typeof child.props.title === 'string' && child.props.title === value;
        const originalOnClick = child.props.onClick;
        return React.cloneElement(child, {
            verticalPadding: 'none',
            titleClassName: 'ts-400-m',
            rightAccessory: isSelected ? checkmarkIcon : emptySlot,
            onClick: originalOnClick ? () => { originalOnClick(); onClose(); } : onClose,
        });
    });

    const listContent = (
        <>
            {isLoading && (
                <div className="dropdown-popup__state">
                    <Spinner />
                </div>
            )}
            {!isLoading && isEmpty && (
                <div className="dropdown-popup__state">
                    <p className="dropdown-popup__empty-text ts-400-m">{emptyText}</p>
                </div>
            )}
            {!isLoading && !isEmpty && enhancedChildren}
        </>
    );

    // Адаптив: BottomSheet берёт на себя оверлей, анимацию, ручку, свайп
    if (isAdaptive) {
        const sheetHeader = (label || hasSearch) ? (
            <>
                {label && <BottomSheetHeader title={label} />}
                {hasSearch && (
                    <BottomSheetSearch
                        value={searchQuery}
                        onChange={(q) => { setSearchQuery(q); onSearchChange?.(q); }}
                        placeholder={searchPlaceholder}
                    />
                )}
            </>
        ) : undefined;

        return ReactDOM.createPortal(
            <BottomSheet isOpen={isOpen} onClose={onClose} header={sheetHeader}>
                {listContent}
            </BottomSheet>,
            document.body
        );
    }

    // Десктоп
    if (!shouldRender) return null;

    const rootClass = [
        'dropdown-popup',
        isExiting ? 'dropdown-popup--exiting' : '',
    ].filter(Boolean).join(' ');

    const searchBar = hasSearch && (
        <div className="dropdown-popup__search-wrap">
            <div className="dropdown-popup__search">
                <span className="dropdown-popup__search-icon" aria-hidden="true">
                    <Magnifier />
                </span>
                <input
                    className="dropdown-popup__search-input ts-400-m"
                    type="text"
                    placeholder={searchPlaceholder}
                    onChange={e => onSearchChange?.(e.target.value)}
                />
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        <div className={rootClass}>
            <div className="dropdown-popup__overlay" onClick={onClose} />
            <div
                className="dropdown-popup__panel"
                style={{
                    position: 'fixed',
                    width: position.width,
                    top: position.top,
                    bottom: position.bottom,
                    left: position.left,
                } as React.CSSProperties}
            >
                {searchBar}
                <div className="dropdown-popup__content ds-scroll-area">
                    {listContent}
                </div>
            </div>
        </div>,
        document.body
    );
};
