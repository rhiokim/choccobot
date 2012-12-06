var fs = require('fs'),
    util = require('util'),
    twitter = require('twitter');

var config = {
  twitter: {
        consumer_key: 'QmQN45XwTND5NtUouShPEw',
        consumer_secret: 'eN1lHIxWPAt4kChgtpp19ehtsvs6dp2m2YtjAfb3HAE',
        access_token_key: '27830793-H0gWJ4Y6bsOACJnkXelAatKOWreHjHR5T8w73ubiH',
        access_token_secret: 'mPs0eWOj0lGcEcXA4wbmPPyX3eb5Njw3Sb5jVhWD0'
  },
  track: [
    'node.js'
  ] 
};

var twit = new twitter(config.twitter);
twit.stream('statuses/filter', {
  track: config.track.join(',')
}, function(stream) {
  stream.on('data', onData)
});

function onData(tweet) {
  console.log(tweet)
}
