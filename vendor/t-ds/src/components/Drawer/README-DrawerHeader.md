# DrawerHeader

Шапка `Drawer` с центрированным заголовком, левым аксессуаром и кнопкой закрытия.

## Использование

```tsx
import { DrawerHeader } from '@pluginwoman/t-ds';

<DrawerHeader
  title="Title"
  hasDefaultBackArrow
  onLeftAccessoryClick={() => {}}
  onClose={() => {}}
/>
```

## Props

- `title` — содержимое заголовка
- `titleVariant` — размерный вариант заголовка: `text-m` или `text-l`
- `leftAccessory` — кастомный левый аксессуар, например `Text M`
- `hasDefaultBackArrow` — показать стандартную стрелку слева через систему иконок
- `onLeftAccessoryClick` — обработчик клика по левому аксессуару
- `onClose` — обработчик клика по крестику
- `className` — дополнительные CSS-классы
