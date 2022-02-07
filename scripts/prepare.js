const processFile = require('./process-file');
const fs = require('fs');
const path = require('path');

const dir = 'dist/src';

function readDir(dir) {
    fs.readdir(dir, (error, fileNames) => {
        if (error) throw error;

        fileNames.forEach(filename => {
            const name = path.parse(filename).name;
            const filepath = path.resolve(dir, filename);

            fs.stat(filepath, function (error, stat) {
                if (error) throw error;

                const isFile = stat.isFile();

                if (isFile) {
                    if (name === 'index' || name === 'index.style' || name === 'index.d') processFile.process(filepath);
                } else {
                    const subDir = `${dir}/${filename}`;
                    readDir(subDir);
                }
            });
        });
    });
}

readDir(dir);