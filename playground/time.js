//jan 1st 1970 00:00:00 am UTC ms in js

var date=new Date();
var months=['Jan', 'Feb'];
console.log(date.getMonth());

var moment=require('moment');

var someTimestamp=moment().valueOf();
console.log(someTimestamp);

var createdAt=1234;
var date=moment(createdAt);

console.log(date.format('YYYY. MM. DD. HH:mm'));
