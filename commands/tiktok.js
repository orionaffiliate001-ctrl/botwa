const axios =
require("axios")

const {
  MessageMedia
} = require(
  "whatsapp-web.js"
)

async function tiktokCommand(
  message,
  client,
  text
) {

  try {

    const args =
    text.split(" ")

    if (!args[1]) {

      return message.reply(
        "contoh:\n!tt link"
      )

    }

    const url =
    args[1]

    const api =
    `https://tikwm.com/api/?url=${encodeURIComponent(url)}`

    const result =
    await axios.get(api)

    const videoUrl =
    result.data
    .data
    .play

    if (!videoUrl) {

      return message.reply(
        "gagal ambil video 😭"
      )

    }

    const media =
    await MessageMedia
    .fromUrl(

      videoUrl,

      {
        unsafeMime: true,
        filename: "tiktok.mp4"
      }

    )

    await client.sendMessage(

      message.from,

      media,

      {
        caption:
        "nih bang 😭🔥",
        sendVideoAsGif: false
      }

    )

  } catch (err) {

    console.log(err)

    await message.reply(
      "tiktoknya error 😭"
    )

  }

}

module.exports =
tiktokCommand