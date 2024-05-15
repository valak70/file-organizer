let fs = require("fs");
let path = require ("path");
const { utility } = require("../utility");
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
module.exports = {organize}