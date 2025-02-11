import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
  startTyping();
});

async function startTyping() {
  const channel = await client.channels.fetch(Deno.env.get("CHANNEL_ID")!);
  if (!channel || !channel.isTextBased())
    return console.error("Invalid channel");

  while (true) {
    (channel as TextChannel).sendTyping();
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

client.login(Deno.env.get("DISCORD_TOKEN")!);
