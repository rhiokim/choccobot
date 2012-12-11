var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    twitter = require('twitter'),
    moment = require('moment'),
    mkdirp = require('mkdirp'),
    JSONStream = require('JSONStream'),
    config = require('./config');

var track = 'node.js';
var date = moment().format('YYYY/MM/DD');
var dir = path.join('.raw', date, track);

function makeDir() {
  date = moment().format('YYYY/MM/DD');
  dir = path.join('.raw', date, track);

  mkdirp.sync(dir);
}

var raw = dir +'/index.markdown';
var res = fs.existsSync(raw);

var writeStream = fs.createWriteStream(raw);

var twit = new twitter(config.twitter);
    twit.stream('statuses/filter', {
      track: track
    }, function(stream) {
      stream.on('data', onData);
    });

function checkStore() {
  data = moment().format('YYYY-MM-DD');
}
function onData(tweet) {
  writeStream.write(JSON.stringify(tweet, null, 2) +',\n');
}

function start() {
}
