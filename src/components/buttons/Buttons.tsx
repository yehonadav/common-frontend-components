import React, { FC, useMemo } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { colors } from '../../services/theme/colors';
import { boxShadows } from '../../services/theme/boxShadows';
import { ButtonProps } from '@material-ui/core/Button/Button'
import { useThemeStyle } from '../../services'

export const BigRoundSecondaryButton:FC<ButtonProps> = (props) => {
  const theme = useThemeStyle();
  const Btn = useMemo(()=> withStyles({
    root: {
      background: `transparent linear-gradient(326deg, ${theme.colors.btn.secondary} 0%, #8F2A5D 100%) 0% 0% no-repeat padding-box`,
      boxShadow: theme.boxShadows.boxShadowBtn,
      borderRadius: 34,

      font: "normal normal 600 18px/12px Segoe UI",
      letterSpacing: 0,
      color: "#FFFFFF",

      textTransform: 'none',

      padding: "28px 38px",

      // boxShadow: `0 2px 2px 0 ${style_vars.colors.blue}20, 0 3px 1px -2px ${style_vars.colors.blue}32, 0 1px 5px 0 ${style_vars.colors.blue}19`,
      '&:hover, &:active, &:focus': {
        background: "transparent linear-gradient(326deg, #fe1c8d 0%, #b13473 100%) 0% 0% no-repeat padding-box",

        boxShadow: theme.boxShadows.boxShadowSecondaryBtnFocus,
      },
    },
  })(Button), [theme]);
  return <Btn {...props}/>
}

export const BigRoundPrimaryButton:FC<ButtonProps> = (props) => {
  const theme = useThemeStyle();
  const Btn = useMemo(()=> withStyles({
    root: {
      backgroundColor: theme.colors.primary,
      boxShadow: theme.boxShadows.boxShadowBtn,
      borderRadius: 34,

      font: "normal normal 600 18px/12px Segoe UI",
      letterSpacing: 0,
      color: "#FFFFFF",

      textTransform: 'none',

      padding: "28px 38px",

      // boxShadow: `0 2px 2px 0 ${style_vars.colors.blue}20, 0 3px 1px -2px ${style_vars.colors.blue}32, 0 1px 5px 0 ${style_vars.colors.blue}19`,
      '&:hover, &:active, &:focus': {
        backgroundColor: theme.colors.btn.primary_focused,

        boxShadow: theme.boxShadows.boxShadowPrimaryBtnFocus,
      },
    },
  })(Button), [theme]);
  return <Btn {...props}/>
}

export const RoundPrimaryButton:FC<ButtonProps> = (props) => {
  const theme = useThemeStyle();
  const Btn = useMemo(()=> withStyles({
    root: {
      backgroundColor: theme.colors.primary,
      boxShadow: theme.boxShadows.boxShadowBtn,
      borderRadius: 34,

      font: "normal normal 600 16px/11px Segoe UI",
      letterSpacing: 0,
      color: "#FFFFFF",

      textTransform: 'none',

      padding: "18px 28px",

      '&:hover, &:active, &:focus': {
        backgroundColor: theme.colors.btn.primary_focused,
        boxShadow: theme.boxShadows.boxShadowPrimaryBtnFocus,
      },
    },
  })(Button), [theme]);
  return <Btn {...props}/>
}

export const RoundSecondaryButton:FC<ButtonProps> = (props) => {
  const theme = useThemeStyle();
  const Btn = useMemo(()=> withStyles({
    root: {
      background: `transparent linear-gradient(326deg, ${theme.colors.btn.secondary} 0%, #8F2A5D 100%) 0% 0% no-repeat padding-box`,
      boxShadow: theme.boxShadows.boxShadowBtn,
      borderRadius: 34,

      font: "normal normal 600 16px/11px Segoe UI",
      letterSpacing: 0,
      color: "#FFFFFF",

      textTransform: 'none',

      padding: "18px 28px",

      '&:hover, &:active, &:focus': {
        background: "transparent linear-gradient(326deg, #fe1c8d 0%, #b13473 100%) 0% 0% no-repeat padding-box",
        boxShadow: theme.boxShadows.boxShadowSecondaryBtnFocus,
      },
    },
  })(Button), [theme]);
  return <Btn {...props}/>
}

export const HotelAppbarProfileButton:FC<ButtonProps> = (props) => {
  const theme = useThemeStyle();
  const Btn = useMemo(()=> withStyles({
    root: {
      backgroundColor: "transparent",
      boxShadow: "none",

      borderRadius: 34,
      fontSize: 15,
      fontWeight: 400,
      fontFamily: "Segoe UI",
      letterSpacing: 0,
      color: theme.colors.btn.secondary,

      textTransform: 'none',

      padding: "12px 20px",

      '&:hover, &:active, &:focus': {
        backgroundColor: `${theme.colors.secondary}15`,
      },
    },
  })(Button), [theme]);
  return <Btn {...props}/>
}

export const RoundGradientPrimaryButton:FC<ButtonProps> = (props) => {
  const theme = useThemeStyle();
  const Btn = useMemo(()=> withStyles({
    root: {
      background: `transparent linear-gradient(326deg, ${theme.colors.primary} 0%, #8F2A5D 120%) 0% 0% no-repeat padding-box`,

      backgroundColor: theme.colors.primary,
      boxShadow: theme.boxShadows.boxShadowBtn,
      borderRadius: 34,

      font: "normal normal 600 16px/11px Segoe UI",
      letterSpacing: 0,
      color: "#FFFFFF",

      textTransform: 'none',

      padding: "18px 28px",

      '&:hover, &:active, &:focus': {
        backgroundColor: theme.colors.btn.primary_focused,
        background: `transparent linear-gradient(326deg, ${theme.colors.primary} 0%, #b13473 120%) 0% 0% no-repeat padding-box`,

        boxShadow: theme.boxShadows.boxShadowPrimaryBtnFocus,
      },
    },
  })(Button), [theme]);
  return <Btn {...props}/>
}

export const OutlinedPrimaryButton:FC<ButtonProps> = (props) => {
  const theme = useThemeStyle();
  const Btn = useMemo(()=> withStyles({
    root: {
      borderRadius: 34,

      fontSize: 18,
      fontWeight: 400,
      fontFamily: "Segoe UI",
      letterSpacing: 0,
      color: theme.colors.primary,
      paddingLeft: 25,
      paddingRight: 30,
      textTransform: 'none',
      borderWidth: "medium",
      borderColor: theme.colors.primary,

      // boxShadow: `0 2px 2px 0 ${style_vars.colors.blue}20, 0 3px 1px -2px ${style_vars.colors.blue}32, 0 1px 5px 0 ${style_vars.colors.blue}19`,
      '&:hover, &:active, &:focus': {
        boxShadow: theme.boxShadows.boxShadowNewChatButton,
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
  ), [theme]);
  return <Btn {...props}/>
}

export const RoundWarningButton:FC<ButtonProps> = (props) => {
  const theme = useThemeStyle();
  const Btn = useMemo(()=> withStyles({
    root: {
      background: `transparent linear-gradient(326deg, ${theme.colors.warning} 0%, #8F2A5D 100%) 0% 0% no-repeat padding-box`,
      boxShadow: theme.boxShadows.boxShadowBtn,
      borderRadius: 34,

      font: "normal normal 600 16px/11px Segoe UI",
      letterSpacing: 0,
      color: "#FFFFFF",

      textTransform: 'none',

      padding: "18px 28px",

      '&:hover, &:active, &:focus': {
        background: `transparent linear-gradient(326deg, ${theme.colors.warning} 0%, #b13473 100%) 0% 0% no-repeat padding-box`,
        boxShadow: theme.boxShadows.boxShadowWarningBtnFocus,
      },
    },
  })(Button), [theme]);
  return <Btn {...props}/>
}
