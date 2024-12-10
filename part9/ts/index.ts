type Operation = 'multiply' | 'add' | 'divide' ;
type Result = number | string

const multiplicator = async (a: number, b: number, operation: Operation) => {
return new Promise((resolve, reject)=>{
    switch (operation) {
        case "multiply":
            resolve(a * b)
            break
        case "add":
           resolve(a + b)
            break
        case "divide":
            if(b>0) {
                resolve(a / b)
                break
            }
            reject('Cant divide by 0')
        default:
            throw new Error('Operation is not multiply, add or divide!');
    }

})

}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

 multiplicator( a,b,'divide').then((res)=>{
        console.log(res)
    })
     .catch(error=>{
         let errorMessage = 'Something went wrong: '
         if (error instanceof Error) {
             errorMessage += error.message;
         }
         console.log(errorMessage);
     })

console.log(process.argv)