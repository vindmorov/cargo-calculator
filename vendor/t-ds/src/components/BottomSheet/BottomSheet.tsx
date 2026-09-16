import React, { useEffect, useRef, useState } from 'react';
import './bottom-sheet.css';

interface BottomSheetProps {
  /** Управляет видимостью панели */
  isOpen: boolean;
  /** Колбэк при закрытии (оверлей, Escape, свайп вниз) */
  onClose?: () => void;
  /** Шапка панели, обычно `BottomSheetHeader` */
  header?: React.ReactNode;
  /** Подвал панели */
  footer?: React.ReactNode;
  /** Основной контент */
  children?: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Разрешает закрытие по клику на оверлей
   * @default true */
  isOverlayCloseEnabled?: boolean;
}

const HIDE_DURATION_MS = 400;
const SWIPE_CLOSE_THRESHOLD = 80;

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  children,
  className = '',
  isOverlayCloseEnabled = true,
}) => {
  const panelRef = useRef<HTMLElement | null>(null);
  const swipeStartY = useRef<number | null>(null);
  const swipeDelta = useRef(0);
  const [phase, setPhase] = useState<'hidden' | 'in' | 'out'>(isOpen ? 'in' : 'hidden');

  useEffect(() => {
    if (isOpen) {
      setPhase('in');
    } else if (phase === 'in') {
      setPhase('out');
      const timer = setTimeout(() => setPhase('hidden'), HIDE_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (phase !== 'in') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [phase, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStartY.current = e.touches[0].clientY;
    swipeDelta.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeStartY.current === null) return;
    const delta = e.touches[0].clientY - swipeStartY.current;
    if (delta <= 0) return;
    swipeDelta.current = delta;
    if (panelRef.current) {
      panelRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (swipeDelta.current > SWIPE_CLOSE_THRESHOLD) {
      onClose?.();
    } else if (panelRef.current) {
      panelRef.current.style.transition = 'transform 0.2s ease';
      panelRef.current.style.transform = '';
      setTimeout(() => {
        if (panelRef.current) panelRef.current.style.transition = '';
      }, 200);
    }
    swipeStartY.current = null;
    swipeDelta.current = 0;
  };

  if (phase === 'hidden') return null;

  const rootClassName = ['bottom-sheet', className].filter(Boolean).join(' ');
  const panelClassName = [
    'bottom-sheet__panel',
    phase === 'in' ? 'animate-slide-up-in' : 'animate-slide-up-out',
  ].join(' ');
  const overlayClassName = [
    'bottom-sheet__overlay',
    phase === 'in' ? 'animate-overlay-in' : 'animate-overlay-out',
  ].join(' ');

  return (
    <div className={rootClassName}>
      <button
        type="button"
        className={overlayClassName}
        aria-label="Закрыть"
        onClick={() => {
          if (isOverlayCloseEnabled) onClose?.();
        }}
      />
      <aside
        ref={panelRef}
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bottom-sheet__handle" aria-hidden="true" />
        {header && <div className="bottom-sheet__header">{header}</div>}
        <div className="bottom-sheet__content">
          <div className="bottom-sheet__content-inner">{children}</div>
        </div>
        {footer && <div className="bottom-sheet__footer">{footer}</div>}
      </aside>
    </div>
  );
};
