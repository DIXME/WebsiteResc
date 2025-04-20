import * as db from './database.js'

// this is an example of using the api
// make shure your cat type has a defing property,
// so it can be uinquely identified by the api

class user {
    constructor(username, password, email = "", other = {}){
        this.username = username
        this.password = password
        this.email = email
        this.other = other
    }
}

const users = db.createCat("users", user)
db.addNewItem(users, new user("guy", "123"))
console.log(db.getItemByProperty(users,"username","guy"))