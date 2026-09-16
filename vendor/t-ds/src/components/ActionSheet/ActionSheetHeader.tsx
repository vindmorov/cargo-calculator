import React from 'react';

interface ActionSheetHeaderProps {
  /** Заголовок шапки */
  title?: React.ReactNode;
  /** Дополнительный текст под заголовком */
  description?: React.ReactNode;
  /** Показывает контент шапки. При `false` рендерится пустой разделитель
   * @default true */
  hasContent?: boolean;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

/**
 * Шапка `ActionSheet` с заголовком.
 * При `hasContent={false}` рендерится как пустой визуальный разделитель.
 */
export const ActionSheetHeader: React.FC<ActionSheetHeaderProps> = ({
  title,
  description,
  hasContent = true,
  className = '',
}) => {
  const classNames = [
    'action-sheet-header',
    !hasContent ? 'action-sheet-header--empty' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {hasContent && (
        <div className="action-sheet-header__content">
          {typeof title !== 'undefined' ? (
            <div className="action-sheet-header__title ts-400-m">{title}</div>
          ) : null}
        </div>
      )}
    </div>
  );
};
