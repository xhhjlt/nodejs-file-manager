import { showInvalidInputError } from "../lib/showInvalidInputError.js";
import { readFile } from "fs/promises";

export const fsCommandHandler = async (command, {navState}) => {
  console.log(command);
}