export const validateUsername = (username: string): string | null => {
  if (!username) {
    return '使用者名稱不能為空';
  }
  if (username.length < 3) {
    return '使用者名稱至少需要3個字元';
  }
  if (username.length > 20) {
    return '使用者名稱不能超過20個字元';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return '使用者名稱只能包含字母、數字和底線';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return '密碼不能為空';
  }
  if (password.length < 6) {
    return '密碼至少需要6個字元';
  }
  if (password.length > 20) {
    return '密碼不能超過20個字元';
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