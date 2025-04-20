// this libbary will handle users for the website this will use the database api to sotre infromation 
// this will store a user class and create a new catagoery with the database api

import './js/database'
import './js/sessions'
import { generateUniqueSessionId } from './sessions'

class user {
    username: string
    password: string
    email: string
    other: object

    public createSession(sessions: Array<string>) {
        // create new session
        const session = generateUniqueSessionId(sessions)
        this.other["session"] = session
    }

    public removeSession(sessions: Array<string>) {
        sessions.splice(sessions.indexOf(this.other["session"]),1)
        this.other["session"] = null
    }

    user(username: string, password: string, email: string = "", other: object = {}) {
        this.username = username
        this.password = password
        this.email = email
        this.other = other
    }
}