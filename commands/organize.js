
let fs = require("fs");  // Importing Node.js File System module
let path = require("path");  // Importing Node.js Path module
const { utility } = require("../utility");  // Importing the utility object from the utility module

// The main function that takes a directory path and organizes files inside it into categorized folders
function organize(PathName) {
    // If no path is provided, use the current working directory
    if (PathName == undefined) {
        PathName = process.cwd();
    }
    
    // Check if the provided path exists, if not, show an error
    if (!fs.existsSync(PathName)) {
        console.log("Directory not found!");
        return;
    } else {
        // If the path exists, call the helper function to organize files
        organizeHelper(PathName);
    }
}

// This function organizes files by scanning the directory and sorting them into their respective categories
function organizeHelper(src) {
    // Reading all files and directories inside the source directory
    let childNames = fs.readdirSync(src);

    // Looping through each file or directory
    for (let i = 0; i < childNames.length; i++) {
        let childPath = path.join(src, childNames[i]);  // Get the full path of the current file/directory
        let isFile = fs.lstatSync(childPath).isFile();  // Check if it's a file

        if (isFile) {
            let category = getCategory(childNames[i]);  // Determine the category of the file
            // console.log(category);
            sendFile(childPath, src, category);  // Move the file to the respective category folder
        }
    }
}

// This function moves the file to a category folder and deletes it from its original location
function sendFile(filePath, dest, category) {
    let categoryPath = path.join(dest, category);  // Construct the destination path based on the category

    // If the category folder doesn't exist, create it
    try {
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath);
        }
    } catch (err) {
        console.error(err);
    }

    let fileName = path.basename(filePath);  // Get the file name from its full path
    let destPath = path.join(categoryPath, fileName);  // Create the destination path for the file
    fs.copyFileSync(filePath, destPath);  // Copy the file to the new destination
    fs.unlinkSync(filePath);  // Delete the original file
}

// This function determines the category of a file based on its extension
function getCategory(name) {
    console.log(name);
    let ext = path.extname(name);  // Extract the file extension
    ext = ext.slice(1);  // Remove the leading dot from the extension (e.g., '.mp4' -> 'mp4')
    console.log(ext);

    // Iterate over each category in the utility object and match the file extension
    for (let types in utility) {
        let type = utility[types];
        for (let j = 0; j < type.length; j++) {
            if (ext == type[j]) {
                return types;  // Return the category (e.g., 'media', 'documents') if a match is found
            }
        }
    }
    return "others";  // Return 'others' if no matching category is found
}

// Exporting the organize function to be used in other modules
module.exports = { organize };
