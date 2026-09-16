# Drawer

Боковая панель, выезжающая поверх контента. Используется для отображения дополнительной информации или форм без перехода на новую страницу.

Компонент составной: собирается из `Drawer`, `DrawerHeader`, `DrawerHeaderTitle` и `DrawerFooter`.

## Props

### `Drawer`

#### Контент

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `header` | `React.ReactNode` | — | Шапка панели, обычно `DrawerHeader` |
| `children` | `React.ReactNode` | — | Основной контент панели |
| `footer` | `React.ReactNode` | — | Подвал панели, обычно `DrawerFooter` |
| `className` | `string` | `''` | Дополнительный CSS-класс |

#### Состояние

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `isOpen` | `boolean` | — | Управляет видимостью панели |
| `onClose` | `() => void` | — | Колбэк при закрытии (клавиша Escape) |

---

### DrawerHeader

#### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `title` | `React.ReactNode` | — | Заголовок шапки |
| `titleVariant` | `'text-m' \| 'text-l'` | `'text-m'` | Размер заголовка |
| `leftAccessory` | `React.ReactNode` | — | Произвольный элемент слева. При отсутствии и `hasDefaultBackArrow=true` — стрелка назад |
| `className` | `string` | `''` | Дополнительный CSS-класс |

#### Показ/скрытие элементов

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `hasDefaultBackArrow` | `boolean` | `false` | Показывает стрелку назад слева (если не передан `leftAccessory`) |

#### Состояние

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `onLeftAccessoryClick` | `() => void` | — | Колбэк по клику на левый элемент |
| `onClose` | `() => void` | — | Колбэк по клику на кнопку закрытия. При наличии показывает крестик справа |

---

### DrawerHeaderTitle

#### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Текст заголовка |
| `variant` | `'text-m' \| 'text-l'` | `'text-m'` | Размер текста |
| `className` | `string` | `''` | Дополнительный CSS-класс |

---

### DrawerFooter

#### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `layout` | `'1-button' \| '2-buttons' \| '2-horizontal-buttons' \| 'empty'` | `'1-button'` | Расположение кнопок в подвале |
| `description` | `React.ReactNode` | — | Текст над кнопками |
| `primaryAction` | `DrawerFooterAction` | — | Основная кнопка |
| `secondaryAction` | `DrawerFooterAction` | — | Вторичная кнопка (только для `2-buttons` и `2-horizontal-buttons`) |
| `className` | `string` | `''` | Дополнительный CSS-класс |

**`DrawerFooterAction`:**

| Поле | Тип | Описание |
|---|---|---|
| `label` | `string` | Текст кнопки |
| `onClick` | `() => void` | Колбэк по клику |
| `isDisabled` | `boolean` | Блокирует кнопку |
| `isLoading` | `boolean` | Показывает спиннер |
| `isSelected` | `boolean` | Использует вариант `primary` вместо `secondary` |