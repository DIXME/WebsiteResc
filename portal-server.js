const express = require('express')
const app = express()
const ws = require('ws')
const lib = require('./js/lib.js')
const db = require('./js/database.js')
const sessions = require('./js/sessions.js')

const public_ = __dirname + '/portal-front-end'

require('dotenv').config('.env')
const port = process.env.portal_port
const ws_port = process.env.portal_ws_port

var wss = new ws.WebSocketServer({
    port: ws_port
})

class user {
    constructor(username, password, email = "", other = {}){
        this.username = username
        this.password = password
        this.email = email
        this.other = other
    }
}

const users = db.createCat("users", user)
db.addNewItem(users, new user("dom", "aura"))

app.use(express.static(public_))

app.get('/', (req, res) => {
    res.sendFile(public_+'/login.html')
})

app.listen(port, () => console.log('open on port 80'))

function validUser(username, password) {
    const user = db.getItemByProperty(users,"username",username)
    if(user.password == password){
        return true
    } else if (!user){
        return false
    }
    return false
}

wss.on('connection', function connection(socket) {
    console.log('[+] New websocket connection 🤞')
    socket.on('message', function incoming(message) {
      const read = JSON.parse(message)
      console.log(`login request, username:${read.data.username}, password:${read.data.password}`)
      console.log(validUser(read.data.username, read.data.password))
    })
  
    socket.send('something')
})