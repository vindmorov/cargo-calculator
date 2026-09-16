# T Design System — гайд по применению для агента

Этот документ описывает, **как агенту собирать интерфейсы из этой дизайн-системы**: какие токены использовать, какие компоненты существуют, их пропсы и правила применения. Источник правды — код в `src/`. Если этот гайд расходится с кодом, прав код.

---

## 1. Базовые правила

1. **Один раз подключи стили** в корне приложения — без них компоненты выглядят сломанно:
   ```tsx
   import '@pluginwoman/t-ds/style'
   ```
2. **Импортируй компоненты из корня пакета, иконки — из subpath `/icons`:**
   ```tsx
   import { Button, Cell, Input } from '@pluginwoman/t-ds'
   import { Circle, ChevronRight } from '@pluginwoman/t-ds/icons'
   ```
   > Иконки экспортируются без суффикса `Icon` (`Circle`, `ChevronRight`, …). Полный список — в `src/assets/Icon/24/Stroked.tsx`.
3. **Никогда не хардкодь и не создавай новые цвета, текстовые стили, переменные размеров, отступы, скругления, тени.** Только CSS-переменные из дизайн-системы и готовые типографические классы `ts-*` (см. ниже). Нельзя: новые CSS-классы с `font-size`/`font-weight`, новые CSS-переменные `--my-*-color` / `--my-*-size`, хардкод hex-значений или числовых размеров. Это главное правило консистентности.
4. **Прежде чем верстать элемент вручную, проверь — нет ли подходящего компонента в t-ds.** Сравнивай по названию: как называется слой/компонент в Фигме — ищи компонент с тем же именем в каталоге (раздел 3). Почти все паттерны (кнопки, поля, ячейки, модалки, шиты, навигация) уже есть. **Не пиши свои аналоги существующих компонентов.**
5. **Булевы пропсы именуются `is*` / `has*`** (`isDisabled`, `isLoading`, `hasDescription`). Колбэки — `on*` (`onClick`, `onChange`, `onClose`).
6. **Многие контейнерные компоненты составные** (`Modal` + `ModalHeader` + `ModalFooter`, `Drawer`, `ActionSheet`, `Footer`, `Widget`, `Table`). Собирай их из частей, а не одним пропсом.
7. **Строковые enum-пропсы регистрозависимы.** `size`, `variant`, `layout` и т.п. — строго в нижнем регистре (`size="m"`, не `"M"`). Неверный регистр молча ломает раскладку: класс `page-layout--M` просто не существует, и компонент остаётся без размерных стилей. Допустимые значения смотри в типе пропа.
8. **Связка `PageLayout` с фиксированным хедером — через проп `topOffset`, а не ручные CSS-оверрайды.** Если над `PageLayout` стоит `MainPageNavigationBar` (высота 74px) или другой sticky/fixed-хедер, передай `<PageLayout topOffset={74} …>`. Этот проп выставляет `--page-layout-top-offset`, который уже учтён во всех `min-height`, sticky/fixed `top` и `height: calc(...)` макета. Без него получишь лишний скролл (`74 + 100vh`) и наложение панелей. Подробности — §3.8.
9. **`Footer` (sticky `bottom: 0`) ставь последним элементом потока контента, на всю ширину.** Не оборачивай его лишними контейнерами с `overflow` — иначе sticky-прилипание к низу вьюпорта сломается.

### Установка и базовый CSS-reset

Пакет публикуется в GitHub Packages. Для scope `@pluginwoman` нужен registry в `.npmrc` проекта:

```ini
@pluginwoman:registry=https://npm.pkg.github.com
```

Шрифт **TT Norms Tochka Extended** на macOS по умолчанию рендерится субпиксельно и выглядит «жирным». Добавь сглаживание в корневой reset, иначе типографика библиотеки отображается некорректно:

```css
html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
```

### Хуки и утилиты

- **`useScrollTo`** — возвращает обработчик для плавной прокрутки к цели по клику. Принимает DOM-элемент, React ref или CSS-селектор и необязательные `ScrollIntoViewOptions`. По умолчанию использует `behavior: "smooth"` и `block: "center"`, как в промо-лендингах.
  ```tsx
  const targetRef = useRef<HTMLElement>(null);
  const scrollToTarget = useScrollTo(targetRef);

  <Button onClick={scrollToTarget}>Перейти к секции</Button>
  <section ref={targetRef}>...</section>
  ```
- **`scrollToElement`** — императивная версия `useScrollTo` для вызова внутри обычного обработчика или функции. Принимает те же цели и параметры.
- **`useIsMobile`** — возвращает `boolean` для переключения размеров шрифта и других адаптивных вариантов по breakpoint. По умолчанию используется `BREAKPOINT_MOBILE`, при необходимости передай breakpoint вручную. Хук работает только на клиенте: в SSR-проектах его нельзя использовать в серверных компонентах без client boundary. Во время SSR `window` недоступен, поэтому начальное значение не отражает реальную ширину viewport до гидрации.
  ```tsx
  const isMobile = useIsMobile(BREAKPOINT_TABLET);

  <PromoPageTitle className={isMobile ? 'ts-600-3xl' : 'ts-600-5xl'}>
    Заголовок
  </PromoPageTitle>
  ```

---

## 2. Дизайн-токены

Все токены — CSS-переменные в `:root` (`src/assets/Style/`). Применяй их в кастомном CSS, в пропсах вида `color` / `backgroundColor` и в инлайн-`style`.

В проектах на **Tailwind (v4)** предпочитай arbitrary-value классы вместо инлайн-`style` — так токен проходит через утилиты Tailwind и не плодит инлайновые стили:

```tsx
// предпочтительно (Tailwind v4)
<p className="text-[var(--primitive-primary)] bg-[var(--bg-brand-1)]">…</p>
// эквивалент через style
<p style={{ color: 'var(--primitive-primary)', background: 'var(--bg-brand-1)' }}>…</p>
```

### 2.1 Цвет (`color.css`)
Группы переменных (используй по семантике, не по конкретному hex):

| Группа | Префикс | Назначение |
|---|---|---|
| Примитивы | `--primitive-*` | базовая палитра: `primary` (#191919 — основной текст), `secondary` (вторичный текст), `neutral-1…4`, `default` (белый), `brand`, `error`, `success`, `warning` |
| Фоны | `--bg-*` | фоны поверхностей и статусов с тональными шкалами `1…5` (`--bg-brand-1` … `--bg-brand-5`, аналогично error/success/warning) |
| Контейнеры | `--container-default`, `--container-transparent-1/2` (+ `-inverse`) | заливки карточек и полупрозрачных слоёв |
| Страница / попап | `--page-primary/secondary`, `--popup-primary/secondary` | фоны страницы и всплывающих слоёв |
| Оверлеи | `--overlay-popup`, `--overlay-primary-alpha-050` | затемнение под модалками/шитами |
| Категорийные | `--category-sand … --category-emerald` | 10 цветов для аватаров/категорий |
| Полупрозрачные | `--translucent-primitives-*` | текст/иконки поверх изображений |
| Состояния | `--state-*-active` | цвет активного (pressed) состояния |

Правило: текст — `--primitive-primary` / `--primitive-secondary`; статусные акценты — `--bg-error/success/warning/brand`; фоны блоков — `--bg-neutral-*` или `--container-*`.

### 2.2 Типографика (`font.css`)
Шрифт — **TT Norms Tochka Extended** (подключается автоматически). Применяется **классами**, а не переменными. Формат: `ts-{вес}-{размер}`.

- Веса: `400` (Regular), `500` (Medium), `600` (DemiBold).
- Размеры: `7xl 60` · `6xl 48` · `5xl 42` · `4xl 36` · `3xl 30` · `2xl 24` · `xl 20` · `l 18` · `m 16` · `s 14` · `xs 12` · `xxs 10` (px).
- Примеры: `ts-600-2xl` (заголовок 24/600), `ts-500-l` (текст кнопки 18/500), `ts-400-s` (описание 14/400).

```tsx
<p className="ts-500-m">Заголовок ячейки</p>
<span className="ts-400-s">Подпись</span>
```
Многие компоненты принимают типографический класс пропсом (`Cell.titleClassName`, `descriptionClassName` и т.п.).

### 2.3 Отступы (`spacing.css`)
Шкала `--spacing-{n}x`, базовый шаг 4px: `0-5x`=2 · `1x`=4 · `1-5x`=6 · `2x`=8 · `2-5x`=10 · `3x`=12 · `3-5x`=14 · `4x`=16 · `4-5x`=18 · `5x`=20 · `6x`=24 · `7x`=28 · `7-5x`=30 · `8x`=32 · `10x`=40 · `12x`=48 · `14x`=56 · `16x`=64 · `20x`=80 · `24x`=96 · `30x`=120 · `40x`=160.

Семантические алиасы для раскладки страницы:
- `--page-top-padding` / `--page-bottom-padding` (32px), `--page-bottom-padding-with-chat` (64px), `--page-horizontal-padding` (20px).
- Отступы между блоками контента: `--content-section-list-spacing` (48px, между секциями), `--content-group-list-spacing` (32px, между группами), `--content-element-list-spacing` (16px, между элементами).

### 2.4 Скругления (`radius.css`)
Шкала `--rounding-{n}x` (2…96px) + `--rounding-pill` (999px). Предпочитай **семантические** алиасы, а не сырые значения:
`--button-rounding-strong/weak`, `--cell-rounding-strong/weak`, `--chip-rounding-*`, `--card-rounding`, `--form-rounding(-weak)`, `--popup-rounding-*`, `--checkbox-rounding`, `--tag-rounding(-strong/-weak)`, `--slider-rounding`.

### 2.5 Тени (`shadow.css`)
Готовые тени-переменные по назначению:
- Поверхности: `--Raised`, `--Card`, `--Popout`, `--Floating`, `--Brand`, `--Popup-Inverse`, `--Drawer-Left/Right`.
- Состояния: `--Hovered`, `--Pressed`.
- Sticky: `--Sticky-Left`, `--Sticky-Top`.
- Бордеры (через inset-тень): `--Top-Line`, `--Bottom-Line`, `--Left-Line`, `--Right-Line`.

### 2.6 Иконки (`src/assets/Icon/`)

**Subpath-импорты** — единственный способ подключить иконки из пакета:

| Subpath | Содержимое | Конфликты |
|---|---|---|
| `@pluginwoman/t-ds/icons` | Баррель всех размеров | 24px побеждает при совпадении имён |
| `@pluginwoman/t-ds/icons/12/Filled` | 12px Filled | — |
| `@pluginwoman/t-ds/icons/16/Stroked` | 16px Stroked | — |
| `@pluginwoman/t-ds/icons/20/Filled` | 20px Filled | — |
| `@pluginwoman/t-ds/icons/20/Stroked` | 20px Stroked | — |
| `@pluginwoman/t-ds/icons/24/Stroked` | 24px Stroked | — |

```tsx
// Большинство случаев — баррель, 24px версия
import { Circle, ChevronRight, Checkmark } from '@pluginwoman/t-ds/icons'

// Когда нужен конкретный размер иконки с конфликтующим именем
import { InformationCircle } from '@pluginwoman/t-ds/icons/20/Filled'
import { Checkmark } from '@pluginwoman/t-ds/icons/16/Stroked'
```

- Оборачивай иконку в `.ds-icon` с размерным модификатором — она наследует `currentColor` и масштабируется:
  ```tsx
  <span className="ds-icon ds-icon--m" aria-hidden="true"><ChevronRight /></span>
  ```
  Размеры: `--2xs` 12 · `--xs` 16 · `--s` 20 · `--m` 24 · `--l` 32 (плюс служебные 18/30 через `--icon-size`).
- В большинстве компонентов иконку передают как `ReactNode` в проп (`icon`, `leftAccessory`, `left`) — обёртку `.ds-icon` компонент добавляет сам.

**Как работает цвет иконки.** SVG-иконки в DS не имеют явного атрибута `fill` — они рассчитаны на `fill: currentColor` из CSS. Механика:
1. `.ds-icon svg` (и аналогичные правила внутри компонентов DS) выставляют `fill: currentColor`.
2. Чтобы иконка стала нужного цвета, достаточно поставить CSS-свойство `color` на обёртку или на сам элемент иконки.

```tsx
// через обёртку .ds-icon — цвет задаётся на span
<span className="ds-icon ds-icon--m" style={{ color: 'var(--primitive-brand)' }} aria-hidden="true">
  <Plus />
</span>

// через проп style на иконке — работает там, где компонент уже применяет fill: currentColor
<Checkmark style={{ color: 'var(--primitive-success)' }} />

// через CSS-класс родительского компонента
.my-button { color: var(--primitive-error); }
// → SVG внутри автоматически станет красным
```

> Если иконка отображается чёрной вместо нужного цвета — значит в обёртке компонента нет `fill: currentColor` на `svg`. Добавь это правило в CSS компонента:
> ```css
> .my-component svg { fill: currentColor; }
> ```

---

## 3. Каталог компонентов

Группы ниже — для навигации. Для каждого компонента: назначение, ключевые пропсы (полный список — в `*.tsx`, пропсы документированы JSDoc), правила. Все компоненты принимают `className`; почти все интерактивные — `isDisabled`, многие — `isLoading`.

### 3.1 Действия и кнопки
- **`Button`** — основное действие. `variant` `primary` (по умолч.) / `secondary` / `transparent` / `white`; `size` `xl/l/m/s/xs` (дефолт `m`); `isHugWidth` (ширина по содержимому вместо фиксированной); `leftAccessory`/`rightAccessory` (иконки по бокам от текста); `isLoading`, `isDisabled`, `type`, `onClick`. Текст — обязательный `children`.

- **`IconButton`** — квадратная кнопка с одной иконкой без текста. `icon` (обязательный, голый `ReactNode` — компонент оборачивает сам), `ariaLabel` (обязательный), `variant` `primary/secondary/transparent/white`; `size` `xl/l/m/s/xs` (дефолт `m`); `isLoading`, `isDisabled`, `onClick`.
  > Не используй `Button` с `leftAccessory` без `children` — для иконочных кнопок всегда `IconButton`.
- **`HeaderButton`** — кнопка в начале экрана или сразу под заголовком. `variant` `primary/secondary/danger`; `icon`; `isLoading`, `isDisabled`.
- **`PageAction`** — крупный элемент действия/перехода на странице, обычно располагается внизу страницы или в 3 колонке. `title`, `description`, `leftAccessory` (иконка 30px), `variant` `default/danger`, `onClick`, `isDisabled`.
- **`Chip`** — компактный выбор/фильтр, часто применяется в фильтрах. `variant` `chip` (множественный выбор) / `tab` (переключение контента, поддерживает `badge`) / `dropdown` (фильтр со встроенным попапом: `popupContent`, `hasSearch`, `value`, `isLoading`, `isEmpty`) / `action` (действие с `onClose`). `isSelected`, `leftAccessory` `icon/logo/logo-stack`. Обычно используется группой.
- **`AvatarCheckbox`** — компактный контрол выбора с состояниями checked/disabled. `size` `m/s`, `isChecked`, `isDisabled`, `onClick`.

### 3.2 Формы и ввод
- **`Input`** — однострочное текстовое поле. `label`, `description`, `errorMessage` + `isError`, `placeholder`, `type` (`text/password/email/tel/url`), `variant` (`default/white`), controlled `value`/`onChange`, `left`/`right` слоты, `hasHelpIcon`+`helpText`, `format` (`number/currency/percent/phone`). Для `format="phone"` наружу передаётся нормализованное значение в формате `+7 ...`.
- **`TextArea`** — многострочное, автоувеличение. То же + `maxLength` (включает счётчик).
- **`Search`** — поле поиска с иконкой и очисткой. `value`, `onChange`, `placeholder`, `className`.
- **`Dropdown`** — выбор из списка. controlled `value`/`onChange`, `children` — обычно `Cell`; `placeholder`, `isError`/`errorMessage`, `hasSearch`, `isLoading`, `isEmpty`, `hasHelpIcon`/`helpText`, `right` слот.
  > **Правила сборки списка опций через `Cell`:**
  > 1. Отключай `hasLeftAccessory={false}` и `hasRightAccessory={false}` у каждого `Cell` если аксессуары не нужны — иначе по умолчанию рендерится `Avatar` слева и `ChevronRight` справа, что ломает внешний вид.
  > 2. Выделяй текущий выбор иконкой `Checkmark` в правом аксессуаре, цвет иконки `--primitive-success`. Цвет текста не меняй.
  > 3. Типографика заголовка зависит от состава строки:
  >    - Без аватара слева (независимо от наличия subtitle/description) → `titleClassName="ts-400-m"`
  >    - С аватаром слева и при наличии subtitle и/или description → `titleClassName="ts-500-m"` (дефолт Cell)
  >    - На адаптиве (`≤1023px`) всегда повышай размер до `l`: `ts-400-l` / `ts-500-l` соответственно
  > 4. В проп `value` у `Dropdown` передавай **человекочитаемую строку** (label), а не внутренний ключ.
  > ```tsx
  > <Dropdown label="Вариант" value={currentLabel} hasHelpIcon={false}>
  >   {options.map(opt => (
  >     <Cell
  >       key={opt.value}
  >       title={opt.label}
  >       hasLeftAccessory={false}
  >       hasRightAccessory={opt.value === currentValue}
  >       titleClassName="ts-400-m"
  >       rightAccessory={opt.value === currentValue
  >         ? <CellRightAccessory variant="icon" icon={<Checkmark style={{ color: 'var(--primitive-success)' }} />} />
  >         : undefined}
  >       onClick={() => setValue(opt.value)}
  >     />
  >   ))}
  > </Dropdown>
  > ```
- **`Checkbox`** — `isChecked`, `isIndeterminate`, `isDisabled`, `onChange(checked)`, `label` (aria).
- **`Radio`** — единичный выбор в группе. `isSelected`, `onChange`, `isDisabled`, `label`.
- **`Switch`** — переключатель двух состояний. `isSelected`, `onChange(isSelected)`, `isDisabled`, `label`.
- **`FormCell`** — строка формы с управляющим элементом справа. `title`, `subtitle`, `description`, `left` (Avatar), `right` (`Switch`/`Checkbox`/`Radio`), `variant` `single/stack-top/stack-middle/stack-bottom` (для группировки в стек), `children`.
- **`ActionFormCell`** — интерактивная строка-действие в форме/списке. `title`, `description`, `left` (иконка 24), `right` (спиннер), `variant` (как у FormCell), `onClick`, `isDisabled`.

> Группировка ячеек в «карточку»: используй `variant="stack-top" | "stack-middle" | "stack-bottom"` для крайних и средних элементов, `single` — для одиночной.

### 3.3 Ячейки и списки
- **`Cell`** — универсальная строка списка. `title`, `subtitle`, `description`, `leftAccessory`/`rightAccessory` (любой `ReactNode`; слот рендерится только при наличии пропа), `verticalPadding` `none/2x/3x/4x`, типографика и цвета пропсами (`titleClassName`, `titleColor`, …), `onClick` (делает строку интерактивной).
- **`LinkCell`** — ячейка-ссылка с заголовком, описанием и индикатором загрузки. `title`, `description`, `isLoading`, `onClick`.
- **`CellLeftAccessory`** — готовые левые аксессуары. `variant`: `avatar` / `icon-30` / `icon-24` / `icon-18` / `card-preview` / `avatar-checkbox` / `add-button` / `custom`. `icon`, `avatarLabel`, `isChecked`, `onClick`.
- **`CellRightAccessory`** — готовые правые аксессуары (большой набор `variant`: текстовые `text-l/m/s`, иконочные, `checkbox`/`radio`/`switch`, `disclosure`, `badge`, `stepper`, `spinner-*`, составные `text-m-icon-*`, табличные `table-text-*` и др.). `text`, `secondaryText`, `icon`, `value`, `isChecked`/`onCheckedChange`, `onStep`.

Аксессуары Cell подключаются тремя способами:
```tsx
// 1. Выключить — не передавать проп
<Cell title="Без аксессуара" />

// 2. Пресет из DS
<Cell
  leftAccessory={<CellLeftAccessory variant="avatar" avatarLabel="AB" />}
  rightAccessory={<CellRightAccessory variant="disclosure" />}
/>

// 3. Кастомный компонент
<Cell
  leftAccessory={<Avatar imageUrl="..." size="m" />}
  rightAccessory={<Switch isSelected onChange={handleChange} />}
/>
```
- **`AccordeonCell`** — раскрываемая секция. `title`, `description`, `children` (контент), `size` `xl/2xl`, `chevronPosition` `title/edge`, controlled `isOpen`/`onOpenChange` или `defaultOpen`, `contentSpacing`/`listSpacing` (`0/0-5x/1x/2x/4x/6x`), правый аксессуар.

> Предпочитай `CellLeftAccessory` / `CellRightAccessory` ручной вёрстке аксессуаров в `Cell`.

### 3.4 Таблицы
- **`Table`** — грид-обёртка. `columns` (число колонок) или `gridTemplateColumns` (CSS, имеет приоритет), `children` — `TableCell`.
- **`TableCell`** — ячейка таблицы. `title`, `hasDescription`/`description`, `hasTag`/`tag`, `hasLeftAccessory`/`leftAccessory` (Avatar/Icon 24), `hasRightAccessory`/`rightAccessory`, `titleStyle` `400/500/600`, `isEdit` (title как input: `placeholder`, `onTitleChange`), `isError` (правый слот → иконка Info), `isDisabled`, `backgroundColor`, `onClick`.

### 3.5 Статусы, бейджи, индикаторы
- **`Tag`** — метка/статус. `shape` `circle/square`, `variant` `filled/outlined`, `size` `xl/l/m/s`.
- **`Badge`** — счётчик/индикатор. `value` (число; `>99` → `99+`), `size` `m/s/xs`, кастом `color`/`textColor`.
- **`Spinner`** — индикатор загрузки. Кастомизация через `style` (размер/цвет).
- **`LinearProgress`** — линейный прогресс. `variant` `percent` (value 0–100) / `steps` (value = выполнено, `maxSteps`), `progressColor`/`trackColor`.
- **`Avatar`** — изображение/иконка/инициалы. Приоритет: `imageUrl` → `icon` → `label`. `size` (`2xl…2xs` или число 16–120), `shape` `circle/superellipse/square`.

### 3.6 Уведомления и фидбек
- **`Alert`** — короткое текстовое уведомление. `type` `success/error/neutral`, `textAlign` `left/center`, текст — `children`.
- **`ContextualNotification`** — компактный блок с иконкой/аватаром, заголовком, действием и крестиком. `text`, `title`/`hasTitle`, `accessory` `icon/avatar` (+ `icon`/`avatar`), `hasAction`/`actionLabel`/`onActionClick`, `hasSpinner`, `hasCloseIcon`/`onClose`, `size` `s/m`.
- **`FeedbackBanner`** — сбор обратной связи, по клику открывается модалка, обычно располагается внизу страницы `children` (текст), `primaryAction`/`secondaryAction` (`{label, onClick, isDisabled}`).
- **`Tooltip`** — подсказка по наведению/фокусу. `trigger`, `children` (контент), `placement` `right/left`, controlled `isOpen`/`onOpenChange` или `defaultOpen`.

### 3.7 Оверлеи (составные)
- **`Modal`** (+ `ModalHeader`, `ModalFooter`) — окно с затемнением. `Modal`: `isOpen`, `onClose`, `header`, `footer`, `children`, `isOverlayCloseEnabled`. `ModalHeader`: `title`, `leftAccessory`/`hasDefaultBackArrow`/`onLeftAccessoryClick`, `onClose`. `ModalFooter`: `layout` `1-button/2-buttons/2-horizontal-buttons/empty`, `primaryAction`/`secondaryAction`, `description`.
- **`Drawer`** (+ `DrawerHeader`, `DrawerHeaderTitle`, `DrawerFooter`) — боковая панель. Аналогично Modal; `DrawerHeader.titleVariant` `text-m/text-l`; `DrawerFooter.layout` `1-button/2-buttons/2-horizontal-buttons/empty`.
- **`ActionSheet`** (+ `ActionSheetHeader`, `ActionSheetButton`, `ActionSheetFooter`) — нижняя панель действий. `ActionSheet`: `isOpen`, `onClose`, `header`, `children` (кнопки), `footer`, `isOverlayCloseEnabled`. `ActionSheetButton`: `title`, `description`/`hasDescription`, `icon`/`hasIcon`, `variant` `default/danger`, `isLoading`. `ActionSheetFooter` — кнопка «Отмена».
- **`BottomSheet`** (+ `BottomSheetHeader`, `BottomSheetSearch`) — нижняя панель с контентом; `isOpen`, `onClose`, `header`, `children`. `BottomSheetHeader` задаёт заголовок и действия, `BottomSheetSearch` — поиск внутри панели.
- **`ContextMenu`** — всплывающее меню действий у элемента. `trigger`, `isOpen`/`onClose`, `placement` `right/left`, `items: {key, label, icon?, variant?, onClick?, isDisabled?}[]`.

> Все оверлеи управляемые: видимость через `isOpen`, закрытие — обработай `onClose`. Закрытие по Escape/оверлею встроено.

> **Паддинги внутри оверлеев.** `Drawer` и `Modal` уже управляют горизонтальными отступами контентной зоны (`.modal__content-inner`, `.drawer__content-inner`). Компонент, который рендерится внутри, **не должен добавлять свои горизонтальные паддинги** — иначе отступы задвоятся. Если компоненту нужно управлять паддингами самостоятельно (например, `FlowResultView`), сбрось паддинг родительского контейнера через CSS:
> ```css
> .my-component__modal .modal__content-inner {
>   padding: 0;
> }
> ```

### 3.7b Специализированные оверлейные компоненты
- **`FlowResultView`** — экран результата флоу (успех / ошибка / ожидание и т.п.). Рендерится внутри `Modal` или `Drawer`. Управляет собственными отступами — у родительского `.modal__content-inner` / `.drawer__content-inner` нужно обнулить `padding: 0` через CSS.

### 3.8 Навигация и раскладка
- **`PageLayout`** — корневая обёртка страницы. `size` `s/m/l` (макс. ширина контента; **строго lowercase**), `navigationBar` (обычно `NavigationBar`), `rightPanel` (только при `size="s"`), `topOffset` (высота фиксированного хедера над макетом, число px, по умолч. `0`), `children`. Адаптивен: ≤1023px nav становится верхней sticky-полосой, на десктопе — боковой колонкой.
- **`NavigationBar`** — панель страницы с заголовком; **сама переключается** десктоп (>1023px) / адаптив (≤1023px). Десктоп: `title`, `description`, breadcrumb `rootLinkLabel`, `items` (`link`/`step`), кнопки back/action. Адаптив: `titleVariant` `none/title/title-description/step-progress/percent-progress/image`, `progress`, левая/правые кнопки (`rightAccessoryVariant`), `isInverted`. Общее: `isSticky`.
- **`TabsCarousel`** — горизонтальный скроллируемый список табов с анимацией переключения. `tabs` (массив `{value, label, badge?}`), `value`/`onChange` (controlled), `children` (контент активного таба). Поддерживает `Badge` на каждом табе.
- **`MainPageNavigationBar`** (+ `SCINavigationButton`) — главная навигация сайта (логотип, разделы, клиент, быстрые действия). `activeNavItem` `main/payments/services`, флаги `has*` (live/select/subscription/tin/newPush), `isSecondLine`, данные клиента и колбэки `onNav*Click`. Адаптивна.
- **`Footer`** (+ `FooterIconButton`) — фиксированный подвал с действиями, `position: sticky; bottom: 0`. `layout` `1-button/2-buttons-in-line/3-buttons/page-control-button/stepper-button`, `primaryAction`/`secondaryAction` (`{label, onClick, isDisabled, isLoading}`), `iconAction`, степпер (`stepperValue`, `onStepperIncrease/Decrease`), пагинация (`pageControlCount/Value/onPageControlChange`), `description`, управляемая видимость `isVisible`. При передаче `isVisible` футер становится отдельным fixed-слоем (`right: 0; bottom: 0; left: 0`) и применяет стандартный переход `animate-footer-in/out` (`0.3s ease-out`, `translateY(100%)` в скрытом состоянии). Правила показа и скрытия вычисляй в родительском компоненте, например `heroPassed && !ctaVisible && !isScrollingToForm`. Размещай обычный Footer последним элементом потока контента, на всю ширину; не заворачивай его в контейнер с `overflow`, иначе sticky сломается.
- **`Stepper`** — управление числовым значением. `value`, `onChange`, `min`, `max`, `step`, `size` `s/m`, `disabled`, `readonly`.

> **`PageLayout` + `MainPageNavigationBar` (фиксированный хедер над макетом).** `MainPageNavigationBar` — `sticky; top: 0; height: 74px; z-index: 100`, а `PageLayout` тянется на `min-height: 100vh` и сам делает свою nav-колонку sticky/fixed по `top: 0`. Если ничего не сделать — получишь (а) лишний вертикальный скролл (`74px + 100vh`), (б) наложение боковой nav-колонки на хедер, (в) при `size="l"`/широких экранах fixed-колонку поверх хедера.
> **Решение — один проп, без ручных CSS-оверрайдов:** передай высоту хедера в `topOffset`. Он подставляется в переменную `--page-layout-top-offset`, которая уже учтена во всех `min-height`, sticky/fixed `top` и `height: calc(100vh - offset)` макета.
> ```tsx
> <>
>   <MainPageNavigationBar activeNavItem="main" />
>   <PageLayout size="m" topOffset={74} navigationBar={<NavigationBar title="Платежи" isSticky />}>
>     {/* контент */}
>   </PageLayout>
> </>
> ```
> Если когда-нибудь высота `MainPageNavigationBar` изменится — обнови число в `topOffset` (текущая — 74px).

### 3.9 Виджеты и промо
- **`Widget`** (+ `WidgetTitle`, `WidgetTitleAccessory`) — блок с кликабельным заголовком и зоной контента. `Widget` принимает все пропсы `WidgetTitle` плюс `children`, `contentClassName`, `minContentHeight`. `WidgetTitle`: `title`, `description`/`hasDescription`, `hasChevron`, правый аксессуар (`rightAccessoryVariant`: `icon/link/link-icon/icon-icon/description/editing-mode/none/custom`, `rightAccessoryText`, `rightAccessoryIcon`, `onRightAccessoryClick`).
- **`PromoPageBanner`** — крупный хедер промо-страницы. Раздельные desktop/adaptive `title`/`description`, `buttonLabel`/`onButtonClick`, `image`/`imageSrc`, флаги `has*`. Адаптивен, ширина 100%.
- **`PromoPageCard`** — карточка контента промо-страницы. `title`, `description`, `avatar`, `image`/`imageSrc`, `isHorizontal`, флаги `has*`.
- **`PromoPageHorizontalCard`** — широкая карточка во всю ширину. `variant` `default/accent` (accent добавляет кнопку `buttonLabel`/`onButtonClick`), `title`, `description`, `image`.
- **`PromoPageTitle`** — заголовок промо-страницы: `ts-600-5xl` на desktop и `ts-600-3xl` на адаптиве.
- **`PromoPageSteps`** — блок последовательных шагов. `steps`, `hasTitle`, `title`; шаг поддерживает `tag`, `title`, `description`, `leftContent`, `image`/`imageSrc`. На адаптиве изображение располагается над текстом и занимает всю ширину.
- **`PromoPageCta`** — CTA-блок промо-страницы. `variant` `form/content`, `children`, `content`, `action`, `isSuccess`; success-состояние настраивается через `successTitle`, `successDescription`, `successAction`, `successImage`/`successImageSrc`, `successContent`.

Для перехода к секции по клику используй экспортируемые `scrollToElement` и `useScrollTo`. Целью может быть DOM-элемент, React ref или CSS-селектор. По умолчанию применяются параметры из промо-лендингов: нативная плавная прокрутка (`behavior: "smooth"`) и позиционирование цели по центру viewport (`block: "center"`).
```tsx
const ctaRef = useRef<HTMLElement>(null);
const scrollToCta = useScrollTo(ctaRef);

<PromoPageBanner onButtonClick={scrollToCta} />
<section ref={ctaRef}>...</section>
```

> **Промо-страницы:** перед созданием промо-экрана прочитай `design-skills/promo-pages.md`. Используй `PromoPageBanner` / `PromoPageCard` / `PromoPageHorizontalCard` там, где они подходят по смыслу; кастомные блоки допустимы для уникальной композиции, но только на DS-токенах, `ts-*` типографике и готовых интерактивных компонентах.

---

## 4. Типовые рецепты

**Dropdown с выделением выбранного элемента:**
```tsx
const options = [{ value: 'a', label: 'Вариант А' }, { value: 'b', label: 'Вариант Б' }]
const [current, setCurrent] = useState('a')
const currentLabel = options.find(o => o.value === current)?.label ?? ''

<Dropdown label="Выбор" value={currentLabel} hasHelpIcon={false}>
  {options.map(opt => (
    <Cell
      key={opt.value}
      title={opt.label}
      hasLeftAccessory={false}
      hasRightAccessory={opt.value === current}
      titleClassName="ts-400-m"
      rightAccessory={opt.value === current
        ? <CellRightAccessory variant="icon" icon={<Checkmark style={{ color: 'var(--primitive-success)' }} />} />
        : undefined}
      onClick={() => setCurrent(opt.value)}
    />
  ))}
</Dropdown>
```

**Группа ячеек-формы со свитчами:**
```tsx
<FormCell variant="stack-top"    title="Push" right={<Switch isSelected={a} onChange={setA} />} />
<FormCell variant="stack-middle" title="Email" right={<Switch isSelected={b} onChange={setB} />} />
<FormCell variant="stack-bottom" title="SMS"   right={<Switch isSelected={c} onChange={setC} />} />
```

**Список с готовыми аксессуарами:**
```tsx
<Cell
  title="Перевод" description="Сегодня, 14:30"
  leftAccessory={<CellLeftAccessory variant="icon-24" icon={<Acquiring />} />}
  rightAccessory={<CellRightAccessory variant="text-m" text="−1 200 ₽" />}
  onClick={openDetails}
/>
```

**Модалка:**
```tsx
<Modal
  isOpen={open} onClose={close}
  header={<ModalHeader title="Подтверждение" onClose={close} />}
  footer={<ModalFooter layout="2-buttons"
    primaryAction={{ label: 'Подтвердить', onClick: submit }}
    secondaryAction={{ label: 'Отмена', onClick: close }} />}
>
  <p className="ts-400-m">Текст…</p>
</Modal>
```

**Страница (с фиксированным хедером сайта):**
```tsx
<>
  <MainPageNavigationBar activeNavItem="main" />
  {/* topOffset={74} компенсирует высоту хедера — без него лишний скролл и наложение панелей */}
  <PageLayout size="m" topOffset={74} navigationBar={<NavigationBar title="Платежи" isSticky />}>
    {/* контент, отступы между блоками — через --content-*-list-spacing */}
  </PageLayout>
  <Footer layout="1-button" primaryAction={{ label: 'Продолжить', onClick: next }} />
</>
```

---

## 5. Чеклист перед сдачей UI
- [ ] Стили подключены (`import '@pluginwoman/t-ds/style'`); в reset добавлен `-webkit-font-smoothing: antialiased`.
- [ ] Нет хардкода цвета/шрифта/отступа/радиуса/тени — только токены и `ts-*`-классы (в Tailwind — `text-[var(--…)]`).
- [ ] `size`/`variant`/`layout` заданы в нижнем регистре.
- [ ] При фиксированном хедере над `PageLayout` задан `topOffset`; `Footer` — последний сиблинг потока.
- [ ] Использованы готовые компоненты вместо самописных аналогов.
- [ ] Аксессуары ячеек — через `CellLeftAccessory`/`CellRightAccessory`.
- [ ] Оверлеи управляются `isOpen` и корректно закрываются по `onClose`.
- [ ] Интерактивные элементы имеют `onClick`/`onChange`; иконочные кнопки реализованы через `IconButton` с обязательным `ariaLabel`.
- [ ] Иконки обёрнуты в `.ds-icon --{size}` (или переданы пропсом, где компонент оборачивает сам).
- [ ] В `Dropdown` у `Cell`-элементов списка отключены ненужные `hasLeftAccessory`/`hasRightAccessory`; `value` — человекочитаемая строка; выбранный элемент выделен галочкой.
- [ ] Компоненты внутри `Modal`/`Drawer` не добавляют собственных горизонтальных паддингов; если компонент управляет отступами сам — обнулён `.modal__content-inner` / `.drawer__content-inner` через CSS.
