const {
  MessageMedia
} = require(
  "whatsapp-web.js"
)

async function imageCommand(
  message,
  client,
  text
) {

  try {

    const prompt =
    text.replace(
      "!img",
      ""
    ).trim()

    if (!prompt) {

      return message.reply(
        "contoh:\n!img kucing naik motor 😭"
      )

    }

    const imageUrl =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`

    const media =
    await MessageMedia
    .fromUrl(imageUrl)

    await client.sendMessage(

      message.from,

      media,

      {
        caption:
        `🖼️ ${prompt}`
      }

    )

  } catch (err) {

    console.log(err)

    message.reply(
      "gagal bikin gambar 😭"
    )

  }

}

module.exports =
imageCommand