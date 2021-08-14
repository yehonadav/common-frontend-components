import React from 'react'
import { DivType } from '../../../types'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer',
  }
})

export const LinkInText:DivType = (props) => {
  return (
    <div className={useStyles().root} {...props}/>
  )
}