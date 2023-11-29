import { Command, Option } from "commander";

const program = new Command();
const prefix = "sk-";

program
  .name("key")
  .description("CLI to generate a random access key")
  .version("0.0.1")
  .argument("<user-name>", "the user name of who is going to use this key")
  .action((userName) => {
    console.log(generateOpenAiApiKey(userName));
  });

program.parse();


function randomChars(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateOpenAiApiKey(userName) {
  const first20chars = userName.replace(" ", "").padEnd(20, "0");
  return `sk-${first20chars}T3BlbkFJ${randomChars(20)}`;
}
