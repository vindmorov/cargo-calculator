import React, { useEffect, useState } from 'react';
import './action-sheet.css';

interface ActionSheetProps {
  /** Управляет видимостью панели */
  isOpen: boolean;
  /** Колбэк при закрытии (клик по оверлею или Escape) */
  onClose?: () => void;
  /** Шапка панели, обычно `ActionSheetHeader` */
  header?: React.ReactNode;
  /** Подвал панели, обычно `ActionSheetFooter` */
  footer?: React.ReactNode;
  /** Список действий, обычно `ActionSheetButton` */
  children?: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Разрешает закрытие по клику на оверлей
   * @default true */
  isOverlayCloseEnabled?: boolean;
}

const HIDE_DURATION_MS = 300;

/**
 * Всплывающая панель снизу экрана со списком действий, связанных с текущим контекстом.
 * Может содержать от одного до нескольких вариантов действий. Используется для подтверждения
 * действия или для выбора на развилке сценария.
 *
 * Компонент составной: собирается из `ActionSheet`, `ActionSheetHeader`, `ActionSheetButton` и `ActionSheetFooter`.
 */
export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  children,
  className = '',
  isOverlayCloseEnabled = true,
}) => {
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
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [phase, onClose]);

  if (phase === 'hidden') return null;

  const rootClassName = ['action-sheet', className].filter(Boolean).join(' ');
  const panelClassName = [
    'action-sheet__panel',
    phase === 'in' ? 'animate-popup-in' : 'animate-popup-out',
  ].join(' ');
  const overlayClassName = [
    'action-sheet__overlay',
    phase === 'in' ? 'animate-overlay-in' : 'animate-overlay-out',
  ].join(' ');

  return (
    <div className={rootClassName}>
      <button
        type="button"
        className={overlayClassName}
        aria-label="Закрыть action sheet"
        onClick={() => {
          if (isOverlayCloseEnabled) {
            onClose?.();
          }
        }}
      />
      <aside className={panelClassName} role="dialog" aria-modal="true">
        {header && <div className="action-sheet__header">{header}</div>}
        <div className="action-sheet__content ds-scroll-area">
          <div className="action-sheet__content-inner">{children}</div>
        </div>
        {footer && <div className="action-sheet__footer">{footer}</div>}
      </aside>
    </div>
  );
};
