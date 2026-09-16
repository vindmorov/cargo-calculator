import React, { useRef, useEffect } from 'react';
import { QuestionCircle } from '../../assets/Icon/icons';
import { Tooltip } from '../Tooltip/Tooltip';
import './text-area.css';

interface TextAreaProps {
  /** Подпись над полем */
  label?: string;
  /** Вспомогательный текст под полем */
  description?: string;
  /** Текст ошибки (заменяет `description` при `isError=true`) */
  errorMessage?: string;
  /** Текст-заглушка при пустом поле */
  placeholder?: string;
  /** Управляемое значение
   * @default "" */
  value?: string;
  /** Колбэк при изменении значения */
  onChange?: (value: string) => void;
  /** Блокирует поле
   * @default false */
  isDisabled?: boolean;
  /** Переводит поле в состояние ошибки
   * @default false */
  isError?: boolean;
  /** Максимальное количество символов; включает счётчик над полем */
  maxLength?: number;
  /** Показывает иконку-подсказку рядом с подписью
   * @default false */
  hasHelpIcon?: boolean;
  /** Текст тултипа при наведении на иконку-подсказку */
  helpText?: React.ReactNode;
}

/**
 * Многострочное поле ввода с автоматическим расширением.
 * Поддерживает подпись, подсказку, счётчик символов и состояние ошибки.
 */
export const TextArea: React.FC<TextAreaProps> = ({
    label,
    description,
    errorMessage,
    placeholder,
    value = '',
    onChange,
    isDisabled = false,
    isError = false,
    maxLength,
    hasHelpIcon = false,
    helpText,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const metaText = isError ? errorMessage ?? description : description;

    const autoResize = () => {
        const field = textareaRef.current;
        if (!field) return;
        field.style.height = 'auto';
        field.style.height = `${field.scrollHeight}px`;
    };

    useEffect(() => {
        autoResize();
    }, [value]);

    const classNames = [
        'text-area',
        isDisabled ? 'text-area--disabled' : '',
        isError ? 'text-area--error' : '',
    ].filter(Boolean).join(' ');

    return (
        <label className={classNames}>
            <div className="text-area__content">
                <div className="text-area__main">
                    <div className="text-area__header">
                        <div className="text-area__header-main">
                            {label && <p className="text-area__title ts-500-s">{label}</p>}
                            {label && hasHelpIcon && (helpText
                                ? <Tooltip trigger={
                                    <span className="text-area__help ds-icon" aria-hidden="true">
                                        <QuestionCircle />
                                    </span>
                                  }>{helpText}</Tooltip>
                                : <span className="text-area__help ds-icon hoverOpacity" aria-hidden="true">
                                    <QuestionCircle />
                                  </span>
                            )}
                        </div>
                        {maxLength && (
                            <p className="text-area__counter ts-400-xs">
                                {value.length}/{maxLength}
                            </p>
                        )}
                    </div>
                    <textarea
                        ref={textareaRef}
                        className="text-area__field ts-400-m"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        disabled={isDisabled}
                        maxLength={maxLength}
                    />
                </div>
            </div>
            {metaText && (
                <div className="text-area__meta">
                    <div className="text-area__divider"></div>
                    <p className="text-area__description ts-400-s">{metaText}</p>
                </div>
            )}
        </label>
    );
};
