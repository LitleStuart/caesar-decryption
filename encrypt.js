function isLetter(charCode, lang) {
  const isRussian = lang === "ru";
  if (isRussian) {
    return !(charCode < 1040 || charCode > 1103);
  }
  return !(charCode < 65 || (charCode > 90 && charCode < 97) || charCode > 122);
}

function encryptRussian(data, SHIFT) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    if (isLetter(data.charCodeAt(i), "ru"))
      result += encryptRussianLetter(data[i], SHIFT);
    else result += data[i];
  }
  return result;
}

function encryptRussianLetter(letter, SHIFT) {
  const charCode = letter.charCodeAt(0);
  let FIRST_CHAR_CODE;
  const LANG_POWER = 32;
  if (charCode < 1072) FIRST_CHAR_CODE = 1040;
  else FIRST_CHAR_CODE = 1072;
  return String.fromCharCode(
    FIRST_CHAR_CODE +
      ((charCode - FIRST_CHAR_CODE + Number(SHIFT)) % LANG_POWER)
  );
}

function encryptEnglish(data, SHIFT) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    if (isLetter(data.charCodeAt(i), "en"))
      result += encryptEnglishLetter(data[i], SHIFT);
    else result += data[i];
  }
  return result;
}

function encryptEnglishLetter(letter, SHIFT) {
  const charCode = letter.charCodeAt(0);
  let FIRST_CHAR_CODE;
  const LANG_POWER = 26;
  if (charCode <= 90) FIRST_CHAR_CODE = 65;
  else FIRST_CHAR_CODE = 97;
  return String.fromCharCode(
    FIRST_CHAR_CODE +
      ((charCode - FIRST_CHAR_CODE + Number(SHIFT)) % LANG_POWER)
  );
}

function encrypt(data, SHIFT, lang) {
  const isRussian = lang === "ru";
  if (isRussian) {
    return encryptRussian(data, SHIFT);
  }
  return encryptEnglish(data, SHIFT);
}

exports.encrypt = encrypt;
exports.encryptRussian = encryptRussian;
exports.encryptEnglish = encryptEnglish;
exports.isLetter = isLetter;
