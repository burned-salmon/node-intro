const fs = require('fs');
const argv = process.argv;

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

// NOTE TO SELF: Input arguments START AT [2]!!!!!!!!!!!!!!!!

cat(argv[2]);