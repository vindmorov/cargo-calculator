import React from 'react';
import './bottom-sheet-header.css';

interface BottomSheetHeaderProps {
  /** Заголовок шапки */
  title?: React.ReactNode;
  /** Элемент справа (иконка, кнопка и т.п.) */
  rightAccessory?: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Шапка `BottomSheet` с заголовком.
 * Drag handle рендерится самим `BottomSheet` выше этого компонента.
 */
export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({
  title,
  rightAccessory,
  className = '',
}) => {
  if (!title) return null;

  return (
    <div className={['bottom-sheet-header', className].filter(Boolean).join(' ')}>
      <div className="bottom-sheet-header__title ts-600-xl">{title}</div>
      {rightAccessory && (
        <div className="bottom-sheet-header__right-accessory">{rightAccessory}</div>
      )}
    </div>
  );
};
