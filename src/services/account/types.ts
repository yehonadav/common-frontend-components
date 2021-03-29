export type User = {
  // public info
  id: string;
  avatar_hd: string;
  avatar: string;

  // for statistics
  created: Date;
  updated: Date;
  acceptTerms: Date;

  // private info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // advertisement
  newsletter: boolean;

  role: string;

  jwtToken: string;

  [x:string]:any;
}

export type NullableUser = null | User;
