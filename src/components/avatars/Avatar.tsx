import React, {useEffect, useState} from 'react';
import { appConfig } from '../../variables';
import {useAvatarStyles} from '../../assets/jss/avatarStyles'
import Button, {ButtonProps} from "@material-ui/core/Button";
import { WithUser } from '../wrappers'
import { User } from '../../services'
import { uuid_generator } from '../../utils'

const uuid = (new uuid_generator()).create;

export type TAvatar = ButtonProps & {
  user: User;
}

export const Avatar = WithUser<TAvatar>((
  {
    user,
    ...props
  }) =>
{
  const classes = useAvatarStyles();
  const [avatar_url2, set_avatar_url2] = useState<string>(appConfig.defaultAvatar||"");

  useEffect(() => {
    if (user.avatar !== '') {
      set_avatar_url2(user.avatar + (user.avatar.startsWith("http") ? ("?" + encodeURI(uuid().toString())) : ""))
    }
  }, [user]);

  return (
    <Button
      className={classes.avatarButton}
      startIcon={
        <div className={classes.avatarContainer}>
          <img src={avatar_url2} alt={"user avatar"} className={classes.avatar}/>
        </div>
      }
      {...props}
    />
  );
});
