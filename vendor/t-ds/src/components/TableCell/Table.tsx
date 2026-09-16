import React from 'react';
import './table.css';

export interface ColumnDef {
  /** Режим определения ширины */
  mode: 'fixed' | 'content' | 'fluid';
  /** Фиксированная ширина в пикселях. Используется при mode: 'fixed'. */
  width?: number;
  /** Минимальная ширина колонки в пикселях */
  minWidth?: number;
  /** Максимальная ширина колонки в пикселях */
  maxWidth?: number;
}

export interface TableProps {
  children: React.ReactNode;
  /** Число колонок (→ repeat(n, 1fr)) или массив дефиниций колонок. @default 1 */
  columns?: number | ColumnDef[];
  /** CSS grid-template-columns (переопределяет columns) */
  gridTemplateColumns?: string;
  className?: string;
}

function buildColumnTrack(col: ColumnDef): string {
  const { mode, width, minWidth, maxWidth } = col;

  if (mode === 'fixed') {
    const base = width ?? 0;
    const min = minWidth !== undefined ? Math.max(base, minWidth) : base;
    const max = maxWidth !== undefined ? Math.min(base, maxWidth) : base;
    const resolved = Math.max(min, max);
    return resolved === 0 ? 'auto' : `${resolved}px`;
  }

  if (mode === 'content') {
    if (minWidth !== undefined && maxWidth !== undefined) return `minmax(${minWidth}px, ${maxWidth}px)`;
    if (minWidth !== undefined) return `minmax(${minWidth}px, auto)`;
    if (maxWidth !== undefined) return `minmax(0, ${maxWidth}px)`;
    return 'auto';
  }

  // fluid
  if (minWidth !== undefined && maxWidth !== undefined) return `minmax(${minWidth}px, ${maxWidth}px)`;
  if (minWidth !== undefined) return `minmax(${minWidth}px, 1fr)`;
  if (maxWidth !== undefined) return `minmax(0, ${maxWidth}px)`;
  return '1fr';
}

function buildGridTemplate(columns: number | ColumnDef[]): string {
  if (typeof columns === 'number') return `repeat(${columns}, 1fr)`;
  return columns.map(buildColumnTrack).join(' ');
}

export const Table: React.FC<TableProps> = ({
  children,
  columns = 1,
  gridTemplateColumns,
  className = '',
}) => {
  const style: React.CSSProperties = {
    gridTemplateColumns: gridTemplateColumns ?? buildGridTemplate(columns),
  };

  return (
    <div
      className={['table', className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </div>
  );
};
