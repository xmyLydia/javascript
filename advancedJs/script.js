/*var john={
    name:'John',
    yearOfBirth:1998,
    job:'teacher'
};

var Person = function(name,yearOfBirth,job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    
   
}
Person.prototype.calculateAge=function(){
        console.log(2019 - this.yearOfBirth);
     }
var john = new Person('John',1998,'teacher');

var jane = new Person('jane', 1999,'designer');
var mark = new Person('mark',1990,'retired');
john.calculateAge();
jane.calculateAge();
*/
/*var personProto={
    calculateAge : function(){
    console.log(2019-this.yearOfBirth);
}
};
var john = Object.create(personProto);
john.name = 'john';
john.yearOfBirth= 1998;
john.job = 'teacher';
var jane = Object.create(personProto,
{
    name:{value:'jane'},
    yearOfBirth:{value:1998},
    job:{value:'designer'}
})
*/


/*var obj1 = {
    name:'john',
    age:26
}
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);
var age = 29;
var obj = {
    name:'jonas',
    city:'lisbon'
};
function change(a,b){
    a = 30;
    b.city = 'San Francisco'
}
change(age,obj);
console.log(age);
console.log(obj.city);*/
/*var years = [1993,1991,1993];
function arrayCalc(arr, fn){
    var arrRes = [];
    for(var i=0;i<arr.length;i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el){
    return 2019 - el;
}
function isFullAge(el){
    return (2019-el)>16;
}
function maxHeartRate(el){
    if(el>=19 && el<=81){
        return Math.round(206.9-(0.67 * el));
    }
    else{
        return -1;
    }
}
var ages = arrayCalc(years,calculateAge)
console.log(ages);

var fullAges = arrayCalc(ages,isFullAge);
console.log(fullAges);

var heartRate = arrayCalc(ages, maxHeartRate);
console.log(heartRate);
*/
/*function interviewQuestion(job){
    if(job === 'designer'){
        return function(name){
            console.log(name+', can you explain what UX design is?');
           
        }
    }else if(job === 'teacher'){
        return function (name){
            console.log(name+', what subject do you teach?')
        }
    }else{
        return function(name){
            console.log('Hello,'+name+',what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');

var designerQuestion = interviewQuestion('designer');
designerQuestion('John');

function game(){
    var score = Math.random()*10;
    console.log(score>5);
}

game();  
*/
/*(function(){
    var score = Math.random()*10;
    console.log(score>5);
})();
//console.log(score);

(function(goodLuck){
    var score = Math.random()*10;
    console.log(score>5-goodLuck);
})(5);
*/
/*function retirement(retirementAge){
    var a = 'years left until retirement';
    return function(yearOfBirth){
        var age = 2019 - yearOfBirth;
        console.log((retirementAge - age)+ a);
    }
}

var retirementUS = retirement(66);
retirementUS(1990);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);
retirementGermany(1990);
retirementIceland(1990);

function interviewQuestion(job){
    var designerQuestion = ', can you explain what UX design is?';
    var teacherQuestion = ', what subject do you teach?';
    var elseQuestion = ',what do you do?';
    return function(name){
           if(job === 'designer'){
            console.log(name+designerQuestion);   
           }else if(job === 'teacher'){
            console.log(name+teacherQuestion)
            }else{
            console.log('Hello,'+name+elseQuestion);
          } 
    }

}

var interviewQuestionDesigner = interviewQuestion('designer');
interviewQuestionDesigner('john');
*/

/*var john = {
    name:'John',
    age: 26,
    job:'teacher',
    presentation:function(style,timeOfDay){
        if(style === 'formal'){
            console.log('Good morning, '+timeOfDay+' I\'m a '+this.job);
        }else if(style === 'friendly'){
            console.log('Hey, what\'s up'+' I\'m a '+this.job+timeOfDay);
        }
    }
};
var emily={
    name:'Emily',
    age:35,
    job:'designer'
}
john.presentation('formal','morning');
john.presentation.call(emily,'friendly','afternoon');
//john.presentation.apply(emily,['friendly','afternoon']);
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('evening');
var emilyFormal = john.presentation.bind(emily,'formal');
emilyFormal('afternoon');

var years = [1993,1991,2009];
function arrayCalc(arr, fn){
    var arrRes = [];
    for(var i=0;i<arr.length;i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el){
    return 2019 - el;
}
function isFullAge(limit,el){
    return el>limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages,isFullAge.bind(this,20));
console.log(ages);
console.log(fullJapan);
*/

(function(){
    var Question = function(question, answers, correctAnswer){
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
var score=0;
Question.prototype.logQuestion = function(){
    console.log(this.question);
    for(var i=0;i<this.answers.length;i++){
        console.log(i+1+'. '+this.answers[i]);
    }
};
var question1 = new Question('1+1=?', [2,3,4], 0);
var question2 = new Question('2*3=?',[4,9,6],2);
var questionArr =[question1,question2];

 var randomAnswerIndex = Math.floor(Math.random()* questionArr.length); 
 var randomAnswer = questionArr[randomAnswerIndex];
 randomAnswer.logQuestion();
 var choice = window.prompt("What is the answer", "");   
  
    while(choice!=='exit'){
       //console.log(randomAnswer.correctAnswer)
       if(parseInt(choice)-1==randomAnswer.correctAnswer){
           console.log('correct!');
           score++;
       }else{
           console.log('error');
       }
       randomAnswerIndex = Math.floor(Math.random()* questionArr.length); 
       randomAnswer = questionArr[randomAnswerIndex];
       randomAnswer.logQuestion();
       choice = window.prompt("What is the answer", ""); 
     }
     console.log('score: '+score);
  
})();




















