import { showInvalidInputError } from "../lib/showInvalidInputError.js";
import path from "path";
import { readFile } from "fs/promises";
import crypto from "crypto";

export const hashCommandHandler = async (input, {navState}) => {
  const inputArr = input.split(" ");
  if (inputArr.length > 2) {
    showInvalidInputError();
    return;
  }
  const filePath = path.resolve(navState.currentDir, inputArr[1]);
  const hash = crypto.createHash("sha256");
  const content = await readFile(filePath, "utf-8");
  hash.update(content);
  console.log("Hash: ", hash.digest("hex"));
}