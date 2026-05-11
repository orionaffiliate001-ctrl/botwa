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

const chromium =
  require("@sparticuz/chromium")

const puppeteer =
  require("puppeteer-core")

const aiCommand =
  require("./commands/ai")

async function startBot() {

  const client =
    new Client({

      puppeteer: {

        headless: true,

        executablePath:
          await chromium.executablePath(),

        args:
          chromium.args,

        defaultViewport:
          chromium.defaultViewport

      }

    })

  // ======================
  // QR
  // ======================

  client.on("qr", (qr) => {

    console.log("SCAN QR")

    qrcode.generate(qr, {
      small: true
    })

  })

  // ======================
  // READY
  // ======================

  client.on("ready", () => {

    console.log("BOT READY")

  })

  // ======================
  // DISCONNECTED
  // ======================

  client.on(
    "disconnected",
    () => {

      console.log(
        "BOT DISCONNECTED"
      )

      client.initialize()

    }
  )

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

      // ping
      if (text === "!ping") {

        message.reply(
          "masih hidup bang 😭"
        )

        return

      }

      // AI
      await aiCommand(
        message,
        client
      )

    }
  )

  // ======================
  // START
  // ======================

  client.initialize()

}

startBot()