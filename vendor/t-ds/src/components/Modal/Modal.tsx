import React, { useEffect, useRef, useState } from 'react';
import './modal.css';
import { BottomSheet } from '../BottomSheet/BottomSheet';
import { BottomSheetHeader } from '../BottomSheet/BottomSheetHeader';
import { useIsMobile } from '../../hooks/useIsMobile';

interface ModalProps {
  /** Открывает или скрывает окно */
  isOpen: boolean;
  /** Колбэк при закрытии (Escape или клик по оверлею) */
  onClose?: () => void;
  /** Шапка окна, обычно `ModalHeader` */
  header?: React.ReactNode;
  /** Подвал окна, обычно `ModalFooter` */
  footer?: React.ReactNode;
  /** Прокручиваемый контент окна */
  children?: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Разрешает закрытие по клику на оверлей
   * @default true */
  isOverlayCloseEnabled?: boolean;
  /** На мобильном (≤ 640px) показывает панель снизу (шторка) вместо fullscreen
   * @default false */
  isSheet?: boolean;
}

const HIDE_DURATION_DESKTOP_MS = 300;
const HIDE_DURATION_MOBILE_MS = 400;

/**
 * Всплывающее окно с затемнённым оверлеем, показывающееся поверх контента страницы.
 * Обычно используется для отображения дополнительной информации или интерактивных элементов.
 * Собирается из `ModalHeader`, зоны контента и `ModalFooter`.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  children,
  className = '',
  isOverlayCloseEnabled = true,
  isSheet = false,
}) => {
  const isMobile = useIsMobile();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [phase, setPhase] = useState<'hidden' | 'in' | 'out'>(isOpen ? 'in' : 'hidden');

  useEffect(() => {
    if (isOpen) {
      setPhase('in');
    } else if (phase === 'in') {
      setPhase('out');
      const hideDuration = isMobile ? HIDE_DURATION_MOBILE_MS : HIDE_DURATION_DESKTOP_MS;
      const timer = setTimeout(() => setPhase('hidden'), hideDuration);
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

  useEffect(() => {
    if (phase !== 'in') {
      setIsHeaderCompact(false);
      return;
    }

    const node = contentRef.current;
    if (!node) return;

    const updateScrollState = () => setIsHeaderCompact(node.scrollTop >= 24);
    updateScrollState();
    node.addEventListener('scroll', updateScrollState);
    return () => node.removeEventListener('scroll', updateScrollState);
  }, [phase, children]);

  if (isSheet && isMobile) {
    const sheetTitle = React.isValidElement(header)
      ? (header.props as Record<string, unknown>).title as React.ReactNode
      : undefined;
    const sheetHeader = sheetTitle != null
      ? <BottomSheetHeader title={sheetTitle} />
      : undefined;

    return (
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        header={sheetHeader}
        footer={footer}
        isOverlayCloseEnabled={isOverlayCloseEnabled}
        className={className}
      >
        {children}
      </BottomSheet>
    );
  }

  if (phase === 'hidden') return null;

  const contentTitle = React.isValidElement(header)
    ? (header.props as Record<string, unknown>).title as React.ReactNode
    : undefined;

  const rootClassName = ['modal', className].filter(Boolean).join(' ');
  const headerClassName = [
    'modal__header',
    isHeaderCompact ? 'modal__header--compact' : '',
  ].filter(Boolean).join(' ');
  const panelClassName = [
    'modal__panel',
    isMobile
      ? (phase === 'in' ? 'animate-slide-right-in' : 'animate-slide-right-out')
      : (phase === 'in' ? 'animate-popup-in' : 'animate-popup-out'),
  ].join(' ');

  const overlayClassName = [
    'modal__overlay',
    phase === 'in' ? 'animate-overlay-in' : 'animate-overlay-out',
  ].join(' ');

  return (
    <div className={rootClassName}>
      <button
        type="button"
        className={overlayClassName}
        aria-label="Закрыть модальное окно"
        onClick={() => {
          if (isOverlayCloseEnabled) {
            onClose?.();
          }
        }}
      />
      <aside className={panelClassName} role="dialog" aria-modal="true">
        {header && <div className={headerClassName}>{header}</div>}
        <div ref={contentRef} className="modal__content ds-scroll-area">
          <div className="modal__content-inner">
            {contentTitle && (
              <div className="modal__content-title ts-600-2xl">{contentTitle}</div>
            )}
            {children}
          </div>
        </div>
        {footer && <div className="modal__footer">{footer}</div>}
      </aside>
    </div>
  );
};
