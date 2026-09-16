# Icons

Reusable icon components live in `icons.tsx` and are scaled through the shared `.ds-icon` class from `icon.css`.

## Pattern

- Add repeated SVGs to `icons.tsx` as React components.
- Export repeated icons from the package entry point.
- Wrap icons in `.ds-icon` so they inherit `currentColor` and scale to the container.
- Use abstract container sizes: `ds-icon--l` (32px), `ds-icon--m` (24px), `ds-icon--s` (20px), `ds-icon--xs` (16px), `ds-icon--2xs` (12px).

```html
<span class="ds-icon ds-icon--m" aria-hidden="true">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="..." />
  </svg>
</span>
```

Do not add raw SVG asset folders unless there is a direct runtime use for them.
