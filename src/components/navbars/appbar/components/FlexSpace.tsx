import {useAppbarStyles} from "../useAppbarStyles";
import { DivType } from '../../../../types'
import React from "react";

export const FlexSpace: DivType = props => <div className={useAppbarStyles().FlexSpace} {...props}/>;