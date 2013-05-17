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

m.getHTTPCode_Backend_2XX(function noop() {}, 'us-west-2a')
//getHTTPCode_Backend_2XX('us-west-2b')
//getHTTPCode_Backend_2XX('us-west-2c')
