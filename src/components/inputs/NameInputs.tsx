import React, {FC} from "react";
import { Input } from "./Input";
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid, {GridProps} from "@material-ui/core/Grid";
import { InputPropsType } from '../../types'
import { useMobile } from '../../stores'

export const FirstNameInput:FC<InputPropsType> = ({error, ...props}) => {
  return (
    <Input
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
      error={!!error}
      helperText={error}
      label="Name"
      name="firstName"
      type="text"
      {...props}
    />
  )
};

export const LastNameInput:FC<InputPropsType> = ({error, ...props}) => {
  const isMobile = useMobile();
  return (
    <Input
      InputProps={isMobile ? {
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }: undefined}
      error={!!error}
      helperText={error}
      label="Surname"
      name="lastName"
      type="text"
      {...props}
    />
  )
};

export interface IFullNameInput {
  firstNameProps?: InputPropsType;
  lastNameProps?: InputPropsType;
  containerProps?: GridProps;
  item1Props?: GridProps;
  item2Props?: GridProps;
}

export const FullNameInput:FC<IFullNameInput> = (
  {
    firstNameProps={},
    lastNameProps={},
    containerProps={},
    item1Props={},
    item2Props={},
  }) => {

  const isMobile = useMobile();
  const xs = isMobile ? 12 : undefined;

  return (
    <Grid container spacing={2} {...containerProps}>
      <Grid item xs={xs} {...item1Props}>
        <FirstNameInput {...firstNameProps}/>
      </Grid>
      <Grid item xs={xs} {...item2Props}>
        <LastNameInput {...lastNameProps}/>
      </Grid>
    </Grid>
  )
};