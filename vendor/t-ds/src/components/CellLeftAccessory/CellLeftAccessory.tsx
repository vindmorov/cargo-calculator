import React from 'react';
import './cell-left-accessory.css';
import { Avatar } from '../Avatar/Avatar';
import { AvatarCheckbox } from '../AvatarCheckbox/AvatarCheckbox';
import { Circle, Plus } from '../../assets/Icon/icons';
import { FileListShortReverse } from '../../assets/Icon/20/Graphic';

export type CellLeftAccessoryVariant =
  | 'avatar'
  | 'icon-30'
  | 'icon-24'
  | 'icon-18'
  | 'card-preview'
  | 'avatar-checkbox'
  | 'add-button'
  | 'file'
  | 'custom';

interface CellLeftAccessoryProps {
  /** Вариант аксессуара
   * @default "avatar" */
  variant?: CellLeftAccessoryVariant;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Иконка для вариантов `icon-*` и `add-button`
   * @default Circle */
  icon?: React.ReactNode;
  /** Инициалы для варианта `avatar`
   * @default "AA" */
  avatarLabel?: string;
  /** Состояние чекбокса для варианта `avatar-checkbox`
   * @default false */
  isChecked?: boolean;
  /** Колбэк по клику для варианта `add-button` */
  onClick?: () => void;
}

/**
 * Набор готовых вариантов левого аксессуара для ячеек.
 * Применяется в ячейках списков, формах и других компонентах,
 * где нужен стандартизированный элемент слева: аватар, иконка, превью карточки или кнопка добавления.
 *
 * Для кастомного контента передайте любой ReactNode напрямую в проп `leftAccessory` у `Cell`:
 * ```tsx
 * <Cell leftAccessory={<Avatar imageUrl="..." />} />
 * ```
 */
export const CellLeftAccessory: React.FC<CellLeftAccessoryProps> = ({
  variant = 'avatar',
  className = '',
  icon,
  avatarLabel = 'AA',
  isChecked = false,
  onClick,
}) => {
  const rootClassName = ['ds-cell-left-accessory', className].filter(Boolean).join(' ');

  switch (variant) {
    case 'avatar':
      return (
        <div className={rootClassName}>
          <Avatar size="m" shape="circle" label={avatarLabel} />
        </div>
      );

    case 'icon-30':
    case 'icon-24':
    case 'icon-18': {
      const sizeClass = `ds-cell-left-accessory__icon--${variant.split('-')[1]}`;
      return (
        <div className={rootClassName}>
          <span className={`ds-cell-left-accessory__icon ${sizeClass}`} aria-hidden="true">
            {icon ?? <Circle />}
          </span>
        </div>
      );
    }

    case 'card-preview':
      return (
        <div className={rootClassName}>
          <span className="ds-cell-left-accessory__card-preview" aria-hidden="true" />
        </div>
      );

    case 'avatar-checkbox':
      return (
        <div className={rootClassName}>
          <AvatarCheckbox isChecked={isChecked} onClick={onClick} />
        </div>
      );

    case 'add-button':
      return (
        <div className={rootClassName}>
          <button
            type="button"
            className="ds-cell-left-accessory__add-button"
            onClick={onClick}
            aria-label="Add"
          >
            <span className="ds-cell-left-accessory__add-icon" aria-hidden="true">
              {icon ?? <Plus />}
            </span>
          </button>
        </div>
      );

    case 'file':
      return (
        <div className={rootClassName}>
          <span className="ds-cell-left-accessory__file-container" aria-hidden="true">
            <span className="ds-cell-left-accessory__file-icon">
              {icon ?? <FileListShortReverse />}
            </span>
          </span>
        </div>
      );

    case 'custom':
    default:
      return <div className={rootClassName} />;
  }
};
