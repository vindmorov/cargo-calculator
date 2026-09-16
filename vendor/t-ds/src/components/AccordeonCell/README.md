# Accordeon Cell

Секция с заголовком, которая разворачивается по клику и показывает скрытый контент. Используется для организации списков, настроек и любого контента, который нужно скрыть по умолчанию.

## Props

### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `title` | `React.ReactNode` | — | Заголовок секции |
| `description` | `React.ReactNode` | — | Подзаголовок под заголовком |
| `children` | `React.ReactNode` | — | Контент, который показывается при раскрытии |
| `size` | `'xl' \| '2xl'` | `'xl'` | Размер заголовка |
| `chevronPosition` | `'title' \| 'edge'` | `'title'` | Положение иконки: рядом с заголовком или по правому краю |
| `contentSpacing` | `'0' \| '0-5x' \| '1x' \| '2x' \| '4x' \| '6x'` | `'4x'` | Отступ между заголовком и раскрытым контентом |
| `listSpacing` | `'0' \| '0-5x' \| '1x' \| '2x' \| '4x' \| '6x'` | `'2x'` | Отступы между элементами внутри раскрытого контента |
| `rightAccessory` | `React.ReactNode` | — | Произвольный элемент справа от заголовка |
| `rightAccessoryVariant` | `'avatar-m' \| 'avatar-s' \| 'icon-30' \| 'icon-24' \| 'icon-18' \| 'spinner-34-avatar-s' \| 'spinner-24' \| 'checkbox' \| 'radio' \| 'switch' \| 'disclosure' \| 'text-l-disclosure' \| 'text-s-disclosure' \| 'badge-disclosure' \| 'badge' \| 'notification-indicator' \| 'text-l' \| 'text-m' \| 'text-s' \| 'text-m-text-xs' \| 'table-text-m-text-m' \| 'table-text-s-text-s' \| 'icon-24-icon-24' \| 'text-m-icon-30' \| 'text-m-icon-24' \| 'text-m-icon-18' \| 'stepper' \| 'custom'` | `'text-m'` | Вариант дефолтного правого аксессуара (используется если `rightAccessory` не передан) |
| `rightAccessoryText` | `string` | `'Text M'` | Текст дефолтного правого аксессуара |
| `className` | `string` | `''` | Дополнительный CSS-класс на корневом элементе |

### Показ/скрытие элементов

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `hasDescription` | `boolean` | `true` | Показывает подзаголовок (только если передан `description`) |
| `hasRightAccessory` | `boolean` | `true` | Показывает правый аксессуар (только при `chevronPosition="title"`) |

### Состояние

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `defaultOpen` | `boolean` | `false` | Начальное состояние при неуправляемом режиме |
| `isOpen` | `boolean` | — | Управляемое состояние открытия. Если передан — компонент переходит в controlled mode |
| `onOpenChange` | `(isOpen: boolean) => void` | — | Колбэк при изменении состояния |
