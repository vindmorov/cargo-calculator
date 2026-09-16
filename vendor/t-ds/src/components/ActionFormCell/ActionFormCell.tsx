import React from 'react';
import './action-form-cell.css';

interface ActionFormCellProps {
  /** Основной текст ячейки */
  title: string;
  /** Дополнительный текст под заголовком */
  description?: string;
  /** Левый аксессуар (иконка 24px) */
  left?: React.ReactNode;
  /** Правый аксессуар (спиннер) */
  right?: React.ReactNode;
  /** Расположение ячейки: отдельная или позиция в группе
   * @default "single" */
  variant?: 'single' | 'stack-top' | 'stack-middle' | 'stack-bottom';
  /** Колбэк по клику */
  onClick?: () => void;
  /** Блокирует ячейку
   * @default false */
  isDisabled?: boolean;
}

/**
 * Интерактивный элемент действия для форм и списков.
 * Используется как самостоятельный элемент или в сгруппированном стеке.
 */
export const ActionFormCell: React.FC<ActionFormCellProps> = ({
    title,
    description,
    left,
    right,
    variant = 'single',
    onClick,
    isDisabled = false,
}) => {
    const classNames = [
        'action-form-cell',
        `action-form-cell--${variant}`,
        !description ? 'action-form-cell--single-line' : '',
        !right ? 'action-form-cell--no-spinner' : '',
        isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');

    return (
        <button className={classNames} type="button" onClick={onClick} disabled={isDisabled}>
            <div className="action-form-cell__content">
                <div className="action-form-cell__main">
                    {left && <div className="action-form-cell__left">{left}</div>}
                    <div className={`action-form-cell__text ${description ? 'action-form-cell__text--dual' : ''}`}>
                        <p className="action-form-cell__title ts-500-m">{title}</p>
                        {description && <p className="action-form-cell__description ts-400-s">{description}</p>}
                    </div>
                </div>
                {right && <div className="action-form-cell__right">{right}</div>}
            </div>
        </button>
    );
};
