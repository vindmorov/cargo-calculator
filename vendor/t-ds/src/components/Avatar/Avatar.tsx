import React from 'react';
import './avatar.css';

interface AvatarProps {
  /** Текст внутри аватара (инициалы). Отображается если не передан `imageUrl` и `icon` */
  label?: string;
  /** URL изображения. При наличии имеет наивысший приоритет отображения */
  imageUrl?: string;
  /** Иконка внутри аватара. Отображается если не передан `imageUrl` */
  icon?: React.ReactNode;
  /** Размер аватара
   * @default "m" */
  size?: '2xl' | 'xl' | 'l' | 'm' | 's' | 'xs' | '2xs' | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 120;
  /** Форма аватара
   * @default "superellipse" */
  shape?: 'circle' | 'superellipse' | 'square';
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Инлайн-стили */
  style?: React.CSSProperties;
}

const labelClassBySize: Record<NonNullable<AvatarProps['size']>, string> = {
    '2xl': 'ts-600-4xl',
    xl: 'ts-600-2xl',
    l: 'ts-600-l',
    m: 'ts-600-m',
    s: 'ts-600-xs',
    xs: 'ts-600-xxs',
    '2xs': 'ts-600-xxs',
    16: 'ts-600-xxs',
    24: 'ts-600-xxs',
    32: 'ts-600-xs',
    40: 'ts-600-m',
    48: 'ts-600-m',
    56: 'ts-600-l',
    64: 'ts-600-l',
    72: 'ts-600-2xl',
    80: 'ts-600-2xl',
    120: 'ts-600-4xl',
};

/**
 * Аватар — контейнер с изображением, иконкой или текстом.
 * Обычно показывает логотип компании, фотографию человека, инициалы, обложку проекта или сервиса.
 * Используется в списках, шапках, ячейках и аксессуарах.
 */
export const Avatar: React.FC<AvatarProps> = ({
    label,
    imageUrl,
    icon,
    size = 'm',
    shape = 'superellipse',
    className = '',
    style,
}) => {
    const sizeClass = `avatar--${size}`;

    const classNames = [
        'avatar',
        sizeClass,
        `avatar--${shape}`,
        imageUrl && 'avatar--image',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classNames} style={style}>
            {imageUrl ? (
                <img src={imageUrl} alt={label || 'Avatar'} className="avatar__image" />
            ) : icon ? (
                <span className="ds-icon avatar__icon">{icon}</span>
            ) : (
                <span className={`avatar__label ${labelClassBySize[size]}`}>{label}</span>
            )}
        </div>
    );
};
