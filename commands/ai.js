const axios = require("axios")

const personality =
require("../utils/personality")

const {
  loadMemory,
  saveMemory
} = require("../utils/memory")

const config =
require("../config")

async function aiCommand(
  message,
  client
) {

  const text =
  message.body.trim()

  const lower =
  text.toLowerCase()

  // trigger
  if (
    !lower.includes(
      config.BOT_NAME
    )
  ) return

  const chat =
  await message.getChat()

  const contact =
  await message.getContact()

  const username =
  contact.pushname ||
  "orang"

  await chat.sendStateTyping()

  // ======================
  // MEMORY
  // ======================

  let memory =
  loadMemory()

  if (!memory[username]) {

    memory[username] = {
      chats: []
    }

  }

  memory[username]
  .chats
  .push(text)

  memory[username]
  .chats =
  memory[username]
  .chats
  .slice(-5)

  saveMemory(memory)

  // ======================
  // CLEAN MESSAGE
  // ======================

  const cleanText =
  text
  .replace(
    config.BOT_NAME,
    ""
  )
  .trim()

  // ======================
  // AI
  // ======================

  try {

    const response =
    await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {

        model:
        config.AI_MODEL,

        messages: [

          {
            role: "system",
            content:
            personality
          },

          {
            role: "user",
            content:
            cleanText
          }

        ]

      },

      {

        headers: {

          Authorization:
          `Bearer ${config.API_KEY}`,

          "HTTP-Referer":
          "https://localhost",

          "X-Title":
          "TongkronganBot",

          "Content-Type":
          "application/json"

        }

      }

    )

    let reply =
    response.data
    .choices[0]
    .message.content

    // bersihin respon aneh
    reply = reply
    .replace(/sebagai ai/gi, "")
    .replace(/aku ai/gi, "")
    .replace(/chat sebelumnya/gi, "")
    .replace(/pesan terbaru/gi, "")
    .trim()

    await message.reply(reply)

  } catch (err) {

    console.log(
      err.response?.data ||
      err.message
    )

    await message.reply(
      "otak gw ngefreeze 💀"
    )

  }

}

module.exports = aiCommand