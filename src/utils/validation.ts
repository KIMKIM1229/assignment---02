export const validateUsername = (username: string): string | null => {
  if (!username) {
    return '用戶名不能為空';
  }
  if (username.length < 3) {
    return '用戶名至少需要3個字符';
  }
  if (username.length > 20) {
    return '用戶名不能超過20個字符';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return '用戶名只能包含字母、數字和下劃線';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return '密碼不能為空';
  }
  if (password.length < 6) {
    return '密碼至少需要6個字符';
  }
  if (password.length > 20) {
    return '密碼不能超過20個字符';
  }
  if (!/[A-Z]/.test(password)) {
    return '密碼必須包含至少一個大寫字母';
  }
  if (!/[a-z]/.test(password)) {
    return '密碼必須包含至少一個小寫字母';
  }
  if (!/[0-9]/.test(password)) {
    return '密碼必須包含至少一個數字';
  }
  return null;
}; 