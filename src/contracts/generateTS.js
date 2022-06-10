const fs = require('fs')
const { compileFromFile } = require('json-schema-to-typescript')

inputFolder = process.argv[2]
inputFile = process.argv[3]
compileFromFile("./schemas/" + inputFolder + "/" + inputFile + ".json").then(ts => {
    fs.appendFile("./types/" + inputFolder + ".d.ts", ts, err => {
        if(err) console.error(err);
        console.log("Saved");
    })
})