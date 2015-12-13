// __tests__/sum-test.js
/*eslint-disable*/

jest.dontMock('../app/components/Inbox/sum');

describe('sum', function() {
 it('adds 1 + 2 to equal 3', function() {
   var sum = require('../app/components/Inbox/sum');
   expect(sum(1, 2)).toBe(4);
 });
});
