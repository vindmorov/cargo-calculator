# Cell

Универсальная строка списка с заголовком, опциональным описанием, левым и правым аксессуарами. Используется для отображения данных, настроек, навигации и любых структурированных списков.

Для стандартных паттернов рекомендуется использовать `CellLeftAccessory` и `CellRightAccessory`. `Cell` также принимает любой кастомный `ReactNode`.

## Props

### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `title` | `React.ReactNode` | — | Заголовок ячейки |
| `subtitle` | `React.ReactNode` | — | Подзаголовок над заголовком |
| `description` | `React.ReactNode` | — | Описание под заголовком |
| `leftAccessory` | `React.ReactNode` | `Avatar` | Элемент слева. По умолчанию — `Avatar` |
| `rightAccessory` | `React.ReactNode` | `ChevronRight` | Элемент справа. По умолчанию — иконка `ChevronRight` |
| `titleClassName` | `string` | `ts-500-m` | CSS-класс заголовка. Принимает любой класс из системы типографики (`ts-{вес}-{размер}`) или кастомный |
| `subtitleClassName` | `string` | `ts-400-s` | CSS-класс подзаголовка |
| `descriptionClassName` | `string` | `ts-400-s` | CSS-класс описания |
| `titleColor` | `string` | `var(--primitive-primary)` | Цвет заголовка |
| `subtitleColor` | `string` | `var(--primitive-secondary)` | Цвет подзаголовка |
| `descriptionColor` | `string` | `var(--primitive-secondary)` | Цвет описания |
| `className` | `string` | `''` | Дополнительный CSS-класс корневого элемента |

### Показ/скрытие элементов

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `hasLeftAccessory` | `boolean` | `true` | Показывает левый аксессуар |
| `hasRightAccessory` | `boolean` | `true` | Показывает правый аксессуар |
| `verticalPadding` | `'none' \| '2x' \| '3x' \| '4x'` | `none` | Верхний и нижний паддинг ячейки |

### Состояние

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `onClick` | `() => void` | — | Колбэк по клику. При наличии ячейка становится интерактивной |
