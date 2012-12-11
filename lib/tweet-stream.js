var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    twitter = require('twitter'),
    moment = require('moment'),
    mkdirp = require('mkdirp'),
    config = require('../config');

var root = path.join(__dirname, '..', '.raw');
var arr = Array.prototype.slice.call(process.argv);
var track = arr.slice(2, arr.length);

function getDir(date) {
  date = moment(date).format('YYYY/MM/DD');
  return path.join(root, date, track);
}

function onData(tweet) {
  dir = getDir(tweet.created_at);

  if(!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }

  fs.writeFileSync(dir + path.sep + tweet.id_str +'.json', JSON.stringify(tweet), 'utf8');
}

var twit = new twitter(config.twitter);
    twit.stream('statuses/filter', {
      track: track.join(' ')
    }, function(stream) {
      stream.on('data', onData);
    });
