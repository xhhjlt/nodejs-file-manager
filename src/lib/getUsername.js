import { argv } from 'node:process';


export const getUsername = () => {
  const userArgName = '--username='
  const userArg = argv.find(arg => arg.startsWith(userArgName));
  const username = userArg ? userArg.slice(userArgName.length) : 'User';
  return username;
}