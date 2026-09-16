import React from 'react';
import './page-layout.css';

export interface PageLayoutProps {
  /** Размер макета страницы. Определяет максимальную ширину контентной зоны */
  size: 's' | 'm' | 'l';
  /** Навигационная панель, обычно `NavigationBar` */
  navigationBar: React.ReactNode;
  /** Правая панель (отображается только при `size="s"`) */
  rightPanel?: React.ReactNode;
  /** Основной контент страницы */
  children: React.ReactNode;
  /** Высота фиксированного хедера над PageLayout (например MainPageNavigationBar = 74).
   *  Сдвигает sticky/fixed-элементы вниз и корректирует min-height.
   * @default 0 */
  topOffset?: number;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Базовый макет страницы с навигационной панелью и опциональной правой панелью.
 * Используется как корневая обёртка для стандартных страниц приложения.
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  size,
  navigationBar,
  rightPanel,
  children,
  topOffset = 0,
  className = '',
}) => {
  const hasRightPanel = size === 's' && Boolean(rightPanel);

  const rootClassName = [
    'page-layout',
    `page-layout--${size}`,
    hasRightPanel ? 'page-layout--has-right-panel' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={rootClassName}
      style={topOffset ? ({ '--page-layout-top-offset': `${topOffset}px` } as React.CSSProperties) : undefined}
    >
      <div className="page-layout__nav">
        {navigationBar}
      </div>
      <div className="page-layout__content-wrapper">
        <div className="page-layout__content">
          {children}
        </div>
      </div>
      {hasRightPanel && (
        <div className="page-layout__right-panel">
          {rightPanel}
        </div>
      )}
    </div>
  );
};
