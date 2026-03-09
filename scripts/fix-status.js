const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'prophecies.ts');
let file = fs.readFileSync(filePath, 'utf8');

let count = 0;
const lines = file.split('\n');
for (let i = 0; i < lines.length; i++) {
  // Look for lines with scholarship objects
  if (/^\s+\{ \.\.\.(?:edersheim|mcdowell)\(/.test(lines[i])) {
    const prevLine = lines[i-1];
    if (prevLine && !prevLine.includes('undefined,') && !prevLine.includes('"coming-soon"')) {
      lines[i] = '  undefined,\n' + lines[i];
      count++;
    }
  }
}

file = lines.join('\n');
fs.writeFileSync(filePath, file, 'utf8');
console.log(`Fixed ${count} lessons with missing status arg`);
