# PromoPageSteps

Блок последовательных шагов для промо-страниц.

На desktop текст располагается слева, изображение — справа. На mobile изображение располагается над текстом.

## Props

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `title` | `React.ReactNode` | `'Text 5XL'` | Заголовок блока |
| `hasTitle` | `boolean` | `true` | Показывает заголовок блока |
| `steps` | `PromoPageStep[]` | — | Массив шагов |
| `className` | `string` | `''` | Дополнительный CSS-класс |

### PromoPageStep

| Поле | Тип | Описание |
|---|---|---|
| `tag` | `React.ReactNode \| false` | Метка шага. По умолчанию `Шаг N`, `false` отключает её |
| `title` | `React.ReactNode` | Заголовок шага |
| `description` | `React.ReactNode` | Описание шага |
| `leftContent` | `React.ReactNode` | Дополнительный контент в левом блоке |
| `image` | `React.ReactNode` | Произвольное изображение |
| `imageSrc` | `string` | URL изображения |
| `imageAlt` | `string` | Alt-текст изображения |
