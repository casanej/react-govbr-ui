const fs = require('fs');
const countRelative = require('./count-relative');

const process = async (filepath) => {
    const arr = [];
    const fileLines = fs.readFileSync(filepath).toString().split("\n");
    const fileRelative = filepath.split('\\')
    const fileIndexRelative = fileRelative.findIndex(x => x === 'src');

    fileLines.forEach(line => {
        const regTest = new RegExp(/[\"'](lib|assets|context|utils|models|hooks|components)[\"']/);
        if (regTest.test(line)) {
            const testLine = regTest.exec(line);
            const pathKey = testLine[1];
            const pathRelative = countRelative.count(fileRelative.length - fileIndexRelative - 2, pathKey);
            arr.push(line.replace(testLine[0], `"${pathRelative}"`));
        } else {
            arr.push(line);
        }
    })

    await fs.writeFileSync(filepath, arr.join('\n'));
}

module.exports = {
    process
}