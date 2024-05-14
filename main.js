let inputArr  = process.argv.slice(2);
// console.log(inputArr);
let command = inputArr[0];

switch(command){
    case "tree" :
        break;
    case "organize":
        break;
    case "help":
        help();
        break;
    default:
        console.log("Invalid Command! Use command help.");
        break;
}

function help(){
    console.log("List of all commands:\n tree(PathName) \n organize(PathName) \n help");
}