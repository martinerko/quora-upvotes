/*!
 * quora-upvotes
 * Copyright(c) 2016 martinerko <martinerko@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var FeedParser = require('feedparser');
var request = require('request');
var feedparser = new FeedParser();

/**
 * Constants
 */

var REGEXP_ANSWER_LINK = /.+\/answer\/.+$/;


/**
 * REturn data from rss content for specific Quora profile.
 * @param  {String}   profileName
 * @param  {Function} callback
 * @api private
 */

function getRssContent(profileName, callback) {
  var req = request('https://www.quora.com/profile/' + profileName + '/rss');
  var meta;
  var items = [];

  req.on('error', callback);
  req.on('response', function(res) {
    if (res.statusCode != 200) {
      return this.emit('error', new Error('Bad status code. Given profile probably doesn\'t exist.'));
    }
    this.pipe(feedparser);
  });

  feedparser.on('error', callback);
  feedparser.on('meta', function(data) {
    meta = data;
  });
  feedparser.on('readable', function() {
    var item;
    /*jshint boss:true */
    while (item = this.read()) {
      items.push(item);
    }
  });
  feedparser.on('end', function(err) {
    callback(err, {
      meta: meta,
      items: items
    });
  });
}

/**
 * Decides whether given object contains a link to answer.
 * @param  {Object} item
 * @return {Boolean}
 * @api private
 */

function filterUpvotedAnswers(item) {
  return REGEXP_ANSWER_LINK.test(item.link);
}

/**
 * Find upvoted answers for given profile
 * @param  {String}   profileName
 * @param  {Function} callback
 * @api public
 */

function getUpvotedAnswers(profileName, callback) {
  getRssContent(profileName, function(err, data) {
    if (err) {
      return callback(err);
    }
    // filter returned rss content
    data.items = data.items.filter(filterUpvotedAnswers);
    callback(null, data);
  });
}

module.exports = getUpvotedAnswers;
