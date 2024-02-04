import { showInvalidInputError } from "../lib/showInvalidInputError.js";
import { stat, readdir } from "node:fs/promises";
import { resolve } from "path";

export const navCommandHandler = async (input, {navState}) => {
  const inputArr = input.split(" ");
  const command = inputArr[0];
  switch (command) {
    case "cd":
      if (inputArr.length !== 2) {
        showInvalidInputError();
        return;
      } 
      const newDir = resolve(navState.currentDir, inputArr[1]);
      const stats = await stat(newDir);
      if (!stats.isDirectory()) {
        throw new Error("Invalid path");
      }
      navState.currentDir = resolve(navState.currentDir, inputArr[1]);
      break;
    case "ls":
      if (inputArr.length !== 1) {
        showInvalidInputError();
        return;
      }
      const files = await readdir(navState.currentDir, {withFileTypes: true});
      console.table(files.map(file => ({ name: file.name, type: file.isDirectory() ? "directory" : file.isFile() ? "file" : "other" })));
      break;
  }
}