var tips = [0.2, 0.15,0.1];
var bills = [124, 48, 268];

function calculator(tips,bill){
    if(bill<50){
        return bill*tips[0]+bill;
    }
    if(bill<200){
        return bill*tips[1]+bill;
    }
    else{
        return bill*tips[2]+bill;
    }
}
console.log(calculator(tips,bills[0]));
console.log(calculator(tips,bills[1]));
console.log(calculator(tips,bills[2]));