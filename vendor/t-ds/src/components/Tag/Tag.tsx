import React from 'react';
import './tag.css';

interface TagProps {
  /** Текст метки */
  children: React.ReactNode;
  /** Форма: скруглённая или квадратная
   * @default "square" */
  shape?: 'circle' | 'square';
  /** Стиль: заливка или обводка
   * @default "filled" */
  variant?: 'filled' | 'outlined';
  /** Размер метки
   * @default "s" */
  size?: 'xl' | 'l' | 'm' | 's';
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Компонент, показывающий статус чего-либо или метку.
 */
export const Tag: React.FC<TagProps> = ({
    children,
    shape = 'square',
    variant = 'filled',
    size = 's',
    className = '',
}) => {
    const getLabelSize = (tagSize: string) => {
        const sizeMap: Record<string, string> = {
            'xl': 'm',
            'l': 's',
            'm': 'xs',
            's': 'xxs',
        };
        return sizeMap[tagSize] || 'xxs';
    };

    const classNames = [
        'tag',
        `tag--${shape}`,
        variant === 'outlined' && `tag--outlined`,
        `tag--${size}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classNames}>
            <span className={`tag__label ts-500-${getLabelSize(size)}`}>{children}</span>
        </div>
    );
};
