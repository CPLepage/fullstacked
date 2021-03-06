import * as path from "path";
import * as fs from "fs";

const possibleLocation = [
    path.resolve(__dirname, "scripts/register.js"),
    path.resolve(process.cwd(), "node_modules/fullstacked/scripts/register.js")
].filter(file => fs.existsSync(file));

module.exports = {
    require: possibleLocation,
    timeout: 20000,
    "enable-source-maps": true
}
