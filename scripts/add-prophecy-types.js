#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Complete mapping of lesson ID -> prophecy type
const typeMap = {
  1: 'Direct Prophecy', 2: 'Direct Prophecy', 3: 'Direct Prophecy',
  4: 'Direct Prophecy', 5: 'Typology', 6: 'Direct Prophecy',
  7: 'Direct Prophecy', 8: 'Direct Prophecy', 9: 'Direct Prophecy',
  10: 'Direct Prophecy', 11: 'Messianic Psalm', 12: 'Messianic Psalm',
  13: 'Messianic Psalm', 14: 'Direct Prophecy', 15: 'Direct Prophecy',
  16: 'Messianic Psalm', 17: 'Messianic Psalm', 18: 'Messianic Psalm',
  19: 'Messianic Psalm', 20: 'Direct Prophecy', 21: 'Direct Prophecy',
  22: 'Direct Prophecy', 23: 'Direct Prophecy', 24: 'Messianic Psalm',
  25: 'Messianic Psalm', 26: 'Messianic Psalm', 27: 'Direct Prophecy',
  28: 'Direct Prophecy', 29: 'Messianic Psalm', 30: 'Messianic Psalm',
  31: 'Messianic Psalm', 32: 'Direct Prophecy', 33: 'Direct Prophecy',
  34: 'Direct Prophecy', 35: 'Direct Prophecy', 36: 'Direct Prophecy',
  37: 'Direct Prophecy', 38: 'Direct Prophecy', 39: 'Direct Prophecy',
  40: 'Direct Prophecy', 41: 'Direct Prophecy', 42: 'Direct Prophecy',
  43: 'Direct Prophecy', 44: 'Direct Prophecy', 45: 'Direct Prophecy',
  46: 'Thematic Foreshadowing', 47: 'Direct Prophecy', 48: 'Direct Prophecy',
  49: 'Direct Prophecy', 50: 'Direct Prophecy', 51: 'Direct Prophecy',
  52: 'Direct Prophecy', 53: 'Direct Prophecy', 54: 'Direct Prophecy',
  55: 'Direct Prophecy', 56: 'Direct Prophecy', 57: 'Direct Prophecy',
  58: 'Direct Prophecy', 59: 'Typology', 60: 'Direct Prophecy',
  61: 'Thematic Foreshadowing', 62: 'Messianic Psalm', 63: 'Typology',
  64: 'Direct Prophecy', 65: 'Typology', 66: 'Typology',
  67: 'Direct Prophecy', 68: 'Messianic Psalm', 69: 'Messianic Psalm',
  70: 'Messianic Psalm', 71: 'Messianic Psalm', 72: 'Messianic Psalm',
  73: 'Messianic Psalm', 74: 'Messianic Psalm', 75: 'Messianic Psalm',
  76: 'Messianic Psalm', 77: 'Messianic Psalm', 78: 'Direct Prophecy',
  79: 'Direct Prophecy', 80: 'Direct Prophecy', 81: 'Direct Prophecy',
  82: 'Direct Prophecy', 83: 'Direct Prophecy', 84: 'Direct Prophecy',
  85: 'Direct Prophecy', 86: 'Thematic Foreshadowing', 87: 'Direct Prophecy',
  88: 'Direct Prophecy', 89: 'Direct Prophecy', 90: 'Direct Prophecy',
  91: 'Typology', 92: 'Direct Prophecy', 93: 'Direct Prophecy',
  94: 'Direct Prophecy', 95: 'Direct Prophecy', 96: 'Direct Prophecy',
  97: 'Direct Prophecy', 98: 'Direct Prophecy', 99: 'Typology',
  100: 'Typology', 101: 'Thematic Foreshadowing', 102: 'Thematic Foreshadowing',
  103: 'Thematic Foreshadowing', 104: 'Thematic Foreshadowing',
  105: 'Typology', 106: 'Thematic Foreshadowing', 107: 'Typology',
  108: 'Direct Prophecy', 109: 'Thematic Foreshadowing',
  110: 'Thematic Foreshadowing', 111: 'Thematic Foreshadowing',
  112: 'Messianic Psalm', 113: 'Thematic Foreshadowing',
  114: 'Thematic Foreshadowing', 115: 'Thematic Foreshadowing',
  116: 'Thematic Foreshadowing', 117: 'Messianic Psalm',
  118: 'Thematic Foreshadowing', 119: 'Thematic Foreshadowing',
  120: 'Thematic Foreshadowing', 121: 'Thematic Foreshadowing',
  122: 'Thematic Foreshadowing', 123: 'Messianic Psalm',
  124: 'Thematic Foreshadowing', 125: 'Thematic Foreshadowing',
  126: 'Thematic Foreshadowing', 127: 'Thematic Foreshadowing',
  128: 'Typology', 129: 'Thematic Foreshadowing', 130: 'Direct Prophecy',
  131: 'Thematic Foreshadowing', 132: 'Thematic Foreshadowing',
  133: 'Thematic Foreshadowing', 134: 'Thematic Foreshadowing',
  135: 'Thematic Foreshadowing', 136: 'Thematic Foreshadowing',
  137: 'Thematic Foreshadowing', 138: 'Thematic Foreshadowing',
  139: 'Direct Prophecy', 140: 'Direct Prophecy',
  141: 'Thematic Foreshadowing', 142: 'Direct Prophecy',
  143: 'Thematic Foreshadowing', 144: 'Thematic Foreshadowing',
  145: 'Thematic Foreshadowing', 146: 'Thematic Foreshadowing',
  147: 'Thematic Foreshadowing', 148: 'Thematic Foreshadowing',
  149: 'Thematic Foreshadowing', 150: 'Thematic Foreshadowing',
  151: 'Direct Prophecy', 152: 'Direct Prophecy',
  153: 'Thematic Foreshadowing', 154: 'Thematic Foreshadowing',
  155: 'Direct Prophecy', 156: 'Direct Prophecy',
  157: 'Thematic Foreshadowing', 158: 'Direct Prophecy',
  159: 'Thematic Foreshadowing', 160: 'Thematic Foreshadowing',
  161: 'Direct Prophecy', 162: 'Typology',
  163: 'Thematic Foreshadowing', 164: 'Thematic Foreshadowing',
  165: 'Direct Prophecy', 166: 'Direct Prophecy',
  167: 'Thematic Foreshadowing', 168: 'Direct Prophecy',
  169: 'Direct Prophecy', 170: 'Typology',
  171: 'Direct Prophecy', 172: 'Thematic Foreshadowing',
  173: 'Thematic Foreshadowing', 174: 'Thematic Foreshadowing',
  175: 'Direct Prophecy', 176: 'Thematic Foreshadowing',
  177: 'Thematic Foreshadowing', 178: 'Thematic Foreshadowing',
  179: 'Direct Prophecy', 180: 'Direct Prophecy',
  181: 'Direct Prophecy', 182: 'Messianic Psalm',
  183: 'Messianic Psalm', 184: 'Messianic Psalm',
  185: 'Messianic Psalm', 186: 'Direct Prophecy',
  187: 'Direct Prophecy', 188: 'Direct Prophecy',
  189: 'Typology', 190: 'Direct Prophecy',
  191: 'Direct Prophecy', 192: 'Thematic Foreshadowing',
  193: 'Direct Prophecy', 194: 'Thematic Foreshadowing',
  195: 'Direct Prophecy', 196: 'Thematic Foreshadowing',
  197: 'Thematic Foreshadowing', 198: 'Messianic Psalm',
  199: 'Messianic Psalm', 200: 'Messianic Psalm',
  201: 'Messianic Psalm', 202: 'Messianic Psalm',
  203: 'Messianic Psalm', 204: 'Messianic Psalm',
  205: 'Direct Prophecy', 206: 'Messianic Psalm',
  207: 'Messianic Psalm', 208: 'Messianic Psalm',
  209: 'Direct Prophecy', 210: 'Direct Prophecy',
  211: 'Messianic Psalm',
};

const filePath = path.join(__dirname, '..', 'data', 'prophecies.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Strategy: find each makeLesson( call, parse its arguments using a state machine,
// and insert the prophecyType after the 9th argument (whyItMatters).

// We'll find makeLesson calls by regex, then use character-by-character parsing
// to find the 9th argument boundary.

function findArgBoundary(text, startIndex, argNumber) {
  // startIndex should point to the opening '(' of makeLesson(
  let i = startIndex;
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let argCount = 0;
  let lastCommaPos = -1;
  
  for (; i < text.length; i++) {
    const ch = text[i];
    
    if (inString) {
      if (ch === '\\') {
        i++; // skip escaped char
        continue;
      }
      if (ch === stringChar) {
        inString = false;
      }
      continue;
    }
    
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }
    
    if (ch === '(') {
      depth++;
      if (depth === 1) {
        argCount = 1; // first arg starts
      }
      continue;
    }
    
    if (ch === ')') {
      depth--;
      if (depth === 0) {
        // end of makeLesson call
        if (argCount === argNumber) {
          return { commaPos: -1, closingParenPos: i, afterLastArg: true };
        }
        return null; // not enough args
      }
      continue;
    }
    
    if (ch === ',' && depth === 1) {
      argCount++;
      if (argCount === argNumber + 1) {
        // We just passed the boundary after argNumber
        return { commaPos: i, closingParenPos: -1, afterLastArg: false };
      }
    }
  }
  return null;
}

// Find all makeLesson( occurrences and process them
// We need to work backwards to avoid index shifting
const callPattern = /makeLesson\s*\(/g;
const matches = [];
let match;
while ((match = callPattern.exec(content)) !== null) {
  // Skip the function definition
  // Check if this is the function definition by looking at preceding text
  const before = content.substring(Math.max(0, match.index - 20), match.index);
  if (before.includes('function ')) continue;
  
  const openParenIndex = match.index + match[0].length - 1;
  matches.push({ index: match.index, openParenIndex });
}

// Process matches in reverse order to preserve indices
let modified = 0;
for (let m = matches.length - 1; m >= 0; m--) {
  const { openParenIndex } = matches[m];
  
  // Extract the lesson ID (first argument)
  // Find the first comma after opening paren
  let idStr = '';
  let ii = openParenIndex + 1;
  // skip whitespace
  while (ii < content.length && /\s/.test(content[ii])) ii++;
  while (ii < content.length && /[0-9]/.test(content[ii])) {
    idStr += content[ii];
    ii++;
  }
  const lessonId = parseInt(idStr, 10);
  
  if (!typeMap[lessonId]) {
    console.error(`No type mapping for lesson ${lessonId}`);
    continue;
  }
  
  const prophecyType = typeMap[lessonId];
  
  // Find the boundary after the 9th argument (whyItMatters)
  const boundary = findArgBoundary(content, openParenIndex, 9);
  
  if (!boundary) {
    console.error(`Could not find 9th arg boundary for lesson ${lessonId}`);
    continue;
  }
  
  if (boundary.afterLastArg) {
    // Only 9 args (lessons 1-98 in the initial array)
    // Insert before the closing paren
    const insertPos = boundary.closingParenPos;
    content = content.slice(0, insertPos) + `,\n'${prophecyType}'` + content.slice(insertPos);
    modified++;
  } else {
    // Has more than 9 args (lessons 99+ with status and scholarship)
    // Insert after the comma that follows the 9th arg
    const commaPos = boundary.commaPos;
    content = content.slice(0, commaPos) + `,\n  '${prophecyType}'` + content.slice(commaPos);
    modified++;
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Modified ${modified} makeLesson calls out of ${matches.length} found.`);

// Verify counts
const counts = { 'Direct Prophecy': 0, 'Messianic Psalm': 0, 'Typology': 0, 'Thematic Foreshadowing': 0 };
for (const v of Object.values(typeMap)) {
  counts[v]++;
}
console.log('Type distribution:', JSON.stringify(counts, null, 2));
