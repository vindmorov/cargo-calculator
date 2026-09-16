import React from 'react';
import type { DsIconSvgProps } from '../types';

export const Checkmark: React.FC<DsIconSvgProps> = (props) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" {...props}>
    <path d="M12.2499 3.33875C12.6153 2.92463 13.2479 2.88448 13.662 3.24989C14.076 3.61532 14.1153 4.24794 13.7499 4.662L6.24992 13.162C6.0673 13.3689 5.80698 13.4913 5.53117 13.4999C5.25527 13.5085 4.98808 13.4021 4.79289 13.2069L2.29289 10.7069C1.90237 10.3164 1.90237 9.68338 2.29289 9.29286C2.68341 8.90235 3.31643 8.90234 3.70695 9.29286L5.45402 11.0399L12.2499 3.33875Z" />
  </svg>
);

export const Minus: React.FC<DsIconSvgProps> = (props) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" {...props}>
    <path d="M13 7C13.5523 7.00001 14 7.44772 14 8C14 8.55227 13.5523 8.99999 13 9H3C2.44772 9 2.00001 8.55228 2 8C2 7.44772 2.44772 7 3 7H13Z" />
  </svg>
);
