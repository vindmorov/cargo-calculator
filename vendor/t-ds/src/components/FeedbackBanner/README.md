# FeedbackBanner

Компонент для сбора расширенной обратной связи. По клику на кнопку может открываться модальное окно.

## Props

### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Текст баннера |
| `primaryAction` | `FeedbackBannerAction` | — | Основная кнопка действия |
| `secondaryAction` | `FeedbackBannerAction` | — | Дополнительная кнопка действия |
| `className` | `string` | `''` | Дополнительный CSS-класс |

---

**`FeedbackBannerAction`:**

| Поле | Тип | Описание |
|---|---|---|
| `label` | `React.ReactNode` | Текст кнопки |
| `onClick` | `() => void` | Колбэк по клику |
| `isDisabled` | `boolean` | Блокирует кнопку |
