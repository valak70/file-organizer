let inputArr  = process.argv.slice(2);
let fs = require("fs");
let path = require ("path");
// const { default: utility } = require("./utility");
console.log(inputArr);
let command = inputArr[0];
let PathName = inputArr[1];
let utility = {
    media: ["mp4", "mkv", "mp3", "png", "jpg", "jpeg", "svg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'pptx'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
switch(command){
    case "tree" :
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
function organize(PathName){
    if(PathName== undefined){
        PathName = process.cwd();
        // console.log("Paramter not entered!");
        // return;
    }
    if(!fs.existsSync(PathName)){
        console.log("Directory not found!");
        return;
    }else{
        // let  destPath = PathName
        // try {
        //     if (!fs.existsSync(destPath)) {
        //       fs.mkdirSync(destPath);
        //     }
        //   } catch (err) {
        //     console.error(err);
        //   }
        // // fs.mkdirSync(destPath);
        organizeHelper(PathName);
    }
}
function organizeHelper(src){
    let childNames = fs.readdirSync(src);
    for(let i =0;i<childNames.length;i++){
        let childPath = path.join(src,childNames[i]);
        let isFile = fs.lstatSync(childPath).isFile();
        if(isFile){
            let category = getCategory(childNames[i]);
            console.log(category);
            sendFile(childPath,src,category);
        }
        
    }
    // console.log(childNames);
}
function sendFile(filePath,dest,category){
    let categoryPath = path.join(dest,category);
    try {
        if (!fs.existsSync(categoryPath)) {
          fs.mkdirSync(categoryPath);
        }
      } catch (err) {
        console.error(err);
    }
    let fileName = path.basename(filePath);
    let destPath = path.join(categoryPath,fileName);
    // fs.mkdirSync(destPath);
    fs.copyFileSync(filePath,destPath);
    fs.unlinkSync(filePath);
}
function getCategory(name){
    console.log(name);
    let ext = path.extname(name);
    ext = ext.slice(1);
    console.log(ext);
    for(let types in utility){
        // console.log(types);
        let type = utility[types]
        for(let j=0;j<type.length;j++){
            // console.log(ext,type[j]);
            if(ext==type[j]){
                return types;
            }
        }
    }
    return "others";
}
function help(){
    console.log("List of all commands:\n tree(PathName) \n organize(PathName) \n help");
}