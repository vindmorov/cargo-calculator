# PromoPageCta

CTA-блок промо-страницы с текстом слева и формой или дополнительным действием справа.

## Props

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `title` | `React.ReactNode` | `'Text 5XL'` | Заголовок левой части, рендерится через `PromoPageTitle` |
| `description` | `React.ReactNode` | `'Text L'` | Описание левой части |
| `variant` | `'form' \| 'content'` | `'form'` | Правая часть: форма или текст с кнопкой |
| `children` | `React.ReactNode` | — | Контент формы для `variant="form"`; поля можно передавать без `label`/`description` и с `variant="white"` |
| `content` | `React.ReactNode` | — | Текстовый блок для `variant="content"` |
| `action` | `PromoPageCtaAction` | — | Кнопка под текстом для `variant="content"` |
| `isSuccess` | `boolean` | `false` | Заменяет форму success-контентом |
| `successTitle` | `React.ReactNode` | `'Получили вашу заявку'` | Заголовок успешного состояния |
| `successDescription` | `React.ReactNode` | `'Перезвоним в течение рабочего дня, чтобы уточнить все детали'` | Описание успешного состояния |
| `successAction` | `PromoPageCtaAction` | — | Кнопка успешного состояния |
| `successImage` | `React.ReactNode` | — | Произвольное изображение успешного состояния |
| `successImageSrc` | `string` | — | URL изображения успешного состояния |
| `successImageAlt` | `string` | `''` | Alt-текст изображения |
| `successContent` | `React.ReactNode` | — | Дополнительный контент успешного состояния |
| `className` | `string` | `''` | Дополнительный CSS-класс |

В варианте `content` расстояние между текстом и кнопкой равно `--content-group-list-spacing`.
