const axios =
require("axios")

const {
  MessageMedia
} = require(
  "whatsapp-web.js"
)

async function instagramCommand(
  message,
  client,
  text
) {

  try {

    const args =
    text.split(" ")

    if (!args[1]) {

      return message.reply(
        "contoh:\n!ig https://www.instagram.com/p/xxx\natau\n!ig https://www.instagram.com/reel/xxx"
      )

    }

    const url =
    args[1]

    // Validasi URL Instagram
    if (
      !url.includes("instagram.com")
    ) {

      return message.reply(
        "link harus dari instagram bang 😭"
      )

    }

    await message.reply(
      "tunggu bentar bang, lagi diproses... ⏳"
    )

    // Gunakan API instagramdl via getmyfling / snapinsta
    const api =
    `https://api.tiklydown.eu.org/api/instagram?url=${encodeURIComponent(url)}`

    const result =
    await axios.get(api, {
      timeout: 20000
    })

    const data =
    result.data

    if (
      !data ||
      !data.medias ||
      data.medias.length === 0
    ) {

      return message.reply(
        "gagal ambil konten ig 😭\npastikan link valid & postingan tidak private ya bang"
      )

    }

    const medias =
    data.medias

    // Kirim semua media (foto/video) dari postingan
    for (
      let i = 0;
      i < medias.length;
      i++
    ) {

      const item =
      medias[i]

      const mediaUrl =
      item.url

      const isVideo =
      item.type === "video" ||
      (
        item.url &&
        item.url.includes(".mp4")
      )

      const ext =
      isVideo
        ? "mp4"
        : "jpg"

      const filename =
      isVideo
        ? `ig_reel_${i + 1}.mp4`
        : `ig_foto_${i + 1}.jpg`

      try {

        const media =
        await MessageMedia.fromUrl(
          mediaUrl,
          {
            unsafeMime: true,
            filename: filename
          }
        )

        const caption =
        i === 0
          ? `nih bang 😭🔥\n${data.caption ? data.caption.slice(0, 200) : ""}`
          : ""

        await client.sendMessage(
          message.from,
          media,
          {
            caption: caption,
            sendVideoAsGif: false
          }
        )

      } catch (mediaErr) {

        console.log(
          `Gagal kirim media ke-${i + 1}:`,
          mediaErr.message
        )

      }

    }

  } catch (err) {

    console.log("IG Error:", err)

    await message.reply(
      "ignya error 😭\nmungkin link salah, postingan private, atau server lagi gangguan"
    )

  }

}

module.exports =
instagramCommand
