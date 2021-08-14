import { DivType } from '../../../types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React from 'react'

const useStyles = makeStyles({
  root: {
    fontSize: '0.875rem',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    fontWeight: 400,
    lineHeight: '1.43',
    WebkitFontSmoothing: 'antialiased',
    textAlign: 'start',
    boxSizing: 'inherit',
    cursor: 'pointer',
    textDecoration: 'underline',
    color: 'blue',
    display: 'inline-block',
  }
})

export const ForgotPasswordTextHelper:DivType = (props) => {
  return (
    <div className={useStyles().root} {...props}/>
  )
}