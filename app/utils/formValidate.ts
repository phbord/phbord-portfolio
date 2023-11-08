// Contrôle des champs "email"
export function isInputEmailValidate(data: string): boolean {
  if (/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/.test(data)) {
    return true;
  }
  return false;
}

// Contrôle des champs "password"
export function isInputPasswordValidate(data: string): boolean {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-\_\@\#\$\.\+\=\%\&\*\!\^\ù\:\;\,\+])(?=.{8,})/.test(data)) {
    return true;
  }
  return false;
}

// Contrôle des champs "texte"
export function isInputTextValidate(data: string, charSizeMin: number = 0, charSizeMax?: number): boolean {
  if ((!charSizeMax && data.length > charSizeMin) 
      || (charSizeMax && data.length > charSizeMin && data.length <= charSizeMax)) {
    return true;
  }
  return false;
}

// Contrôle des champs "texte" au sujet d'un tableau d'objets
export function isInputTextObjectArrayValidate(data: string, charSize: number = 1): boolean {
  if (data.length > charSize 
      && data[0] === '[' 
      && data[data.length - 1] === ']') {
    return true;
  }
  return false;
}