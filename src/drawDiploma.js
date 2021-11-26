const fs = require("fs")
const path = require("path")
const { createCanvas, loadImage } = require("canvas")
const uid = require("uid2")

const drawDiploma = ({ name, reason, position }) =>
  new Promise((resolve) => {
    const id = uid(10)
    let cleanPosition = position
    if (position < 10) {
      cleanPosition = `00${position}`
    } else if (position < 100) {
      cleanPosition = `0${position}`
    }

    const output = fs.createWriteStream(
      path.join(__dirname, `../output/diploma_${cleanPosition}.jpg`)
    )
    const logoPath = path.join(__dirname, "../fixtures/logo.png")

    const WIDTH = 1200
    const HEIGHT = 680

    const colors = {
      blue: "#39B1C6",
      lblue: "#F0F9EE",
      dblue: "#277986",
      white: "#FFF",
      yellow: "#FFB11E",
      orange: "#EE7C18"
    }

    const canvas = createCanvas(WIDTH, HEIGHT)
    const ctx = canvas.getContext("2d")

    const saveFile = () => {
      const stream = canvas.createJPEGStream()
      stream.pipe(output)
      resolve()
    }

    const margin = 30
    const degrees = 45
    const angle = (degrees * Math.PI) / 180

    const drawCenterRect = ({ color, width, height } = {}) => {
      ctx.fillStyle = color
      ctx.fillRect(
        WIDTH * 0.5 - width * 0.5,
        HEIGHT * 0.5 - height * 0.5,
        width,
        height
      )
    }

    const writeTextCenter = ({
      text,
      color,
      y,
      fontName = "Futura",
      fontSize = 30
    } = {}) => {
      ctx.font = `${fontSize}px ${fontName}`
      const textDimensions = ctx.measureText(text)
      ctx.fillStyle = color
      ctx.fillText(text, WIDTH * 0.5 - textDimensions.width * 0.5, y)
    }

    // First bg rectangle
    drawCenterRect({
      color: colors.blue,
      width: WIDTH,
      height: HEIGHT
    })

    // 2nd bg white rectangle
    drawCenterRect({
      color: colors.white,
      width: WIDTH - margin,
      height: HEIGHT - margin
    })

    ctx.rotate(-angle)
    ctx.fillStyle = colors.orange
    ctx.fillRect(-100, -3, 300, 50)
    ctx.fillStyle = colors.yellow
    ctx.fillRect(-100, 47, 300, 50)
    ctx.fillStyle = colors.lblue
    ctx.fillRect(-150, 97, 300, 50)
    ctx.fillStyle = colors.dblue
    ctx.fillRect(-200, 147, 500, 50)
    ctx.fillStyle = colors.blue
    ctx.fillRect(-300, 197, 600, 50)

    ctx.fillStyle = colors.orange
    ctx.fillRect(WIDTH - 910, HEIGHT + 603, 300, 50)
    ctx.fillStyle = colors.yellow
    ctx.fillRect(WIDTH - 1000, HEIGHT + 553, 300, 50)
    ctx.fillStyle = colors.lblue
    ctx.fillRect(WIDTH - 1100, HEIGHT + 503, 500, 50)
    ctx.fillStyle = colors.dblue
    ctx.fillRect(WIDTH - 1200, HEIGHT + 453, 600, 50)
    ctx.fillStyle = colors.blue
    ctx.fillRect(WIDTH - 1300, HEIGHT + 403, 700, 50)

    ctx.rotate(angle)

    drawCenterRect({
      color: colors.lblue,
      width: WIDTH - margin * 2,
      height: HEIGHT - margin * 2
    })

    drawCenterRect({
      color: colors.blue,
      width: WIDTH - margin * 3,
      height: HEIGHT - margin * 3
    })

    // Load logo
    loadImage(logoPath).then((img) => {
      ctx.drawImage(img, 440, 70, 100, 100)
      saveFile()
    })

    // Write odiscovery
    ctx.font = "30px Montserrat"
    ctx.fillStyle = colors.white
    ctx.fillText("odiscovery", 550, 130)

    // Write diploma to
    writeTextCenter({
      text: "Diplôme décerné à :",
      color: colors.white,
      y: 230,
      fontSize: 30
    })

    // Write person name
    writeTextCenter({
      text: name,
      color: colors.yellow,
      y: 320,
      fontSize: 60
    })
    // Write "for"
    writeTextCenter({
      text: "pour avoir participé à",
      color: colors.white,
      y: 390
    })
    // Write "reason"
    writeTextCenter({
      text: reason,
      color: colors.dblue,
      y: 430
    })

    // Write teacher & signature
    ctx.font = `30px Futura`
    const textTeacher = "Professeur principal"
    const teacherX = 150
    const teacherY = 520
    ctx.fillStyle = colors.white
    ctx.fillText(textTeacher, teacherX, teacherY)
    ctx.font = `20px Futura`
    const textTeacherName = "Cody"
    ctx.fillStyle = colors.white
    ctx.fillText(textTeacherName, teacherX + 100, teacherY + 40)

    // Write Date
    ctx.font = `20px Futura`
    const textDate = "Date"
    const dateX = 850
    const dateY = 520
    ctx.fillStyle = colors.white
    ctx.fillText(textDate, dateX, dateY)
    ctx.font = `30px Futura`
    const textActualDate = "24 novembre 2021"
    ctx.fillStyle = colors.white
    ctx.fillText(textActualDate, dateX - 100, dateY + 40)

    output.on("finish", () => {
      // console.log("JPEG saved")
    })
  })

module.exports = drawDiploma
