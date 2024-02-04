import { getUsername } from "./lib/getUsername.js";
import readline from "readline/promises";
import { EOL, homedir } from "os";
import { showInvalidInputError } from "./lib/showInvalidInputError.js";

const appState = {
  currentDir: homedir(),
  username: getUsername()
}

console.log(`Welcome to the File Manager, ${appState.username}!`);
process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${appState.username}, goodbye!`)
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startApp = async () => {
  while (true) {
    const answer = await rl.question(`You are currently in ${appState.currentDir}${EOL}`);
    if (answer === ".exit") {
      process.exit(0);
    } else {
      try {
        const commandArr = answer.trim().split(" ");
        const command = commandArr[0];
        switch (command) {
          default:
            showInvalidInputError();
            break;
        }
      } catch (_error) {
        console.log("Operation failed");
      }
    }
  }
};

startApp();
