import React from 'react';
import './drawer-header-title.css';

interface DrawerHeaderTitleProps {
  /** Текст заголовка */
  children: React.ReactNode;
  /** Размер текста
   * @default "text-m" */
  variant?: 'text-m' | 'text-l';
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

const variantTsClassMap: Record<NonNullable<DrawerHeaderTitleProps['variant']>, string> = {
  'text-m': 'ts-500-m',
  'text-l': 'ts-500-l',
};

/**
 * Компонент заголовка для шапки `Drawer`.
 * Поддерживает два визуальных размера.
 */
export const DrawerHeaderTitle: React.FC<DrawerHeaderTitleProps> = ({
  children,
  variant = 'text-m',
  className = '',
}) => {
  const classNames = [
    'drawer-header-title',
    `drawer-header-title--${variant}`,
    variantTsClassMap[variant],
    className,
  ].filter(Boolean).join(' ');

  return <div className={classNames}>{children}</div>;
};
