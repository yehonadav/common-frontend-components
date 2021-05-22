import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { colors } from '../../services/theme/colors';
import { boxShadows } from '../../services/theme/boxShadows';

export const BigRoundSecondaryButton = withStyles({
  root: {
    background: `transparent linear-gradient(326deg, ${colors.btn.secondary} 0%, #8F2A5D 100%) 0% 0% no-repeat padding-box`,
    boxShadow: boxShadows.boxShadowBtn,
    borderRadius: 34,

    font: "normal normal 600 18px/12px Segoe UI",
    letterSpacing: 0,
    color: "#FFFFFF",

    textTransform: 'none',

    padding: "28px 38px",

    // boxShadow: `0 2px 2px 0 ${style_vars.colors.blue}20, 0 3px 1px -2px ${style_vars.colors.blue}32, 0 1px 5px 0 ${style_vars.colors.blue}19`,
    '&:hover, &:active, &:focus': {
      background: "transparent linear-gradient(326deg, #fe1c8d 0%, #b13473 100%) 0% 0% no-repeat padding-box",

      boxShadow: boxShadows.boxShadowSecondaryBtnFocus,
    },
  },
})(Button);

export const BigRoundPrimaryButton = withStyles({
  root: {
    backgroundColor: colors.primary,
    boxShadow: boxShadows.boxShadowBtn,
    borderRadius: 34,

    font: "normal normal 600 18px/12px Segoe UI",
    letterSpacing: 0,
    color: "#FFFFFF",

    textTransform: 'none',

    padding: "28px 38px",

    // boxShadow: `0 2px 2px 0 ${style_vars.colors.blue}20, 0 3px 1px -2px ${style_vars.colors.blue}32, 0 1px 5px 0 ${style_vars.colors.blue}19`,
    '&:hover, &:active, &:focus': {
      backgroundColor: colors.btn.primary_focused,

      boxShadow: boxShadows.boxShadowPrimaryBtnFocus,
    },
  },
})(Button);

export const RoundPrimaryButton = withStyles({
  root: {
    backgroundColor: colors.primary,
    boxShadow: boxShadows.boxShadowBtn,
    borderRadius: 34,

    font: "normal normal 600 16px/11px Segoe UI",
    letterSpacing: 0,
    color: "#FFFFFF",

    textTransform: 'none',

    padding: "18px 28px",

    '&:hover, &:active, &:focus': {
      backgroundColor: colors.btn.primary_focused,
      boxShadow: boxShadows.boxShadowPrimaryBtnFocus,
    },
  },
})(Button);

export const RoundSecondaryButton = withStyles({
  root: {
    background: `transparent linear-gradient(326deg, ${colors.btn.secondary} 0%, #8F2A5D 100%) 0% 0% no-repeat padding-box`,
    boxShadow: boxShadows.boxShadowBtn,
    borderRadius: 34,

    font: "normal normal 600 16px/11px Segoe UI",
    letterSpacing: 0,
    color: "#FFFFFF",

    textTransform: 'none',

    padding: "18px 28px",

    '&:hover, &:active, &:focus': {
      background: "transparent linear-gradient(326deg, #fe1c8d 0%, #b13473 100%) 0% 0% no-repeat padding-box",
      boxShadow: boxShadows.boxShadowSecondaryBtnFocus,
    },
  },
})(Button);

export const HotelAppbarProfileButton = withStyles({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",

    borderRadius: 34,
    fontSize: 15,
    fontWeight: 400,
    fontFamily: "Segoe UI",
    letterSpacing: 0,
    color: colors.btn.secondary,

    textTransform: 'none',

    padding: "12px 20px",

    '&:hover, &:active, &:focus': {
      backgroundColor: `${colors.secondary}15`,
    },
  },
})(Button);

export const RoundGradientPrimaryButton = withStyles({
  root: {
    background: `transparent linear-gradient(326deg, ${colors.primary} 0%, #8F2A5D 120%) 0% 0% no-repeat padding-box`,

    backgroundColor: colors.primary,
    boxShadow: boxShadows.boxShadowBtn,
    borderRadius: 34,

    font: "normal normal 600 16px/11px Segoe UI",
    letterSpacing: 0,
    color: "#FFFFFF",

    textTransform: 'none',

    padding: "18px 28px",

    '&:hover, &:active, &:focus': {
      backgroundColor: colors.btn.primary_focused,
      background: `transparent linear-gradient(326deg, ${colors.primary} 0%, #b13473 120%) 0% 0% no-repeat padding-box`,

      boxShadow: boxShadows.boxShadowPrimaryBtnFocus,
    },
  },
})(Button);

export const OutlinedPrimaryButton = withStyles({
  root: {
    borderRadius: 34,

    fontSize: 18,
    fontWeight: 400,
    fontFamily: "Segoe UI",
    letterSpacing: 0,
    color: colors.primary,
    paddingLeft: 25,
    paddingRight: 30,
    textTransform: 'none',
    borderWidth: "medium",
    borderColor: colors.primary,

    // boxShadow: `0 2px 2px 0 ${style_vars.colors.blue}20, 0 3px 1px -2px ${style_vars.colors.blue}32, 0 1px 5px 0 ${style_vars.colors.blue}19`,
    '&:hover, &:active, &:focus': {
      boxShadow: boxShadows.boxShadowNewChatButton,
      borderWidth: "medium",
    },
  },
})((props) =>
  <Button
    variant={"outlined"}
    children={"New chat"}
    color={"primary"}
    {...props}
  />
);

export const RoundWarningButton = withStyles({
  root: {
    background: `transparent linear-gradient(326deg, ${colors.warning} 0%, #8F2A5D 100%) 0% 0% no-repeat padding-box`,
    boxShadow: boxShadows.boxShadowBtn,
    borderRadius: 34,

    font: "normal normal 600 16px/11px Segoe UI",
    letterSpacing: 0,
    color: "#FFFFFF",

    textTransform: 'none',

    padding: "18px 28px",

    '&:hover, &:active, &:focus': {
      background: `transparent linear-gradient(326deg, ${colors.warning} 0%, #b13473 100%) 0% 0% no-repeat padding-box`,
      boxShadow: boxShadows.boxShadowWarningBtnFocus,
    },
  },
})(Button);
