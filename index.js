const express = require('express')
const app = express()
const http = require('http')
var rpio = require('rpio');


const LED = 7
let blinking = false

function runBlink() {
  blinking = true
  for (var i = 0; i < 5; i++) {
    rpio.write(LED, rpio.HIGH);
    rpio.sleep(.5);

    rpio.write(LED, rpio.LOW);
    rpio.msleep(500);
  }
  blinking = false
}


app.get('/', function (req, res) {
  if(!blinking) {
    runBlink()
    console.log('End point hit from get')
    res.send(`You found the head\n`)
  } else {
    res.send('led is already blinking')
  }

})



const httpServer = http.createServer(app)
rpio.open(LED, rpio.OUTPUT, rpio.LOW);


const port = 3000
httpServer.listen(port)
console.log(`listening on port ${port}`)

