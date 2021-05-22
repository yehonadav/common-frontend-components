import React, {FC} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomCheckbox, {CheckboxProps} from '@material-ui/core/Checkbox';
import FormHelperText from "@material-ui/core/FormHelperText";
import { colors } from '../../services'

export interface CheckboxLabelPrimaryProps extends CheckboxProps {
  checked?: boolean;
  label?: React.ReactNode;
  error?: React.ReactNode;
}

export const CheckboxPrimary = withStyles({
  root: {
    '& .MuiCheckbox-root': {
      color: colors.grey1,
    },
    '&$checked': {
      color: colors.btn.primary,
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
      {error ? <FormHelperText style={{color: colors.red}}>{error}</FormHelperText> : null}
    </>
  );
}
