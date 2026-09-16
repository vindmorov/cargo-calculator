import React from 'react';
import { Button } from '../Button/Button';
import './promo-page-horizontal-card.css';

export type PromoPageHorizontalCardVariant = 'default' | 'accent';

export interface PromoPageHorizontalCardProps {
  /** Заголовок карточки
   * @default "Text 2XL" */
  title?: React.ReactNode;
  /** Описание под заголовком
   * @default "Text L" */
  description?: React.ReactNode;
  /** Текст кнопки действия (только для варианта `accent`)
   * @default "Text M" */
  buttonLabel?: React.ReactNode;
  /** Произвольный элемент-изображение */
  image?: React.ReactNode;
  /** URL изображения (имеет приоритет над `image`) */
  imageSrc?: string;
  /** Alt-текст изображения
   * @default "" */
  imageAlt?: string;
  /** Визуальный стиль: стандартный или акцентный с кнопкой
   * @default "default" */
  variant?: PromoPageHorizontalCardVariant;
  /** Показывает описание
   * @default true */
  hasDescription?: boolean;
  /** Показывает кнопку (только в варианте `accent`)
   * @default true */
  hasButton?: boolean;
  /** Управляет вылетом изображения за границы карточки
   * @default "hidden" */
  imageOverflow?: 'hidden' | 'visible';
  /** Способ вписывания изображения
   * @default "cover" */
  imageObjectFit?: 'contain' | 'cover';
  /** Позиция изображения внутри блока */
  imageObjectPosition?: string;
  /** Колбэк при нажатии на кнопку */
  onButtonClick?: () => void;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

const DefaultImage = () => (
  <span className="promo-page-horizontal-card__default-image" aria-hidden="true" />
);

/**
 * Горизонтальная карточка, занимающая всю ширину контентной области.
 * Предназначена для эффектного представления информации на промо-страницах, сочетая
 * текстовое описание с крупным визуальным акцентом в виде изображения.
 */
export const PromoPageHorizontalCard: React.FC<PromoPageHorizontalCardProps> = ({
  title = 'Text 2XL',
  description = 'Text L',
  buttonLabel = 'Text M',
  image,
  imageSrc,
  imageAlt = '',
  variant = 'default',
  hasDescription = true,
  hasButton = true,
  imageOverflow = 'hidden',
  imageObjectFit = 'cover',
  imageObjectPosition,
  onButtonClick,
  className = '',
}) => {
  const isAccent = variant === 'accent';
  const classNames = [
    'promo-page-horizontal-card',
    isAccent && 'promo-page-horizontal-card--accent',
    imageOverflow === 'visible' && 'promo-page-horizontal-card--image-overflow-visible',
    className,
  ].filter(Boolean).join(' ');

  const imageContent = imageSrc
    ? (
      <img
        className="promo-page-horizontal-card__image-img"
        src={imageSrc}
        alt={imageAlt}
        style={{ objectFit: imageObjectFit, objectPosition: imageObjectPosition }}
      />
    )
    : image || <DefaultImage />;

  return (
    <article className={classNames}>
      <div className="promo-page-horizontal-card__content">
        <div className="promo-page-horizontal-card__text">
          <h3 className="promo-page-horizontal-card__title ts-600-2xl">{title}</h3>
          {hasDescription && description && (
            <p className="promo-page-horizontal-card__description ts-500-l">{description}</p>
          )}
        </div>
        {isAccent && hasButton && (
          <Button
            className="promo-page-horizontal-card__button"
            variant="primary"
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
      <div className="promo-page-horizontal-card__image">
        {imageContent}
      </div>
    </article>
  );
};
