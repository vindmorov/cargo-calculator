import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '../Badge/Badge';
import './tabs-carousel.css';

export interface TabsCarouselTab {
  /** Текст таба */
  label: string;
  /** Бейдж-аксессуар слева от текста (фон --primitive-brand) */
  badge?: number;
  /** Контент, отображаемый при активном табе */
  content?: React.ReactNode;
}

export interface TabsCarouselProps {
  /** Список табов */
  tabs: TabsCarouselTab[];
  /** Размер текста табов
   * @default "xl" */
  size?: 'xl' | '2xl';
  /** Показать кнопку действия справа
   * @default false */
  hasAction?: boolean;
  /** Текст кнопки действия (скрывается в адаптиве) */
  actionLabel?: string;
  /** Иконка кнопки действия */
  actionIcon?: React.ReactNode;
  /** Колбэк клика по кнопке действия */
  onActionClick?: () => void;
  /** Начальный выбранный таб (uncontrolled)
   * @default 0 */
  defaultSelectedIndex?: number;
  /** Выбранный таб (controlled) */
  selectedIndex?: number;
  /** Колбэк при переключении таба */
  onTabChange?: (index: number) => void;
  /** Дополнительный CSS-класс */
  className?: string;
}

type AnimationPhase = 'idle' | 'out' | 'in';

export const TabsCarousel: React.FC<TabsCarouselProps> = ({
  tabs,
  size = 'xl',
  hasAction = false,
  actionLabel,
  actionIcon,
  onActionClick,
  defaultSelectedIndex = 0,
  selectedIndex: selectedIndexProp,
  onTabChange,
  className = '',
}) => {
  const isControlled = selectedIndexProp !== undefined;

  const [internalIndex, setInternalIndex] = useState(defaultSelectedIndex);
  const [displayedIndex, setDisplayedIndex] = useState(
    isControlled ? selectedIndexProp! : defaultSelectedIndex
  );
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const pendingIndex = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = isControlled ? selectedIndexProp! : internalIndex;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex || phase !== 'idle') return;

    pendingIndex.current = index;

    if (!isControlled) setInternalIndex(index);
    onTabChange?.(index);

    setPhase('out');

    timerRef.current = setTimeout(() => {
      setDisplayedIndex(pendingIndex.current!);
      setPhase('in');

      timerRef.current = setTimeout(() => {
        setPhase('idle');
      }, 500);
    }, 200);
  };

  const contentClassName = [
    'tabs-carousel__content',
    phase === 'out' ? 'animate-tab-content-out' : '',
    phase === 'in' ? 'animate-tab-content-in' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`tabs-carousel ${className}`.trim()}>
      <div className="tabs-carousel__bar">
        <div className="tabs-carousel__tabs">
          {tabs.map((tab, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                className={[
                  'tabs-carousel__tab',
                  `tabs-carousel__tab--${size}`,
                  isActive ? 'is-active' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleTabClick(i)}
                aria-selected={isActive}
              >
                <span className={`tabs-carousel__tab-label ts-600-${size}`}>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`tabs-carousel__tab-badge tabs-carousel__tab-badge--${size}`}>
                    <Badge
                      value={tab.badge}
                      size="s"
                      color="var(--primitive-brand)"
                      textColor="var(--primitive-default)"
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {hasAction && (
          <button
            type="button"
            className="tabs-carousel__action"
            onClick={onActionClick}
          >
            {actionLabel && (
              <span className="tabs-carousel__action-label ts-500-m">
                {actionLabel}
              </span>
            )}
            {actionIcon && (
              <span className="tabs-carousel__action-icon ds-icon ds-icon--m" aria-hidden="true">
                {actionIcon}
              </span>
            )}
          </button>
        )}
      </div>

      {tabs[displayedIndex]?.content !== undefined && (
        <div className={contentClassName}>
          {tabs[displayedIndex].content}
        </div>
      )}
    </div>
  );
};
