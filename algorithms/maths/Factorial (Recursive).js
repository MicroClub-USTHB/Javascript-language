function fact(num){
    if(num<=1) return 1;
    return fact( num - 1) * num ;
}
console.log(fact(6))
console.log(fact(20))
console.log(fact(10))
console.log(fact(15))