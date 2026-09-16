import React from 'react';
import { BREAKPOINT_TABLET } from '../../breakpoints';
import { useIsMobile } from '../../hooks/useIsMobile';

export interface PromoPageTitleProps {
  /** Текст заголовка
   * @default "Text 5XL" */
  children?: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Заголовок промо-страницы: 5XL на desktop и 3XL на адаптиве до 1023px включительно.
 */
export const PromoPageTitle: React.FC<PromoPageTitleProps> = ({
  children = 'Text 5XL',
  className = '',
}) => {
  const isMobile = useIsMobile(BREAKPOINT_TABLET);
  const titleClassName = [
    'promo-page-title',
    isMobile ? 'ts-600-3xl' : 'ts-600-5xl',
    className,
  ].filter(Boolean).join(' ');

  return <h2 className={titleClassName}>{children}</h2>;
};
