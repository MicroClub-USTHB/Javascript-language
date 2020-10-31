function fact(num){
    var result=1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}
console.log(fact(6))
console.log(fact(10))
console.log(fact(15))
console.log(fact(20))