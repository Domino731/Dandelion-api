import { ERROR_CODES } from '../constants/errorCode';

export const registerErrorFactory = (error: any) => {
  const code = error.code;
  const detail = error.detail;

  if (code === '23505' && detail.includes('email')) {
    return {
      code: ERROR_CODES.AUTH_DUPLICATED_EMAIL,
      message: 'User is already exists with this email',
      isVisible: true,
    };
  }

  return null;
};
