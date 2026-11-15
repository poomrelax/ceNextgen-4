function grade(score){
    if(score >= 80){
        console.log("Grade A")
    } else if(score >= 70) {
        console.log("Grade B")
    } else if(score >= 60) {
        console.log("Grade C")
    }else {
        console.log("สมน้ำหน้า")
    }
}

grade(80)
grade(70)
grade(60)
grade(1)

function sum(x, y){
    return console.log(x * y)
}


const z = sum(23, 34)
const sum2 = (x,y) => x+y
console.log(sum2(2,1))


const array1 = [1, 3, 4]
console.log(array1[0])
console.log(array1.length)
console.log(array1.join(" - "))
array1.push("what")
console.log(array1.join(" - "))
array1.pop()
console.log(array1.join(" - "))

let sumNow = 0

for(const a of array1){
    sumNow+= a
    console.log(`${a} || sum Now is ${sumNow}`)
}


const student = {
    name: "poom",
    age: 16,
    handsome: true
}

console.log(student.name)
console.log(student.age)
console.log(student.handsome)