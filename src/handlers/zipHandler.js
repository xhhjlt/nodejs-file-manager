import { showInvalidInputError } from "../lib/showInvalidInputError.js";
import { resolve } from "path";
import { open } from "node:fs/promises";
import { pipeline } from "node:stream";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

export const zipCommandHandler = async (input, {navState}) => {
  const inputArr = input.split(" ");
  if (inputArr.length > 3) {
    showInvalidInputError();
    return;
  }
  const sourcePath = resolve(navState.currentDir, inputArr[1]);
  const destinationPath = resolve(navState.currentDir, inputArr[2]);
  const source = await open(sourcePath);
  const destination = await open(destinationPath, 'w');
  const readStream = source.createReadStream();
  const writeStream = destination.createWriteStream();
  const transformStream = inputArr[0] === "compress" ? createBrotliCompress() : createBrotliDecompress();
  pipeline(readStream, transformStream, writeStream, (err) => {
    if (err) {
      console.error(err);
    }
  });
}