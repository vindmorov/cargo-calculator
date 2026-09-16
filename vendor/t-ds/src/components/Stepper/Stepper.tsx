import React from 'react';
import './stepper.css';
import { Minus, Plus } from '../../assets/Icon/icons';

export interface StepperProps {
  /** Текущее значение (controlled) */
  value: number;
  /** Коллбэк при изменении значения */
  onChange: (next: number) => void;
  /** Минимальное значение
   * @default 0 */
  min?: number;
  /** Максимальное значение
   * @default 999 */
  max?: number;
  /** Шаг изменения
   * @default 1 */
  step?: number;
  /** Размер компонента
   * @default "s" */
  size?: 's' | 'm';
  /** Блокирует изменение значения
   * @default false? */
  disabled?: boolean;
  /** Только чтение — отображает значение без возможности изменения
   * @default false */
  readonly?: boolean;
  /** Дополнительный CSS-класс */
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  size = 's',
  disabled = false,
  readonly = false,
  className = '',
}) => {
  const rootClass = [
    'ds-stepper',
    `ds-stepper--${size}`,
    disabled ? 'ds-stepper--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const isFullyDisabled = disabled || readonly;
  const isAtMin = value <= min;
  const isAtMax = value >= max;

  const btnClass = (atLimit: boolean) =>
    ['ds-stepper__button', !isFullyDisabled && !atLimit ? 'hoverOpacity' : '', !isFullyDisabled && atLimit ? 'ds-stepper__button--limit' : '']
      .filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <button
        type="button"
        className={btnClass(isAtMin)}
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={isFullyDisabled || isAtMin}
        aria-label="Уменьшить"
      >
        <Minus />
      </button>
      <span className="ds-stepper__value ts-500-m">{value}</span>
      <button
        type="button"
        className={btnClass(isAtMax)}
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={isFullyDisabled || isAtMax}
        aria-label="Увеличить"
      >
        <Plus />
      </button>
    </div>
  );
};
