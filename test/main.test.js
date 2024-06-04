import registerTrevorismEventSender from '../src/main.js';
import { test, expect } from 'vitest';

test('registerTrevorismEventSender throws an error when no options are provided', () => {
  expect(() => registerTrevorismEventSender()).toThrow('Missing required option: on');
});

test('registerTrevorismEventSender registers events when options are provided', () => {
  let count = 0;
  const mockEventEmitter = {
    on: (eventName, callback) => {
      if(eventName === 'before:run') {
        callback();
      }
      if(eventName === 'after:spec') {
        callback({ relative: 'test' }, { tests: [{ title: ['test'], state: 'passed' }] });
      }
      if(eventName === 'after:run') {
        callback({ totalSuites: 1, totalTests: 1, totalFailed: 0, totalPassed: 1, totalPending: 0, totalSkipped: 0 });
      }
      count++;
    }
  };

  registerTrevorismEventSender(mockEventEmitter);
  expect(count).toBe(3);
});
