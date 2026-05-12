const fs =
require("fs")

const path =
require("path")

async function stickerCommand(
  message,
  client
) {

  if (
    !message.hasMedia
  ) {

    return message.reply(
      "reply gambar pake !sticker 😭"
    )

  }

  const media =
  await message.downloadMedia()

  await client.sendMessage(

    message.from,

    media,

    {
      sendMediaAsSticker: true,
      stickerName: "Tongkrongan",
      stickerAuthor: "Ilham"
    }

  )

}

module.exports =
stickerCommand