import React, { useEffect, useRef } from 'react';
import './context-menu.css';

export interface ContextMenuItem {
  /** Уникальный идентификатор элемента */
  key: string;
  /** Текст действия */
  label: React.ReactNode;
  /** Иконка 24px слева от текста */
  icon?: React.ReactNode;
  /** Визуальный стиль: обычный или деструктивный
   * @default "default" */
  variant?: 'default' | 'danger';
  /** Колбэк по клику на элемент */
  onClick?: () => void;
  /** Блокирует элемент меню */
  isDisabled?: boolean;
}

export interface ContextMenuProps {
  /** Элемент, по клику на который открывается меню */
  trigger: React.ReactNode;
  /** Управляет видимостью меню */
  isOpen: boolean;
  /** Колбэк при закрытии (выбор действия или клик вне меню) */
  onClose?: () => void;
  /** Сторона, в которую раскрывается меню относительно триггера
   * @default "right" */
  placement?: 'right' | 'left';
  /** Список действий в меню */
  items: ContextMenuItem[];
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Всплывающее меню с набором действий, которое появляется рядом с элементом по клику или тапу.
 * Используется для вызова контекстных действий без перехода на другой экран.
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
  trigger,
  isOpen,
  onClose,
  placement = 'right',
  items,
  className = '',
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!rootRef.current?.contains(target)) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, onClose]);

  const rootClassName = ['context-menu-anchor', className].filter(Boolean).join(' ');
  const panelClassName = ['context-menu', `context-menu--${placement}`].join(' ');

  return (
    <div ref={rootRef} className={rootClassName}>
      {trigger}
      {isOpen && (
        <div className={panelClassName}>
          <div className="context-menu__list">
            {items.map((item) => {
              const itemClassName = [
                'context-menu__item',
                'hoverOpacity',
                `context-menu__item--${item.variant ?? 'default'}`,
                item.isDisabled ? 'is-disabled' : '',
              ].filter(Boolean).join(' ');

              return (
                <button
                  key={item.key}
                  type="button"
                  className={itemClassName}
                  disabled={item.isDisabled}
                  onClick={() => {
                    if (item.isDisabled) {
                      return;
                    }

                    item.onClick?.();
                    onClose?.();
                  }}
                >
                  {item.icon && (
                    <span className="context-menu__icon ds-icon ds-icon--m" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="context-menu__label ts-500-m">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
