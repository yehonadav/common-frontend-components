import React, {FC} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomCheckbox, {CheckboxProps} from '@material-ui/core/Checkbox';
import FormHelperText from "@material-ui/core/FormHelperText";
import { baseColors } from '../../services'

export interface CheckboxLabelPrimaryProps extends CheckboxProps {
  checked?: boolean;
  label?: React.ReactNode;
  error?: React.ReactNode;
}

export const CheckboxPrimary = withStyles({
  root: {
    '& .MuiCheckbox-root': {
      color: baseColors.grey1,
    },
    '&$checked': {
      color: baseColors.btn.primary,
    },
  },
  checked: {},
})((props:CheckboxLabelPrimaryProps) =>
  <CustomCheckbox color="default" {...props} />
);

export const CheckboxLabelPrimary:FC<CheckboxLabelPrimaryProps> = (
  {
    label,
    error,
    ...props
  }) => {
  return (
    <>
      <FormControlLabel
        // @ts-ignore
        control={<CheckboxPrimary {...props} />}
        label={label}
      />
      {error ? <FormHelperText style={{color: baseColors.red}}>{error}</FormHelperText> : null}
    </>
  );
}
