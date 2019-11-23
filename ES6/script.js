//let and const
//ES5
/*var name5 = 'Jane';
var age5 = 23;
name5 = 'Janny';
console.log(name5);
//ES6
const name6 = 'Jane Smith';
let age6 = 23;
//name6 = 'Janny6';
//console.log(name6);

//ES5
function driversLicense(passedTest){
    if(passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName+','+yearOfBirth+' is allowed');

}
driversLicense(true);
//ES6
function driversLicense6(passedTest){

    let firstName;
    const yearOfBirth = 1990;
    if(passedTest){
        firstName = 'John'; 
    } 
          console.log(firstName+','+yearOfBirth+' is allowed');
}
driversLicense6(true);
let i = 23;
for(let i=0;i<5;i++){
    console.log(i);
}
 console.log(i);

{
    const a = 1;
    let b = 2;
}
console.log(a+b);

let firstName = 'Henry';
let lastName = 'Smith';
const yearOfBirth = 1990;
function calcAge(year){
    return 2019 - year;
}
//ES5
console.log('This is '+ firstName + ' '+lastName+' .He was born in '+ yearOfBirth
           +' today he is '+calcAge(yearOfBirth)+' years old.');
//ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}
 , today he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('H'));//start with
console.log(n.endsWith('th'));//ends with
console.log(n.includes('mi'));//if it is in the middle
console.log(`${firstName} `.repeat(5));

const years = [1990, 1965, 1982, 1937];
//ES5
var ages5 = years.map(function(el){
    return 2019 - el;
})
console.log(ages5);
//ES6
let ages6 = years.map(el => 2019 - el);
console.log(ages6);
ages6 = years.map((el, index) => 2019 - el);
console.log(ages6);

ages6 = years.map((el, index)=>{
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index+1}: ${age}`;
})
console.log(ages6);
*/
//ES5
var box5 = {
    color: 'green',
    position:1,
    clickMe: function(){
        var self = this;
        document.querySelector('.green').addEventListener('click',
                                                          function(){
            var str = 'This is box number '+ self.position+
                ' and color: '+self.color;
            console.log(str);
        })
    }
}
box5.clickMe();
//ES6
const box6 = {
    color: 'green',
    position:1,
    clickMe: function(){

        document.querySelector('.green').addEventListener('click',
                                                          ()=>{
            var str = 'This is box number '+ this.position+
                ' and color: '+this.color;
            console.log(str);
        })
    }
}
//box6.clickMe();
/*const box61 = {
    color: 'green',
    position:1,
    clickMe: ()=>{

        document.querySelector('.green').addEventListener('click',
            ()=>{
            var str = 'This is box number '+ this.position+
                ' and color: '+this.color;
            console.log(str);
        })
    }
}
box61.clickMe();

function Person(name){
    this.name = name;
}
//ES5
Person.prototype.myFriends5 = 
    function(friends){
    var arr = friends.map(function(el){
        return this.name + 'is friends with '+el;
    }.bind(this));
    console.log(arr);
}
var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);
//ES6
Person.prototype.myFriends6 = 
    function(friends){
    var arr = friends.map((el)=>{
        return this.name + 'is friends with '+el;
    } );
    console.log(arr);
}
var friends = ['Bob', 'Jane', 'Mark'];
new Person('Mike').myFriends6(friends);

//ES5
var john = ['John', 26];
//var name = John[0];
//var age = John[1];
//ES6
const [name, year] = ['John', 26];
console.log(name);
console.log(year);
const obj = {
    firstName: 'John',
    lastName: 'Smith'
};
const{firstName, lastName} = obj;

const{firstName: a, lastName: b} = obj;

console.log(a);
console.log(b);
//ES5
function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];   
}
const [age, retirement] = calcAgeRetirement(1990);
console.log(age);
console.log(retirement);

const boxes = document.querySelectorAll('.box');
//ES5
 var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'dodgerblue';
})

const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');
*/
//ES5
/*
for(var i = 0;i<boxesArr5.length;i++){
    if(boxesArr5[i].className === 'box blue'){
        continue;
    }
    boxesArr5[i].textContent = 'I changed to blue';
}

//ES6
for(const cur of boxesArr6){
    if(cur.className.includes('blue')){
        continue;
    }
    cur.textContent = 'I changed to blue!';
}
//ES5
var ages = [12, 17, 8, 21 ,11];
var full = ages.map(function(cur){
    return cur >= 18;
})
console.log(full);
console.log(ages[full.indexOf(true)]);

//ES6
console.log(ages.findIndex(cur=>cur>18));
console.log(ages.find(cur=>cur>=18));


// spread operator
function addFourAges(a, b, c, d){
    return a+b+c+d;
}
var suml = addFourAges(18,14,15,21);
console.log(suml);
//ES5
var ages = [18,30,12,21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);
//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, ...familyMiller];
console.log(bigFamily);
const h = document.querySelector('h1');
const boxes_spread = document.querySelectorAll('.box');
const all = [h, ...boxes_spread];
Array.from(all).forEach(cur => cur.style.color='purple');

//rest parameter
//ES5
function isFullAge5(limit){
    // console.log(arguments);
    var argArr = Array.prototype.slice.call(arguments,1);
    console.log(argArr);
    argArr.forEach(function(current){
        console.log((2016 - current)>limit);
    })
}
isFullAge5(21,1990,1999);
//ES6
function isFullAge6(limit, ...years){
    years.forEach(cur => console.log((2019 - cur)>limit));
}
isFullAge6(25,1990, 1999, 2015);


//default parameters
//ES5
function SmithPerson(firstName,
                      yearOfBirth, lastName, nationality){
    lastName ===undefined ? lastName = 'Smith': lastName;
    nationality ===undefined ? nationality='USA': nationality;
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');

//ES6
function SmithPerson(firstName,
                      yearOfBirth, lastName ='Smith', nationality='American'){
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');

//map
const question = new Map();
question.set('question', 'What is your name?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct.');
question.set(false, 'Wrong, please try again.');

console.log(question.get('question'));
console.log(question.size);

if(question.has(4)){
    console.log('Answer 4');
}


//question.forEach((value, key)=> console.log(value + key));

for(let [key, value] of question.entries()){
    if(typeof key === 'number'){
        console.log(value);
    }
}
const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));

//ES5
var Person5 = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
Person5.prototype.calculateAge = function (){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}
var john5 = new Person5('John', 1990, 'teacher');
//ES6
class Person6 {
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.year = yearOfBirth;
        this.job = job;
    }
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    static greeting(){
        console.log('Hey there!');
    }
}
const john6 = new Person6('John', 1990,'teacher');
Person6.greeting();

var Athlete5 = function(name,yearOfBirth, job, olymphicGames, medals){
    Person5.call(this, name, yearOfBirth, job);
    this.olymphicGames = olymphicGames;
    this.medals = medals;
}


Athlete5.prototype=
    Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function(){
    console.log(this.medals++);
}
var johnAthelete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthelete5.calculateAge();

johnAthelete5.wonMedal();


class Person6 {
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    static greeting(){
        console.log('Hey there!');
    }
}
class Athlete6 extends Person6{
    constructor(name, yearOfBirth, job, olympicGames, medal){
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medal;
    }
    wonMedal(){
        console.log(this.medals++);
    }
}
const johnAthlete6 = new Athlete6('John', 1990,'swimmer', 3, 10);
johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
*/
//Challenge
class Elements{
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}
class Park extends Elements{
    constructor(name, buildYear,treeAmount, area){
        super(name, buildYear);
        this.area = area;
        this.treeAmount = treeAmount;
        this.age = new Date().getFullYear() - buildYear;
    } 
    treeDensity(){
        console.log(`The tree density is ${this.treeAmount/this.area}`);
    }
}
class Street extends Elements{
    constructor(name, buildYear,streetLength, size ){
        super(name, buildYear);
        this.streetLength = streetLength;
        this.size = size;
    }
}
const park1 = new Park('park1', 1990, 100, 200);
const park2 = new Park('park2', 1992, 30, 100);
const park3 = new Park('park3', 1980, 3000, 50);
const parkArr = [park1, park2, park3];

const street1 = new Street('street1', 1990, 1004, 2020);
const street2 = new Street('street2', 1992, 320, 1030);
const street3 = new Street('street3', 1980, 34000, 550);
const streetArr = [street1, street2, street3];
//1. print all parks' tree density
parkArr.forEach(cur => cur.treeDensity());
//2. print average age for each park
function calculateAvgAge(parks){
    let sumAge = 0;
    for(let i=0; i<parks.length; i++){ 
        sumAge += parks[i].age;
    }
    return sumAge/parks.length;
}
console.log(calculateAvgAge(parkArr));
//3. print the name of park that has more than 1000 trees
function ifMoreThanThousandTree(park){
    park.forEach(cur=>{ if(cur.treeAmount>1000){
        console.log(`${cur.name} has more than 1000 trees`) }}
                );
}
ifMoreThanThousandTree(parkArr);
//4. print total length of town's street
function calculateSumLength(arr){
    let sum = 0;
    for(let i=0; i<arr.length;i++){
        sum+=arr[i].streetLength;
    }
    return sum;
}
console.log('street sum length:'+ calculateSumLength(streetArr));
//4.1 print the average length for street
console.log('avg street length: '+ calculateSumLength(streetArr)/streetArr.length);
//print each street's size class
function streetClassification(arr){
    arr.forEach(cur=> {if(cur.size<100){
        console.log('tiny');
    }else if(cur.size <200){
        console.log('small');
    }else if(cur.size<300){
        console.log('normal');
    }else if(cur.size<400){
        console.log('big');
    }else{
        console.log('huge')
    }
                      })
}
streetClassification(streetArr);