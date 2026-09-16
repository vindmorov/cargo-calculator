export type { DsIconSvgProps } from './types';
export * from './12/Filled';
export * from './16/Stroked';
export * from './20/Filled';
export * from './20/Stroked';
export * from './24/Stroked';
// Graphic (colored) icons are NOT in this barrel — import from '@pluginwoman/t-ds/icons/20/Graphic'
// ChevronDown, Checkmark, InformationCircle and CrossCircle exist in multiple sizes — 24px wins in the barrel
// For 20px Checkmark import directly: import { Checkmark } from './20/Stroked'
// Minus also exists in 16px — 24px wins in the barrel
export { ChevronDown, Checkmark, InformationCircle, CrossCircle, Minus } from './24/Stroked';
