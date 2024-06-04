
import axios from 'axios';

function registerTrevorismEventSender(options = {}, name){

  if (!options.on) {
    throw new Error('Missing required option: on')
  }
  if (!name) {
    throw new Error('Missing required option: name')
  }
  if(!options.config.env.trevorismTestEvent || options.config.env.trevorismTestEvent !== 'enabled'){
    console.log('Trevorism test event sending is disabled. Set CYPRESS_trevorismTestEvent=enabled to enable it.');
    return;
  }

  let startMillis;

  options.on('before:run', () => {
    startMillis = Date.now();
  })

  options.on('after:run', async (afterRun) => {
    const testEvent = {
      service: name,
      kind: 'cypress',
      success: afterRun.totalFailed === 0,
      numberOfTests: afterRun.totalTests,
      durationMillis: Date.now() - startMillis,
      date: new Date().toISOString(),
    }

    try {
      console.log("Sending cypress test result event.");
      await axios.post("https://event.data.trevorism.com/event/testResult", testEvent, {
        headers: { 'Content-Type': 'application/json'}
      });
    } catch (error) {
      console.error(error);
    }

  })
}

module.exports = registerTrevorismEventSender