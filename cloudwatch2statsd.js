var awssum = require('awssum');
var amazon = require('awssum-amazon');
var CloudWatch = require('awssum-amazon-cloudwatch').CloudWatch;
var elb = require('./lib/elb.js');

var cw = new CloudWatch({
    'accessKeyId'     : process.env.AWS_ID,
    'secretAccessKey' : process.env.AWS_SECRET,
    'region'          : amazon.US_WEST_2
});

function getHealthyHostCount(az, elb) {
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
  });
}

getHealthyHostCount('us-west-2a')
getHealthyHostCount('us-west-2b')
getHealthyHostCount('us-west-2c')


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
