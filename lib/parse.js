var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    hbs = require('handlebars'),
    readDir = require('readDir'),
    moment = require('moment');

var root = path.join('..', '.raw', moment().format('YYYY/MM/DD'));
//var arr = Array.prototype.slice.call(process.argv);
//var track = arr.slice(2, arr.length);
var track = process.argv[2] || 'haroopress';
var dir = path.join(root, track);

if(fs.existsSync(dir)) {
  var files = readDir.readSync(path.join(root, track), [ '*.json' ]);
  var tweetTpl = fs.readFileSync('tweet.mustache', 'utf8');
  var reportTpl = fs.readFileSync('index.html', 'utf8');
  var all = '', tweet;
  
  var template = hbs.compile(tweetTpl);

  _.each(files, function(file, idx) {
    tweet = fs.readFileSync(path.join(dir, file));
    tweet = JSON.parse(tweet);

    all += template(tweet) +'\n';

    console.log('parsed %s', file);
  });

  template = hbs.compile(reportTpl);
  all = template({tweets: all});

  fs.writeFileSync(dir + path.sep + 'index.html', all, 'utf8');
  console.log('choccobot> created %s report', track);

} else {
  console.log('none tracking data');
}
