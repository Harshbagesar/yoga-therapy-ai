const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/yoga-db.ts');
let content = fs.readFileSync(dbPath, 'utf8');

// Strip TypeScript interfaces at the top
content = content.replace(/export interface [\s\S]*?\n\n/g, '');
content = content.replace(/: Asana\[\]/g, '');
content = content.replace(/: Pranayama\[\]/g, '');
content = content.replace(/: Disease\[\]/g, '');
content = content.replace(/: Article\[\]/g, '');

// Now we can wrap it in sandbox to evaluate it
const sandbox = {};
content = content.replace(/export const /g, 'sandbox.');

try {
  eval(content);
  fs.writeFileSync(path.join(__dirname, 'yoga-db-raw.json'), JSON.stringify(sandbox, null, 2));
  console.log("Successfully extracted raw data to yoga-db-raw.json");
} catch (e) {
  console.error("Failed to parse yoga-db.ts:", e);
}
