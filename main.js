const fs = require("fs");
const { encrypt } = require("./encrypt");
const { decrypt } = require("./decrypt");
const args = process.argv;

if (args[2] === "code") {
  if (args.length < 7) {
    console.log(
      "Correct args: code/decode input_file output_file [shift, for 'code' mode only] ru/en"
    );
    return;
  }

  const lang = args[6];
  if (lang != "ru" && lang != "en") {
    console.log("ru/en expected");
    return;
  }

  const SHIFT = args[5];
  if (!(Math.abs(Number(SHIFT)) + 1)) {
    console.log("Shift is a number!");
    return;
  }

  let data;
  try {
    data = fs.readFileSync(args[3], "utf-8");
  } catch {
    console.log("File not found :(");
    return;
  }

  const result = encrypt(data, SHIFT, lang);
  fs.writeFileSync(args[4], result);
} else if (args[2] === "decode") {
  if (args.length < 6) {
    console.log(
      "Correct args: code/decode input_file output_file [shift, for 'code' mode only] ru/en"
    );
    return;
  }

  let data;
  try {
    data = fs.readFileSync(args[3], "utf-8");
  } catch {
    console.log("File not found :(");
    return;
  }

  const lang = args[5];
  if (lang != "ru" && lang != "en") {
    console.log("ru/en expected");
    return;
  }

  const result = decrypt(data, lang);
  fs.writeFileSync(args[4], result[1]);
  console.log(`Наилучший сдвиг: ${result[0]}`);
} else {
  console.log("code/decode expected");
}
