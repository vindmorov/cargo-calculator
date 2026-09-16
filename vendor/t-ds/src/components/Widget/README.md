# Widget

Блок-контейнер с кликабельным заголовком, правым аксессуаром и зоной для произвольного контента. Используется для отображения важной информации и по клику переход в полный сервис.

Включает встроенный `WidgetTitle` и принимает все его пропсы, кроме `className`.

## Props

### Контент и варианты

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `title` | `React.ReactNode` | — | Заголовок виджета (обязательный) |
| `description` | `React.ReactNode` | — | Описание под заголовком |
| `children` | `React.ReactNode` | — | Произвольный контент в теле виджета |
| `variant` | `'filled' | 'outlined'` | `'outlined'` | Визуальный стиль виджета |
| `isOutlinedOnAdaptive` | `boolean` | `false` | Сохраняет обводку варианта `outlined` на адаптивной ширине |
| `chevron` | `React.ReactNode` | `ChevronRight` | Иконка шеврона рядом с заголовком |
| `rightAccessory` | `React.ReactNode` | — | Произвольный правый аксессуар (заменяет `rightAccessoryVariant`) |
| `rightAccessoryVariant` | `'icon' \| 'link' \| 'link-icon' \| 'icon-icon' \| 'description' \| 'editing-mode' \| 'none' \| 'custom'` | `'icon'` | Вариант правого аксессуара |
| `rightAccessoryText` | `React.ReactNode` | — | Текст аксессуара (для `link`, `link-icon`, `description`) |
| `rightAccessoryIcon` | `React.ReactNode` | `Circle` | Иконка аксессуара |
| `rightAccessorySecondaryIcon` | `React.ReactNode` | `MinusCircle` | Вторая иконка (для `icon-icon`, `editing-mode`) |
| `minContentHeight` | `number \| string` | `146` | Минимальная высота контентной зоны |
| `className` | `string` | `''` | Дополнительные CSS классы для корневого элемента |
| `contentClassName` | `string` | `''` | Дополнительные CSS классы для контентной зоны |

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

## Режимы отображения

По умолчанию используется вариант `outlined`: на desktop виджет отображается с прозрачным фоном, обводкой `Translucent/Primitive/Neutral 2` и скруглением 18px (`Rounding 4.5x`), а на адаптивной ширине — с белой заливкой и тенью.

Вариант `filled` использует белую заливку, тень и скругление 12px (`Rounding 3x`) на всех ширинах:

```tsx
<Widget title="Текущее состояние" variant="filled">
  Контент виджета
</Widget>
```

Чтобы сохранить обводку варианта `outlined` на адаптиве, передайте `isOutlinedOnAdaptive`:

```tsx
<Widget title="Текущее состояние" variant="outlined" isOutlinedOnAdaptive>
  Контент виджета
</Widget>
```
