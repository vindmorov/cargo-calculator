import React from 'react';
import './modal-footer.css';
import { Button } from '../Button/Button';

export type ModalFooterLayout = '1-button' | '2-buttons' | '2-horizontal-buttons' | 'empty';

interface ModalFooterAction {
  /** Текст кнопки */
  label: string;
  /** Колбэк по клику */
  onClick?: () => void;
  /** Блокирует кнопку */
  isDisabled?: boolean;
  /** Показывает спиннер */
  isLoading?: boolean;
  /** Отображает кнопку как `primary` */
  isSelected?: boolean;
}

interface ModalFooterProps {
  /** Компоновка кнопок: одна, две вертикально, две горизонтально или пустой подвал
   * @default "1-button" */
  layout?: ModalFooterLayout;
  /** Вспомогательный текст над кнопками */
  description?: React.ReactNode;
  /** Основная кнопка */
  primaryAction?: ModalFooterAction;
  /** Вторичная кнопка (для `2-buttons` и `2-horizontal-buttons`) */
  secondaryAction?: ModalFooterAction;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Подвал `Modal` с кнопками действий.
 * Поддерживает различные раскладки: одна кнопка, две вертикально или горизонтально.
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  layout = '1-button',
  description,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  if (layout === 'empty') {
    return <div className={['modal-footer', 'modal-footer--empty', className].filter(Boolean).join(' ')} />;
  }

  const rootClassName = [
    'modal-footer',
    layout === '2-horizontal-buttons' ? 'modal-footer--row' : 'modal-footer--column',
    className,
  ].filter(Boolean).join(' ');

  const buttonsClassName = [
    'modal-footer__buttons',
    layout === '2-horizontal-buttons' ? 'modal-footer__buttons--row' : 'modal-footer__buttons--column',
  ].join(' ');

  return (
    <div className={rootClassName}>
      {description && <div className="modal-footer__description ts-400-s">{description}</div>}

      <div className={buttonsClassName}>
        {secondaryAction && layout !== '1-button' && (
          <Button
            variant={secondaryAction.isSelected ? 'primary' : 'secondary'}
            isDisabled={secondaryAction.isDisabled}
            isLoading={secondaryAction.isLoading}
            onClick={secondaryAction.onClick}
            className="modal-footer__button"
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
            className="modal-footer__button"
          >
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};
