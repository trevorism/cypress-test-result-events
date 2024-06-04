function registerTrevorismEventSender(options = {}){

  if (!options.on) {
    throw new Error('Missing required option: on')
  }

  let allResults;
  let startMillis;

  options.on('before:run', () => {
    allResults = {}
    startMillis = Date.now();
  })

  options.on('after:spec', (spec, results) => {
    allResults[spec.relative] = {}
    // shortcut
    const r = allResults[spec.relative]
    results.tests.forEach((t) => {
      const testTitle = t.title.join(' ')
      r[testTitle] = t.state
    })
  })

  options.on('after:run', (afterRun) => {
    allResults.totals = {
      suites: afterRun.totalSuites,
      tests: afterRun.totalTests,
      failed: afterRun.totalFailed,
      passed: afterRun.totalPassed,
      pending: afterRun.totalPending,
      skipped: afterRun.totalSkipped,
    }
    allResults.durationMillis = Date.now() - startMillis;

    // eslint-disable-next-line no-undef
    console.log("allResults: " + allResults);
  })
}

module.exports = registerTrevorismEventSender