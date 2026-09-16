import React from 'react';
import './bottom-sheet-search.css';
import { Search } from '../Search/Search';

interface BottomSheetSearchProps {
  /** Значение поля */
  value?: string;
  /** Колбэк при изменении */
  onChange?: (value: string) => void;
  /** Плейсхолдер
   * @default "Поиск" */
  placeholder?: string;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Поле поиска для использования в `BottomSheet` (передаётся в слот `header`).
 */
export const BottomSheetSearch: React.FC<BottomSheetSearchProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
}) => (
  <div className={['bottom-sheet-search', className].filter(Boolean).join(' ')}>
    <Search value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);
