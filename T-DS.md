# T Design System

This project vendors the source of [PluginWoman/t-ds](https://github.com/PluginWoman/t-ds)
in [`vendor/t-ds`](./vendor/t-ds). The package is a React component library, while this
calculator is a static Next export; its source CSS entrypoints are therefore loaded directly
from `index.html` before the project-level overrides.

The live page now uses the original T-DS tokens, typography, icon base styles, spacing,
radii, shadows, scrollbar and animation styles. Existing static markup remains intact so
that the calculator's current interaction code is not replaced by a non-functional React
runtime.

When the calculator is migrated back to a React build, use the vendored `src/index.ts`
entrypoint and replace the corresponding static controls with T-DS components (`Button`,
`IconButton`, `Input`, `Chip`, `AccordeonCell` and `Radio`).

The vendored source includes its MIT license and upstream `AGENTS.md`; retain both when
updating it.
