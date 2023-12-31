const fs = require('fs');
const axios = require('axios');
const process = require('process');

const argv = process.argv;
const URL = require("url").URL;

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function (err) {
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
            else {
                console.log("File written successfully!")
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

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

let path;
let out;

if (argv[2] === '--out') {
    out = argv[3];
    path = argv[4];
} else {
    path = argv[2];
}

if (isURL(path)) {
    webCat(path, out);
} else {
    cat(path, out);
}