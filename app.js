// require the dependencies we installed
var app = require('express')();
var responseTime = require('response-time')
var axios = require('axios');
var redis = require('redis');
var port = process.env.REDIS_PORT;
var host = process.env.REDIS_HOST;

// create a new redis client and connect to our local redis instance
var client = redis.createClient(port, host);

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});

app.set('port', (process.env.PORT || 5000));
// set up the response-time middleware
app.use(responseTime());

app.get('/api/redis/search/:unique', function(req, res) {
  // get the unique parameter in the URL
  var unique = req.params.unique;

  // use the redis client to get the associated to that
  // unique from our redis cache
  client.get(unique, function(error, result) {

      if (result) {
        // the result exists in our cache - return it to our user immediately
        res.send({ "value": result, "source": "redis cache" });
      } else {
        // Send error message when unique is not found
        res.send({ "errorMessage": unique + " not found in redis cache" });
      }

  });
});

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});