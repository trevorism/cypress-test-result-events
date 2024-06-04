
import axios from 'axios';

function registerTrevorismEventSender(options = {}){

  if (!options.on) {
    throw new Error('Missing required option: on')
  }
  if (!options.config) {
    throw new Error('Missing required option: config')
  }

  let startMillis;

  options.on('before:run', () => {
    startMillis = Date.now();
  })

  options.on('after:run', async (afterRun) => {
    const testEvent = {
      service: options.config.projectRoot,
      kind: 'cypress',
      success: afterRun.totalFailed === 0,
      numberOfTests: afterRun.totalTests,
      durationMillis: Date.now() - startMillis,
      date: new Date().toISOString(),
    }

    console.log("What are config values? " + JSON.stringify(options.config));
    try {
      await axios.get("https://event.data.trevorism.com/ping");
      console.log("Successfully sent cypress test result event. " + JSON.stringify(testEvent));
    } catch (error) {
      console.error(error);
    }

  })
}

module.exports = registerTrevorismEventSender