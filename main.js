#!/usr/bin/env bash
let inputArr  = process.argv.slice(2);
const { tree } = require("./commands/tree");
const { organize } = require("./commands/organize");
const { help } = require("./commands/help");
// console.log(inputArr);
let command = inputArr[0];
let PathName = inputArr[1];
switch(command){
    case "tree" :
        tree(PathName);
        break;
    case "organize":
        organize(PathName);
        break;
    case "help":
        help();
        break;
    default:
        console.log("Invalid Command! Use command help.");
        break;
}