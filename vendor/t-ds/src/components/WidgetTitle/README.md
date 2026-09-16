# WidgetTitle

Шапка виджета с кликабельным заголовком и правым аксессуаром. Используется внутри Widget.

## Props

### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `title` | `React.ReactNode` | — | Заголовок (обязательный) |
| `description` | `React.ReactNode` | — | Описание под заголовком |
| `chevron` | `React.ReactNode` | `ChevronRight` | Иконка шеврона рядом с заголовком |
| `rightAccessory` | `React.ReactNode` | — | Произвольный правый аксессуар (заменяет `rightAccessoryVariant`) |
| `rightAccessoryVariant` | `'icon' \| 'link' \| 'link-icon' \| 'icon-icon' \| 'description' \| 'editing-mode' \| 'none' \| 'custom'` | `'icon'` | Вариант правого аксессуара |
| `rightAccessoryText` | `React.ReactNode` | — | Текст аксессуара (для `link`, `link-icon`, `description`) |
| `rightAccessoryIcon` | `React.ReactNode` | `Circle` | Иконка аксессуара |
| `rightAccessorySecondaryIcon` | `React.ReactNode` | `MinusCircle` | Вторая иконка (для `icon-icon`, `editing-mode`) |
| `className` | `string` | `''` | Дополнительные CSS классы |

### Показ/скрытие элементов

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `hasChevron` | `boolean` | `true` | Показывает шеврон рядом с заголовком |
| `hasDescription` | `boolean` | `true` | Показывает описание под заголовком |
| `hasRightAccessory` | `boolean` | `true` | Показывает правый аксессуар |

### Состояние

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `onRightAccessoryClick` | `() => void` | — | Колбэк при клике на правый аксессуар |
