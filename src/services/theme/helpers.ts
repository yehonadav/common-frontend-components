import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

export const createTheme = (themeStyle:ThemeOptions) => responsiveFontSizes(createMuiTheme(themeStyle));