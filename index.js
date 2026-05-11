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

async function startBot() {

  let client

  // ======================
  // RAILWAY MODE
  // ======================

  if (process.env.RAILWAY_ENVIRONMENT) {

    const chromium =
      require("@sparticuz/chromium")

    client =
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

  }

  // ======================
  // LOCAL MODE
  // ======================

  else {

    client =
      new Client({

        puppeteer: {

          headless: true,

          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
          ]

        }

      })

  }

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