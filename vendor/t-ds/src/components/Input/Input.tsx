import React from 'react';
import { QuestionCircle } from '../../assets/Icon/icons';
import { Tooltip } from '../Tooltip/Tooltip';
import { NumericInput } from './NumericInput';
import { PhoneNumberInput } from './PhoneNumberInput';
import './input.css';

export type InputVariant = 'default' | 'white';

export interface InputProps {
  /** Подпись над полем */
  label?: string;
  /** Вспомогательный текст под полем */
  description?: string;
  /** Текст ошибки (заменяет `description` при `isError=true`) */
  errorMessage?: string;
  /** Текст-заглушка при пустом поле */
  placeholder?: string;
  /** Тип нативного поля ввода. Не применяется вместе с `format`
   * @default 'text' */
  type?: 'text' | 'password' | 'email' | 'tel' | 'url';
  /** Цветовая тема поверхности поля
   * @default 'default' */
  variant?: InputVariant;
  /** Управляемое значение. Если передан — компонент переходит в controlled mode */
  value?: string | number | null;
  /** Колбэк при изменении строкового значения (без format) */
  onChange?: (value: string) => void;
  /** Блокирует поле
   * @default false */
  isDisabled?: boolean;
  /** Переводит поле в состояние ошибки
   * @default false */
  isError?: boolean;
  /** Произвольный элемент слева от поля ввода */
  left?: React.ReactNode;
  /** Произвольный элемент справа от поля ввода */
  right?: React.ReactNode;
  /** Показывает иконку-подсказку рядом с подписью
   * @default false */
  hasHelpIcon?: boolean;
  /** Текст тултипа при наведении на иконку-подсказку */
  helpText?: React.ReactNode;
  /** Включает числовой режим с форматированием, либо маску телефона (+7) */
  format?: 'number' | 'currency' | 'percent' | 'phone';
  /** Суффикс (переопределяет дефолт формата) */
  suffix?: string;
  /** Количество знаков после запятой (переопределяет дефолт формата) */
  decimalScale?: number;
  /** Разрешить отрицательные числа
   * @default false */
  allowNegative?: boolean;
  /** Колбэк с числовым значением без суффикса (только при format) */
  onValueChange?: (value: number | null) => void;
}

const FORMAT_DEFAULTS: Record<string, { suffix?: string; decimalScale: number }> = {
  number: { decimalScale: 0 },
  currency: { suffix: ' ₽', decimalScale: 2 },
  percent: { suffix: ' %', decimalScale: 2 },
};

/**
 * Текстовое поле ввода с поддержкой подписи, подсказки, сообщения об ошибке и боковых аксессуаров.
 */
export const Input: React.FC<InputProps> = ({
    label,
    description,
    errorMessage,
    placeholder,
    type = 'text',
    variant = 'default',
    value,
    onChange,
    isDisabled = false,
    isError = false,
    left,
    right,
    hasHelpIcon = false,
    helpText,
    format,
    suffix,
    decimalScale,
    allowNegative = false,
    onValueChange,
}) => {
    const metaText = isError ? errorMessage ?? description : description;

    const resolvedSuffix = suffix ?? (format && format !== 'phone' ? FORMAT_DEFAULTS[format].suffix : undefined);
    const resolvedDecimalScale = decimalScale ?? (format && format !== 'phone' ? FORMAT_DEFAULTS[format].decimalScale : 0);

    const classNames = [
        'input',
        `input--${variant}`,
        isDisabled ? 'input--disabled' : '',
        isError ? 'input--error' : '',
    ].filter(Boolean).join(' ');

    return (
        <label className={classNames}>
            <div className="input__content">
                {left && <div className="input__accessory">{left}</div>}
                <div className="input__main">
                    {label && (
                        <div className="input__header">
                            <p className="input__title ts-500-s">{label}</p>
                            {hasHelpIcon && (helpText
                                ? <span onClick={e => e.stopPropagation()} onMouseDown={e => e.preventDefault()}>
                                    <Tooltip title={label} trigger={
                                      <span className="input__help ds-icon" aria-hidden="true">
                                          <QuestionCircle />
                                      </span>
                                    }>{helpText}</Tooltip>
                                  </span>
                                : <span className="input__help ds-icon hoverOpacity" aria-hidden="true">
                                    <QuestionCircle />
                                  </span>
                            )}
                        </div>
                    )}
                    {format === 'phone' ? (
                        <PhoneNumberInput
                            className="input__field ts-400-m"
                            value={value as string | null | undefined}
                            onChange={onChange}
                            placeholder={placeholder}
                            disabled={isDisabled}
                        />
                    ) : format ? (
                        <NumericInput
                            className="input__field ts-400-m"
                            value={value as number | null | undefined}
                            onValueChange={onValueChange}
                            suffix={resolvedSuffix}
                            decimalScale={resolvedDecimalScale}
                            allowNegative={allowNegative}
                            placeholder={placeholder}
                            disabled={isDisabled}
                        />
                    ) : (
                        <input
                            className="input__field ts-400-m"
                            type={type}
                            placeholder={placeholder}
                            value={value as string | undefined}
                            onChange={(e) => onChange?.(e.target.value)}
                            disabled={isDisabled}
                        />
                    )}
                </div>
                {right && <div className="input__accessory">{right}</div>}
            </div>
            {metaText && (
                <div className="input__meta">
                    <div className="input__divider"></div>
                    <p className="input__description ts-400-s">{metaText}</p>
                </div>
            )}
        </label>
    );
};
