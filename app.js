var m = require('./metrix.js');

// getHealthyHostCount('us-west-2a')
//getHealthyHostCount('us-west-2b')
//getHealthyHostCount('us-west-2c')

//getHTTPCode_Backend_4XX('us-west-2a')
//getHTTPCode_Backend_4XX('us-west-2b')
//getHTTPCode_Backend_4XX('us-west-2c')

//getHTTPCode_Backend_5XX('us-west-2a')
//getHTTPCode_Backend_5XX('us-west-2b')
//getHTTPCode_Backend_5XX('us-west-2c')

//getHTTPCode_Backend_2XX('us-west-2a')
//getHTTPCode_Backend_2XX('us-west-2b')
//getHTTPCode_Backend_2XX('us-west-2c')

// some other pieces to be split into their own lovely little npm modules

// optional/for testing: save locally
// like this: 
//    m.getHTTPCode_Backend_2XX(saveResults('first-try.json'), 'us-west-2a')
var fs = require('fs');
function saveResults(filename) {
  return function(err, data) { 
    if (err) return console.log('failed to save results: ' + err);
    fs.writeFile(filename, JSON.stringify(data), function(err) {
      err ? console.log(err) : console.log('saved data to ' + filename);
    });
  }
}

// filter stuff out of the response
function filterBackend_2XX(data) {

  // "HTTPCode_Backend_2XX"
  var metricName = data['Body']['GetMetricStatisticsResponse']['GetMetricStatisticsResult']['Label'];

  // array of datapoints of the form {Timestamp: '2013-05-16T16:08:00Z', Unit: 'Count', Sum: '1.0'}
  var datapoints = data['Body']['GetMetricStatisticsResponse']['GetMetricStatisticsResult']['Datapoints']['member'];
  for (var i = 0, datapoint; datapoint = datapoints[i]; i++) {
    // 
    // generic metric of the form: <az name> <elb name> <metric> <timestamp> <value>
    //
    // TODO need to pass in the az and elb names. they aren't in the response.
    // TODO convert into statsd format.
    // 
    var genericMetric = 'az' + 'elb' + metricName + datapoint['Timestamp'] + datapoint['Sum'];
  }
}

// send to statsd (todo)
