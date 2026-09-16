import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { BottomSheet } from '../BottomSheet/BottomSheet';
import { BottomSheetHeader } from '../BottomSheet/BottomSheetHeader';
import './tooltip.css';

export interface TooltipProps {
  /** Элемент-триггер, при наведении или фокусе на который появляется подсказка */
  trigger: React.ReactNode;
  /** Содержимое подсказки */
  children: React.ReactNode;
  /** Заголовок, отображаемый в шапке BottomSheet на мобильном. На десктопе не используется. */
  title?: React.ReactNode;
  /** Положение подсказки относительно триггера
   * @default "right" */
  placement?: 'right' | 'left';
  /** Контролируемое состояние видимости. Если передан — компонент переходит в controlled mode */
  isOpen?: boolean;
  /** Начальное состояние для неконтролируемого режима
   * @default false */
  defaultOpen?: boolean;
  /** Колбэк при изменении видимости */
  onOpenChange?: (isOpen: boolean) => void;
  /** Дополнительный CSS-класс для обёртки
   * @default "" */
  className?: string;
}

/**
 * Всплывающая подсказка, появляющаяся при наведении или фокусе на элемент-триггер.
 * На мобильном (≤600px) открывается как BottomSheet.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  trigger,
  children,
  title,
  placement = 'right',
  isOpen,
  defaultOpen = false,
  onOpenChange,
  className = '',
}) => {
  const isMobile = useIsMobile();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = isOpen !== undefined;
  const isTooltipOpen = isControlled ? isOpen : internalOpen;

  useEffect(() => {
    if (isControlled) return;
    setInternalOpen(defaultOpen);
  }, [defaultOpen, isControlled]);

  const setOpen = (nextValue: boolean) => {
    if (!isControlled) setInternalOpen(nextValue);
    onOpenChange?.(nextValue);
  };

  const rootClassName = ['tooltip-anchor', className].filter(Boolean).join(' ');
  const panelClassName = ['tooltip', `tooltip--${placement}`].join(' ');

  const content = typeof children === 'string'
    ? <p className="tooltip__paragraph ts-400-s">{children}</p>
    : children;

  const desktopHandlers = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: (event: React.FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setOpen(false);
      }
    },
  };

  const mobileHandlers = {
    onClick: () => setOpen(!isTooltipOpen),
  };

  return (
    <div className={rootClassName} {...(isMobile ? mobileHandlers : desktopHandlers)}>
      <div className="tooltip-anchor__trigger hoverOpacity">{trigger}</div>

      {isMobile ? (
        <BottomSheet
          isOpen={isTooltipOpen}
          onClose={() => setOpen(false)}
          header={title ? <BottomSheetHeader title={title} /> : undefined}
        >
          {content}
        </BottomSheet>
      ) : (
        isTooltipOpen && (
          <div className={panelClassName} role="tooltip">
            <div className="tooltip__arrow" aria-hidden="true" />
            <div className="tooltip__content">{content}</div>
          </div>
        )
      )}
    </div>
  );
};
