const fs = require('fs');
const path = require('path');

class Parser {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = fs.readFileSync(filePath, 'utf8');
  }

  parse() {
    const lines = this.data.trim().split('\n');
    const parsedLines = lines.map((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('Commit')) {
        return trimmedLine.replace('Commit', '').trim();
      }
      return trimmedLine;
    });
    return parsedLines;
  }
}

module.exports = Parser;