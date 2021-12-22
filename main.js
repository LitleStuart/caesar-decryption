const fs = require("fs");
const { encrypt } = require("./encrypt");
const args = process.argv;

if (args[2] === "code") {
  const lang = args[6];
  const SHIFT = args[5];
  const data = fs.readFileSync(args[3], "utf-8");
  const result = encrypt(data, SHIFT, lang);
  fs.writeFileSync(args[4], result);
} else if (args[2] === "decode") {
  const data = fs.readFileSync(args[3], "utf-8");
  const result = decrypt(data, args[5]);
  fs.writeFileSync(args[4], result);
} else {
  console.log("Code or Decode expected");
}
