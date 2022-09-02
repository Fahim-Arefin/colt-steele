
let todo = [];
let choice;
let task;
while (true) {
    choice = prompt("Enter your choice")
    if (choice === "new") {
        task =prompt("type your task")
        todo.push(task);
    } else if (choice === "list") {

        for(let i=0;i<todo.length;i++){
            
            console.log(`${i} : ${todo[i]}`)
        }

    } else if (choice === "delete") {

    } else if (choice === "quit") {
        break;
    }
}





