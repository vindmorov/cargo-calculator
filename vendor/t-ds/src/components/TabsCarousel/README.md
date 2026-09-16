# TabsCarousel

Компонент объединяет заголовок и навигационные табы. Аналог `Chip variant="tab"`, но с крупной типографикой уровня заголовка. Клик переключает контентную область снизу с анимацией затухания.

## Использование

```tsx
import { TabsCarousel } from '@pluginwoman/t-ds';
import { Plus } from '@pluginwoman/t-ds/icons';

<TabsCarousel
  size="xl"
  tabs={[
    { label: 'Вклады', badge: 3, content: <p>Контент вкладов</p> },
    { label: 'Кредиты', content: <p>Контент кредитов</p> },
    { label: 'Карты', content: <p>Контент карт</p> },
  ]}
  hasAction
  actionLabel="Открыть"
  actionIcon={<Plus />}
  onActionClick={() => console.log('action')}
/>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `tabs` | `TabsCarouselTab[]` | — | Список табов |
| `size` | `'xl' \| '2xl'` | `'xl'` | Размер текста табов |
| `hasAction` | `boolean` | `false` | Показать кнопку действия справа |
| `actionLabel` | `string` | — | Текст кнопки (скрывается в адаптиве ≤768px) |
| `actionIcon` | `ReactNode` | — | Иконка кнопки действия |
| `onActionClick` | `() => void` | — | Клик по кнопке действия |
| `defaultSelectedIndex` | `number` | `0` | Начальный таб (uncontrolled) |
| `selectedIndex` | `number` | — | Активный таб (controlled) |
| `onTabChange` | `(index: number) => void` | — | Колбэк при переключении |
| `className` | `string` | — | Дополнительный CSS-класс |

### TabsCarouselTab

| Поле | Тип | Описание |
|---|---|---|
| `label` | `string` | Текст таба |
| `badge` | `number` | Бейдж-аксессуар (фон `--primitive-brand`) |
| `content` | `ReactNode` | Контент, отображаемый при активном табе |

## Анимация переключения

Использует общие CSS-утилиты из `animation.css`:
- `.animate-tab-content-out` — текущий контент: opacity 1→0, 0.2s ease-in-out
- `.animate-tab-content-in` — новый контент: opacity 0→1, 0.2s ease-in-out, delay 0.3s

Те же классы можно применять в потребителях `Chip variant="tab"`.

## Адаптив

На экранах ≤768px:
- Строка табов горизонтально прокручивается при переполнении
- Кнопка действия фиксируется справа (не участвует в скролле)
- Текст кнопки скрывается, остаётся только иконка
