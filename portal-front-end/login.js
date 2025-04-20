const loginB = document.getElementById("login")
const username = document.getElementById("username")
const password = document.getElementById("password")

const ws = new WebSocket('ws://localhost:45')

function login(username, password) {
  const message = {
    type: "login-request",
    data: {
      username: username,
      password: password
    }
  }
  ws.send(JSON.stringify( message ))
}

loginB.onmousedown = () => {
  login(username.value, password.value)
}