const dotenv = require("dotenv")
const fs = require('fs')
require('dotenv').config()
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

// temporary array for the message content
messagesInput = {
  "guild": {
    "id": "662037579897634866",
    "name": "DXL's Store",
    "iconUrl": "https://cdn.discordapp.com/icons/662037579897634866/a_8ff66af0e0d1a4ad39bda58e9e16c851.gif?size=512"
  },
  "channel": {
    "id": "913094340438556702",
    "type": "GuildTextChat",
    "categoryId": "913093940633280522",
    "category": "teminite roleplay",
    "name": "random-rp",
    "topic": "it's just crack rp this isn't canon at all"
  },
  "dateRange": {
    "after": null,
    "before": null
  },
  "messages": [
    {
      "id": "913100890968313916",
      "type": "Default",
      "timestamp": "2021-11-24T16:16:57.001+00:00",
      "timestampEdited": null,
      "callEndedTimestamp": null,
      "isPinned": false,
      "content": "burger",
      "author": {
        "id": "913100889995231243",
        "name": "DXXL",
        "discriminator": "0000",
        "nickname": "DXXL",
        "color": null,
        "isBot": true,
        "avatarUrl": "https://cdn.discordapp.com/avatars/913100889995231243/eab8ff0a5ac26f437b928a75606e531f.png?size=512"
      },
      "attachments": [],
      "embeds": [],
      "stickers": [],
      "reactions": [],
      "mentions": [],
    },
    {
      "id": "913102810856423444",
      "type": "Default",
      "timestamp": "2021-11-24T16:24:34.738+00:00",
      "timestampEdited": null,
      "callEndedTimestamp": null,
      "isPinned": false,
      "content": "holy shirt it's the real dxxl",
      "author": {
        "id": "462644122973634563",
        "name": "Dukemz",
        "discriminator": "7766",
        "nickname": "Dukemz",
        "color": "#F1C40F",
        "isBot": false,
        "avatarUrl": "https://cdn.discordapp.com/avatars/462644122973634563/566333546a0906373fc4ded2c5bad64f.png?size=512"
      },
      "attachments": [],
      "embeds": [],
      "stickers": [],
      "reactions": [],
      "mentions": []
    },
    {
      "id": "913149791020679199",
      "type": "Default",
      "timestamp": "2021-11-24T19:31:15.682+00:00",
      "timestampEdited": null,
      "callEndedTimestamp": null,
      "isPinned": false,
      "content": "I am horknee",
      "author": {
        "id": "913100889995231243",
        "name": "BloodLust",
        "discriminator": "0000",
        "nickname": "BloodLust",
        "color": null,
        "isBot": true,
        "avatarUrl": "https://cdn.discordapp.com/avatars/913100889995231243/ca261f762488ca9357945d91ce1a06a9.png?size=512"
      },
      "attachments": [],
      "embeds": [],
      "stickers": [],
      "reactions": [],
      "mentions": [],
    },
  ],
}

// temporary variables to use for creating messages!
message = "Test success"
pfp = "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80" 
username = "Test Generator"

//variable for the page content

var pageContent = [
  {
  "object": "block",
  "type": "callout",
  "callout": {
    "rich_text": 
    [
      { 
        "type": "text", 
        "annotations": {
          "bold": true,
          "underline": true,
        },
        "text": { 
          "content": username
        } 
      },
      { 
        "type": "text", 
        "text": { 
          "content": "\n" + message
        } 
      }
    ],
    "icon": {
      "external":{
        "url":pfp,
      }
    },
    "color":"default",
  },
}
]
//so here's the part where we convert each message into a block
for (i=0; i< messagesInput.messages.length; i++){
  console.log("Adding message " + i);
  messageSelected = messagesInput.messages[i]
  messageContent = {
    "object": "block",
    "type": "callout",
    "callout": {
      "rich_text": 
      [
        { 
          "type": "text", 
          "annotations": {
            "bold": true,
            "underline": true,
          },
          "text": { 
            "content": messageSelected.author.name
          } 
        },
        { 
          "type": "text", 
          "text": { 
            "content": "\n" + messageSelected.content
          } 
        }
      ],
      "icon": {
        "external":{
          "url":messageSelected.author.avatarUrl,
        }
      },
      "color":"default",
    },
  };
  pageContent.push(messageContent)
}

pageContent.shift();

createNotionPage()

async function createNotionPage() {
  const data = {
    "parent": {
      "type": "database_id",
      "database_id": process.env.NOTION_DATABASE_ID
    }, 
    "properties": {
      "Name": {
        "title": [
          {
            "text": {
              "content": "Notion Test"
            }
          }
        ]
      },
    },
    "children": pageContent

  }
    console.log(`Initiating shenanigans...`)
    const response = await notion.pages.create( data )
    console.log(`Created page at ID ` + response.id)
  
}
    
