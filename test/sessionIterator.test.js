import { SessionIterator } from '../js/SessionIterator.js';

describe('SessionIterator', () => {
  describe('next', () => {
    test('sessionIterator.next', () => {
      var si = new SessionIterator(['a', 'b', 'c']);
      expect(si.next()).toBe('a');
    });
  });
});