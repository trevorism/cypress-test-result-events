import registerTrevorismEventSender from '../src/main.js';
import { test, expect } from 'vitest';
import sinon from 'sinon';
import axios from 'axios';

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
      if(eventName === 'after:run') {
        callback({ totalSuites: 1, totalTests: 1, totalFailed: 0, totalPassed: 1, totalPending: 0, totalSkipped: 0 });
      }
      count++;
    },
    config: {
      projectRoot: 'test',
      testingType: 'e2e',
      version: '5',
      env: {
        trevorismTestEvent: 'enabled'
      }
    }
  };

  const stub = sinon.stub(axios, 'post');
  stub.resolves({ data: {} });

  registerTrevorismEventSender(mockEventEmitter, 'testService');
  expect(count).toBe(2);
});
