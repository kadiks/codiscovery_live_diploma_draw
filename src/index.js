const drawDiploma = require("./drawDiploma")
const attendees = require("../fixtures/attendees.json")

attendees.sort((a, b) => {
  return b.attended - a.attended
})

const cleanAttendees = attendees.map((a, index) => ({
  name: a.name,
  reason: `${a.attended} meetups`,
  position: index + 1
}))

console.time("diploma")
Promise.all(cleanAttendees.map(drawDiploma)).then(() => {
  console.timeEnd("diploma")
})
