import { useCallback } from 'react';

export type ScrollTarget =
  | Element
  | null
  | string
  | { current: Element | null };

export interface ScrollToElementOptions extends ScrollIntoViewOptions {
  /** Позиция цели во viewport. По умолчанию — по центру, как в промо-лендингах. */
  block?: ScrollLogicalPosition;
  /** Плавность прокрутки. По умолчанию — нативная плавная анимация браузера. */
  behavior?: ScrollBehavior;
}

const resolveTarget = (target: ScrollTarget): Element | null => {
  if (typeof target === 'string') {
    return document.querySelector(target);
  }

  if (target && 'current' in target) {
    return target.current;
  }

  return target;
};

/**
 * Прокручивает страницу к любому DOM-элементу, ref или CSS-селектору.
 * Цель может быть динамической: передайте callback в обработчик клика.
 */
export const scrollToElement = (
  target: ScrollTarget,
  options: ScrollToElementOptions = {},
): void => {
  if (typeof document === 'undefined') return;

  resolveTarget(target)?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    ...options,
  });
};

/**
 * Возвращает обработчик для назначения любому кликабельному элементу.
 */
export const useScrollTo = (
  target: ScrollTarget,
  options: ScrollToElementOptions = {},
): (() => void) => useCallback(
  () => scrollToElement(target, options),
  [target, options],
);
