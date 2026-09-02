require("dotenv").config();

const { App } = require("@slack/bolt");

const axios = require("axios");


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});


app.command("/botscemo-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:

`Available Commands:
/botscemo-ping - Check bot latency
/botscemo-catfact - Get a cat fact
/botscemo-joke - get yourself a joke
/botscemo-mgs - METAL GEAR SOLID
/botscemo-coinflip - Heads or Tales
/botscemo-hello - say hi botscemo.`
  });
});

app.command("/botscemo-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/botscemo-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/botscemo-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/botscemo-mgs", async ({ack, respond}) => {
  await ack();

  const MGSQuote = Array("Kept you waiting, huh?", "NO! That is not Solid Snake", "My snake is SOLID.", "METAL GEAR?", "The man who sold the world.", 
    "What a thriiiill!", "invisible?", "MEOOWWW!", "LIQUIIIIIDDD!!!!", "Snake?... Snake?... SNAAAAAKKEEE!!!");
  const random = Math.floor(Math.random() * MGSQuote.length);

  await respond({text: `${MGSQuote[random]}`});

});

app.command("/botscemo-coinflip", async ({ack, respond}) => {
  await ack;

  const HeadsOrTales = Array("!!!HEADS!!!", "!!!TAILS!!!");
  const random = Math.floor(Math.random() * HeadsOrTales.length);

  await respond({text: `${HeadsOrTales[random]}`});

});

app.command("/botscemo-hello", async ({ack, respond}) => {
  await ack;

  const hello = Array("Hello!", "Hi!", "good day!", "Hi! How are you?", "Top of the morning");
  const random = Math.floor(Math.random() * hello.length);

  await respond({text: `${hello[random]}`});

});

(async () => {
  await app.start();
  console.log("bot is running!");
})();