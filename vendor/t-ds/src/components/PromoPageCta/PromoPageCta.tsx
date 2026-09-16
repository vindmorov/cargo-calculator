import React from 'react';
import { Button } from '../Button/Button';
import { PromoPageTitle } from '../PromoPageTitle/PromoPageTitle';
import './promo-page-cta.css';

export type PromoPageCtaVariant = 'form' | 'content';

export interface PromoPageCtaAction {
  label: React.ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export interface PromoPageCtaProps {
  /** Заголовок левой части блока, рендерится через `PromoPageTitle` */
  title?: React.ReactNode;
  /** Описание левой части блока */
  description?: React.ReactNode;
  /** Вариант правой части: поля или текст с кнопкой
   * @default "form" */
  variant?: PromoPageCtaVariant;
  /** Поля и кнопка формы для варианта `form` */
  children?: React.ReactNode;
  /** Текстовый контент правой части для варианта `content` */
  content?: React.ReactNode;
  /** Кнопка правой части для варианта `content` */
  action?: PromoPageCtaAction;
  /** Контент успешного состояния вместо формы
   * @default false */
  isSuccess?: boolean;
  /** Заголовок успешного состояния
   * @default "Получили вашу заявку" */
  successTitle?: React.ReactNode;
  /** Описание успешного состояния
   * @default "Перезвоним в течение рабочего дня, чтобы уточнить все детали" */
  successDescription?: React.ReactNode;
  /** Кнопка успешного состояния */
  successAction?: PromoPageCtaAction;
  /** Произвольное изображение успешного состояния */
  successImage?: React.ReactNode;
  /** URL изображения успешного состояния, имеет приоритет над `successImage` */
  successImageSrc?: string;
  /** Alt-текст изображения успешного состояния
   * @default "" */
  successImageAlt?: string;
  /** Дополнительный контент успешного состояния */
  successContent?: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * CTA-блок промо-страницы с текстом слева и формой или действием справа.
 * Компонент управляет только компоновкой; состояние и бизнес-логика передаются через props.
 */
export const PromoPageCta: React.FC<PromoPageCtaProps> = ({
  title = 'Text 5XL',
  description = 'Text L',
  variant = 'form',
  children,
  content,
  action,
  isSuccess = false,
  successTitle = 'Получили вашу заявку',
  successDescription = 'Перезвоним в течение рабочего дня, чтобы уточнить все детали',
  successAction,
  successImage,
  successImageSrc,
  successImageAlt = '',
  successContent,
  className = '',
}) => {
  const classNames = [
    'promo-page-cta',
    `promo-page-cta--${variant}`,
    isSuccess && 'promo-page-cta--success',
    className,
  ].filter(Boolean).join(' ');

  if (isSuccess) {
    const successImageContent = successImageSrc
      ? <img className="promo-page-cta__success-image-img" src={successImageSrc} alt={successImageAlt} />
      : successImage;

    return (
      <section className={classNames}>
        <div className="promo-page-cta__success-content">
          <div className="promo-page-cta__success-text">
            <h2 className="promo-page-cta__title ts-600-5xl">{successTitle}</h2>
            {successDescription && (
              <p className="promo-page-cta__description ts-500-l">{successDescription}</p>
            )}
            {successContent && <div className="promo-page-cta__success-extra">{successContent}</div>}
          </div>
          {successAction && (
            <Button
              className="promo-page-cta__success-button"
              size="m"
              isHugWidth
              onClick={successAction.onClick}
              isDisabled={successAction.isDisabled}
              isLoading={successAction.isLoading}
            >
              {successAction.label}
            </Button>
          )}
        </div>
        {successImageContent && (
          <div className="promo-page-cta__success-image">{successImageContent}</div>
        )}
      </section>
    );
  }

  const rightContent = variant === 'content'
      ? (
        <div className="promo-page-cta__content-action">
          {content && <div className="promo-page-cta__content-text ts-400-l">{content}</div>}
          {action && (
            <Button
              className="promo-page-cta__button"
              variant="primary"
              onClick={action.onClick}
              isDisabled={action.isDisabled}
              isLoading={action.isLoading}
            >
              {action.label}
            </Button>
          )}
        </div>
      )
      : children;

  return (
    <section className={classNames}>
      <div className="promo-page-cta__text">
        <PromoPageTitle className="promo-page-cta__title">{title}</PromoPageTitle>
        {description && <p className="promo-page-cta__description ts-500-l">{description}</p>}
      </div>
      <div className="promo-page-cta__right">{rightContent}</div>
    </section>
  );
};
