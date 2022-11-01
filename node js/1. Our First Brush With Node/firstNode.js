// for(let i=0;i<10;i++){
//     console.log(`counter = ${i}`)
// }
//--------------------------------------------------------
console.log(process.cwd())
console.log(process.argv) //takes input from bash 


const args = process.argv.slice(2)
args.forEach((n) => {
    console.log(`hello ${n}`)
})
//--------------------------------------------------------