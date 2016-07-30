var SnapkiteStreamClient = require('snapkite-stream-client')
var TweetActionCreators = require('../actions/tweet_action_creators.js')

// Same thing we did in stream.jsx. We pass the receiveTweet callback function
// from the TweetActionCreators module, which will package it an action with a
// type and send it to the dispatcher.
function initializeStreamOfTweets() {
  SnapkiteStreamClient.initializeStream(TweetActionCreators.receiveTweet)
}

module.exports = {
  initializeStreamOfTweets: initializeStreamOfTweets
}
