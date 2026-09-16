import React, { useEffect, useState } from 'react';
import './drawer.css';

interface DrawerProps {
  /** Управляет видимостью панели */
  isOpen: boolean;
  /** Колбэк при закрытии (клавиша Escape) */
  onClose?: () => void;
  /** Шапка панели, обычно `DrawerHeader` */
  header?: React.ReactNode;
  /** Подвал панели, обычно `DrawerFooter` */
  footer?: React.ReactNode;
  /** Основной контент панели */
  children?: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

const HIDE_DURATION_MS = 400;

/**
 * Боковая панель, выезжающая поверх контента.
 * Используется для отображения дополнительной информации или форм без перехода на новую страницу.
 *
 * Компонент составной: собирается из `Drawer`, `DrawerHeader`, `DrawerHeaderTitle` и `DrawerFooter`.
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  children,
  className = '',
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

  const rootClassName = ['drawer', className].filter(Boolean).join(' ');
  const panelClassName = [
    'drawer__panel',
    phase === 'in' ? 'animate-slide-right-in' : 'animate-slide-right-out',
  ].join(' ');

  return (
    <div className={rootClassName}>
      <div className="drawer__overlay" aria-hidden="true" />
      <aside className={panelClassName} role="dialog" aria-modal="true">
        {header && <div className="drawer__header">{header}</div>}
        <div className="drawer__content ds-scroll-area">{children}</div>
        {footer && <div className="drawer__footer">{footer}</div>}
      </aside>
    </div>
  );
};
