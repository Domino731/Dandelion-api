const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export const userUtils = { validatePassword };
