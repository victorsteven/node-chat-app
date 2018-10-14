const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Jen";
        var text = 'Some message';
        
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct message location', () => {
        var from = 'Jen';
        var lat = -12.22;
        var long = -19.22;
        url = `https://www.google.com/maps?q=${lat},${long}`;

        var message = generateLocationMessage(from, lat, long);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});