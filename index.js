const messagesInput = require('./messages.json');
const userData = require('./users.json');

// keepin it constant
const dotenv = require("dotenv")
require('dotenv').config()
const {
    Client
} = require("@notionhq/client")
const {
    markdownToBlocks,
    markdownToRichText
} = require('@tryfabric/martian');


const notion = new Client({
    auth: process.env.NOTION_KEY
})
const databaseId = process.env.NOTION_DATABASE_ID

//variable for the page content

var pageContent = [{
    "object": "block",
    "type": "callout",
    "callout": {
        "rich_text": [{
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
        "color": "default",
    },
}]
// Create an array of users in the given selection of messages.
const chatUsers = []

console.log("Building message callouts...")
/* BUILD MESSAGES INTO BLOCKS */
for (i = 0; i < messagesInput.messages.length && i < 95; i++) {

    //console.log("Adding message " + i + "...");
    messageSelected = messagesInput.messages[i]

    // Find out of this is a new user
    var thisUser = userData.find((element) => element.name == messageSelected.author.name)
    if (!thisUser) {
        //console.log(`WARNING: User ${messageSelected.author.name} not found in users.json!`)
        thisUser = {
            "name": messageSelected.author.name,
            "color": "default",
            "author": "Unknown Author"
        }
    }
    if (!chatUsers.find((element) => element.name == thisUser.name))
    {
      //console.log(`User logged: ${thisUser.name}`)
      chatUsers.push(thisUser);
    }

    //console.log("Building rich text from markdown...")
    messageRich = markdownToRichText(messageSelected.content)
    // add actual message content now :)
    messageRich.unshift({
        "type": "text",
        "annotations": {
            "bold": true,
            "underline": true,
        },
        "text": {
            "content": messageSelected.author.name
        }
    }, {
        "type": "text",
        "text": {
            "content": "\n"
        }
    }, )
    messageContent = {
        "object": "block",
        "type": "callout",
        "callout": {
            "rich_text": messageRich,
            "icon": {
                "external": {
                    "url": messageSelected.author.avatarUrl,
                }
            },
            "color": thisUser.color,
        },
    };
    pageContent.push(messageContent)
    process.stdout.clearLine(0);

}
process.stdout.write("\n");
/* SET PAGE NAME */
pageName = "Untitled Archive"
//console.log(`Page name set to ${pageName}`)
// remove placeholder content 
pageContent.shift();
// its time for page metadata!

timestamp = messagesInput.messages[0].timestamp
timestamp = timestamp.substr(0,10)

console.log(`--PAGE SUMMARY--
START: ${timestamp}
URL: https://discord.com/channels/${messagesInput.guild.id}/${messagesInput.channel.id}/${messagesInput.messages[0].id}
MESSAGES: ${messagesInput.messageCount}`)
console.log("CHARACTERS/AUTHORS:")
charactersList = [];
authorsList = [];
for (i = 0; i < chatUsers.length; i++)
{
if (!(chatUsers[i].author == "Unknown Author"))
{
  if (!chatUsers[i].ignore) { charactersList.push({"name":chatUsers[i].name}); };
  authorsList.push({"name":chatUsers[i].author});
  process.stdout.write(`${chatUsers[i].name} (${chatUsers[i].author}), `);
}
}
process.stdout.write("\n");




//console.log(timestamp)
createNotionPage(messagesInput, charactersList, authorsList, timestamp)

async function createNotionPage(messageJSON, charactersJSON, authorsJSON, time) {
    const data = {
        "parent": {
            "type": "database_id",
            "database_id": process.env.NOTION_DATABASE_ID
        },
        "properties": {
            "Name": {
                "title": [{
                    "text": {
                        "content": pageName
                    }
                }]
            },
            "Characters": {
              "multi_select": charactersJSON
            },
            "Writers": {
              "multi_select": authorsJSON
            },
            "URL": {
              "url":`https://discord.com/channels/${messageJSON.guild.id}/${messageJSON.channel.id}/${messageJSON.messages[0].id}`
            },
            "Location": {
              "select": {
                "name": `#${messageJSON.channel.name}`
              }
            },
            "Date": {
              "date": {
                "start": time
              }
            }
        },
        "children": pageContent

    }
    console.log(`Page fully assembled! Sending to Notion database...`)
    const response = await notion.pages.create(data)
    console.log(`ALL DONE!\nPage created at ID: ` + response.id)

}