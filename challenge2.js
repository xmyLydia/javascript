var john_avg = (89+120+103)/3;
var mike_avg = (116+94+123)/3;
var mary_avg = (97+34+105)/3;
var winnerAndScore='Mike '+mike_avg;
if(john_avg>mike_avg &&john_avg>mary_avg){
    winnerAndScore='John '+john_avg;
}else if(mike_avg>john_avg &&mike_avg >mary_avg){
     winnerAndScore='Mike '+mike_avg;
}else if(mary_avg>mike_avg && mary_avg>john_avg){
     winnerAndScore='Mary '+mary_avg;
}else{
    winnerAndScore='Drawn';
}
console.log('The winner is: '+ winnerAndScore);