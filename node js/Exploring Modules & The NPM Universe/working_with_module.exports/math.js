const add =(x,y)=>{
    return x+y
}
//or
// const add = (x,y)=> x+y
const pi = 3.1416

const square = (x)=>{
    return x * x
}
//or
// const square = x=> x*x


//BASICS
//'module.exports' is a object shorthand we can write just 'exports'
//initially 'module.exports' object is empty
//then we adding property to 'module.exports' object

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//do not uncomment this two export will creat error
// //exporting way 01
// module.exports.add = add //key is add,value is add func
// module.exports.pi = pi  //key is pi, value is pi which a number
// module.exports.square = square //key is square,value is square func

//we can write shorthand
//module.exports.add = add  to just exports.add = add

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//exporting way 02
let math = {
    pi:pi,
    companyName:'devops ltd',
    list:[1,2,3,'end'],
    admin:{
        leader:'fahim',
        members:['ridoy','sagor','abir','tanjim']
    },
    add:add,           //above declared func
    square:square,     //above declared func
    greeting(name){          //its declared here
        return `hello ${name} its your supervisor ${this.admin.leader}`
    }
}
module.exports = math
//shorthand will not work here
// exports = math //not worked