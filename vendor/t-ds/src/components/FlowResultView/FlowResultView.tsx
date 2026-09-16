import React from 'react';
import './flow-result-view.css';
import { Modal } from '../Modal/Modal';
import { ModalHeader } from '../Modal/ModalHeader';
import { ModalFooter } from '../Modal/ModalFooter';
import { Avatar } from '../Avatar/Avatar';
import { LinkCell } from '../LinkCell/LinkCell';
import { Watch, Cross, Checkmark } from '../../assets/Icon/icons';

export interface FlowResultViewItem {
  /** Заголовок кнопки-ссылки */
  title: string;
  /** Описание под заголовком */
  description?: string;
  /** Иконка слева. По умолчанию — Circle */
  icon?: React.ReactNode;
  /** Показывает спиннер */
  isLoading?: boolean;
  /** Колбэк по клику */
  onClick?: () => void;
}

export interface FlowResultViewProps {
  /** Управляет видимостью */
  isOpen: boolean;
  /** Клик по кнопке «Готово» в футере — единственный способ закрыть экран */
  onDone?: () => void;
  /** Состояние экрана: нейтральное, ошибка, успех
   * @default "neutral" */
  state?: 'neutral' | 'success' | 'error';
  /** Заголовок экрана */
  title: string;
  /** Основной текст. Принимает ReactNode для нескольких абзацев */
  text: React.ReactNode;
  /** Список дополнительных действий (0–5) */
  items?: FlowResultViewItem[];
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
}

const STATE_CONFIG = {
  neutral: {
    avatarSurface: 'var(--bg-brand-1)',
    avatarColor: 'var(--primitive-brand)',
    icon: <Watch />,
  },
  error: {
    avatarSurface: 'var(--bg-error-1)',
    avatarColor: 'var(--primitive-error)',
    icon: <Cross />,
  },
  success: {
    avatarSurface: 'var(--bg-success-1)',
    avatarColor: 'var(--primitive-success)',
    icon: <Checkmark />,
  },
};

/**
 * Экран результата завершения пользовательского сценария.
 * Показывает успех, ошибку или нейтральный статус.
 * На десктопе — модальное окно, на мобильном (≤640px) — полноэкранный режим.
 * Закрывается только по кнопке «Готово» в футере.
 */
export const FlowResultView: React.FC<FlowResultViewProps> = ({
  isOpen,
  onDone,
  state = 'neutral',
  title,
  text,
  items = [],
  className = '',
}) => {
  const config = STATE_CONFIG[state];
  const visibleItems = items.slice(0, 5);

  return (
    <Modal
      isOpen={isOpen}
      isOverlayCloseEnabled={false}
      className={['flow-result-view__modal', className].filter(Boolean).join(' ')}
      header={<ModalHeader variant="empty" />}
      footer={
        <ModalFooter
          layout="1-button"
          primaryAction={{
            label: 'Готово',
            isSelected: true,
            onClick: onDone,
          }}
        />
      }
    >
      <div className="flow-result-view">
        <Avatar
          size="l"
          shape="superellipse"
          icon={config.icon}
          style={{
            '--avatar-surface': config.avatarSurface,
            '--avatar-color': config.avatarColor,
          } as React.CSSProperties}
        />

        <div className="flow-result-view__content">
          <h2 className="flow-result-view__title ts-600-4xl">{title}</h2>

          <div className="flow-result-view__text ts-400-m">{text}</div>

          {visibleItems.length > 0 && (
            <div className="flow-result-view__items">
              {visibleItems.map((item, index) => (
                <LinkCell
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  isLoading={item.isLoading}
                  onClick={item.onClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
