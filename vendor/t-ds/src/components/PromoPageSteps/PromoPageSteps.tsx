import React from 'react';
import { Tag } from '../Tag/Tag';
import { useIsMobile } from '../../hooks/useIsMobile';
import { BREAKPOINT_TABLET } from '../../breakpoints';
import './promo-page-steps.css';

export interface PromoPageStep {
  /** Метка шага. Если не задана, показывается `Шаг N`; `false` отключает метку */
  tag?: React.ReactNode | false;
  /** Заголовок шага */
  title: React.ReactNode;
  /** Описание шага */
  description?: React.ReactNode;
  /** Дополнительный контент в левом блоке, например кнопка */
  leftContent?: React.ReactNode;
  /** Произвольное изображение */
  image?: React.ReactNode;
  /** URL изображения, имеет приоритет над `image` */
  imageSrc?: string;
  /** Alt-текст изображения
   * @default "" */
  imageAlt?: string;
}

export interface PromoPageStepsProps {
  /** Заголовок блока
   * @default "Text 5XL" */
  title?: React.ReactNode;
  /** Показывает заголовок блока
   * @default true */
  hasTitle?: boolean;
  /** Массив шагов */
  steps: PromoPageStep[];
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

const DefaultImage = () => (
  <span className="promo-page-steps__default-image" aria-hidden="true" />
);

/**
 * Вертикальный блок последовательных шагов промо-страницы.
 * На desktop текст располагается слева, изображение — справа; на mobile блоки складываются вертикально.
 */
export const PromoPageSteps: React.FC<PromoPageStepsProps> = ({
  title = 'Text 5XL',
  hasTitle = true,
  steps,
  className = '',
}) => {
  const isMobile = useIsMobile(BREAKPOINT_TABLET);
  const classNames = ['promo-page-steps', className].filter(Boolean).join(' ');

  return (
    <section className={classNames}>
      {hasTitle && (
        <h2 className={`promo-page-steps__title ${isMobile ? 'ts-600-3xl' : 'ts-600-5xl'}`}>
          {title}
        </h2>
      )}
      <div className="promo-page-steps__list">
        {steps.map((step, index) => {
          const imageContent = step.imageSrc
            ? <img className="promo-page-steps__image-img" src={step.imageSrc} alt={step.imageAlt || ''} />
            : step.image || <DefaultImage />;
          const tag = step.tag === false
            ? null
            : step.tag ?? (
              <Tag
                variant="filled"
                shape="square"
                size="l"
                className="promo-page-steps__tag"
              >
                Шаг {index + 1}
              </Tag>
            );

          return (
            <article className="promo-page-steps__step" key={index}>
              <div className="promo-page-steps__text">
                <div className="promo-page-steps__text-content">
                  {tag}
                  <h3 className={`promo-page-steps__step-title ${isMobile ? 'ts-600-2xl' : 'ts-600-4xl'}`}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="promo-page-steps__description ts-400-l">{step.description}</p>
                  )}
                </div>
                {step.leftContent && <div className="promo-page-steps__content">{step.leftContent}</div>}
              </div>
              <div className="promo-page-steps__image">{imageContent}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
