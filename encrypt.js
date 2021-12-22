function encryptRussian(data, SHIFT) {
  let result = "";
  const FIRST_CHAR_CODE = 1040;
  const LANG_POWER = (33 - 1) * 2;
  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i);
    if (charCode == 32) result += " ";
    else
      result += String.fromCharCode(
        FIRST_CHAR_CODE +
          ((charCode - FIRST_CHAR_CODE + Number(SHIFT)) % LANG_POWER)
      );
  }
  return result;
}

function encryptEnglish(data, SHIFT) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += encryptEnglishLetter(data[i], SHIFT);
  }
  return result;
}

function encryptEnglishLetter(letter, SHIFT) {
  const charCode = letter.charCodeAt(0);
  if (charCode == 32) return " ";

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
