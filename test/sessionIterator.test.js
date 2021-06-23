import { SessionIterator } from '../js/pomodoro/pomodoroManager/SessionIterator';

describe('SessionIterator', () => {
  describe('next', () => {
    test('sessionIterator.next', () => {
      var si = new SessionIterator(['a', 'b', 'c']);
      expect(si.next()).toBe('a');
    });
  });
});