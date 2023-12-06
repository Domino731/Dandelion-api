import { ERROR_CODES } from '../constants/errorCode';
import { USER_ERRORS } from '../user/user.const';

export const registerErrorFactory = (error: any) => {
  // handle app errors
  if (error?.message === USER_ERRORS.WEAK_PASSWORD) {
    return {
      code: ERROR_CODES.AUTH_WEAK_PASSWORD,
      message: USER_ERRORS.WEAK_PASSWORD,
      isVisible: true,
    };
  }

  const code = error.code;
  const detail = error.detail;

  console.log('code: ', code);
  if (code === '23505') {
    if (detail.includes('email')) {
      return {
        code: ERROR_CODES.AUTH_DUPLICATED_EMAIL,
        message: 'User is already exists with this email',
        isVisible: true,
      };
    } else if (detail.includes('nick')) {
      return {
        code: ERROR_CODES.AUTH_DUPLICATED_NICK,
        message: 'This nick is already taken',
        isVisible: true,
      };
    }
  }

  return null;
};
