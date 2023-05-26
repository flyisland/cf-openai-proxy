import { Command, Option } from "commander";

const program = new Command();
const prefix = "sk-";

program
  .name("key")
  .description("CLI to generate a random access key")
  .version("0.0.1")
  .requiredOption("-n, --user-name <string>", "the user name of who is going to use this key",)
  .action((options) => {
    let userName = options.userName.replace(" ", "_");
    console.log(`${prefix}${userName}-${tenRandomChars()}`);
  });

program.parse();


function tenRandomChars() {
  const length = 10;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

