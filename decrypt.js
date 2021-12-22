const { encryptRussian } = require("./encrypt");
const { encryptEnglish } = require("./encrypt");
const { isLetter } = require("./encrypt");
const { getRussianAlphabet } = require("./makeAlphabet");
const { getEnglishAlphabet } = require("./makeAlphabet");

const RUSSIAN_ALPHABET = getRussianAlphabet();
const ENGLISH_ALPHABET = getEnglishAlphabet();

function serializeString(str, lang) {
  const result = new Map();
  let countLetters = 0;
  str = str.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    if (isLetter(str.charCodeAt(i), lang)) {
      result.set(
        str[i],
        result.get(str[i]) === undefined ? 1 : result.get(str[i]) + 1
      );
      countLetters++;
    }
  }
  for (const letter of result.keys()) {
    result.set(letter, (result.get(letter) / countLetters) * 100);
  }
  return result;
}

function getEpsilon(tableCurrentFreq, lang) {
  let epsilon = 0;
  if (lang === "ru") {
    const LANG_POWER = 33 - 1;
    for (const letter of tableCurrentFreq.keys()) {
      epsilon += Math.abs(
        RUSSIAN_ALPHABET.get(letter) - tableCurrentFreq.get(letter)
      );
    }
    epsilon = epsilon / LANG_POWER;
  } else {
    const LANG_POWER = 26;
    for (const letter of tableCurrentFreq.keys()) {
      epsilon += Math.abs(
        ENGLISH_ALPHABET.get(letter) - tableCurrentFreq.get(letter)
      );
    }
    epsilon = epsilon / LANG_POWER;
  }
  return epsilon;
}

function decryptRussian(data) {
  const LANG_POWER = 32;
  const epsilon = [100, 0];
  for (let SHIFT = 0; SHIFT < LANG_POWER; SHIFT++) {
    let tempStr = encryptRussian(data, SHIFT);
    tempStr = serializeString(tempStr, "ru");
    const tempEpsilon = getEpsilon(tempStr, "ru");
    if (tempEpsilon < epsilon[0]) {
      epsilon[0] = tempEpsilon;
      epsilon[1] = SHIFT;
    }
  }
  return [epsilon[1], encryptRussian(data, epsilon[1])];
}

function decryptEnglish(data) {
  const LANG_POWER = 26;
  const epsilon = [100, 0];
  for (let SHIFT = 0; SHIFT < LANG_POWER; SHIFT++) {
    let tempStr = encryptEnglish(data, SHIFT);
    tempStr = serializeString(tempStr, "en");
    const tempEpsilon = getEpsilon(tempStr, "en");
    if (tempEpsilon < epsilon[0]) {
      epsilon[0] = tempEpsilon;
      epsilon[1] = SHIFT;
    }
  }
  return [epsilon[1], encryptEnglish(data, epsilon[1])];
}

function decrypt(data, lang) {
  const isRussian = lang === "ru";
  if (isRussian) return decryptRussian(data);
  return decryptEnglish(data);
}

exports.decrypt = decrypt;
