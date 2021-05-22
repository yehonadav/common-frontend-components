import {baseColors} from "./baseColors";
import { fade, Theme } from '@material-ui/core/styles';

export const boxShadows = {
  boxShadowBtn: "0px 3px 6px #00000029",
  boxShadowSecondaryBtnFocus: `0 14px 26px -12px #fe1c8d77, 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px #fe1c8d30`,
  boxShadowWarningBtnFocus: `0 14px 26px -12px ${baseColors.warning}77, 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px ${baseColors.warning}30`,
  boxShadowPrimaryBtnFocus: `0 14px 26px -12px #7bcbff77, 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px #7bcbff30`,
  boxShadowCustomChip: `0 14px 26px -12px #9bb8fb77, 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px #9bb8fb30`,
  boxShadowNewChatButton: `0 14px 26px -12px #7bcbff77, 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px #7bcbff30`,
  boxShadowMenu: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  boxShadowPrimary: `0 2px 2px 0 ${baseColors.primary}20, 0 3px 1px -2px ${baseColors.primary}32, 0 1px 5px 0 ${baseColors.primary}19`,
  boxShadowSelectPopper: "3px 6px 13px #00000029",
  boxShadowSelectInput: (theme:Theme) =>`${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
  boxShadowCookies: '0 0 18px rgba(0,0,0,.2)',
};