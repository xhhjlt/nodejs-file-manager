import { getUsername } from "./lib/getUsername.js";
import readline from "readline/promises";
import { EOL, homedir } from "os";
import { showInvalidInputError } from "./lib/showInvalidInputError.js";
import { osCommandHandler } from "./handlers/osHandler.js";
import { navCommandHandler } from "./handlers/navHandler.js";
import { fsCommandHandler } from "./handlers/fsHandler.js";
import { zipCommandHandler } from "./handlers/zipHandler.js";
import { hashCommandHandler } from "./handlers/hashHandler.js";

const username = getUsername();
const navState = {
  currentDir: homedir(),
}

console.log(`Welcome to the File Manager, ${username}!`);
process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startApp = async () => {
  while (true) {
    const input = (await rl.question(`You are currently in ${navState.currentDir}${EOL}`)).trim();
    if (input === ".exit") {
      process.exit(0);
    } else {
      try {
        const command = input.split(" ")[0];
        switch (command) {
          case "os":
            await osCommandHandler(input);
            break;
          case "cd":
          case "up":
          case "ls":
            await navCommandHandler(input, {navState});
            break;
          case "cat":
          case "add":
          case "rn":
          case "cp":
          case "mv":
          case "rm":
            await fsCommandHandler(input, {navState});
            break;
          case "compress":
          case "decompress":
            await zipCommandHandler(input, {navState});
            break;
          case "hash":
            await hashCommandHandler(input, {navState});
            break;
          default:
            showInvalidInputError();
            break;
        }
      } catch (_error) {
        console.log(_error);
        //console.log("Operation failed");
      }
    }
  }
};

startApp();
