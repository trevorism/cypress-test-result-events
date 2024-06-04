
import axios from 'axios';

function registerTrevorismEventSender(options = {}){

  if (!options.on) {
    throw new Error('Missing required option: on')
  }
  if (!options.service) {
    throw new Error('Missing required option: service')
  }

  let startMillis;

  options.on('before:run', () => {
    startMillis = Date.now();
  })

  options.on('after:run', (afterRun) => {
    const testEvent = {
      service: options.service,
      kind: 'cypress',
      success: afterRun.totalFailed === 0,
      numberOfTests: afterRun.totalTests,
      durationMillis: Date.now() - startMillis,
      date: new Date().toISOString(),
    }

    axios.get("https://event.data.trevorism.com/ping").then(
      () => {
        console.log("Successfully sent cypress test result event. " + JSON.stringify(testEvent));
      },
      (error) => {
        console.error(error);
      }
    );

  })
}

module.exports = registerTrevorismEventSender