import React, { useRef, useLayoutEffect } from 'react';
import './alert.css';

export type AlertType = 'success' | 'error' | 'neutral';
export type AlertTextAlign = 'left' | 'center';

export interface AlertProps {
  /** Тип уведомления
   * @default 'success' */
  type?: AlertType;
  /** Выравнивание текста
   * @default 'left' */
  textAlign?: AlertTextAlign;
  /** Текст уведомления */
  children: React.ReactNode;
  /** Дополнительный CSS-класс
   * @default "" */
  className?: string;
  /** Вызывается после завершения анимации скрытия */
  onHide?: () => void;
}

const AUTO_HIDE_MS = 5000;

function runSpring(
  from: number,
  to: number,
  tension: number,
  friction: number,
  onUpdate: (v: number) => void,
  onDone: () => void,
): () => void {
  let pos = from;
  let vel = 0;
  let raf: number;
  let prev: number | null = null;
  let active = true;

  function tick(now: number) {
    if (!active) return;
    const dt = prev === null ? 0 : Math.min((now - prev) / 1000, 0.064);
    prev = now;

    const acc = -tension * (pos - to) - friction * vel;
    vel += acc * dt;
    pos += vel * dt;

    if (Math.abs(pos - to) < 0.5 && Math.abs(vel) < 0.5) {
      onUpdate(to);
      onDone();
      return;
    }

    onUpdate(pos);
    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);
  return () => { active = false; cancelAnimationFrame(raf); };
}

/**
 * Короткое текстовое уведомление.
 * Используется для показа сообщения об успехе, ошибке или нейтральном статусе,
 * когда отдельный экран кажется для этого избыточным.
 */
export const Alert: React.FC<AlertProps> = ({
  type = 'success',
  textAlign = 'left',
  children,
  className = '',
  onHide,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<() => void>(() => {});
  const onHideRef = useRef(onHide);
  onHideRef.current = onHide;

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current!;
    const naturalHeight = innerRef.current!.offsetHeight;

    wrapper.style.height = '0px';

    cancelRef.current = runSpring(0, naturalHeight, 200, 16, (v) => {
      wrapper.style.height = `${v}px`;
    }, () => {
      wrapper.style.height = `${naturalHeight}px`;
    });

    const timer = setTimeout(() => {
      cancelRef.current();
      const from = parseFloat(wrapperRef.current!.style.height) || naturalHeight;
      cancelRef.current = runSpring(from, 0, 100, 16, (v) => {
        wrapperRef.current!.style.height = `${v}px`;
      }, () => {
        onHideRef.current?.();
      });
    }, AUTO_HIDE_MS);

    return () => {
      clearTimeout(timer);
      cancelRef.current();
    };
  }, []);

  const rootClassName = [
    'alert',
    `alert--${type}`,
    textAlign === 'center' ? 'alert--center' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={wrapperRef} className="alert__wrapper">
      <div ref={innerRef} className={rootClassName}>
        <p className="alert__text ts-500-s">{children}</p>
      </div>
    </div>
  );
};
