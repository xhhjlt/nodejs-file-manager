import { startApp } from "./App.js";
import { getUsername } from "./lib/getUsername.js";

const username = getUsername();

console.log(`Welcome to the File Manager, ${username}!`);
process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
);


startApp();
