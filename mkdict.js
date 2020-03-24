const fs = require('fs');
const ajv = require('ajv');
const d = [
    '{',
    '}',
    ':',
    '"',
    ',',
    '[',
    ']',
    '"GET"',
    '"POST"',
    '"path"',
    '"body"',
    '"method"',
    '"headers"',
    '"state"',
    '"requests"'
];

try {
    fs.mkdirSync('dict');
} catch {}
d.forEach(function(v, i) {
    fs.writeFileSync('./dict/'+i, v);
});