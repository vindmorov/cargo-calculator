import React from 'react';
import './search.css';
import { Magnifier } from '../../assets/Icon/icons';
import { CrossCircle } from '../../assets/Icon/20/Filled';

interface SearchProps {
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
 * Поле поиска с иконкой, hover/focus состояниями и кнопкой очистки.
 */
export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = 'Поиск',
  className = '',
}) => (
  <div className={['ds-search', className].filter(Boolean).join(' ')}>
    <span className="ds-search__icon ds-icon ds-icon--24" aria-hidden="true">
      <Magnifier />
    </span>
    <input
      className="ds-search__input ts-400-m"
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
    {value && (
      <button
        type="button"
        className="ds-search__clear"
        aria-label="Очистить"
        onClick={() => onChange?.('')}
      >
        <span className="ds-icon ds-icon--20" aria-hidden="true">
          <CrossCircle />
        </span>
      </button>
    )}
  </div>
);
