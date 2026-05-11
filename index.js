require("dotenv").config()

const express =
  require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("bot alive")
})

app.listen(3000)

const {
  Client
} = require("whatsapp-web.js")

const qrcode =
  require("qrcode-terminal")

const aiCommand =
  require("./commands/ai")

const client =
  new Client({

    puppeteer: {

      headless: true,

      executablePath:
        "/usr/bin/chromium",

      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ]

    }

  })

// ======================
// QR
// ======================

const QRCode =
  require("qrcode")

client.on(
  "qr",
  async (qr) => {

    console.log("SCAN QR")

    const url =
      await QRCode.toDataURL(qr)

    console.log(url)

  }
)

// ======================
// READY
// ======================

client.on("ready", () => {

  console.log("BOT READY")

})

// ======================
// MESSAGE
// ======================

client.on(
  "message",
  async (message) => {

    if (message.fromMe)
      return

    const text =
      message.body.trim()

    console.log(
      "MSG:",
      text
    )

    if (text === "!ping") {

      message.reply(
        "masih hidup bang 😭"
      )

      return

    }

    await aiCommand(
      message,
      client
    )

  }
)

client.initialize()