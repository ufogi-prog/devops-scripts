const fs = require('fs');
const path = require('path');

function parseYaml(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const yaml = require('js-yaml');
    const fileObject = yaml.safeLoad(data);
    return fileObject;
}

function fileInDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    const fileObjects = {};
    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            files = fileInDirectory(filePath);
            Object.assign(fileObjects, files);
        } else if (path.extname(filePath) === '.yaml') {
            fileObjects[file] = parseYaml(filePath);
        }
    });
    return fileObjects;
}

module.exports = {
    parseYaml,
    fileInDirectory
};