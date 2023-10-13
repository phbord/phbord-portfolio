// Contrôle des champs "email"
export function isInputEmailValidate(data) {
  if (/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/.test(data)) {
    return true
  }
  return false
}

// Contrôle des champs "password"
export function isInputPasswordValidate(data) {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-\_\@\#\$\.\+\=\%\&\*\!\^\ù\:\;\,\+])(?=.{8,})/.test(data)) {
    return true
  }
  return false
}