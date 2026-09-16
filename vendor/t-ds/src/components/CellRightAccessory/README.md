# CellRightAccessory

Набор готовых вариантов правого аксессуара. Применяется в ячейках списков, формах и других компонентах, где нужен стандартизированный элемент справа: текст, иконка, чекбокс, переключатель, бейдж, стрелка и другие.

## Props

### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `variant` | `'avatar-m' \| 'avatar-s' \| 'icon-30' \| 'icon-24' \| 'icon-18' \| 'spinner-34-avatar-s' \| 'spinner-24' \| 'checkbox' \| 'radio' \| 'switch' \| 'disclosure' \| 'text-l-disclosure' \| 'text-s-disclosure' \| 'badge-disclosure' \| 'badge' \| 'notification-indicator' \| 'text-l' \| 'text-m' \| 'text-s' \| 'text-m-text-xs' \| 'table-text-m-text-m' \| 'table-text-s-text-s' \| 'icon-24-icon-24' \| 'text-m-icon-30' \| 'text-m-icon-24' \| 'text-m-icon-18' \| 'stepper' \| 'custom'` | `'disclosure'` | Вариант аксессуара |
| `content` | `React.ReactNode` | — | Произвольный контент. При наличии имеет приоритет над `variant` |
| `icon` | `React.ReactNode` | `Circle` | Основная иконка для иконочных и составных вариантов |
| `secondaryIcon` | `React.ReactNode` | `Circle` | Вторая иконка для варианта `icon-24-icon-24` |
| `text` | `string` | `'Text'` | Основной текст для текстовых вариантов |
| `secondaryText` | `string` | `'Text XS'` | Вторичный текст для составных вариантов |
| `value` | `number` | `0` | Числовое значение для `badge`, `badge-disclosure`, `stepper` |
| `avatarLabel` | `string` | `'AA'` | Инициалы для вариантов `avatar-m` и `avatar-s` |
| `className` | `string` | `''` | Дополнительный CSS-класс |

### Состояние

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `isChecked` | `boolean` | `false` | Состояние для вариантов `checkbox`, `radio`, `switch` |
| `isDisabled` | `boolean` | `false` | Блокирует интерактивные варианты |
| `onCheckedChange` | `(next: boolean) => void` | — | Колбэк при изменении для `checkbox`, `radio`, `switch` |
| `onStep` | `(delta: number) => void` | — | Колбэк при изменении значения для `stepper` |
