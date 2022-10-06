const franc = require("franc")

const langs = require("langs");
const colors = require("colors");

let input = process.argv[2] // 0,1 index e basic info ache //main contant shuru hoy index 2 theke
console.log(input)
let languageCode = franc(input)

if (languageCode === 'und') {
    console.log('Could not detect language, Please try longer text!!'.red)
} else {
    let langObj = langs.where("3", languageCode)
    console.log(langObj.name.green)
}