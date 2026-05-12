const {
  TiktokDownloader
} = require("tiktokdl")

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

    const data =
    await TiktokDownloader(url)

    const video =
    data.result.video1

    await client.sendMessage(

      message.from,

      video,

      {
        caption:
        "nih bang 😭🔥"
      }

    )

  } catch (err) {

    console.log(err)

    message.reply(
      "gagal download tiktok 😭"
    )

  }

}

module.exports =
tiktokCommand