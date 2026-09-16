# Footer

Фиксированный подвал страницы с кнопками основного действия. Поддерживает варианты с одной или двумя кнопками, иконочной кнопкой, степпером или пагинацией.

## Props

### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `layout` | `'1-button' \| '2-buttons-in-line' \| '3-buttons' \| 'page-control-button' \| 'stepper-button'` | `'1-button'` | Вариант компоновки футера |
| `description` | `React.ReactNode` | — | Текст над кнопками (только для `1-button`, `2-buttons-in-line`, `3-buttons`) |
| `primaryAction` | `FooterAction` | `{ label: 'Действие' }` | Основная кнопка |
| `secondaryAction` | `FooterAction` | `{ label: 'Действие' }` | Вторичная кнопка (для `2-buttons-in-line` и `3-buttons`) |
| `iconAction` | `FooterIconAction` | — | Иконочная кнопка слева (только для `3-buttons`) |
| `stepperValue` | `React.ReactNode` | `'00'` | Значение степпера (только для `stepper-button`) |
| `pageControlCount` | `number` | `3` | Количество точек пагинации (только для `page-control-button`) |
| `pageControlValue` | `number` | `0` | Активная точка пагинации (только для `page-control-button`) |
| `isVisible` | `boolean` | — | Управляет показом футера. При передаче запускает стандартную анимацию подъёма или скрытия; правила вычисления видимости задаются в родительском компоненте |
| `className` | `string` | `''` | Дополнительные CSS классы |

### Показ/скрытие элементов

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `description` | `React.ReactNode` | — | Если не передан, блок описания не отображается |

### Состояние

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `onStepperDecrease` | `() => void` | — | Колбэк при нажатии кнопки уменьшения степпера |
| `onStepperIncrease` | `() => void` | — | Колбэк при нажатии кнопки увеличения степпера |
| `isStepperDecreaseDisabled` | `boolean` | `false` | Блокирует кнопку уменьшения степпера |
| `isStepperIncreaseDisabled` | `boolean` | `false` | Блокирует кнопку увеличения степпера |
| `onPageControlChange` | `(index: number) => void` | — | Колбэк при переключении страницы пагинации |

---

**`FooterAction`:**

| Поле | Тип | Описание |
|---|---|---|
| `label` | `string` | Текст кнопки |
| `onClick` | `() => void` | Колбэк по клику |
| `isDisabled` | `boolean` | Блокирует кнопку |
| `isLoading` | `boolean` | Показывает спиннер |

**`FooterIconAction`:**

| Поле | Тип | Описание |
|---|---|---|
| `icon` | `React.ReactNode` | Иконка кнопки (по умолчанию `Circle`) |
| `ariaLabel` | `string` | Aria-метка для доступности |
| `onClick` | `() => void` | Колбэк по клику |
| `isDisabled` | `boolean` | Блокирует кнопку |
