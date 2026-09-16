import React from 'react';
import './form-cell.css';

interface FormCellProps {
  /** Дополнительный контент под ячейкой */
  children?: React.ReactNode;
  /** Основной текст ячейки */
  title: string;
  /** Подзаголовок, отображается перед основным текстом */
  subtitle?: string;
  /** Дополнительное описание под основным текстом */
  description?: string;
  /** Левый слот (например Avatar) */
  left?: React.ReactNode;
  /** Правый слот для управляющего элемента (Switch, Checkbox, Radio) */
  right?: React.ReactNode;
  /** Тип отображения ячейки: отдельная или позиция в группе
   * @default "single" */
  variant?: 'single' | 'stack-top' | 'stack-middle' | 'stack-bottom';
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Интерактивный элемент для использования свитчера, чекбоксов и радио на странице с формой.
 */
export const FormCell: React.FC<FormCellProps> = ({
    children,
    title,
    subtitle,
    description,
    left,
    right,
    variant = 'single',
    className = '',
}) => {
    const classNames = [
        'form-cell',
        `form-cell--${variant}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classNames}>
            <div className="form-cell__content">
                <div className="form-cell__main">
                    {left && <div className="form-cell__left">{left}</div>}
                    <div className={`form-cell__text ${(subtitle || description) ? 'form-cell__text--dual' : ''}`}>
                        {subtitle && <p className="form-cell__subtitle ts-400-s">{subtitle}</p>}
                        <p className="form-cell__title ts-400-m">{title}</p>
                        {description && <p className="form-cell__description ts-400-s">{description}</p>}
                    </div>
                </div>
                {right && (
                    <div className="form-cell__right">
                        <div className="form-cell__control">
                            {right}
                        </div>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};
