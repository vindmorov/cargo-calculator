import React from 'react';
import './linear-progress.css';

interface LinearProgressProps {
  /** Режим отображения: непрерывный прогресс в % или дискретные шаги
   * @default "percent" */
  variant?: 'percent' | 'steps';
  /** Текущее значение прогресса. В режиме `percent` — от 0 до 100, в режиме `steps` — количество выполненных шагов */
  value: number;
  /** Общее количество шагов (только для `steps`)
   * @default 5 */
  maxSteps?: number;
  /** Цвет заполненной части
   * @default "var(--bg-brand)" */
  progressColor?: string;
  /** Цвет фоновой дорожки
   * @default "var(--container-transparent-2)" */
  trackColor?: string;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Aria-метка для доступности */
  ariaLabel?: string;
}

/**
 * Компонент для отображения информации о продолжительности и ходе процесса.
 * Например, шаги заполнения формы, процесс загрузки или лимиты.
 */
export const LinearProgress: React.FC<LinearProgressProps> = ({
  variant = 'percent',
  value,
  maxSteps = 5,
  progressColor = 'var(--bg-brand)',
  trackColor = 'var(--container-transparent-2)',
  className = '',
  ariaLabel,
}) => {
  const isSteps = variant === 'steps';
  const normalizedSteps = Math.max(1, Math.floor(maxSteps));
  const clampedStepValue = Math.max(0, Math.min(Math.floor(value), normalizedSteps));

  let percentage = 0;
  if (isSteps) {
    percentage = Math.max(0, Math.min((clampedStepValue / normalizedSteps) * 100, 100));
  } else {
    percentage = Math.max(0, Math.min(value, 100));
  }

  return (
    <div
      className={`ds-linear-progress ${className}`}
      role="progressbar"
      aria-valuenow={isSteps ? clampedStepValue : Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={isSteps ? normalizedSteps : 100}
      aria-label={ariaLabel || (isSteps ? `Progress: ${clampedStepValue} of ${normalizedSteps} steps` : `Progress: ${Math.round(percentage)}%`)}
    >
      {isSteps ? (
        <div className="ds-linear-progress__steps" aria-hidden="true">
          {Array.from({ length: normalizedSteps }, (_, index) => (
            <div
              key={index}
              className="ds-linear-progress__step"
              style={{
                backgroundColor: index < clampedStepValue ? progressColor : trackColor,
              }}
            />
          ))}
        </div>
      ) : (
        <>
          <div
            className="ds-linear-progress__track"
            style={{ backgroundColor: trackColor }}
          />
          <div
            className="ds-linear-progress__fill"
            style={{
              width: `${percentage}%`,
              backgroundColor: progressColor
            }}
          />
        </>
      )}
    </div>
  );
};
