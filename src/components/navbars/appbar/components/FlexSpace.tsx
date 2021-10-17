import {useAppbarStyles} from "../useAppbarStyles";
import { DivType } from '../../../../types'

export const FlexSpace: DivType = props => <div className={useAppbarStyles().FlexSpace} {...props}/>;