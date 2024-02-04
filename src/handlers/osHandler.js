import { showInvalidInputError } from "../lib/showInvalidInputError.js";
import { EOL, homedir, cpus, userInfo } from "os";


const osCommandFlags = {
  eol: "--EOL",
  cpus: "--cpus",
  homedir: "--homedir",
  username: "--username",
  architecture: "--architecture",
}

export const osCommandHandler = async (input) => {
   const inputArr = input.split(" ");
   const flags = inputArr.slice(1);
   if (flags.length === 0 || flags.find(flag => !Object.values(osCommandFlags).includes(flag))) {
     showInvalidInputError();
     return;
   }
   flags.forEach(flag => {
     switch (flag) {
       case osCommandFlags.eol:
         console.log("EOL: ", JSON.stringify(EOL));
         break;
       case osCommandFlags.cpus:
         console.table(cpus().map(cpu => cpu.model));
         break;
       case osCommandFlags.homedir:
         console.log("Homedir: ", homedir());
         break;
       case osCommandFlags.username:
         console.log("Username: ", userInfo().username);
         break;
       case osCommandFlags.architecture:
         console.log("Architecture: ", process.arch);
     }
   })
 }