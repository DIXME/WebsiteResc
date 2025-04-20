// this file will serve as the api to interact with a local json database with node js (from the server)s
// this will provide functions such ass create catagoery, remove catagoery, add item and such

import { Verify } from "crypto"
import { stringify } from "querystring"
import { Interface } from "readline"
import { json } from "stream/consumers"

const fs = require('fs')
const db = '../db.json' // path to db
// this is js/db.json cuz if its not it dosent work
// dont ask me why i lowkey dont know 
// mabey the complier adjusts paths for some reason idc

// example catagoery type
// your going to have to make your own types
// there are function to create catagoerys however
export interface user {
    username: string
    password: string
    email: string
    other_info: object
}

export interface catagoery {
    catagoeryName: string // cat name
    itemsType: Interface // what type of items will the catagoery contain
}

export function openDB() : Object {
    const db_content = fs.readFileSync(db, 'utf8')
    const db_json = JSON.parse(db_content)
    // the result is a string so we need to parse the string to 
    // make it into a object so we can interact with it
    return db_json
}

export function writeDB( newDB: Object ) : void {
    const stringifyiedDB: string = JSON.stringify(newDB)
    fs.writeFileSync(db, stringifyiedDB, 'utf8')
}

export function createCat( catName: string, itemsType: Interface ) : catagoery {
    const newCat: catagoery = { catagoeryName: catName, itemsType: itemsType }
    const dbr = openDB()
    dbr[catName] = {
        itemsType: itemsType,
        items: []
    }
    writeDB(dbr)
    return newCat
}

export function addNewItem( cat: catagoery, item: any ) : boolean {
    //if (typeof cat.itemsType != typeof item) {
    //    return false
    //}

    // now that we know the type is correct we can add the item to the catogoery
    const dbr = openDB()
    dbr[cat.catagoeryName].items.push(item)
    writeDB(dbr)

    return true
}

export function getItemByProperty( cat: catagoery, property: any, value: any ) : any {
    const dbr = openDB()
    let index
    dbr[cat.catagoeryName].items.forEach(item => {
        if(value == item[property]) { index = dbr[cat.catagoeryName].items.indexOf(item) }
    })
    if(index != undefined || null) {
        return dbr[cat.catagoeryName].items[index]
    }
    return false
}

export function changeEntireItem( cat: catagoery, property: any, value: any, newItem: any ) : any {
    const keys = Object.keys(cat)
    var has = false
    keys.forEach(key => {
        if (key == property){
            has = true
        }
    })
    if(!has) return false
    const dbr = openDB()
    var found = false
    var index
    dbr[cat.catagoeryName].items.forEach(item => {
        if(item[property] == value) {
            index = dbr[cat.catagoeryName].items.indexOf(item)
            found = true
        }
    })
    if(!found) return false
    dbr[cat.catagoeryName].items[index] = newItem
    writeDB(dbr)
    return false
}

export function changePropertyByOldId( cat: catagoery, property: any, value: any, newPvalue: any ) : any {
    const keys = Object.keys(cat)
    var has = false
    keys.forEach(key => {
        if (key == property){
            has = true
        }
    })
    if(!has) return false
    const dbr = openDB()
    var found = false
    var index
    dbr[cat.catagoeryName].items.forEach(item => {
        if(item[property] == value) {
            index = dbr[cat.catagoeryName].items.indexOf(item)
            found = true
        }
    })
    if(!found) return false
    dbr[cat.catagoeryName].items[index][property] = newPvalue
    writeDB(dbr)
    return false
}