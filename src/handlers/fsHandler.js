import { showInvalidInputError } from "../lib/showInvalidInputError.js";
import { open, writeFile, rename, stat, unlink } from "fs/promises";
import { resolve, dirname, basename } from "path";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";

export const fsCommandHandler = async (input, {navState}) => {
  const inputArr = input.split(" ");
  if (inputArr.length < 2) {
    showInvalidInputError();
    return;
  }
  const command = inputArr[0];
  const filePath = resolve(navState.currentDir, inputArr[1]);
  switch (command) {
    case "cat":
      if (inputArr.length !== 2) {
        showInvalidInputError();
        return;
      }
      const fileForCat = await open(filePath);
      await pipeline(fileForCat.createReadStream(), process.stdout, { end: false });
      break;
    case "add":
      if (inputArr.length !== 2) {
        showInvalidInputError();
        return;
      }
      await writeFile(filePath, "", { flag: "wx" });
      break;
    case "rn":
      if (inputArr.length !== 3) {
        showInvalidInputError();
        return;
      }
      await rename(filePath, resolve(dirname(filePath), inputArr[2]));
      break;
    case "mv":
    case "cp":
      if (inputArr.length !== 3) {
        showInvalidInputError();
        return;
      }
      const copyDirPath = resolve(navState.currentDir, inputArr[2]);
      if (!await stat(copyDirPath).then(stats => stats.isDirectory())) {
        throw new Error("Invalid path");
      }
      const fileForCopy = await open(filePath);
      const fileName = basename(filePath);
      const copyPath = resolve(copyDirPath, fileName);
      await pipeline(fileForCopy.createReadStream(), createWriteStream(copyPath, { flags: "wx" }));
      if (command === "mv") {
        await unlink(filePath);
      }
      break;
    case "rm":
      if (inputArr.length !== 2) {
        showInvalidInputError();
        return;
      }
      await unlink(filePath);
      break;
  }
}