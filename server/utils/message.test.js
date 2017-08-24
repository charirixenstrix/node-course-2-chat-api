const expect=require('expect');
var {generateMessage, generateLocationMessage}=require('./message');

describe('generateMessage', ()=>{
  it('should generate correct message object', ()=>{
    var from='Jen';
    var text='valami';
    var res=generateMessage(from, text);

    //expect(res.from).toBe(from);
    //expect(res.text).toBe(text);
    expect(res).toInclude({from, text});
    expect(res.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=>{
    var from='Jen';
    var latitude=1;
    var longitude=1;
    var res=generateLocationMessage(from, latitude, longitude);

    //expect(res.from).toBe(from);
    //expect(res.text).toBe(text);
    expect(res).toInclude({from, url:'https://www.google.com/maps?q=1,1'});
    expect(res.createdAt).toBeA('number');
  });
});
