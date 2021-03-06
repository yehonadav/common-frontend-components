import {colors} from './colors'

export type Borders = {
  default: string;
  invisible: string;
  card: string;
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
}

export const borders:Borders = {
  default: 'solid 1px rgba(255, 255, 255, 0.4)',
  invisible: '1px solid rgba(0, 0, 0, 0.0)',
  card: `1px solid ${colors.border}`,
  primary: `1px solid ${colors.primary}`,
  secondary: `1px solid ${colors.secondary}`,
  error: `1px solid ${colors.error}`,
  warning: `1px solid ${colors.warning}`,
  info: `1px solid ${colors.info}`,
  success: `1px solid ${colors.success}`,
};