var tips = [0.2, 0.15,0.1];
var bills = [124, 48, 268];
var obj = {
    bills:[],
    tips:[]
}
function calculator(tips,bill){
    if(bill<50){
        return bill*tips[0];
    }
    if(bill<200){
        return bill*tips[1];
    }
    else{
        return bill*tips[2];
    }
}
for(var i=0;i<bills.length;i++){
    var tipValue = calculator(tips,bills[i]);
    obj.tips[i] = tipValue;
    obj.bills[i] = bills[i] + tipValue;
}
console.log(obj);

var tipsMark = [0.2, 0.1,0.25];
var billsMark = [77, 475, 110,45];
var objMark = {
    bills:[],
    tips:[]
}
function calculatorMark(tips,bill){
    if(bill<100){
        return bill*tips[0];
    }
    if(bill<300){
        return bill*tips[1];
    }
    else{
        return bill*tips[2];
    }
}
for(var j=0;j<billsMark.length;j++){
    var tipValueMark = calculatorMark(tipsMark,billsMark[j]);
    objMark.tips[j] = tipValueMark;
    objMark.bills[j] = bills[j] + tipValueMark;
}
console.log(objMark);

function calculateAvg(arr){
    var sum = 0;
    for(var i=0;i<arr.length;i++){
        sum+=arr[i];
    }
    return sum/arr.length;
}
console.log(calculateAvg(objMark.tips));
console.log(calculateAvg(obj.tips));