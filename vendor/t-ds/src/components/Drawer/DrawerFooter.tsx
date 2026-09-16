import React from 'react';
import './drawer-footer.css';
import { Button } from '../Button/Button';

export type DrawerFooterLayout = '1-button' | '2-buttons' | '2-horizontal-buttons' | 'empty';

interface DrawerFooterAction {
  /** Текст кнопки */
  label: string;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Блокирует кнопку */
  isDisabled?: boolean;
  /** Показывает спиннер */
  isLoading?: boolean;
  /** Использует вариант `primary` вместо `secondary` */
  isSelected?: boolean;
}

interface DrawerFooterProps {
  /** Расположение кнопок в подвале
   * @default "1-button" */
  layout?: DrawerFooterLayout;
  /** Текст над кнопками */
  description?: React.ReactNode;
  /** Основная кнопка */
  primaryAction?: DrawerFooterAction;
  /** Вторичная кнопка (только для `2-buttons` и `2-horizontal-buttons`) */
  secondaryAction?: DrawerFooterAction;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Подвал `Drawer` с кнопками действий.
 * Поддерживает различные раскладки: одна кнопка, две вертикально или горизонтально.
 */
export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  layout = '1-button',
  description,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  if (layout === 'empty') {
    return <div className={['drawer-footer', 'drawer-footer--empty', className].filter(Boolean).join(' ')} />;
  }

  const rootClassName = [
    'drawer-footer',
    layout === '2-horizontal-buttons' ? 'drawer-footer--row' : 'drawer-footer--column',
    className,
  ].filter(Boolean).join(' ');

  const buttonsClassName = [
    'drawer-footer__buttons',
    layout === '2-horizontal-buttons' ? 'drawer-footer__buttons--row' : 'drawer-footer__buttons--column',
  ].join(' ');

  return (
    <div className={rootClassName}>
      {description && <div className="drawer-footer__description ts-400-s">{description}</div>}

      <div className={buttonsClassName}>
        {secondaryAction && layout !== '1-button' && (
          <Button
            variant={secondaryAction.isSelected ? 'primary' : 'secondary'}
            isDisabled={secondaryAction.isDisabled}
            isLoading={secondaryAction.isLoading}
            onClick={secondaryAction.onClick}
            className="drawer-footer__button"
          >
            {secondaryAction.label}
          </Button>
        )}

        {primaryAction && (
          <Button
            variant={primaryAction.isSelected ? 'primary' : 'secondary'}
            isDisabled={primaryAction.isDisabled}
            isLoading={primaryAction.isLoading}
            onClick={primaryAction.onClick}
            className="drawer-footer__button"
          >
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};
