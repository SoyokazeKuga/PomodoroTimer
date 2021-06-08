import {SessionIterator} from '../js/SessionIterator.js';

test('正常: sessionIterator.next', () => {
  var si = new SessionIterator(['a', 'b', 'c']);
  expect(si.next()).toBe('a');
});