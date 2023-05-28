const dotenv = require("dotenv")
require('dotenv').config()
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

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
              "content": "Congragulations, you have posted something!"
            }
          }
        ]
      },
    }
  }
    console.log(`Initiating shenanigans...`)
    const response = await notion.pages.create( data )
    console.log(response)
  console.log(`Operation complete.`)

}