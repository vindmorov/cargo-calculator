import React from 'react';
import { Circle } from '../../icons';
import { Avatar } from '../Avatar/Avatar';
import './promo-page-card.css';

export interface PromoPageCardProps {
  /** Заголовок карточки
   * @default "Text XL" */
  title?: React.ReactNode;
  /** Описание под заголовком
   * @default "Text M" */
  description?: React.ReactNode;
  /** Произвольный аватар (по умолчанию — иконка с брендовым фоном) */
  avatar?: React.ReactNode;
  /** Произвольный элемент-изображение */
  image?: React.ReactNode;
  /** URL изображения (имеет приоритет над `image`) */
  imageSrc?: string;
  /** Alt-текст изображения
   * @default "" */
  imageAlt?: string;
  /** Показывает аватар
   * @default true */
  hasAvatar?: boolean;
  /** Показывает изображение
   * @default true */
  hasImage?: boolean;
  /** Показывает описание
   * @default true */
  hasDescription?: boolean;
  /** Горизонтальная компоновка: аватар и текст в ряд, изображение скрыто
   * @default false */
  isHorizontal?: boolean;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

const DefaultAvatar = () => (
  <Avatar
    size="m"
    shape="circle"
    icon={<Circle />}
    style={{
      '--avatar-size': '44px',
      '--avatar-content-size': '20px',
      '--avatar-surface': 'var(--bg-brand)',
      '--avatar-color': 'var(--primitive-default)',
    } as React.CSSProperties}
  />
);

const DefaultImage = () => (
  <span className="promo-page-card__default-image" aria-hidden="true" />
);

/**
 * Карточка для контентного наполнения промо-страниц, онбордингов и других контекстных страниц банка.
 * Предназначена для структурированного представления ключевой информации, преимуществ продукта или этапов процесса.
 */
export const PromoPageCard: React.FC<PromoPageCardProps> = ({
  title = 'Text XL',
  description = 'Text M',
  avatar,
  image,
  imageSrc,
  imageAlt = '',
  hasAvatar = true,
  hasImage = true,
  hasDescription = true,
  isHorizontal = false,
  className = '',
}) => {
  const classNames = [
    'promo-page-card',
    isHorizontal && 'promo-page-card--horizontal',
    !hasImage && 'promo-page-card--without-image',
    className,
  ].filter(Boolean).join(' ');

  const imageContent = imageSrc
    ? <img className="promo-page-card__image-img" src={imageSrc} alt={imageAlt} />
    : image || <DefaultImage />;

  return (
    <article className={classNames}>
      <div className="promo-page-card__content">
        {hasAvatar && (
          <div className="promo-page-card__avatar">
            {avatar || <DefaultAvatar />}
          </div>
        )}
        <div className="promo-page-card__text">
          <h3 className="promo-page-card__title ts-600-xl">{title}</h3>
          {hasDescription && description && (
            <p className="promo-page-card__description ts-500-m">{description}</p>
          )}
        </div>
      </div>
      {hasImage && !isHorizontal && (
        <div className="promo-page-card__image">
          {imageContent}
        </div>
      )}
    </article>
  );
};
