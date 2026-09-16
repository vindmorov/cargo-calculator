# LinkCell

Навигационная строка с иконкой и заголовком в brand-цвете. Используется для дополнительных действий на экране результата флоу (`FlowResultView`), но может применяться самостоятельно.

## Props

| Prop | Тип | Дефолт | Описание |
|---|---|---|---|
| `title` | `string` | — | Обязательный |
| `description` | `string` | — | Подпись под заголовком |
| `icon` | `ReactNode` | Circle | Иконка слева |
| `size` | `'l' \| 'm'` | `'l'` | L: иконка 30px, текст ts-500-l; M: иконка 24px, текст ts-500-m |
| `isLoading` | `boolean` | `false` | Показывает Spinner справа |
| `onClick` | `() => void` | — | При наличии ячейка становится кликабельной |
| `className` | `string` | `''` | — |

## Пример

```tsx
import { LinkCell } from '@PluginWoman/t-ds';

<LinkCell
  title="Перейти к деталям"
  description="Подробнее о платеже"
  onClick={() => navigate('/details')}
/>
```
