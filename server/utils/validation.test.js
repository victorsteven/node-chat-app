const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var name = 123;
        var testVal = isRealString(name);
        expect(testVal).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var str = '   ';
        var testVal = isRealString(str);
        expect(testVal).toBe(false);
    });

    it('should allow string with non-space character', () => {
        var str = "mlkrnfvlknelr";
        var testVal = isRealString(str);
        expect(testVal).toBe(true);
    });
});