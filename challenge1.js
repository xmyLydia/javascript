var mass_mark=11;
var mass_mike=12;
var height_mark=189;
var height_mike=199;
var bmi_mark = mass_mark/(height_mark * height_mark);
var bmi_mike = mass_mike/(height_mike*height_mike);
var flag = bmi_mark > bmi_mike;
console.log('Is mark\'s bmi higher than mike?'+ flag);