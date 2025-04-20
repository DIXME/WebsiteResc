"use strict";
// this file will serve as the api to interact with a local json database with node js (from the server)s
// this will provide functions such ass create catagoery, remove catagoery, add item and such
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDB = openDB;
exports.writeDB = writeDB;
exports.createCat = createCat;
exports.addNewItem = addNewItem;
exports.getItemByProperty = getItemByProperty;
exports.changeEntireItem = changeEntireItem;
exports.changePropertyByOldId = changePropertyByOldId;
var fs = require('fs');
var db = '../db.json'; // path to db
function openDB() {
    var db_content = fs.readFileSync(db, 'utf8');
    var db_json = JSON.parse(db_content);
    // the result is a string so we need to parse the string to 
    // make it into a object so we can interact with it
    return db_json;
}
function writeDB(newDB) {
    var stringifyiedDB = JSON.stringify(newDB);
    fs.writeFileSync(db, stringifyiedDB, 'utf8');
}
function createCat(catName, itemsType) {
    var newCat = { catagoeryName: catName, itemsType: itemsType };
    var dbr = openDB();
    dbr[catName] = {
        itemsType: itemsType,
        items: []
    };
    writeDB(dbr);
    return newCat;
}
function addNewItem(cat, item) {
    //if (typeof cat.itemsType != typeof item) {
    //    return false
    //}
    // now that we know the type is correct we can add the item to the catogoery
    var dbr = openDB();
    dbr[cat.catagoeryName].items.push(item);
    writeDB(dbr);
    return true;
}
function getItemByProperty(cat, property, value) {
    var dbr = openDB();
    var index;
    dbr[cat.catagoeryName].items.forEach(function (item) {
        if (value == item[property]) {
            index = dbr[cat.catagoeryName].items.indexOf(item);
        }
    });
    if (index != undefined || null) {
        return dbr[cat.catagoeryName].items[index];
    }
    return false;
}
function changeEntireItem(cat, property, value, newItem) {
    var keys = Object.keys(cat);
    var has = false;
    keys.forEach(function (key) {
        if (key == property) {
            has = true;
        }
    });
    if (!has)
        return false;
    var dbr = openDB();
    var found = false;
    var index;
    dbr[cat.catagoeryName].items.forEach(function (item) {
        if (item[property] == value) {
            index = dbr[cat.catagoeryName].items.indexOf(item);
            found = true;
        }
    });
    if (!found)
        return false;
    dbr[cat.catagoeryName].items[index] = newItem;
    writeDB(dbr);
    return false;
}
function changePropertyByOldId(cat, property, value, newPvalue) {
    var keys = Object.keys(cat);
    var has = false;
    keys.forEach(function (key) {
        if (key == property) {
            has = true;
        }
    });
    if (!has)
        return false;
    var dbr = openDB();
    var found = false;
    var index;
    dbr[cat.catagoeryName].items.forEach(function (item) {
        if (item[property] == value) {
            index = dbr[cat.catagoeryName].items.indexOf(item);
            found = true;
        }
    });
    if (!found)
        return false;
    dbr[cat.catagoeryName].items[index][property] = newPvalue;
    writeDB(dbr);
    return false;
}
