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
*/
const boxes = document.querySelectorAll('.box');
//ES5
 var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'dodgerblue';
})
 
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

//ES5
/*
for(var i = 0;i<boxesArr5.length;i++){
    if(boxesArr5[i].className === 'box blue'){
        continue;
    }
    boxesArr5[i].textContent = 'I changed to blue';
}
*/
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