
const messagesInput = require('./messages.json');
// keepin it constant
const dotenv = require("dotenv")
require('dotenv').config()
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

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
          "content": "Placeholder"
        } 
      },
      { 
        "type": "text", 
        "text": { 
          "content": "\n" + "Placeholder"
        } 
      }
    ],
    "color":"default",
  },
}
]
//so here's the part where we convert each message into a block
for (i=0; i< messagesInput.messages.length && i < 95; i++){
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
pageName = "GRAHHHHHH"
console.log(`Page name set to ${pageName}`)
// remove placeholder 
pageContent.shift();

//if this isnt a whole channel then show the date range in the title

/*
if (messageContent.dateRange.after == null || messageContent.dateRange.before == null) {
   
} else {
  pageName = `${messagecontent.name}|${messagecontent.dateRange.before}-${messagecontent.dateRange.after}`
} */

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
              "content": pageName
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
    
