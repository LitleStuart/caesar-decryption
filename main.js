const fs = require("fs");
const { encrypt } = require("./encrypt");
const { decrypt } = require("./decrypt");
const args = process.argv;

if (args[2] === "code") {
  const lang = args[6];
  const SHIFT = args[5];
  const data = fs.readFileSync(args[3], "utf-8");

  const result = encrypt(data, SHIFT, lang);
  fs.writeFileSync(args[4], result);
} else if (args[2] === "decode") {
  const data = fs.readFileSync(args[3], "utf-8");
  const lang = args[5];

  const result = decrypt(data, lang);
  fs.writeFileSync(args[4], result[1]);
  console.log(`Наилучший сдвиг: ${result[0]}`);
} else {
  console.log("Code or Decode expected");
}
