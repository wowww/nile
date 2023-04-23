// eslint-disable-next-line import/prefer-default-export

export type JwtTypes = {
  aud: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  prm: string;
  authorities?: string[];
};
export const parseJwt = (token: string): JwtTypes | undefined => {
  try {
    return JSON.parse(atob(token.split('.')[1])) as JwtTypes;
  } catch (e) {
    return undefined;
  }
};
