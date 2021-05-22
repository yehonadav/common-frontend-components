import {baseColors} from './baseColors'

export const borders = {
  default: 'solid 1px rgba(255, 255, 255, 0.4)',
  invisible: '1px solid rgba(0, 0, 0, 0.0)',
  card: `1px solid ${baseColors.border}`,
  primary: `1px solid ${baseColors.primary}`,
  secondary: `1px solid ${baseColors.secondary}`,
  error: `1px solid ${baseColors.error}`,
  warning: `1px solid ${baseColors.warning}`,
  info: `1px solid ${baseColors.info}`,
  success: `1px solid ${baseColors.success}`,
};