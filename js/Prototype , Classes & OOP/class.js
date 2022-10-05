//creating a class.
class Color{                     //class name's first letter should be capital by convention
    constructor(r,g,b){
        this.r=r
        this.g=g
        this.b=b
    }

    //all the methods will go to [[prototype]] by default.thats the beauty of class
    innerRGB(){ 
        const {r,g,b}=this
        return`${r}, ${g}, ${b}`
    }
    rgb(){
        return`rgb(${this.innerRGB()})`
    }
    rgba(a=1.0){
        return`rgb(${this.innerRGB()}, ${a})` 
    }
    hex(){
        const {r,g,b}=this
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
}

//calling class with creating instance/object
const color01 = new Color(11,58,102)
const color02 = new Color(51,158,10)

console.log(`color01 = ${color01.rgb()}`)
console.log(`color02 = ${color02.rgb()}`)

console.log(`color01 = ${color01.hex()}`)
console.log(`color02 = ${color02.hex()}`)

console.log(`color01 = ${color01.rgba(.5)}`)
console.log(`color02 = ${color02.rgba(.2)}`)



