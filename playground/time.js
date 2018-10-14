var moment = require('moment');

// var date = new Date();

// console.log(date.getMonth()); // 0 is Jan while 11 is Dec
// console.log(date.getMinutes());
// console.log(date.getFullYear());

// var months = ['Jan', 'Feb', '', '', '', '', '', '', '', 'Oct', ''];
// if(date.getMonth() === 9){
//     console.log('The month is: ', months[9])
// }

var date = moment(); //create a new moment object that represent this current
date.add(7, 'days').subtract(2, 'years');


console.log(`${date.hour()}:${date.minute()} `);
console.log(date.format('h:mm a'));
console.log(date.format('LT'));

let createdAt = 1234;
var date2 = moment(createdAt);
console.log(date2.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
