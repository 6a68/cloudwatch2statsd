var awssum = require('awssum');
var amazon = require('awssum-amazon');
var CloudWatch = require('awssum-amazon-cloudwatch').CloudWatch;
var elb = require('./lib/elb.js');

var cw = new CloudWatch({
    'accessKeyId'     : process.env.AWS_ID,
    'secretAccessKey' : process.env.AWS_SECRET,
    'region'          : amazon.US_WEST_2
});

function getHealthyHostCount(cb, az, elb) {
  var startTime = new Date(new Date().getTime() - (24*1000*60*60));
  var endTime = new Date(new Date().getTime() - (1000*60));
  var az = az || 'us-west-2b';
  var elb = elb || 'w-anosrep-org-0514';

  cw.GetMetricStatistics({
    MetricName: 'HealthyHostCount',
    Namespace: 'AWS/ELB',
    Unit: ['Count'],
    Period: 60,
    Statistics: ['Sum'],
    Dimensions: [
      { Name: 'AvailabilityZone', Value: az },
      { Name: 'LoadBalancerName', Value: elb }
    ],
    StartTime: startTime.toISOString('8601'),
    EndTime: endTime.toISOString('8601')
  }, function(err, data) {
    // if (err) console.log(JSON.stringify(err, null, "  "));
    console.log(err, JSON.stringify(data, null, "  "));
    cb(err, data);
  });
}

function getHTTPCode_Backend_4XX(cb, az, elb) {
  var startTime = new Date(new Date().getTime() - (24*1000*60*60));
  var endTime = new Date(new Date().getTime() - (1000*60));
  var az = az || 'us-west-2b';
  var elb = elb || 'w-anosrep-org-0514';
  
  cw.GetMetricStatistics({
    MetricName: 'HTTPCode_Backend_4XX',
    Namespace: 'AWS/ELB',
    Unit: ['Count'],
    Period: 60,
    Statistics: ['Sum'],
    Dimensions: [
      { Name: 'AvailabilityZone', Value: az },
      { Name: 'LoadBalancerName', Value: elb }
    ],
    StartTime: startTime.toISOString('8601'),
    EndTime: endTime.toISOString('8601')
  }, function(err, data) {
    // if (err) console.log(JSON.stringify(err, null, "  "));
    console.log(err, JSON.stringify(data, null, "  "));
    cb(err, data);
  });
}

function getHTTPCode_Backend_5XX(cb, az, elb) {
  var startTime = new Date(new Date().getTime() - (24*1000*60*60));
  var endTime = new Date(new Date().getTime() - (1000*60));
  var az = az || 'us-west-2b';
  var elb = elb || 'w-anosrep-org-0514';
  
  cw.GetMetricStatistics({
    MetricName: 'HTTPCode_Backend_5XX',
    Namespace: 'AWS/ELB',
    Unit: ['Count'],
    Period: 60,
    Statistics: ['Sum'],
    Dimensions: [
      { Name: 'AvailabilityZone', Value: az },
      { Name: 'LoadBalancerName', Value: elb }
    ],
    StartTime: startTime.toISOString('8601'),
    EndTime: endTime.toISOString('8601')
  }, function(err, data) {
    // if (err) console.log(JSON.stringify(err, null, "  "));
    console.log(err, JSON.stringify(data, null, "  "));
    cb(err, data);
  });
}

function getHTTPCode_Backend_2XX(cb, az, elb) {
  var startTime = new Date(new Date().getTime() - (24*1000*60*60));
  var endTime = new Date(new Date().getTime() - (1000*60));
  var az = az || 'us-west-2b';
  var elb = elb || 'w-anosrep-org-0514';
  
  cw.GetMetricStatistics({
    MetricName: 'HTTPCode_Backend_2XX',
    Namespace: 'AWS/ELB',
    Unit: ['Count'],
    Period: 60,
    Statistics: ['Sum'],
    Dimensions: [
      { Name: 'AvailabilityZone', Value: az },
      { Name: 'LoadBalancerName', Value: elb }
    ],
    StartTime: startTime.toISOString('8601'),
    EndTime: endTime.toISOString('8601')
  }, function(err, data) {
    // if (err) console.log(JSON.stringify(err, null, "  "));
    console.log(err, JSON.stringify(data, null, "  "));
    cb(err, data);
  });
}

module.exports = {
  getHealthyHostCount: getHealthyHostCount,
  getHTTPCode_Backend_4XX: getHTTPCode_Backend_4XX,
  getHTTPCode_Backend_5XX: getHTTPCode_Backend_5XX,
  getHTTPCode_Backend_2XX: getHTTPCode_Backend_2XX
};
  

// getHealthyHostCount('us-west-2a')
//getHealthyHostCount('us-west-2b')
//getHealthyHostCount('us-west-2c')

//getHTTPCode_Backend_4XX('us-west-2a')
//getHTTPCode_Backend_4XX('us-west-2b')
//getHTTPCode_Backend_4XX('us-west-2c')

//getHTTPCode_Backend_5XX('us-west-2a')
//getHTTPCode_Backend_5XX('us-west-2b')
//getHTTPCode_Backend_5XX('us-west-2c')

getHTTPCode_Backend_2XX('us-west-2a')
//getHTTPCode_Backend_2XX('us-west-2b')
//getHTTPCode_Backend_2XX('us-west-2c')

/*
elb.find(cw, /^.*0502$/, function(err, elbs) {
  if (err) console.error("fatal error:", err);
  elbs.forEach(function(x) {
    elb.stats(cw, x, function(err, data) {
      console.log(err, JSON.stringify(data, null, "  "));
    });
  });
});
*/
