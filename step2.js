const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
const URL = require("url").URL;

function cat(path) {
    try {
        let fileContent = fs.readFileSync(path, "utf8");
        console.log(fileContent);
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};

function webCat(path) {
    axios.get(path)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
            process.exit(1);
        })
};

function isURL(str) {
    // https://stackoverflow.com/questions/30931079/validating-a-url-in-node-js
    try {
        new URL(str);
        return true;
    }
    catch (err) {
        return false;
    }
};

// NOTE TO SELF: Input arguments START AT [2]!!!!!!!!!!!!!!!!

const inputPath = argv[2]
if (isURL(inputPath)) {
    webCat(inputPath);
}
else {
    cat(inputPath);
}