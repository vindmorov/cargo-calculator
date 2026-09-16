# FlowResultView

Экран результата завершения пользовательского сценария (отправка платежа, изменение лимитов и т.д.). Показывает успех, ошибку или нейтральный статус (процесс занимает время).

На десктопе отображается как модальное окно. На мобильном (≤640px) автоматически переключается в полноэкранный режим.

## Props

| Prop | Тип | Дефолт | Описание |
|---|---|---|---|
| `isOpen` | `boolean` | — | Управляет видимостью |
| `onClose` | `() => void` | — | Закрытие (Escape, оверлей, крестик) |
| `onDone` | `() => void` | — | Клик по кнопке «Готово» |
| `variant` | `'neutral' \| 'success' \| 'error'` | `'neutral'` | Состояние экрана |
| `title` | `string` | — | Заголовок |
| `text` | `ReactNode` | — | Основной текст (поддерживает несколько абзацев) |
| `items` | `FlowResultViewItem[]` | `[]` | Дополнительные действия (0–5) |
| `className` | `string` | `''` | — |

## FlowResultViewItem

| Поле | Тип | Описание |
|---|---|---|
| `title` | `string` | Обязательное |
| `description` | `string` | — |
| `icon` | `ReactNode` | Переопределяет дефолтную иконку |
| `isLoading` | `boolean` | Показывает спиннер |
| `onClick` | `() => void` | — |

## Пример

```tsx
import { FlowResultView } from '@PluginWoman/t-ds';

<FlowResultView
  isOpen={isOpen}
  onClose={() => setOpen(false)}
  onDone={() => setOpen(false)}
  variant="success"
  title="Платёж отправлен"
  text="Деньги поступят на счёт в течение 1–3 рабочих дней."
  items={[
    { title: 'Сохранить квитанцию', onClick: handleSave },
    { title: 'Повторить платёж', onClick: handleRepeat },
  ]}
/>
```
