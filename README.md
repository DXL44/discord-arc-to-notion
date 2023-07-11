# discord-arc-to-notion
This is something I created for myself so that I could convert Discord chat exports in JSON format from [DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter) into a Notion database. 

Why would you need to use this? I genuinely have no clue. I created this specifically for archiving one roleplay which was formatted into a Notion database.

# How to use this yourself, if you want to for some wild reason
This is horribly user-unfriendly because I was creating this mostly for use by myself. I'm also probably doing a bad job of explaining it here or probably don't know how to explain it correctly. Sorry. 
- Go to DiscordChatExporter (linked above) and go through the setup process to export messages. 
- When exporting messages, be sure to export them in the JSON format
- Have a Notion integration ready to use with this. You'll want to find out how to do that [here](https://developers.notion.com/docs/create-a-notion-integration).
- Create a .env file in the folder for this repository after downloading it. Set NOTION_KEY to your Notion integration secret, and NOTION_DATABASE_ID to the ID of the database you're putting stuff in.
- Add the JSON message backup to the repository folder and rename it to messages.json.
- Run index.js with Node. 
